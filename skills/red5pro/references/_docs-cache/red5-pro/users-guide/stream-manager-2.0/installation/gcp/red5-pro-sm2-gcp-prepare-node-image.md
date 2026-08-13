---
title: Prepare Red5 Pro Instance Image for Nodes
menu_order: 7
---

The Red5 Pro Node instance image is used for autoscaling node groups. The Stream Manager will scale nodes using this instance image.

## Create Red5 Pro Node Instance

* Navigate to the Google Cloud Console.(https://console.cloud.google.com/)
* Go to **Compute Engine** in the left-hand navigation and click on **VM Instances**.
* Click the **Create Instance** button to create a new virtual machine.
* Specify a name for the instance, such as `red5pro-node-instance`.
* Select the Region and Zone for the instance. For example, `us-central1` and `us-central1-a`.
* Choose the Machine Type, e.g., `n2-standard-2` (2 vCPUs, 8 GB RAM).
* In the Boot disk section, select Ubuntu and choose Ubuntu 22.04 LTS as the operating system image and **Size** values as `8GB`.
* In the Service Account section, Select existing account created in the previous steps and defines roles to this account.
* For Firewall rules, select the checkboxes:
        * Allow HTTP traffic.
        * Allow HTTPS traffic.
* Under Advanced options, Select Networking and In the Network interfaces section, select from existing created in the previous step
* In Network service Tier, Select `Standard`
* Click **Create** to launch the instance.

## Install Red5 Pro on the Instance

* Connect to your instance over ssh as the ubuntu user. Example: `ssh -i ssh_private_key.pem ubuntu@1.2.3.4`
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

1. Navigate to **Compute Engine** &rarr; Under **Storage** section &rarr; **Images** and click **Create Image**.
2. Enter a `NAME` for the image, For example `red5pro-autoscaling-node-image` and select the **Source Disk** of the red5pro node instance.
3. Set Location to **Multi-regional** and choose **Google-managed encryption key**.
4. Click **Create** to finalize the image creation.

> Please record Node image name to your checklist for the `NODE_IMAGE_NAME` parameter, it will be using in API calls to Stream Manager to create node group config.


