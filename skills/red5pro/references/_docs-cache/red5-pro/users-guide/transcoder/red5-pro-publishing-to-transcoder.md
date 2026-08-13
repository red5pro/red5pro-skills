---
title: Publishing to the Transcoder
description: ""
menu_order: 4
---

Once the [Provision](/docs/red5-pro/development/api/transcoder/red5-pro-provisioning-transcoder) has been provided to the Stream Manager it is possible to start publishing. It is possible to publish in two different ways:

- Publishing the high level stream variant via WebRTC, RTMP or RTSP to a `transcoder` node, which can create multiple variants.
- Using an RTMP or RTSP media encoder to publish the different variants of the same stream directly to an `origin` node.
