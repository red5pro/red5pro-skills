---
title: Security Recommendations
description: ""
menu_order: 8
---

It is recommended that separate firewalls or security groups be created as follows for inbound connections:

## Stream Manager Security

| Port | Description | Protocol | Access |
|---|---|---|---|
| 22 | SSH | TCP | IP addresses of server admins |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP | for node communication |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC | TCP | all external API calls |


## Database Security

| Port | Description | Protocol | Access |
|---|---|---|---|
| 3306 | default MySQL | TCP | stream manager IPs and dbadmin IP |

* note: if you are using a hosted MySQL database on Digital Ocean, the port is `25060`

## Nodes Security

| Port | Description | Protocol | Access |
|---|---|---|---|
| 22 | SSH | TCP | IP addresses of server admins |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP | all incoming |
| 1935 | default Red5 Pro RTMP port | TCP | all incoming |
| 8554 | default RTSP port | TCP | all incoming |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP | all incoming |

---

For more details on Autoscale communication and security, see [this doc](/docs/red5-pro/users-guide/troubleshooting-and-best-practices/stream-manager-1/sm-1-security-overview/)