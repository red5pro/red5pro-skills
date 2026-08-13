---
title: AWS Wavelength - 5G Zones - Support
description: ""
---

<!--With the <version> release, Red5 Pro supports autoscaling using the [AWS Wavelength Zones](https://aws.amazon.com/wavelength/), which allows clients to take advantage of 5G networks directly.-->

In order to take advantage of AWS Wavelength zones, you will first need to opt-in to Wavelength Zones using the console (from [this document](https://aws.amazon.com/wavelength/getting-started/)):

1. *Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/.*
2. *Use the Region selector in the navigation bar and select the Region which supports your Wavelength Zone.*
3. *On the navigation pane, choose EC2 Dashboard.*
4. *Under Account Attributes, Settings, choose Zones.*
5. *Under Zone Groups, turn on the Wavelength Zones by clicking the “Manage” button.*
6. *In the Enable confirmation dialog box, enter Enable, and then choose OK.*

The stream manager will reside in the Public Zone, while the nodes are created in the Wavelength zone (and the public zones as well if desired).

# Create VPC with Wavelength Zone Support

In order to use Wavelength zones, you must create a VPC subnet that includes a Wavelength zone. **NOTE: You can only have one Wavelength zone subnet per VPC**. Because of this restriction, if you wish to support multiple Wavelength Zones within us-west-2, for example, you will need a separate VPC for each.

Keep the following in mind when creating your VPCs: **CIDR ranges between peered VPCs can not overlap. So, for example, if VPC-One’s CIDR range is 10.0.0.0/16 then VPC-two’s CIDR range can be 10.1.0.0/16 (but not 10.0.0.0/16)**

At the time of this documentation (September 2021), AWS Wavelength Zones are available in the following regions:

us-east-1:

* Boston: us-east-1-wl1-bos-wlz-1
* Atlanta: us-east-1-wl1-atl-wlz-1
* Washington DC: us-east-1-wl1-was-wlz-1
* New York City: us-east-1-wl1-nyc-wlz-1
* Miami: us-east-1-wl1-mia-wlz-1
* Dallas: us-east-1-wl1-dfw-wlz-1
* Houston: us-east-1-wl1-iah-wlz-1
* Chicago: us-east-1-wl1-chi-wlz-1

us-west-2:

* San Francisco Bay Area: us-west-2-wl1-sfo-wlz-1
* Las Vegas: us-west-2-wl1-las-wlz-1
* Denver: us-west-2-wl1-den-wlz-1
* Seattle: us-west-2-wl1-sea-wlz-1
* Phoenix: us-west-2-wl1-phx-wlz-1

### Create VPC

Start by adding a VPC with a single public subnet. Navigate to the [VPC Dashboard](https://console.aws.amazon.com/vpc/home). From the **VPC Wizard** choose **VPC with a Single Public Subnet**. Choose an availability zone that is *not* in a Wavelength zone, then click **Create VPC**.

#### New VPC Wizard

Create a VPC with public subnets only across all availability zones.

![wlz-01](/_images/installation/server/awswavelength/wlz-new-wiz01.png)
![wlz-01](/_images/installation/server/awswavelength/wlz-new-wiz02.png)
![wlz-01](/_images/installation/server/awswavelength/wlz-new-wiz-preview.png)

### Modify Public Subnet Settings

From the left-hand navigation, choose [Subnets](https://console.aws.amazon.com/vpc/home#subnets:), select each public subnet that was generated with the initial VPC creation, click on Actions, select **Edit subnet settings**, and add a check to "Enable auto-assign public IP4 address".

![wlz06-auto](/_images/installation/server/awswavelength/wlz06-auto.png)

### Create Carrier Gateway

Create a Carrier Gateway and associate it with your VPC. From the left-hand navigation, choose [Carrier Gateways](https://console.aws.amazon.com/vpc/home#CarrierGateways:), and click on **Create carrier gateway.** Give the gateway a name and associate it with your VPC.

![wlz02-cgw](/_images/installation/server/awswavelength/wlz02-cgw.png)

### Create Route Table

Create a Route Table for the Carrier Gateway. From the left-hand navigation, choose [Route Tables](https://console.aws.amazon.com/vpc/home#RouteTables:), and click on **Create Route Table**. Name and associate the route table with your VPC.

![wlz03-rte](/_images/installation/server/awswavelength/wlz03-rte.png)

After the route table is created, click on Edit routes. Click on Add route. Destination will be `0.0.0.0/0` (public IP4); Target will be **Carrier Gateway** - when you select that option, the Carrier Gateway that you set up should be automatically selected.

![wlz04-rte](/_images/installation/server/awswavelength/wlz04-rte.png)

### Create Wavelength-Zone Subnet

Create a new Wavelength zone subnet. From the left-hand navigation, choose [Subnets](https://console.aws.amazon.com/vpc/home#subnets:) and click on **Create subnet**. Choose the VPC that you created above. For the Availability zone, choose one of the `Verizon` zones. For the CIDR block, increment accordingly (for example, if the VPC CIDR is 10.0.0.0/16, and the initial subnet CIDR is 10.0.0.0/24, then this subnet should use the 10.0.1.0/24 for its CIDR). Click on **Create subnet**.

![wlz05-subnet](/_images/installation/server/awswavelength/wlz05-subnet.png)

You will then need to **Edit the route table association**, and choose the Carrier Gateway route table you created above.

## VPC Peering

If you wish to support multiple Wavelength zones, you will need to set up VPC Peering between all of your VPCs because all Wavelength cluster communication must happen over the private IPs.

**IMPORTANT: CIDR ranges between peered VPCs can not overlap. So, for example, if VPC-One’s CIDR range is 10.0.0.0/16 then VPC-two’s CIDR range can be 10.1.0.0/16 (but not 10.0.0.0/16)**

1. From the VPC services page, left-side menu, select Peering Connections (you will need the VPC ID which you want to set up peering connections)
2. Click on Create peering connection
3. Name - optional, but recommended for tracking purposes
4. Select the local VPC to peer with (VPC-One)
5. Select another VPC to peer with (enter the VPC ID of VPC-Two)
6. Create a peering connection
7. Go to the management page for VPC-Two and accept the peering request (it will take a couple of minutes for peering to be established)
8. After peering is established, you will need to add the peering connection for your carrier and internet gateway routes (note: you will need to do this for all subnets VPC-One and VPC-Two
9. From the VPC services page, left-side menu, select Route Tables
10. Select the route table that you are going to edit
11. Click on Edit routes
12. Click on Add route
13. For Destination, type in the CIDR range of the VPC that you just set up peering with. For example - if VPC-Two’s CIDR range was `10.1.0.0/16`, then use that for the destination from your VPC-One subnets
14. For Target, choose the Peering Connection that you just created, then click on Save changes

example:
![vpcpeering-route](/_images/installation/server/awswavelength/vpcpeering-route.png)

## Autoscale Structure with Wavelength Support

For VPC-1 which includes `public-subnet-west2a` and `wavelength-subnet-wl1-phx-wlz`:

* Your Stream Manager and database will live in `public-subnet-west2a`.
* Your nodes will be created in the Wavelength zone and/or the public zone, per your scale policy.


## Create Security Group with Red5 Pro Ports

**IMPORTANT:  The security group name will need to be unique within an individual region, and then repeated across all of the regions you wish to include in your autoscaling solution. The stream manager uses the security group name to identify where to create a new node.**

* From left-hand navigation, under Security, choose Security Groups
* Click on Create Security Group
* Fill in the the group name/name tag **to be used across all regions** (this will be the aws.ec2SecurityGroup in the Stream Manager’s red5-web.properties file)
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
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

* Click **Save** to save the updates
