---
title: Prepare Red5 Pro Node Instance image
menu_order: 5
---

The Red5 Pro Node instance image is used for autoscaling node groups. The Stream Manager will scale nodes using this instance image.

## Create Red5 Pro Node Instance

Go to Compute &rarr; Instances

* Push button `Create instance`
* Name: `red5pro-autoscaling-node-instance` (This is just an example name; you can choose any name that suits your needs.)
* Create in compartment: `<choose compartment>`
* Availability domain: `<choose any>`
* Image and shape &rarr; Image: `Canonical Ubuntu 22.04`
* Image and shape &rarr; Shape: `VM.Standard.E4.Flex`
* Image and shape &rarr; Shape &rarr; Number of OCPUs: `1`
* Image and shape &rarr; Shape &rarr; Amount of memory (GB): `4`
* Primary VNIC information &rarr; Primary network: `Select existing virtual cloud network`
* Primary VNIC information &rarr; Primary network &rarr; VCN: `<choose VCN which you created in previous steps>`
* Primary VNIC information &rarr; Primary network &rarr; Subnet: `<choose Subnet which you created in previous steps>`
* Add SSH keys: `Generate a key pair for me` or `Upload public key files (.pub)` if you already has SSH key pair
* Hide advanced options &rarr; Use network security groups to control traffic &rarr; Network security group: `<choose Security group for nodes which you created in previous steps>`

> Please record name and path for .pub and .pem files, it will be using in Stream Manager 2.0 configuration

* Push button `Create`

## Install Red5 Pro on the Instance

* Connect to your instance over ssh as the ubuntu account. Example: `ssh -i ssh_private_key.pem ubuntu@1.2.3.4`
* Disable default firewall on Ubuntu instance (Ubuntu images in OCI have installed iptables by default and block all inbound traffic exept 22 port)

```bash
sudo iptables -F
sudo netfilter-persistent save
```

* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [Red5 Pro](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LICE-NSEK-EY12) to the root of the Red5 Pro Server installation (`/usr/local/red5pro/LICENSE.KEY`).

### Configure Autoscaling on the Instance

* Edit the file `/usr/local/red5pro/conf/autoscale.xml`
* Change the active value from `false` to `true`. Example: `<property name="active" value="true"/>`
* Save and close the file

### Remove Unnecessary Webapps and Plugins

To ensure a faster startup time for your server, we suggest deleting any web apps that you will not be using from the `/usr/local/red5pro/webapps` directory (for example: `secondscreen, template, vod, streammanager, inspector`). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server. If you are running a custom web app, then you would want to include that on your node servers.

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) that you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming
* red5pro-client-suppressor* -- suppressor
* inspector.jar -- inspector

## Verifying Red5 Pro on Instance

Start the Red5 Pro service

`systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.

## Create Red5 Pro Node Instance image

1. After you've configured your node instance, go back to the `Instance details` page on the OCI dashboard.
2. Click `Stop` to stop the instance.
3. Click on the `More Actions` drop-down menu and select `Create Custom Image`
4. Give the image an easily identifiable name, then click on `Create custom image`.

> Please record Node image name to your checklist for the `NODE_IMAGE_NAME` parameter, it will be using in API calls to Stream Manager to create node group config.
