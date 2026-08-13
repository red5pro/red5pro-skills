---
title: Recommended - Use AWS autoscaling for Stream Managers
description: ""
menu_order: 13
---

The solution discussed in this document is based on the AWS Auto Scaling mechanism. Please note that AWS's Auto-Scaling feature is completely independent of Red5 Pro Autoscaling, and is only used for load-balanced Stream Managers.

*Note: This document has been updated to reflect AWS architecture changes as of 2023.*

The AWS Load Balancer and Autoscale Group will remain static, while the AWS Launch Template will be changed with each new Stream Manager build.

# DB ACCESS

In order for the stream managers to be able to write/read to/from the database, you will need to give the stream manager security group access to the database inbound MySQL/aurora port (3306). **Make sure this permission is in place before you start up the stream manager autoscale group.**

# 1. Prepare a Stream Manager AMI

To create an AMI from the Stream Manager instance:

* Navigate to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home) and select your Stream Manager instance. Stop the VM for the cleanest image.
* Click on “Actions” => “Image” => “Create Image”
* In the “Create Image” popup window enter a unique **image name** and description and click create an image.  Leave additional default settings.
* Navigate to the AMIs listing, and copy the `AMI ID` (for use in the launch configuration)

# 2. Create an EC2 Launch Template

*In this step we will define a launch template for AWS autoscaling to be used by the AWS [autoscaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html) created below.  AWS now recommends using Launch Templates instead of Launch Configurations. Unlike Launch Configurations, Launch templates can be versioned, making it easier to update the scaling policy.*

Navigate to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), from the right-hand menu, under the **Auto Scaling** section, click on **Launch configurations**, and click on **Create launch configuration**, then from the top of the launch configuration wizard, click on **Create launch template**. *Currently there is no direct link from the EC2 menu to the launch template section.*

 ![launch-config](/_images/installation/aws/01create-launch-config.png)
 
 ...and then...
 
  ![launch-template](/_images/installation/aws/02create-launch-templage.png)

## Launch template name and description

It is helpful to include easily interpreted descriptions, for example, details such as Red5 Pro Server Release Version, instance type used by the AMI, and creation date (e.g. SM-red5pro-server-10.10.0-2023feb28-m5large-template). Add the check to "Provide guidance to help me set up a template that I can use with EC2 Auto Scaling". 

## Application and OS Images (Amazon Machine Image)

Click on the **My AMIs** tab and select the **Owned by me** option. From the pull-down menu, select your stream manager AMI.

![ami](/_images/installation/aws/03ami-owned-by-me.png)

## Instance type

Select the instance type used for creating your Stream Manager image. `example: m5.large`. **NOTE:** the **m5** instance type is recommended for stream managers because they are more memory-intensive.

![04instance-type](/_images/installation/aws/04instance-type.png)

## Key Pair (login)

Choose the keypair that you use for your autoscale environment.

![05keypair](/_images/installation/aws/05keypair.png)

## Network settings

* Subnet: use the default "don't include in launch template".
* Firewall (security groups): select the stream manager security group that you configured earlier. *If you have not already configured a security group for your stream manager, create a new one, in your autoscale VPC, including inbound access to TCP ports 443 (HTTPS), and 5080.

![06network-settings](/_images/installation/aws/06network-settings.png)

## Storage (volumes)

Keep the default settings.

## Resource Tags

*Optional*: if you like, you can add a tag so you can easily identify the stream manager instances on your EC2 dashboard.

![07resource-tags](/_images/installation/aws/07resource-tags.png)

## Advanced details

Scroll down to the bottom of the "Advanced details" section, and paste the following shell script in the text area.

```sh

#!/bin/bash

uid=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1 | tr '[:upper:]' '[:lower:]')
smhost=$(echo "$uid.com")

sed -i "s/\(streammanager\.ip=\).*\$/\1${smhost}/" /usr/local/red5pro/webapps/streammanager/WEB-INF/red5-web.properties

```

*The above script provided as `UserData` will run automatically when a new instance is created. It is programmed to edit the Stream Manager instance's configuration file - `red5-web.properties` and set a unique value for the property - `streammanager.ip` (it will be something like `streammanager.ip=z2go1nhorcpsxlxy.com`). This property needs to be set to a unique identifier string such as an IP address or a hostname when using multiple Stream Managers behind a load balancer.*

Click on the **Create launch template** button.

![08user-data](/_images/installation/aws/08user-data.png)

# 3. Create Auto Scaling Group

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home).
* From the left-hand navigation, under **Auto Scaling**, click on **Auto Scaling Groups**.
* Click on **Create Auto Scaling group** to start the wizard.

**NOTE:** There is a 32-character limit for the load balancer and target group names.

## Choose launch template or configuration

* Give your Autoscale Group an easily-identifiable name (e.g. `Red5Pro-dev-Autoscale-Group`)
* From the pull-down menu, select the launch template that was created earlier.
* For **Version**, if you select **Latest** then the scaling group will automatically choose the most recent launch template if you have multiple versions. You can also select **Default** if you would rather update the scaling group manually.
* Click on **Next**

![09choose-launch-template](/_images/installation/aws/09choose-launch-template.png)

## Choose instance launch options

Select your autoscale VPC and check all of the availability zones and subnets associated with that VPC.

Click **Next**.

![10launch-network](/_images/installation/aws/10launch-network.png)

## Configure advanced options

* Load balancing - select **Attach to a new load balancer**
* Attach to a new load balancer - choose **Application Load Balancer** type
* Give your load balancer an easily recognizable name, for example, *Red5Pro-Streammanager-Load-Balancer*
* Load balancer scheme: choose **Internet facing**
* VPC: this should default to the autoscale VPC and subnets that you selected for the Auto Scale group
* Listeners and routing: modify the HTTP port from the default 80 to **5080**; For **Default routing (forward to)** create a target group.

![11attach-new-lb](/_images/installation/aws/11attach-new-lb.png)

## Health Checks

Make sure that both EC2 and ELB health checks are selected.

![13healthchecks](/_images/installation/aws/13healthchecks.png)

## Additional settings - optional

Not required at this time.

Click **Next**

## Configure group size and scaling policies

To start, keep the defaults of 1 for Desired Capacity, Minimum Capacity, and Maximum Capacity.

### Scaling Policies

For **Metric type**, choose Average CPU utilization, and depending on how aggressive you want your scaling to be, set the target to 50% or higher. Do **not** disable scale-out.

Click **Next**

![14scaling-policies](/_images/installation/aws/14scaling-policies.png)

## Add notifications - optional

If you wish, you can set up email notifications for scaling events.

Click **Next**

![15notifications](/_images/installation/aws/15notifications.png)

## Add tags - optional

We recommend skipping this, especially if you set up tags with your launch template.

Click **Next**

## Review

Look over all of your settings, and Click **Create Auto Scaling group** when you are done.

# 4. Add SSL Certificate to Load Balancer

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From the left-hand navigation, under **Load Balancing**, click on Load Balancers

It will take a few minutes to initiate the new load balancer. When it is ready, select your load balancer, and select the **Listeners** tab.

* Click on **Add listener**

## Add Listener

* Under **Listener details**, add the HTTPS / port 443 listener.
* **Forward to** - select the stream manager Target Group created above
* For **Secure listener settings**, choose the default Security Policy (at this time, *ELBSecurityPolicy-2016-08*.
*  You can use ACM to request a new certificate for your domain, subdomain, etc, or even upload your own certificate information that you might have purchased from elsewhere. For more information check out [ACM documentation](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html). You can create a new certificate, or use an existing wildcard certificate for your Default SSL/TLS certificate


---

# Updating Stream Manager Image for Autoscaling

When you need to update the stream manager, if you are using AWS Autoscaling, you will need to follow this process:

1. Create a new instance using the current Stream Manager AMI
2. Modify that AMI with the updated release per [this doc](/docs/red5-pro/users-guide/installation/archive/upgrading-stream-manager/upgrading-stream-manager-general/)
3. Create an image from that new instance
4. Select your [AWS Launch template](https://console.aws.amazon.com/ec2/home#LaunchTemplates:). Click on the **Actions** drop-down, and choose **Modify template (Create new version**.
5. Give the updated template a description (e.g. "updated to release 11.0.0").
6. Under **Application and OS Images (Amazon Machine Image)**, select your new AMI
5. Modify your [Auto Scaling group](https://console.aws.amazon.com/ec2/autoscaling/home?AutoScalingGroups) - select the group, and choose Actions, edit. Change the Launch Configuration (pull-down) to the new one that you just created.
6. Make sure that all of the other settings remain as you set them originally, and click on **Create template version**
6. To replace your current stream managers with the new ones, select your stream manager **Auto Scaling Group**. 
7. Note: if you **detach** active stream managers, they will still be live and connecting to your database. To cleanly replace the old instance(s) you can either terminate them from the EC2 dashboard or, from the **Instance refresh** tab, start an instance refresh process. That will replace the stream managers per the Minimum healthy percentage that you set.


> note: If you want to delete your environment, you must delete the load balancer before removing the target group, and your auto scaling group before your launch template.