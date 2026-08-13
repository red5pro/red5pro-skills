---
title: WebRTC
description: ""
menu_order: 6
---

Red5 Pro WebRTC runs on the standard HTTPS port (443). **To publish via WebRTC with Red5 Pro server you need a valid SSL Certificate for a registered URL.** [Red5 Pro with SSL](/docs/installation/ssl/overview/) walks you through setting up the certificate on your server. Additionally, as with other Red5 Pro server distributions, you will need to install Java (version 11 as of release 9.0.0, or version 8 with any previous server version).

*If you wish to use ports other than `443` for https and `5080` for http with the Red5 Pro Server distribution, and wish to use the accompanying front end, you will need to edit the port values as described [this documentation](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-use-non-standard-ports/)*

If you are running the server without an SSL cert, on your local machine or on a server:

1. You will be able to publish/subscribe locally (between browsers on the machine).
2. You will be able to subscribe to a stream that is being published from localhost (e.g.: `http://localhost:5080/live/broadcast.jsp` from a device within the same network (pointing to the IP address of your machine, not to localhost). To subscribe from a mobile device, either via browser on Android, or via SDK client on iOS or Android, the device must be on the same Wifi network as the desktop.
3. You will **not** be able to publish via a WebRTC client that is not local to the machine.
4. *Note that some browsers have become more strict and will no longer allow insecure WebRTC publishing or subscribing, even on localhost.*

# Common WebRTC Terms

Definitions below are taken from the [webrtcglossary](https://webrtcglossary.com/). Click the links to see the full definitions. You can also find other terms there.

* [DTLS](https://webrtcglossary.com/dtls/) - stands for Datagram Transport Layer Security. Simply put, DTLS is UDP + security.
* [ICE](https://webrtcglossary.com/ice/) - ICE stands for Interactive Connectivity Establishment. It is a standard method of NAT traversal used in WebRTC.
* [NACK](https://webrtcglossary.com/nack/) stands for Negative Acknowledgement. It is one of the error resiliency mechanisms in WebRTC.
* [PLI](https://webrtcglossary.com/pli/) - PLI stands for Picture Loss Indication. It is one of the error resiliency mechanisms in WebRTC. A PLI can be sent when the receiver of the media lost a full frame or more.
* [STUN](https://webrtcglossary.com/stun/) - STUN stands for Session Traversal Utilities for NAT.
* [SDP](https://webrtcglossary.com/sdp/) - SDP stands for Session Description Protocol.
* [TURN](https://webrtcglossary.com/turn/) - TURN stands for Traversal Using Relays around NAT.
* [WebRTC](https://webrtcglossary.com/webrtc/) - WebRTC stands for Web Real Time Communications. It is at the intersection between the internet and telecommunications.
* [WebSocket](https://webrtcglossary.com/websocket/) - WebSocket provides a bidirectional mechanism between web browsers and web servers for sending messages. As opposed to HTTP, where only the client can send a request to the server; WebSocket enables each side in the connection to send messages without any need to wait for past responses.
