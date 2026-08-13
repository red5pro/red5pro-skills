---
title: RTSP
description: ""
menu_order: 4
---

Real Time Streaming Protocol (RTSP) is a network control protocol designed for use in streaming media servers. Most RTSP servers use the Real-time Transport Protocol (RTP) in conjunction with Real-time Control Protocol (RTCP) for media stream delivery. However, some vendors implement proprietary transport protocols.

The Red5 Pro iOS and Android Mobile SDKs use RTSP for streaming.

Red5 Pro also supports RTSP pull ingest through the [IP Camera Restreamer](/docs/red5-pro/users-guide/restreamer/red5-pro-restreamer-ip-cameras/). That path is configured with Restreamer provisions using `type: "ipcam"` and is intended for RTSP camera sources. It supports RTP/RTCP over interleaved TCP, H.264 and H.265 video, and AAC, PCMU, or PCMA audio.
