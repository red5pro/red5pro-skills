---
title: Subscribing to a Transcoded Stream
description: ""
menu_order: 11
---

With a provision available from the Stream Manager and multiple variant broadcasts being streamed (either through using a media encoder or the transcoder) it is possible to subscribe to an adaptive bitrate stream. When a client subscribes it receives the stream variant with the highest quality given its network conditions. This is achieved by having the edge interact with the subscriber client. In particular, the edge and subscriber will use an RTCP message called Receiver Estimated Maximum Bitrate (REMB) to provide a bandwidth estimation. Then, the edge will use the bandwidth estimation to make the corresponding adjustments to video quality.  In particular, the edge will deliver the video with the highest quality given the estimated bandwidth.

Important: it is the communication between the client and the server that will prompt ABR to shift up or down between variants. If the client attempts to subscribe to a stream with a bitrate that their network can't support at all then the server won't be able to get the information required to drop to a lower variant. As such, it is recommended that you target the *lowest* variant for your subscribers.

> For more information about tuning ABR for a WebRTC subscriber, see [this page](/docs/red5-pro/users-guide/protocols/webrtc/red5-pro-webrtc-plugin-properties-file/#webrtc-abr-settings). 
