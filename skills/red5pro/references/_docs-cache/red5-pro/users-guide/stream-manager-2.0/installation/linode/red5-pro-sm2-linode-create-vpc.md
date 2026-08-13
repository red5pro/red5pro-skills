---
title: Create Virtual Private Cloud(VPC) and Firewalls
menu_order: 5
---

## Create a Virtual Private Cloud (VPC)

* From the left-hand side of the console click on `VPC`.
* Now click on `Create VPC`.

**Basic VPC information**

* Select region from drop down. Eg: `US, Los Angeles, CA (us-lax)`
* VPC Label: `red5pro-autoscaling-us-lax`.
    > Kindly use region name as suffix for specifying label to VPC. Eg: `<VPC_LABEL>-<VPC_REGION>`.
* VPC Description: Provied brief description to VPC (Optional).

**Configure VPC Private Subnet**

* Subnet Label: `red5pro-autoscaling-subnet`.
* IPv4 CIDR block: `10.1.0.0/24`.
    * > If want to create multiple subnets, click on `Add Another Subnet` and specify CIDR and label.

* Final, click on `Create VPC`.

> Please record Subnet name and Region to your checklist for the `NODE_SUBNET_NAME`, `NODE_LINODE_REGION` parameters, it will be using in API calls to Stream Manager to create node group config.

Example:![VPC](/_images/red5-pro/users-guide/stream-manager-2.0/installation/linode/linodevpc.png)

## Create Firewalls

We need to have 2 firewall rules:

1. Firewall for Stream Manager instance
2. Firewall for Red5 Pro nodes

### Firewall for Stream Manager

Go to Linode Console &rarr; Firewalls &rarr; Click on `Create Firewall`

* Label: `red5pro-autoscaling-sm-sg` (Must be between 3 and 32 characters in length)
* Default Inbound Policy: `Accept`
* Default Outbound Policy: `Accept`
* Final click on `Create Firewall`
* Add Inbound Rules:  Linode Console &rarr; Firewalls &rarr; Select created firewall &rarr; Click on `Add Inbound Rule`
    * Create separate rules for each ports


| Preset | Label | Description | Protocol | Ports | Custom Port Range | Sources | Action |
| ------ | ----- | ----------- | -------- | ----- | ----------------- | ------- | ------ |
| Empty | http-rule | HTTP | TCP | Custom | 80 | All IPv4, All IPv6 | Accept |
| Empty | https-rule | HTTPS | TCP | Custom | 443 | All IPv4, All IPv6 | Accept |
| Empty | kafka-rule | KAFKA | TCP | Custom | 9092 | All IPv4, All IPv6 | Accept |

Example: ![Rule](/_images/red5-pro/users-guide/stream-manager-2.0/installation/linode/securitygrouprule.png)

### Security group for Red5 Pro nodes

Go to Linode Console &rarr; Firewalls &rarr; Click on `Create Firewall`

* Label: `red5pro-autoscaling-node-sg` (Must be between 3 and 32 characters in length)
* Default Inbound Policy: `Accept`
* Default Outbound Policy: `Accept`
* Final click on `Create Firewall`
* Add Inbound Rules:  Linode Console &rarr; Firewalls &rarr; Select created firewall &rarr; Click on `Add Inbound Rule`
    * Create separate rules for each ports


| Preset | Label | Description | Protocol | Ports | Custom Port Range | Sources | Action |
| ------ | ----- | ----------- | -------- | ----- | ----------------- | ------- | ------ |
| Empty | http-rule | HTTP | TCP | Custom | 5080 | All IPv4, All IPv6 | Accept |
| Empty | rtmp-rule | RTMP | TCP | Custom | 1935 | All IPv4, All IPv6 | Accept |
| Empty | udp-rule | TURN/STUN/ICE | UDP | Custom | 40000-65535 | All IPv4, All IPv6 | Accept |

> Please record Network Securiity Group name for Red5 Pro nodes to your checklist for the `NODE_SECURITY_GROUP` parameter, it will be using in API calls to Stream Manager to create node group config.
