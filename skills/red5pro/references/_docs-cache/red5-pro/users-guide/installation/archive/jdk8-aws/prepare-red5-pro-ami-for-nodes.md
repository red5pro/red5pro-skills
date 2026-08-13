---
title: 7. Prepare Red5 Pro AMI for Nodes
description: ""
menu_order: 8
---

**Note: After creating the server AMI, you will need to copy it to every region you wish to include in your autoscaling solution,** per [https://aws.amazon.com/blogs/aws/ec2-ami-copy-between-regions/](https://aws.amazon.com/blogs/aws/ec2-ami-copy-between-regions/)

Note #2: The AWS platform **does** allow multiple images of the same name. Please make sure to use a unique name when creating the image to be used for autoscaling. If your region has more than one resource of the same name, the first one in the fetch images API operation will be used.

Note #3: If you are going to be using [load-balanced stream managers](/docs/red5-pro/users-guide/installation/archive/auto-aws/optional-load-balance-multiple-stream-managers/), then you need to use the loadbalancer DNS name in the `autoscale.xml` file of your AMI.

Launch an Instance and Install Red5Pro

<u>**Start a Basic Instance:**</u>

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From left-hand navigation, under INSTANCES, click on Instances, then **Launch Instance**
* Step 1: Choose an Amazon Machine Image (AMI) - Select the “Ubuntu Server 16.04 LTS (HVM)”
* Step 2: Choose an Instance Type - Select any machine type (free-tier is fine). Click on Next: Configure Instance Details
* Step 3: Configure Instance Details - Network: choose the VPC that you created for autoscaling in that region. Ensure that “Auto-assign Public IP” is set to Enable; accept all other defaults.
* Click on Next: Add storage; click on Next: Tag Instance; click on Next: Configure Security Group
* Step 6: Configure Security Group - choose “Select an **existing** security group” and choose the group that you created above.
* Click **Review and Launch**
* Click **Launch**
* In the final step when prompted,  Choose an existing key pair, and select the public key that was created earlier
    ![reviewinstance](/_images/installation/server/autoscaleaws/reviewinstance.png)

<u>**Install Red5Pro on the Instance:**</u>

* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/)
* Make sure that Red5 Pro service is set to auto-start on launch
* Connect to your instance using the private key from the key-pair that you created
* `ssh -i ~/.ssh/keys/red5prokey ubuntu@<server_ip_address>`
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [https://account.red5.net/login](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`)

<u>**Install NTP (network time protocol)**</u>

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

Also, make sure that the server time zone is UTC (this should be the default on AWS instances). Type `date` at the prompt. This will return the date, time and zone (*eg:Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

<u>**Configure Autoscaling on the Instance:**</u>

Navigate to the location where you extracted the red5pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="false"/>

        <!--Stream manager hosted uri. use the host of your stream manager.  -->
                <property name="cloudWatchHost" value="http://0.0.0.0:5080/streammanager/cloudwatch"/>
```

* Change the active value from “false” to “*true*”
* Replace 0.0.0.0 with the static ip (elastic ip) you reserved for stream manager previously

> NOTE: if you are going to be using a secure URL for pointing to a load balancer, then you should use that (for example)
```
<property name="cloudWatchHost" value="https://my.streammanager.com/streammanager/cloudwatch"/>
```

* Save and close the file

<u>**Set a Unique Cluster Password:**</u>

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to sometime unique. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

>**NOTE: The `cluster` password can not contain any CAPITAL LETTERS at this time**

<u>**Remove Unnecessary Webapps:**</u>

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5pro}/webapps` directory (for example: secondscreen, template, vod, streammanager; **do not remove root**). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server.

<u>**Verifying Red5 Pro on Instance:**</u>

Start Red5 Pro service
`sudo systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://xxx.compute-1.amazonaws.com:5080`, where xxx.compute-1.amazonaws.com is the Public DNS value of your instance.

After you've verified, stop the Red5 Pro service
`sudo systemctl stop red5pro`

Create AMI Image from Instance

To create an AMI, to be used by autoscaling for node creation:

* Navigate to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), click on Running Instances, and select your instance.
* Click on “Actions” => “Image” => “Create Image”
* In the “Create Image” popup window enter a unique **image name** and description and click create an image.  Leave additional default settings. Make a note of the image name - you will need this for the stream manager launchconfig.
* You can now stop (or terminate) the instance (NOT the AMI). You will not be charged for a server instance that is running for fewer than 15 minutes.
* **NOTE**: with Server Release 7.0 (Stream Manager API 4.0) you can use different images for different node types. This can be especially handy if, for example, you want to support HLS recording but not live streams. In this case, you could remove the `mpegts` plugin on the `EDGE` or `RELAY` server image. You could also, for example, create an image on a larger instance type and allocate more memory.
