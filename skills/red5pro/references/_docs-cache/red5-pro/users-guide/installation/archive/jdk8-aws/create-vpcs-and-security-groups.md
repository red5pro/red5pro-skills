---
title: 4. Create VPCs and Security Groups
description: ""
menu_order: 5
---

**To be used for Red5 Pro Autoscaling Node Groups**

**Note: you will need to repeat this entire four-step process in every region you wish to include in your autoscaling solution.**

## Create VPC

* Navigate to  the [VPC Dashboard](https://console.aws.amazon.com/vpc/home)
* Click on Start VPC Wizard
* Step 1: Select a VPC Configuration -  Choose the first/default option (VPC with a Single Public Subnet) and click on Select
* Step 2: VPC with a Single Public Subnet - Accept all defaults. Give your VPC a name to identify it.
* Availability zone: choose the first one (you will add the others to this VPC shortly)
    ![createVPC](/_images/installation/server/autoscaleaws/createVPC.png)
* Click on Create VPC

## Modify the Subnet Properties

* From left-hand navigation, under Virtual Private Cloud, choose Subnets
* Chose the subnet that was just created for your VPC
* Click on Subnet Actions, and choose “Modify Auto-Assign Public IP” - add a checkmark in the box, and click on Save
* Click on the Route Table tab for this subnet, and make sure there is an entry for 0.0.0.0/0 - the target should be igw-(*8 alpha-numeric characters*)
* **Make a note of this route table id** - you will need to use it for the other zones that you add to your VPC
    ![routetable](/_images/installation/server/autoscaleaws/routetable.png)

## Add Additional Subnets to the VPC, for Each Zone

**Repeat the following for all zones that are available in the selected region:**

* From the left-hand navigation, under Virtual Private Cloud, choose Subnets
* Click on Create Subnet
* Name Tag: Type in a name tag for your reference
* VPC: choose the VPC you just created
* Availability Zone: choose the next availability zone in your region
* CIDR block: if the first public subnet you created was 10.0.0.0/24, then make this next one 10.0.1.0/24, the next one 10.0.2.0/24, etc.
* Click on Subnet Actions, and choose “Modify Auto-Assign Public IP” - add a checkmark in the box, and click on Save
* Click on the Route Table tab for this new subnet
* Click on Edit
* "Change to:" select the route table id of the first subnet (this will add the igw-xxxxxxxx target to this subnet)
* Click on **Save**

![addzones](/_images/installation/server/autoscaleaws/addzones.png)
![changeroute](/_images/installation/server/autoscaleaws/changeroute.png)

## Create Security Group with Red5 Pro Ports

**IMPORTANT:  The security group name will need to be unique within an individual region, and then repeated across all of the regions you with to include in your autoscaling solution. The stream manager uses the security group name to identify where to create a new node.**

* From left-hand navigation, under Security, choose Security Groups
* Click on Create Security Group
* Fill in the the group name / name tag **to be used across all regions** (this will be the aws.ec2SecurityGroup in the Stream Manager’s red5-web.properties file)
* VPC - select the VPC that you just created.
* Click on Yes, Create
    ![newsecuritygroup](/_images/installation/server/autoscaleaws/newsecuritygroup.png)
* Select the security group you just created, and click on the Inbound Rules tab
* Click on **Edit**
* Add the following ports for Red5 Pro functionality.  Optionally, you can also add port 22 if you wish to be able to SSH into instances (for troubleshooting)
* For source range, type in 0.0.0.0/0 for each of the following ports:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 6262 | websockets for HLS  | TCP |
| *8081* | *websockets for WebRTC (severs earlier than 5.4.0)* | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

**NOTE: As of release 5.4.0, `websockets` automatically use the same ports as http/https as defined in `red5.properties`, so you do not need to open up port 8081.**

* Click **Save** to save the updates

![inboundrules](/_images/installation/server/autoscaleaws/inboundrules.png)