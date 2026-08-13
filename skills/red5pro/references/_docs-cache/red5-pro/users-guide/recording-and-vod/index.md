---
title: Recording and VOD
description: ""
menu_order: 100
---

Video-On-Demand (VOD) is a subscriber paradigm wherein users can select a pre-recorded stream to watch if and when they wish to do so. As opposed to live streaming content, VOD content is stored on the streaming server, or on a CDN for on-demand consumption. For example, if you are running an autoscale environment, then you must use [cloud storage](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/red5-pro-cloud-storage-overview/)

> No special configuration changes are required to get VOD working with Red5 Pro. VOD works by default with Red5 Pro.

Setting up video on demand using Red5 Pro is a very simple process. To complete the setup successfully, you will need a few basic components:

1. **Media file**: A video file encoded in a Red5 Pro compatible file format. The format and its content codec need to be compliant with the protocol you choose to stream over.
2. **Red5 Pro media server**: A Red5 Pro server instance deployed online to serve VOD media content to subscribers.
3. **Video Player**: A video player capable of playing your **VOD** stream. To decode media frames being received from the server you will need a compatible video player which understands the protocol that the media is streamed over. Currently Red5 Pro supports VOD over <a href="https://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol" target="_blank">RTMP</a> (desktop) and <a href="https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol" target="_blank">RTSP</a> (mobile), as well as HLS.

With the sunsetting of Flash, if you want browser-based VOD, then you will need to either use an HLS player or convert your recordings to MP4 format using the [orientation post processor](/docs/red5-pro/users-guide/protocols/converting/)
