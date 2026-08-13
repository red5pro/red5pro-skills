---
title: 5. Create Virtual Networks and Network Security Groups
description: ""
menu_order: 8
---

> **Note: you will need to repeat this entire four-step process in every region you wish to include in your autoscaling solution. Follow the recommended naming convention to create regional resources.**

## Create Virtual Network

A virtual network is a logical separation of the actual network for operational, security and management purpose. Virtual networks are location-based resources. Thus we need to create a virtual network in each region that we wish to target with autoscaling. Each virtual network can have one or more subnets. For our purpose a single subnet is sufficient.

**To create a virtual network:**

* Navigate to [Virtual Networks](https://portal.azure.com/#blade/HubsExtension/Resources/resourceType/Microsoft.Network%2FvirtualNetworks) in the left pane in your Azure portal dashboard and click on **+Add**.
* Fill in the Virtual network information in the form shown, following the  naming convention mentioned earlier to help Stream Manager locate resources across regions easily - `<prefix>-<region>-vnet`.

> If you do not know the region name you can use the following azure CLI command:
`az account list-locations`

### Avaliable regions at the time of this publication

* eastasia
* southeastasia
* centralus
* eastus
* eastus2
* westus
* northcentralus
* southcentralus
* northeurope
* westeurope
* japanwest
* japaneast
* brazilsouth
* australiaeast
* australiasoutheast
* southindia
* centralindia
* westindia
* canadacentral
* canadaeast
* uksouth
* ukwest
* westcentralus
* westus2
* koreacentral
* koreasouth

**The following creates a virtual network called `red5proautoscaling-eastus-vnet` in `eastus` region, in the `red5proautoscaling` master resource group**

* **Name**: Fill in the name of the virtual network as `red5proautoscaling-eastus-vnet`
* **Address Space**: Leave the settings to default. If no default exists, define a address space such as `10.0.0.0/16`.For more info checkout the [Virtual Networks FAQ page](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq).
* **Subscription**: Select your subscription (Use the same subscription that is used for AD access authentication)
* **Resource Group**: Select **Use existing** then select our **master** autoscaling resource group created  previously from the drop down.
* **Location**: Select the region where the virtual network will be created
* **Subnet**
  * **Name**: Leave it to default
  * **Address Range**: Leave it to default setting. If no default exists, specify address space for subnets manually such as `10.0.0.0/24`.For more info checkout the [Virtual Networks FAQ page](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq).
* **Service endpoints**: Disabled

Click **Create** to create the virtual network. It takes a few seconds to create the resource. You can refresh the page to see updated list of **Virtual Networks**.

![New Virtual Network](/_images/installation/server/autoscaleazure/create-new-virtual-network-useast.png)

![New Virtual Network Created](/_images/installation/server/autoscaleazure/create-new-virtual-network-useast-created.png)

> Currently Red5 Pro autoscaling on Azure supports a single subnet. This subnet **must** be named **default**.

## Create Network Security Group For Nodes

A network security group defines the firewall rules for a Virtual machines running in a virtual network. An Azure network security group is similar to a AWS security group in many aspects.

Similar to the Virtual Network, the Network Security Group is also a regional resource. Meaning that you need to create a security group for each region that you wish to target with autoscaling.

A network security group defines inbound and outbound rules with port and protocol combinations. Additionally Azure allows you to specify the importance of the rule with a rank number. A lower rank implies that the rule is more important than others. There should be a difference between jump of ranks.

**To create a network security group**:

* Navigate to [Network Security Groups](https://portal.azure.com/#blade/HubsExtension/Resources/resourceType/Microsoft.Network%2FNetworkSecurityGroups).

* If upon selecting the **Network Security Group** item you see a new window,  select a deployment model, select **Resource manager** and click **Create**.
* Click on **+Add**, and fill in the basic necessary details of the **Network Security Group**:
  * **Name**: Fill in the name of the security group as `red5proautoscaling-eastus-nsg`.
  * **Subscription**: Select your subscription (Use the same subscription that is used for AD access authentication)
  * **Resource Group**: Select **Use existing** then select our **master** resource group created previously.
  * **Location**: Select the region where the virtual network will be created (USEAST for example).
* Click **Create** to create the Network Security Group. It takes a few seconds to create the resource. You can refresh the page to see updated list of **Network Security Groups** or you can check out your resource group content from the **Resource Group** menu item.

Once the resource is ready, click on your Network Resource Group. Select **Inbound Security Rules** from the left and **+Add** Red5 Pro ports rules as shown below. Note that there are three network rules by default. Our new rules are meant to have higher priority than the default ones.

* Add the following ports. You can either add each port as an individual rule, or add one comma-separated list for all of the TCP ports, and one rule for the UDP port range. Source/destination for each should be **Any**; Source port range should be `*`:

| Priority | Port | Description | Protocol |
|---|---|---|---|
| 100 | 22 | SSH Access | TCP |
| 200 | 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 300 | 1935 | default Red5 Pro RTMP port | TCP |
| 400 | 8554 | default RTSP port | TCP |
| 500 | 6262 | websockets for HLS  | TCP |
| 600 | *8081* | *websockets for WebRTC (severs earlier than 5.4.0)* | TCP |
| 700 | 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

**NOTE: As of release 5.4.0, `websockets` automatically use the same ports as http/https as defined in `red5.properties`, so you do not need to open up ports 8081.**

![Inbound Rules List](/_images/installation/server/autoscaleazure/inboundrulescsv.png)

![Network Security Group inbound rules](/_images/installation/server/autoscaleazure/create-new-network-security-group-inbound-rules-complete.png)

* Next, select **Outbound Security Rules** and create a rule to allow all traffic as shown below. Note that there are three network rules by default. Our new rules are meant to have higher priority than the default ones.

![Network Security Group outbound rules](/_images/installation/server/autoscaleazure/create-new-network-security-group-outbound-rules-complete.png)

## Create Network Security Group For Stream Manager

Similar to the nodes, streammanager requires its own network security group with required ports configured.However it should still reside in the same master resource group as the other autoscale resources.

**Network Security Group for streammanager should be named as `streammanager-<region>-nsg` or `streammanager01-<region>-nsg`**

* Add the following ports. You can either add each port as an individual rule, or add one comma-separated list for all of the TCP ports, and one rule for the UDP port range. Source/destination for each should be **Any**; Source port range should be `*`:

| Priority | Port | Description | Protocol |
|---|---|---|---|
| 100 | 22 | SSH Access | TCP |
| 200 | 5080 | default web access of Red5 Pro; websockets for WebRTC / Stream Manager | TCP |
| 300 | 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |

**NOTE: As of release 5.4.0, `websockets` automatically use the same ports as http/https as defined in `red5.properties`, so you do not need to open up ports 8081/8083.**

* Next, select **Outbound Security Rules** and create a rule to allow all traffic as above.

>You need to repeat the above steps for each region that you wish to target. This will allow you to run Red5 Pro VMs across regions.