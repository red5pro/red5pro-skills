---
title: Stream Manager Proxy
description: Set Up Stream Manager as SSL Proxy (for publishing/subscribing via WebRTC)
menu_order: 1
---

[WebRTC](/docs/protocols/webrtc/overview/) publishing requires a valid SSL certificate. Because of the nature of autoscaling, it is impractical to install an SSL certificate on each origin server.

>*the problem:*

![proxy01](/_images/installation/server/autoscalesmproxy/R5P_DOMAINISSUE.png)

To address this, we have implemented the option of using the Stream Manager as an SSL proxy for WebRTC. The proxy communication layer allows for publishing and subscribing using secure WebSockets via the Stream Manager.

>*the solution:*

![proxy02](/_images/installation/server/autoscalesmproxy/R5P_SINGLEDOMAINCERTPROXYSOLUTION.png)

# Proxy Handoff

The Stream Manager uses websockets to establish a connection to the remote server internally. Once the user is connected to the Stream Manager WebSocket channel, the proxy channel is said to be **established**. 

The WebSocket layer is primarily used for relaying ICE Candidates, SDP, Status and Error messages between the browser client and the Red5 Pro node (edge/origin).

With the addition of datachannel hand-off support, the proxy connection between the stream manager and the client is severed and the datachannel persists the stream connection.

<!-- ![proxy02](/_images/installation/server/autoscalesmproxy/R5P_WEBRTC_Proxy.png) -->