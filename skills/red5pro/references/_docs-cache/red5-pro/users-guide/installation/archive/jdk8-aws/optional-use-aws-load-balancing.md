---
title: Optional - Use AWS autoscaling for Stream Managers
description: ""
menu_order: 13
---

# Summary

The solution discussed in this document is based on the robust AWS Auto Scaling mechanism. Please note that AWS's Auto Scaling feature shouldn't be confused with Red5 Pro's Autoscaling for live streams that the Stream Manager handles.

The AWS Auto Scaling mechanism requires us to define an AWS launch configuration, that defines what AMI the Stream Manager should use, the instance type to use, the initialization script, VPC information etc.

We then need to create a load balancer for the Red5 Pro autoscaling deployment without any registered targets (unlike a regular load balancer setup). Finally, we create an autoscaling group which uses the launch configuration and defined scaling policies to launch instances into the load balancer's target group. After the autoscaling group has been created, it will initialize the group with a minimum number of instances configured.

After one or more instances have been created and they have passed the load balancer health check, we create our nodegroup and initialize it using the [Stream Manager API](/docs/red5-pro/development/api/archive/rest-api-v-400/), accessed via the load balancer.

While AWS Auto Scaling takes care of scaling the instances and replacing failed instances to maintain desired capacity, the Load balancer simply uses its `target group` interface to route traffic to instances. In this way, we achieve a failure-recovery system and a partial scaling mechanism for Stream Manager instances.

> Because we use the Red5 Pro Stream Manager as a WebSocket proxy for WebRTC clients, we recommend that you disable automatic scale-in if you are using WebRTC clients. Because the connections are persistent in nature, a scale-in would disconnect any connected clients. If you are not using WebRTC, you can take advantage of AWS's scale-in mechanism as well.

**Prerequisites**

* You should have completed setting up a standard Red5 Pro autoscaling deployment on AWS.
* You should have some basic understanding of the AWS console and EC2 related services.
* You should have basic Linux administration skills.

# DB ACCESS

In order for the stream managers to be able to write/read to/from the database, you will need to give the stream manager security group access to the database inbound mysql/aurora port (3306). **Make sure this permission is in place before you start up the stream manager autoscale group.**

# 1. Prepare a Stream Manager AMI

> This assumes that you have at least one Stream Manager instance configured and `running`.

To create an AMI from the Stream Manager instance

* Navigate to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), click on Running Instances, and select your Stream Manager instance.
* Click on “Actions” => “Image” => “Create Image”
* In the “Create Image” popup window enter a unique **image name** and description and click create an image.  Leave additional default settings. Make a note of the image name - you will need this while defining an AWS autoscaling launch configuration.
* You can now stop (or terminate) the instance (NOT the AMI).

# 2. Create an EC2 Launch Configuration

**In this step we will define a launch configuration for AWS autoscaling. The configuration will be used by out AWS [autoscaling group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html) which we will be creating in the near future.**

An AWS launch configuration will help define the standard configuration to use for launching Stream Manager instances for your stream manager setup.

## Creating a Launch Configuration

Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), click on **Launch configurations**, and click on **Create launch configuration** to start wizard.

![Creae launch configuration](/_images/installation/server/smautoscaleaws/create-launch-configuration.png)

**Chose AMI**

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* Click on **My AMI** and select your Stream Manager AMI, that was created earlier.

![Select AMI](/_images/installation/server/smautoscaleaws/choose-ami.png)

**Chose Instance Type**

* In the instance type selection screen, select an appropriate instance type to be used for your Stream Manager instances. `example: c5.large`.
* Click **Next: Configure Details** to move to the next step

![Select Instance Type](/_images/installation/server/smautoscaleaws/choose-instance-type.png)

**Configure Details**

* **Name**: enter a name for your launch configuration. (`Example: streammanager-launch-config`)
* Leave other options to default values.
* Under **Advanced Details** -> **User data** select **As text** and enter the following shell script in the text area.

```sh

#!/bin/bash

uid=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1 | tr '[:upper:]' '[:lower:]')
smhost=$(echo "$uid.com")

sed -i "s/\\(streammanager\\.ip=\\).*\\$/\\1${smhost}/" /usr/local/red5pro/webapps/streammanager/WEB-INF/red5-web.properties

```

The above script provided as `UserData` will run automatically when a new instance is created. It is programmed to edit the Stream Manager instance's configuration file - `red5-web.properties` and set a unique value for the property - `streammanager.ip` (it will be something like `streammanager.ip=z2go1nhorcpsxlxy.com`). This property needs to be set to a unique identifier string such as an IP address or a hostname when using multiple Stream Managers behind a load balancer.

![Configure Details](/_images/installation/server/smautoscaleaws/configure-details.png)

* For **IP Address Type**, select `Assign a public IP address to every instance` or `Do not assign a public IP address to any instances` as per your requirements. Since the Stream Managers will be accessed via a load balancer and Red5 Pro nodes also communicate to Stream Managers via the load balancer, having a public IP address is optional. However, if you need to access the stream manager directly for development purpose, having a public IP is useful.
* Click **Next: Add Storage** to move to next step

**Add Storage**

* Make sure that the storage **Size** is set to at least 16 Gb or more.
* Leave other options to default
* Click **Next: Configure Security Group** to move to the next step

![Add Storage](/_images/installation/server/smautoscaleaws/add-storage.png)

**Configure Security Group**

* Click on **Select an existing security group**
* Select the Security Group intended for Stream Manager instances

![Configure Security Group](/_images/installation/server/smautoscaleaws/configure-security-group.png)

* Click **Review** to see the overview of configuration options selected
* Click **Create Launch Configuration** to create the launch configuration

![Launch configuration created](/_images/installation/server/smautoscaleaws/launchconfiguration-created.png)

We have just created the AWS launch configuration that defines the configuration for launching our Stream Manager instance(s).

# 3. Set up an Application Load Balancer

The next step is to create an Application Load Balancer. The load balancer will be responsible for distributing traffic to one or more Stream Manager instances efficiently, taking into account the instance health status.

But we already know how to [setup a load balancer for Stream Manager](/docs/red5-pro/users-guide/installation/archive/auto-aws/optional-load-balance-multiple-stream-managers/), so what's the catch here? Unlike our regular load balancer configuration, we won't actually be registering instance targets. Instead, we will use the AWS autoscaling group to do that!

<u>Create Load Balancer</u>

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From the left-hand navigation, under LOAD BALANCING, click on Load Balancers
* Click on **Create Load Balancer** and choose **Application Load Balancer**, then click **Create**.

![Select load balancer](/_images/installation/server/smautoscaleaws/select-load-balancer.png)

**Step 1: Configure Load Balancer**

* **Name**: Give the load balancer a name (only alphanumeric characters and `-` are allowed).
* *Scheme**: internet-facing
* **IP address type** - ipv4
* Listener Configuration: add the following listener ports:

| Load Balancer Protocol | Load Balancer Port |
|---|---|
| HTTP | 5080 |
| HTTPS | 443 |

![Configure Load Balancer - Ports](/_images/installation/server/smautoscaleaws/lb-configure.png)

* Availability Zones:
* * Choose your `Red5 Pro autoscaling VPC`, and select all of the availability or the ones where you plan to make your Stream Manager(s) available (advance).
* Click **Next: Configure Security Settings** to move to the next step

![Configure Load Balancer - Availability Zones](/_images/installation/server/smautoscaleaws/lb-availability-zones.png)

**Step 2: Configure Security Settings**

* * Select "Choose an **existing** certificate from AWS Certificate Manager (ACM), and select the certificate you created earlier, which should be in the drop-down menu next to **Certificate:**. This certificate will be used both for HTTPS and Secure Websockets.
> You can use ACM to request a new certificate for your domain, subdomain etc or even upload your own certificate information that you might have purchased from elsewhere. For more information check out [ACM documentation](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
* * Unless you have some specific security needs, accept the **Predefined Security Policy**.
* * Click on **Next: Configure Security Groups** to move to next step

![Load Balancer Security Settings](/_images/installation/server/smautoscaleaws/lb-configure-security-settings.png)

**Step 3: Configure Security Groups**

* * Choose the security group intended for Stream Manager that you set up previously while setting up Stream Manager.

![Load Balancer Security Group](/_images/installation/server/smautoscaleaws/lb-security-group.png)

**Step 4: Configure Routing**

* * Target Group: New Target Group (give it a name); target type: Instance. Protocol HTTP, port 5080.
* * Health checks: protocol: HTTP, path `/`.
* * Click on **Next: Register Targets** to move to next step

![Load Balancer Configure Routing](/_images/installation/server/smautoscaleaws/lb-configure-routing.png)

By this configuration, we will be routing every traffic received on port `5080` and `443` of the load balancer on the port `5080` of instances registered in our target group.

**Step 5: Register targets**

* * Skip this step, since we won't be registering any instances directly here.
* * Click on **Next: Review**

![Load Balancer Register Targets](/_images/installation/server/smautoscaleaws/lb-register-targets.png)

**Step 6: Review**

* * Review your configuration edits to make sure everything is set up as you wish, then click on **Create** to launch the load balancer

![Load Balancer Created](/_images/installation/server/smautoscaleaws/lb-created.png)

Wait a while as the load balancer turns from `provisioning` to `active`.

**Creating a DNS CNAME Record**

At this point, you will have a load balancer with an empty target group. We will now assign a read friendly alias to the load balancer so that it is easy to remember and use.

* * Navigate to the load balancers the main page and select your newly created load balancer and note the `DNS` string.
* * Go to the domain management interface of your business domain (The domain that you wish to create the alias with).
* * Create DNS record of type `CNAME` with an alias host having the value of the load balancer DNS.

![DNS CNAME Record](/_images/installation/server/smautoscaleaws/dns-cname.png)

> NOTE: DNS propagation can take up to 24 hours in worst cases. Once the propagation is complete, you can access the load balancer using the alias.

# 4. Create an Autoscaling Group

The final component of the setup is to create an `AWS Autoscaling Group`. The autoscaling group will be responsible for adding/removing Stream Manager instance(s) based on configuration provided. The group will use the launch configuration in the first part of the step and it will make the instances accessible via the Load Balancer created in the second part of the setup.

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From the left-hand navigation, under AUTO SCALING, click on Auto Scaling Groups
* Click on **Create Auto Scaling group** to start the wizard

![Create Auto Scaling Group](/_images/installation/server/smautoscaleaws/autoscale-group-create.png)

**Select a Launch Configuration**

* * The first screen of the wizard requires you to select a launch configuration or a Launch template for the group. Identify & select the launch configuration that was created earlier.
* * Click on **Next Step** to move to next step

![Launch configuration For Auto Scaling Group](/_images/installation/server/smautoscaleaws/autoscale-group-select-launch-config.png)

**Configure Auto Scaling group details**

* * Provide a name for the auto scaling group. `Example: streammanager-autoscaling-group`
* **Group Size**: Set Start with **1** instances.
* **Network**: Select your Red5 Pro autoscaling VPC
* **Subnet**: Select the **same subnets** that you did while selecting availability zones for the load balancer.

![Configure Auto Scaling Group Details](/_images/installation/server/smautoscaleaws/autoscale-groups-configure-details.png)

* Advance Details:
* **Load Balancing:** Select `Receive traffic from one or more load balancers`
* **Classic Load Balancers:** Leave empty (since are using Application Load Balancer)
* **Target Groups:** Click for drop down list, and choose the group that was generated in *step 5* of the loadbalancer setup
* **Health Check Type:** Select **ELB**
* **Health Check Grace Period:** Leave at default setting (300)
* **Instance Protection:** Click and add **Protect From Scale In** if you are using WebRTC via Stream Manager.
  * Leave all other options on their default settings
  * Click on **Next: Configure scaling policies** to move to next step

![Configure Auto Scaling Group Details - Advance](/_images/installation/server/smautoscaleaws/autoscalee-groups-configure-details-advance.png)

**Configure scaling policies**

Scaling policies allow you to configure how to scale an when to scale. You can define scaling policies for scaling new Stream Manager instances up and down based on load conditions.

* * Select the option - **Use scaling policies to adjust the capacity of this group**
* * For **Scale between X and Y instances**, enter a lower value of **1** and an upper value of a maximum number of instances that you will want to have at a time.

![Min Max Instances](/_images/installation/server/smautoscaleaws/autoscaling-group-min-max-instances.png)

Click on **Scale the Auto Scaling group using a step or simple scaling policies** to toggle from **simple** to **step** scale policy mode.

* Configuring `Increase Group Size`:
  * Click on the **Create a simple scaling policy** link option
  * Leave Name attribute to the default value (Increase Group Size)
  * For **Execute policy when:**, create a new alarm
    * Click on **Add new alarm** to bring up create alarm dialog
    * For **Send a notification to** select an SNS topic if exists or create a new topic (optional)
    * Configure a alarm condition as : Whenever **Average** of **CPU Utilization** is >= **70** for at least **2** consecutive period(s) of **1 minute**. This will essentially mean that the alarm occurs whenever the average CPU utilization of all the instances taken together breaches 70% and stays that way for 2 consecutive eriods of 1-minute interval.
    * Provide a simple name for the alarm.
    * Click on **Create Alarm**

    ![Scale out alarm](/_images/installation/server/smautoscaleaws/autoscalee-groups-scale-out-alarm.png)

  * For **Take the action:**, select **Add** and enter **1** for instance count.
  * For **And then wait:**, enter a value of **300* (seconds). This time will be used to space between two scale-out operations. The time value should never be below **180**(seconds).

> **IMPORTANT:** If you are using WebRTC, do **NOT** configure a scale-down rule.

* Configuring `Decrease Group Size` (Optional, WARNING: Use only if not using WebRTC):
  * Click on the **Create a simple scaling policy** link option
  * Leave Name attribute to the default value (Decrease Group Size)
  * For **Execute policy when:**, create a new alarm
    * Click on **Add new alarm** to bring up create alarm dialog
    * For **Send a notification to** select an SNS topic if exists or create a new topic (optional)
    * Configure a alarm condition as : Whenever **Average** of **CPU Utilization** is \<= **30** for atleast **2** consecutive period(s) of **15 minute**. This will essentially mean that the alarm occurs whenever the average CPU utilization of all the instances taken together goes below 30% and stays that way for 2 consecutive periods 15-minute interval.
    * Provide a simple name for the alarm.
    * Click on **Create Alarm**

    ![Scale in alarm](/_images/installation/server/smautoscaleaws/autoscalee-groups-scalee-in-alarm.png)

  * For **Take the action:**, select **Remove** and enter **1** for instance count.
  * For **And then wait:**, enter a value of **180* (seconds). This time will be used to space between two scale-in operations. The time value can be lower since a scale down of an extra instance does not necessarily disrupt services.

  ![Auto Scale Group Alarm configuration 2](/_images/installation/server/smautoscaleaws/autoscalee-groups-simple-alarms-2.png)

  > To know more about scaling policies and alarm configurations check out the [official AWS documentation.](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html). You can also take a look at [scheduled auto scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html) to see how to add/remove instances automatically at a scheduled time.

* * Click on **Next: Configure Notifications** to move to next step

**Configure Notifications**

This step is optional and can be skipped. Although notifications can be useful to many business use cases.

You can configure autoscaling groups to send notifications for alarms and scale actions. AWS Auto Scaling groups use Amazon SNS service to push notifications. To read more about the configuring SNS notifications take a look at [https://docs.aws.amazon.com/autoscaling/ec2/userguide/ASGettingNotifications.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html)

* **Configure Tags** This step is optional and can be skipped.
* * Click on **Review** to review your settings and then click on **Create Autoscaling Group** to create the group.

![AutoScale Group created](/_images/installation/server/smautoscaleaws/autoscale-group-created.png)

Once the group is ready it will take a short while for the scaling policy to kick in and automatically create the first Stream Manager instance. The group will work towards maintaining the requested minimum desired capacity at all times. Subsequently, as the load balancer health check completes, the instance is registered as an active `InService` target. You can now access the Stream Manager(s) using the `CNAME`.

**Remove Instances / Stop Auto Scaling**

To remove all instances from a autoscale group, do not manually delete instances from the EC2 console!!. Instead edit the autoscale group and set the minimum & desired instances to zero.The Autoscaling mechanism will automatically remove instance(s) and no new instances will be added.

![Remove Instances From An AutoScale Group](/_images/installation/server/smautoscaleaws/autoscalee-groups-reemove-instances.png)

# 5. Create and initialize your nodegroup

After the autoscale group has created the minimum number of requested instances, you can then use the Stream Manager API to create your nodegroup as described [in the Stream Manager AWS deployment guide](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/api-basics/).

Once your nodegroup is created and the nodes are active, Stream Manager takes care of scaling nodes and replacing failed nodes, whereas AWS Auto Scaling takes care of your scaling Stream Manager and replacing failed Stream Manager instances to maintain desired capacity. This ensures a strong failsafe system for your streaming architecture.

# Updating Stream Manager Image for Autoscaling

When you need to update the stream manager, if you are using AWS Autoscaling, you will need to follow this process:

1. Create a new instance using the current Stream Manager AMI
2. Modify that AMI with the updated release per [this doc](/docs/red5-pro/users-guide/installation/archive/upgrading-stream-manager/upgrading-stream-manager-general/)
3. Create an image from that new instance
4. Create a new [AWS Launch Configuration](https://console.aws.amazon.com/ec2/autoscaling/home?AutoScalingGroups&LaunchConfigurations) - you can choose to **Copy** your existing launch configuration, then change the AMI that is used (in step 1)
5. Modify your [Auto Scaling group](https://console.aws.amazon.com/ec2/autoscaling/home?AutoScalingGroups) - select the group, and choose Actions, edit. Change the Launch Configuration (pull-down) to the new one that you just created.
6. Delete one of the existing stream managers at a time; the group policy will replace each one with the new image.

# Tips and Takeaways

* When creating an Auto Scaling group, subnets should match the load balancer targeted subnets.
* The AWS Load balancer setup should not register any targets initially. The target will be assigned by the Auto Scale group.
* Instance warmup time is the net time taken for the Red5 Pro service to be available over port 5080. This includes the time taken for the VM to start and then the service to start. For Red5 Pro the approximate warmup time with safe buffer can be about `180` seconds.
* If you plan to use WebRTC via Stream Manager, ensure that **Instance Protection** option is set for the Auto Scale group.
* You can leave out `Decrease Group Size` configuration if you dont want scale-in.
* Enable scale-in only when you are **not** going to use WebRTC.
* When configuring scaling policies remember that a scale-in action should be faster & more responsive than a scale-out action. Use this as a rule of thumb when setting metric threshold and monitoring period.
* Never try to manually delete instances of a Auto Scale group. Adjust group settings instead.
* Notifications are optional but a very useful feature to stay on top of your Autoscale Group events.

References:

* [https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html)
* [https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configurations.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/launch-configurations.html)
* [https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html)
* [https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html)
* [https://www.red5pro.com/docs/autoscale/autoscaleaws.html](/docs/red5-pro/users-guide/installation/archive/auto-aws/overview/)
