---
title: Prepare Red5 Pro Node droplet
description: ""
menu_order: 11
---

1. From the Snapashots menu, choose the optimized image you created. Click on the **More** dropdown, and select **Create Droplet**
2. *Choose a plan* - for the node instances, the minimum-suggested droplet type is the **Compute-Optimized** *$40/month* `4 GB / 2 CPUs` droplet type, with the default `1x SSD`. For production load, you may instead want the `8GB / 4 CPUs` type (`c-4`), or even `16 GB / 8 CPUs` type (`c-8`).
3. Skip *Add block storage*
4. *Choose a datacenter region*  - the datacenter where you created the image will be selected by default (if you want to create a droplet in a different region, then you first will need to copy the snapshot to that region)
5. *VPC Network* - as of this document, Red5 Pro autoscaling does not support targeting by Digital Ocean VPC, so you must leave this as the default.
7. *Authentication* - select **SSH keys** and add a check next to the ssh key that you added in the previous step.
8. *Finalize and create* - choose the default `1 droplet` and modify the name to identify the droplet (note: this hostname is only a label, it is not a DNS name)
9. If you have multiple projects, select the one you want to use for this environment, and click on **Create Droplet**

10. Click on **Tags** and add the following: `sm-nodes`
11. Go the firewall that you set up for SM/nodes above, and click on **Add Droplets**. Type in `sm-nodes` and save. *This will ensure that all nodes created by the stream manager get added to this firewall*.

![addtag](/_images/installation/server/autoscaledigitalocean/addtag.png)

## Install Red5 Pro on the Instance

* Connect to your instance over ssh as the root account.
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [Red5 Pro](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`).

#  Configure Autoscaling on the Instance

Navigate to the location where you extracted the Red5 Pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

```xml
<bean name="config"class="com.red5pro.clustering.autoscale.Configuration">
   <property name="active" value="false"/>
   <property name="cloudWatchHost" value="http://0.0.0.0:5080/streammanager/cloudwatch"/>
</bean>
```

* Change the active value from “false” to “*true*”
* Replace 0.0.0.0 with the IP of the Stream Manager or the URL of the load balancer
* Save and close the file

## Set a Unique Cluster Password

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to sometime unique. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

>**NOTE: The `cluster` password can not contain any CAPITAL LETTERS at this time**


## Remove Unnecessary Webapps and Plugins

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5prohome}/webapps` directory (for example: `secondscreen, template, vod, streammanager`). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server. If you are running a custom webapp, then you would want to include that on your node servers.

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) which you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming

## Verifying Red5 Pro on Instance

Start Red5 Pro service

`systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.
