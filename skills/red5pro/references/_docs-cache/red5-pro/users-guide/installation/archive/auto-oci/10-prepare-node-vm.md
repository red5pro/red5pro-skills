---
title: Prepare Red5 Pro Node Instance
description: ""
menu_order: 11
---

1. From the Custom Images section, choose the optimized image you created. Click on the three dots to the far left for the dropdown menu, and select **Create Instance**
2. Give the instance a name, and choose the compartment and Availability Domain
3. *Image and Shape* - click **Change Shape** and modify as required for your use case. Minimum suggested configuration is 1 OCPU and 4G memory.
4. *Networking* - make sure the correct VCN and subnet are selected. **Show advanced options**, check the *Use network security groups to control traffic* and select the Network Security Group that you set up for autoscale nodes.
5. *Add SSH keys* choose **Upload public key files** and copy the ssh public key that you created for terraform.
6. Click on **Create**

## Install Red5 Pro on the Instance

* Connect to your instance over ssh as the ubuntu account.
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [Red5 Pro](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`).

#  Configure Autoscaling on the Instance

Navigate to the location where you extracted the red5pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

* Change the active value from “false” to “*true*”
* Replace `http://0.0.0.0:5080` with `https://your-streammanager-url`
* Save and close the file

example:

```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="true"/>

        <!--Stream manager hosted uri. use the host of your stream manager.  -->
                <property name="cloudWatchHost" value="https://red5autoscale.red5pro.com/streammanager/cloudwatch"/>
```

## Set a Unique Cluster Password

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to sometime unique. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

## Remove Unnecessary Webapps and Plugins

To ensure a faster startup time for your server, we suggest deleting any web apps that you will not be using from the `{red5prohome}/webapps` directory (for example: `secondscreen, template, vod, streammanager`). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server. If you are running a custom web app, then you would want to include that on your node servers.

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) that you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming

## Verifying Red5 Pro on Instance

Start the Red5 Pro service

`systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.
