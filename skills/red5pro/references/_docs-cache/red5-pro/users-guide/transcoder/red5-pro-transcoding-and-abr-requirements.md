---
title: Transcoding and ABR Requirements
description: ""
menu_order: 2
---

Red5 Pro Autoscaling solution and Stream Manager API is required for transcoding and an Adaptive Bitrate subscriber experience. A valid Startup Pro, Growth Pro, or Enterprise Server license is required. Autoscaling is not supported on Trial or Developer Pro licenses.

## Transcoding Requirements

Transcoding a high-quality stream into lower resolution variants requires a nodegroup with at least one transcoder, origin and edge server. Transcoding requires more CPU than straight publishing, so you may want to deploy your transcoder on a larger instance type, depending on how many concurrent broadcasters you 

## ABR Requirements

Adaptive Bitrate subscribing is supported by:

- Red5 Pro Server v6.0.0 or higher
- Red5 Pro WebRTC SDK v5.0.0 or higher
- Red5 Pro Mobile SDK v6.0.0 or higher
