---
title: IP Camera Support
description: ""
menu_order: 3
---

## Transport / Protocol

IP Camera restreaming is an RTSP pull ingest. Red5 Pro connects to the camera, reads the camera SDP, sets up RTP/RTCP over interleaved TCP, and republishes the incoming media as a local Red5 Pro stream. UDP camera transport is not supported in this path.

While IPv4 is the default and thoroughly tested, IPv6 may also function. If MPEG-TS or SRT ingest is required, use the MPEG-TS or SRT restreamer types instead.

## Authentication

The following authentication mechanisms are supported:

* None
* Basic
* Digest - Both RFC2069 and RFC2617 (with exceptions). Algorithm supports include MD5 and SHA-256.

> **Exceptions** to Digest support: the `opaque`, `stale`, and `qop` fields are ignored.

## Codecs

The following codecs are supported:

**Video**

 * H.264 / AVC (`H264` in SDP)
 * H.265 / HEVC (`H265` in SDP)

**Audio**

 * AAC / MPEG-4 (`MPEG4-GENERIC` or `MPEG4` in SDP)
 * G.711 PCMU / PCM u-law (RTP payload type `0`)
 * G.711 PCMA / PCM A-law (RTP payload type `8`)

AAC input is passed through as AAC. G.711 PCMU and PCMA input is decoded and encoded to AAC before it is published into Red5 Pro. If an `application` track is supplied in the SDP, it is ignored.

Video encodings other than `H264` and `H265` are not set up by the IP Camera ingest path. Audio encodings other than AAC, PCMU, and PCMA are ignored.

## Provision Parameters

Use the Restreamer API with `type` set to `ipcam`. The `context` and `name` fields identify the Red5 Pro output stream. The remote camera path can be supplied either as separate `remoteContextPath` and `remoteStreamName` parameters, or as a complete `rtspUrl`.

Use `rtspUrl` when the camera URL includes query-string parameters, embedded credentials, or a vendor-specific path that does not split cleanly into context and stream name fields.

## References

* [RFC2069](https://datatracker.ietf.org/doc/html/rfc2069)
* [RFC2167](https://datatracker.ietf.org/doc/html/rfc2617)
