---
title: Add Network Security Groups
description: ""
menu_order: 5
---

In creating the optimized disk image with the previous step, we added a new Virtual Cloud Network (VCN) and subnet. We will create two network security groups from there: one for the stream managers, and one for the nodes.

1 - Navigate to [Networking, Virtual Cloud Networks](https://cloud.oracle.com/networking/vcns) and click on the VCN that you created (note: if you have multiple compartments make sure you are in the correct one).
![vcn](/_images/installation/autooci/vcn01.png)

2 - From the left-hand *Resources* list, click on **Network Security Groups** ![vcn-resources](/_images/installation/autooci/vcn-resources.png)

3 - Click on **Create Network Security Group**, and give the node-security group a name (record the name in your checklist for the `cloud.oracle_network_security_group` value), then click on **Next**

4 - Add an `Egress` rule, destination type = CIDR, destination CIDR = `0.0.0.0/0` for all protocols. Then add `Ingress` rules, source type = CIDR, source CIDR = `0.0.0.0/0`, for the Red5 Pro required destination ports:

| Port | Description | Protocol |
|---|---|---|
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

![network-security](/_images/installation/autooci/nsg-rules.png)

5 - Create a second network security group for your stream manager(s) with the following ports open:

| Port | Description | Protocol |
|---|---|---|
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 80 | default HTTP (required if using Let's Encrypt for SSL cert) | TCP |
| 443 | default HTTPS port | TCP |

## Security Lists

Navigate back to the VCN and select **Security Lists** from the left-hand *Resources* menu. 

* SSH access is allowed through the **Default Security List** for your VNC. If you want to restrict SSH access then you can change the source from the default `0.0.0.0/0`.
* You will also need to add port **3306** for MySQL access. You can set the source to `0.0.0.0/0` since the database will only have a private IP, and thus can only be accessed via servers in the same subnet. If you want to, you can modify this access to included only the stream manager and terraform servers.

![security-list](/_images/installation/autooci/security-list.png)