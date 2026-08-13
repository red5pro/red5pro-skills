---
title:  Autoscale Nodes
description: ""
menu_order: 4
---

## Ports Required For Red5 Pro Mobile SDK Clients Only (RTSP)

**Inbound Ports**

| Port | Description | Protocol |
|---|---|---|
| 5080 | default web access of Red5 Pro; communication with Nodes | TCP |
| 1935 | default Red5 Pro RTMP port; also used for clustering communication | TCP |
| 8554 | default RTSP (mobile) port | TCP |

## Ports Required For WebRTC, HLS and RTMP

**Inbound Ports**

| Port | Description | Protocol |
|---|---|---|
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

> Note that the RTSP port (`8554`) is necessary for some intra-node communication, even if you are not supporting RTSP clients in your environment

## Outbound Ports

By default with most hosting environments, all outbound ports are open to all, and this is usually acceptable. However, if you wish to tighten security even further, you can restrict access to all of the inbound ports listed above.

## Server-side Security

### Removing WebApp JSP Pages

By default, the Red5 Pro server is distributed with webapps for testing and development. When you go to production, you may want to delete the following to ensure that no one can access the webapps if they were to get the IP address of your server.

First, remove any unused webapps. The only required webapps are `root`, and `live` (or your custom webapp).

Secondly, you can remove all of the `.jsp` and `.html` pages from the `red5pro/webapps/live` directory"

* broadcast.jsp
* index.jsp
* playback.jsp
* sdp.jsp
* streams.jsp
* subscribe.jsp
* twoway.jsp
* viewer-vod.jsp
* viewer.jsp
* basic-publisher.html
* proxy-publisher.html
* proxy-screenshare.html
* proxy-subscriber.html
* sm-proxy-usage.html
* wsonly-publisher.html

You can also remove the following `.jsp` pages from `red5pro/webapps/root` directory:

* license.jsp
* index.jsp


### Basic Realm Authentication

For instructions on using simple HTTP Basic Realm Authentication. This is another level of web-based authentication that requires a password for accessing the webapps that are modified.
