---
title: Red5 Core SDK Examples - Publish container
description: ""
menu_order: 7
---

The Publish container example shows how to use `r5::core` for publishing a stream using data from a media container file like mp4, mpeg2ts, etc. The Core SDK will try to publish streams as-is, without transcoding if possible if the video is encoded to h264 and audio to aac. Otherwise, it will create a transcoder to generate a stream that can be published.

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.