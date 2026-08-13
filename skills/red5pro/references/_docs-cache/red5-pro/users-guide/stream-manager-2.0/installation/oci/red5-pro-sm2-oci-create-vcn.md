---
title: Create Virtual Cloud Network (VCN) and Security Groups
menu_order: 4
---

## Create a Virtual Cloud Network (VCN)

Go to OCI Networking &rarr; Virtual cloud networks

* Push button `VCN Wizard`
* Choose `Create VCN with Internet Connectivity`

**Basic information**

* VCN Name: `red5pro-autoscaling`
* Compartment: `<choose compartment>`

**Configure VCN**

* VCN IPv4 CIDR block: `10.0.0.0/16`
* IPv6 prefixes: `disable`
* Use DNS hostnames in this VCN: `disable`

**Configure public subnet**

* IPv4 CIDR block: `10.0.0.0/24`

**Configure private subnet**

* IPv4 CIDR block: `10.1.0.0/24`

> It will create automatically VCN, Subnets, Route table, Internet Gateway and default Security lists.
> Please record Subnet name to your checklist for the `NODE_SUBNET_NAME` parameter, it will be using in API calls to Stream Manager to create node group config.

## Create Network Security Groups

We need to have 2 security groups:

1. Security group for Stream Manager instance
2. Security group for Red5 Pro nodes

### Security group for Stream Manager

Go to OCI Networking &rarr; Virtual cloud networks &rarr; select the newly created VCN &rarr; Network Securiity Groups

* Create Network Securiity Group
* Name: `red5pro-autoscaling-sm-sg`
* Create In Compartment: `<choose the same compartment as for VCN>`
* Create Rules to open Ingress ports for Stream Manager 2.0 instance

| Direction | Source Type | Source | IP protocol | Source Port Range | Destination Port Range | Description |
| --------- | ----------- | ------ | ----------- | ----------------- | ---------------------- | ----------- |
| Ingress | CIDR | 0.0.0.0/0 | TCP | empty | 80 | HTTP |
| Ingress | CIDR | 0.0.0.0/0 | TCP | empty | 443 | HTTPS |
| Ingress | CIDR | 0.0.0.0/0 | TCP | empty | 9092 | Kafka |

Example:![Rule](/_images/red5-pro/users-guide/stream-manager-2.0/installation/oci/security-group-rule.png)

### Security group for Red5 Pro nodes

* Create Network Securiity Group
* Name: `red5pro-autoscaling-node-sg`
* Create In Compartment: `<choose the same compartment as for VCN>`
* Create Rules to open Ingress ports for Red5 Pro nodes

| Direction | Source Type | Source | IP protocol | Source Port Range | Destination Port Range | Description |
| --------- | ----------- | ------ | ----------- | ----------------- | ---------------------- | ----------- |
| Ingress | CIDR | 0.0.0.0/0 | TCP | empty | 5080 | HTTP |
| Ingress | CIDR | 0.0.0.0/0 | TCP | empty | 1935 | RTMP |
| Ingress | CIDR | 0.0.0.0/0 | TCP | empty | 8554 | RTSP |
| Ingress | CIDR | 0.0.0.0/0 | UDP | empty | 40000-65535 | TURN/STUN/ICE port range for WebRTC |

> Please record Network Securiity Group name for Red5 Pro nodes to your checklist for the `NODE_SECURITY_GROUP` parameter, it will be using in API calls to Stream Manager to create node group config.

