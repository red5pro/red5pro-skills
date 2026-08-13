---
title: Create Virtual Private Cloud(VPC) and Security Groups
menu_order: 4
---

## Create a Virtual Private Cloud (VPC)

* From service, select `VPC`.
* Select region from console, where VPC will be created. Eg: `us-west-1`
* Now click on `Create VPC`.


### Basic VPC information

* Select `VPC and more`.
* VPC Name: `red5pro-autoscaling`.
* VPC IPv4 CIDR block: Eg:`10.0.0.0/16`.
* Tenancy: `Default`
* Select availability zones

> We recommend at least two AZs for high availability.

### Configure VPC Public Subnet

* Specify public subnet IPv4 CIDR block. Eg: `10.0.16.0/20`
* Select at least 1 public subnet in each availability zone (AZ) and ensure that there are a minimum of 2 subnets in total.

* Checkmark the boxes:
    * `Enable DNS hostnames`
    * `Enable DNS resolution`
* Final, click on `Create VPC`.

### Modify the Subnet Properties

* From left-hand navigation, under Virtual Private Cloud, choose Subnets
* Chose the subnet that was just created for your VPC
* Click on Subnet Actions, and choose Edit Subnet, Settings "Modify Auto-Assign Public IP” – add a checkmark in the box, and click on Save

> Please record VPC name and Region to your checklist for the `NODE_VPC_NAME`, `NODE_AWS_REGION` parameters, it will be using in API calls to Stream Manager to create node group config.

Example:![VPC](/_images/red5-pro/users-guide/stream-manager-2.0/installation/aws/awsvpc.png)

## Create Security Groups

We need to have 2 security groups:

1. Security group for Stream Manager instance
2. Security group for Red5 Pro nodes

### Security group for Stream Manager

Go to AWS Console &rarr; VPC Service &rarr; From left-side under Security &rarr; Click `Security Groups`

* Click on `Create security group`
* Name: `red5pro-autoscaling-sm-sg`
* VPC: Select above created VPC Eg: `red5pro-autoscaling`
* Add Inbound Rules:
    * Create separate rules for each ports

| Type | Protocol | Port Range | Source | CIDR Block | Description |
| ------ | ----- | ----------- | -------- | ----- | ----------------- |
| Custom TCP | TCP | 80 | Anywhere IPv4 | 0.0.0.0/0 | HTTP Rule |
| Custom TCP | TCP | 443 | Anywhere IPv4 | 0.0.0.0/0 | HTTPS Rule |
| Custom TCP | TCP | 9092 | Anywhere IPv4 | 0.0.0.0/0 | Kafka Rule |
| Custom TCP | TCP | 80 | Anywhere IPv6 | ::/0 | HTTP Rule |
| Custom TCP | TCP | 443 | Anywhere IPv6 | ::/0 | HTTPS Rule |
| Custom TCP | TCP | 9092 | Anywhere IPv6 | ::/0 | Kafka Rule |

* Add Outbound Rules:
    * Create separate rules for each ports

| Type | Protocol | Port Range | Source | CIDR Block | Description |
| ------ | ----- | ----------- | -------- | ----- | ----------------- |
| All Traffic | ALl | All | Anywhere IPv4 | 0.0.0.0/0 | All Traffic v4 |
| All Traffic | ALl | All | Anywhere IPv6 | ::/0 | All Traffic v6 |

* Now click on `Create security group`

Example: ![Rule](/_images/red5-pro/users-guide/stream-manager-2.0/installation/aws/securitygrouprule.png)

### Security group for Red5 Pro nodes

Go to AWS Console &rarr; VPC Service &rarr; From left-side under Security &rarr; Click `Security Groups`

* Click on `Create security group`
* Name: `red5pro-autoscaling-node-sg`
* VPC: Select above created VPC Eg: `red5pro-autoscaling`
* Add Inbound Rules:
    * Create separate rules for each ports

| Type | Protocol | Port Range | Source | CIDR Block | Description |
| ------ | ----- | ----------- | -------- | ----- | ----------------- |
| Custom TCP | TCP | 5080 | Anywhere IPv4 | 0.0.0.0/0 | 5080 HTTP Rule |
| Custom TCP | TCP | 1935 | Anywhere IPv4 | 0.0.0.0/0 | 1935 HTTP Rule |
| Custom UDP | UDP | 40000-65535 | Anywhere IPv4 | 0.0.0.0/0 | TURN/STUN/ICE |
| Custom TCP | TCP | 5080 | Anywhere IPv6 | ::/0 | 5080 HTTP Rule |
| Custom TCP | TCP | 1935 | Anywhere IPv6 | ::/0 | 1935 HTTP Rule |
| Custom UDP | UDP | 40000-65535 | Anywhere IPv6 | ::/0 | TURN/STUN/ICE |

* Add Outbound Rules:
    * Create separate rules for each ports

| Type | Protocol | Port Range | Source | CIDR Block | Description |
| ------ | ----- | ----------- | -------- | ----- | ----------------- |
| All Traffic | ALl | All | Anywhere IPv4 | 0.0.0.0/0 | All Traffic v4 |
| All Traffic | ALl | All | Anywhere IPv6 | ::/0 | All Traffic v6 |

* Now click on `Create security group`

> Please record Network Securiity Group name for Red5 Pro nodes to your checklist for the `NODE_SECURITY_GROUP` parameter, it will be using in API calls to Stream Manager to create node group config.
