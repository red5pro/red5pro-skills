---
title: Create Firewall Rules
description: ""
menu_order: 12
---

## Create Firewall Rules for StreamManager

From the left-hand navigation of the Linode dashboard, under the Manage section, choose Firewalls and click Create Firewall by adding a label and assigning the Linode instance.

![personalaccesstoken2](/_images/installation/server/linode/firewall01.png)

## Firewall Rules for StreamManager and nodes


| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |
| 80 | Required if using Letsencrypt to generate SSL certificate | TCP |
| 1935 | RTMP | TCP |
| 8554 | RTSP | TCP |
| 40000-65535 | STUN/TURN/ICE for WebRTC | UDP |

## Firewall rules for Terraform Server

Repeat the above steps, adding two inbound rules:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 8083 | API access for Terraform service | TCP |

## Firewall rules for MySQL Instance

Repeat the above steps, adding two inbound rules:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 3306 | Default MySQL Port | TCP |