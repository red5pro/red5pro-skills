---
title: Prepare Red5 Pro AMI for Nodes
description: ""
---

## Launch an Instance and Install Red5Pro

<u>**Start a Basic Instance:**</u>

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From left-hand navigation, under INSTANCES, click on Instances, then **Launch Instance**
* Step 1: Choose an Amazon Machine Image (AMI) - Select the “Ubuntu Server 20.04 LTS (HVM)”
* Step 2: Choose an Instance Type - Recommended minimum `t3.medium` (**required for Wavelength zone instances**). Click on Next: Configure Instance Details
* Step 3: Configure Instance Details - Network: choose the VPC that you created for autoscaling in that region. Ensure that “Auto-assign Public IP” is set to Enable; accept all other defaults.
* Click on Next: Add storage - increase from the default 8G to 16G or more; click on Next: Tag Instance; click on Next: Configure Security Group
* Step 6: Configure Security Group - choose “Select an existing security group” and choose the node security group you created.
* Click **Review and Launch**
* Click **Launch**
* In the final step when prompted,  Choose an existing key pair, and select the public key that was created earlier

## Install Red5Pro on the Instance

* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/)
* Make sure that Red5 Pro service is set to auto-start on launch
* Connect to your instance using the private key from the key-pair that you created
* `ssh -i ~/.ssh/keys/red5prokey ubuntu@<server_ip_address>`
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [https://account.red5.net/login](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`)

If you haven't already, <u>**Install NTP (network time protocol)**</u>. NTP is necessary to ensure that the Stream Manager and all nodes are in sync. `sudo apt-get install ntp` The service should start automatically once installed.

## Configure Autoscaling on the Instance

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

> note: **Servers in the Wavelength Zone can only connect to secure SSL**

## Modify Cluster Properties

Edit the file `{red5prohome}/conf/cluster.xml`

1 - Replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to a unique value. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

2 - **REQUIRED FOR WAVELENGTH ZONE SUPPORT** set node communication to use private IP

```xml
     <!-- Set to true to use private IP addresses for node communication -->
        <property name="usePrivateAddresses" value="true" />
```

## Modify Red5pro-Activation Configuration

Edit the file `{red5prohome}/conf/ed5pro-activation.xml`, setting the Network Topology to AWS:

```xml
        <!-- Network topologies available: DEFAULT, PROPERITES, AWS -->
        <property name="networkTopology" value="AWS" />
```

## Remove Unnecessary Webapps

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5pro}/webapps` directory (for example: template, streammanager; **do not remove root**). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server.

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) which you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming

## Add Service Restart - IMPORTANT

Because of the nature of the Wavelength zones, networking takes longer to initiate, and that interferes with the red5pro service startup. To work around this, we added the following `restartred5pro.sh` script to the `/home/ubuntu` directory to wait a minute and then restart the service:

```shell
#! /bin/bash
sleep 60
sudo systemctl stop red5pro
sudo systemctl start red5pro
```

And add the following cron job (`sudo crontab -e`) to be run on startup:

```shell
@reboot /home/ubuntu/restartred5pro.sh
```

## Verifying Red5 Pro on Instance

Start the Red5 Pro service

`sudo systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.

After you've verified, stop the Red5 Pro service

`sudo systemctl stop red5pro`

## Create AMI Image from Instance

To create an AMI, to be used by autoscaling for node creation:

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), click on Running Instances, and select your instance.
* Click on “Actions” => “Image” => “Create Image”
* In the “Create Image” popup window enter a unique **image name** and description and click create image.  Leave additional default settings. Make a note of the image name - you will need this for the stream manager launchconfig.
* You can now stop (or terminate) the instance (NOT the AMI). You will not be charged by Red5 Pro for a server instance that is live for shorter than 15 minutes.
* If your nodegroups span multiple regions, you will need to copy the AMI to each (detailed in the next step)
