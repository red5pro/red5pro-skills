---
title: Create Firewall Rules
description: ""
menu_order: 13
---

## Create Firewall Rules for StreamManager

1. From the left-hand navigation of the Digital Ocean dashboard, under the Manage section, choose [Networking, Firewalls](https://cloud.digitalocean.com/networking/firewalls)
2. Click on Create Firewall
3. Give a name to the Firewall
4. Add Inbound Rules for the Red5 Pro ports:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |

## Create Separate Firewall rules for Terraform Server

Repeat the above steps, adding two inbound rules:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 8083 | API access for Terraform service | TCP |