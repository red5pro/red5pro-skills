---
title: RTMP and ERTMP
description: ""
menu_order: 3
---

Real-Time Messaging Protocol (RTMP) and Enhanced Real-Time Messaging Protocol (ERTMP) are TCP-based communication protocols for streaming audio, video and data over the Internet. RTMP was originally developed as a protocol for streaming via Flash, and is used by Red5 open source. In version 14.0 of Red5 Pro, ERTMP v2 was introduced adding additional features to the legacy protocol. ERTMP allows for the use of additional codecs such as H.265 and extends the life of the protocol. ERTMP enhances the RTMP protocol in Red5 Pro and is backwards compatible with RTMP.

## Enhanced Codec Signaling

Legacy RTMP identifies common codecs with the FLV codec ID in the video tag header. ERTMP adds enhanced video signaling where the codec is identified by a FourCC value in the packet body.

Red5 Pro recognizes enhanced video FourCC values such as `hvc1` for H.265/HEVC and `av01` for AV1 when determining the stream video codec. H.264/AVC remains supported through the legacy AVC packet format.

For H.265/HEVC publishing and playback details, see [H.265 Encoding and Playback](/docs/red5-pro/users-guide/codecs/red5-pro-h265-encoding-and-playback/).
