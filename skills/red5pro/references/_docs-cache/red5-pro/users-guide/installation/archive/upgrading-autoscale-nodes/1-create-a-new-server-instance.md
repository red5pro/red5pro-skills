---
title: Upgrading Autoscale Nodes
description: ""
menu_order: 1
---

First, create a new server instance using the image/AMI that you are currently using for autoscaling.

Download the latest Red5 Pro Server distribution from [https://account.red5.net/login](https://account.red5.net/login) to your local machine.

## Create a new server instance on AWS

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From the left-hand navigation, under INSTANCES, click on Instances, then **Launch Instance**
* Step 1: Choose My AMIs - Select the AMI that corresponds to your current autoscaling node configuration.
* Step 2: Choose an Instance Type - Select any machine type (free-tier is fine). Click on Next: Configure Instance Details.
* Step 3: Configure Instance Details - Network: choose the VPC that you created for autoscaling in that region. Ensure that “Auto-assign Public IP” is set to Enable; accept all other defaults.
* Click on Next: Add storage; click on Next: Tag Instance; click on Next: Configure Security Group
* Step 6: Configure Security Group - choose “Select an **existing** security group” and choose the group that you created for Red5 Pro autoscaling.
* Click **Review and Launch**
* Click **Launch**
* In the final step when prompted,  Choose an existing key pair, and select the public key that you created for autoscaling.


## Create a new server instance on Digital Ocean

1. From your Digital Ocean [dashboard](https://cloud.digitalocean.com/projects) left-hand panel, select **Manage** and click on **Images**.
2. Select your disk image from the *Droplets* list, and click on **More** for pull-down options.
3. Choose **Create Droplet**.
4. Select the "plan" (CPU Optimized) which matches the node types you are using in your current autoscale group.
5. Choose the region and ssh key used for your current autoscale nodes.
6. Set a hostname to identify the instance, and project to add it to, then click on **Create Droplet**

## Create a new server instance on Google Cloud

* From Compute Engine, VM instances, choose **Create an Instance** in your default zone.
* In the **Boot disk** section, click on **Change**. Select the **Custom images** tab, and choose your Red5 Pro server image.


# Copy and Install Red5 Pro Server Distribution

Copy the Red5 Pro Server zip file to this instance. SSH into your instance and stop the Red5 Pro service (`sudo systemctl stop red5pro`). You may need to install new libraries since the last server release. Per "[How to Upgrade Red5 Pro Server](/docs/red5-pro/users-guide/installation/archive/upgrading-autoscale-nodes/1-create-a-new-server-instance/)," Rename your existing red5pro folder to bak.red5pro (`sudo mv red5pro bak.red5pro`). Copy and unzip the new distribution into the same directory where the original red5pro folder was (e.g. `/usr/local/`). After it is unzipped, rename that directory to red5pro (`sudo mv red5pro-server-* red5pro`). Copy the following files from the old build to the new: `conf/autoscale.xml`, `webapps/red5-default.xml`, and `LICENSE.KEY`.

* Modify `{red5pro/conf/autoscale.xml` per the previous build
* Copy the LICENSE.KEY file from the previous build
* Remove unnecessary webapps (`secondscreen, streammanager`)

Start the server (`sudo systemctl start red5pro`) and hit the IP address at port 5080 to make sure there are no missing dependencies and the server starts correctly.




