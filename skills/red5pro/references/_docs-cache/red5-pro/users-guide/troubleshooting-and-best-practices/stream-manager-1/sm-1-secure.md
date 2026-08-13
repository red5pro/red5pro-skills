---
title: Stream Manager Security
description: ""
menu_order: 6
---

Whether you are supporting mobile SDK RTSP clients or WebRTC clients, you will need the same inbound ports open.

## Inbound Ports

| Port | Description | Protocol |
|---|---|---|
| 5080 | default http access of Red5 Pro; websockets for WebRTC | TCP |
| 443 | https access of Red5 Pro; secure websockets for WebRTC proxy | TCP |

## Outbound Ports

By default with most hosting environments, all outbound ports are open to all, and this is usually acceptable. However, if you wish to tighten security even further, you can restrict access to all of the inbound ports listed above plus `3306` for database connectivity (or whatever alternate port your mySQL database is using).