---
title: Prepare Red5 Pro Node Instance image
menu_order: 6
---

The Red5 Pro Node instance image is used for autoscaling node groups. The Stream Manager will scale nodes using this instance image.

## Create Red5 Pro Node Instance

Go to Linodes &rarr; `Create Linode`

* Select region from drop down. Example &rarr; `US, Los Angeles, CA (us-lax)`
* Choose an OS: Select `Ubuntu 22.04 LTS`
* Linode Plan: Choose `Dedicated 4 GB` in dedicated CPU plan category
* Details: Provide label to instance. Example &rarr; `red5pro-autoscaling-node-instance`
* Security: Enter strong password for root user and select the SSH key added in the previous step
* VPC: Select vpc and subnet created in previous step
    * Select both the checkbox option
        - `Auto-assign a VPC IPv4 address for this Linode in the VPC`
        - `Assign a public IPv4 address for this Linode`
* Firewall: Choose the firewall rule of nodes created in the previous step. Example &rarr; `red5pro-autoscaling-node-sg`
* Click on `Create Linode`

## Install Red5 Pro on the Instance

* Connect to your instance over ssh as the root user. Example: `ssh -i ssh_private_key.pem root@1.2.3.4`
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [Red5 Pro](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LICE-NSEK-EY12) to the root of the Red5 Pro Server installation (`/usr/local/red5pro/LICENSE.KEY`).

### Configure Autoscaling on the Instance

* Edit the file `/usr/local/red5pro/conf/autoscale.xml`
* Change the active value from `false` to `true`. Example: `<property name="active" value="true"/>`
* Save and close the file
* Example:
```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="true"/>
```

### Remove Unnecessary Webapps and Plugins

To ensure a faster startup time for your server, we suggest deleting any web apps that you will not be using from the `/usr/local/red5pro/webapps` directory (for example: `secondscreen, template, vod, streammanager, inspector`). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server. If you are running a custom web app, then you would want to include that on your node servers.

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) that you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming
* red5pro-client-suppressor* -- suppressor
* inspector.jar -- inspector

## Verify Red5 Pro on Instance

Start the Red5 Pro service

`systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.

## Create Red5 Pro Node Instance Image

* After you've configured Red5 Pro  installation on instance, go back to the console of Linode cloud.
* Select `Images` from left side and click on `Create Image`.
* Select linode instance created earlier. Example &rarr; `red5pro-autoscaling-node-instance`
* Select disk and specify the image name in `label` section. Example &rarr; `red5pro-autoscaling-node-image`
* Click on `Create Image`

> Please record Node image name to your checklist for the `NODE_IMAGE_NAME` parameter, it will be using in API calls to Stream Manager to create node group config.