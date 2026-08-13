---
title: Prepare Red5 Pro Node Instance Image
menu_order: 7
---

The Red5 Pro Node instance image (Droplet Snapshot) is used for autoscaling node groups.  
Stream Manager 2.0 scales nodes by creating Droplets from this prepared image.

## Create Red5 Pro Node Instance

Go to **DigitalOcean → Droplets → Create Droplet**

* **Region:** Select the region where you will deploy autoscaling  
  Example → `Bangalore (blr1)`
* **Choose an Image:** Select `Ubuntu 22.04 LTS (x64)`
* **Choose a Plan:**  
  Select a CPU-Optimized or General-purpose plan  
  Minimum recommended → `4 vCPUs / 8GB RAM`
* **Authentication:**  
  Choose the SSH key created earlier
* **VPC Network:**  
  Select the VPC you created previously  
  Example → `red5pro-autoscaling-blr1`
* **Hostname:**  
  Example → `red5pro-autoscaling-node-instance`
* **Firewall:**  
  Select the firewall for node instances  
  Example → `red5pro-autoscaling-node-fw`
* Click **Create Droplet**

---

## Install Red5 Pro on the Instance

* Connect via SSH using the root user: Example: `ssh -i ssh_private_key.pem root@1.2.3.4`
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).
* Make sure that Red5 Pro service is set to auto-start on launch.
``` systemctl enable red5pro```

* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [Red5 Pro](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LICE-NSEK-EY12) to the root of the Red5 Pro Server installation (`/usr/local/red5pro/LICENSE.KEY`).

Example key format:
``` XXXX-XXXX-XXXX-XXXX ```

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

## Create Red5 Pro Node Instance Image (DigitalOcean Snapshot)

* Go to DigitalOcean Console → Images → Snapshots

* Click Create Droplet Snapshot

* Select the Droplet you prepared Example → ```red5pro-autoscaling-node-instance```

* Choose the filesystem disk to snapshot

* Enter an image name (label) Example → ```red5pro-autoscaling-node-image```

* Click Create Snapshot

The snapshot will appear under:

Images → Snapshots → Droplet

> Save the Image name — you will use this value for the `NODE_IMAGE_NAME` parameter when creating node groups via the Stream Manager 2.0 API.