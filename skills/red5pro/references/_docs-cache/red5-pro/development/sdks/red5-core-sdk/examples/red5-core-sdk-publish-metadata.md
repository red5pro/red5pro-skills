---
title: Red5 Core SDK Examples - Publish Metadata Messages
description: ""
menu_order: 10
---

The Publish Metadata Messages example shows how to send metadata messages while publishing a media stream. It is similar to the [custom source example](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-publish-custom-source-example/), but it generates a video stream with frame numbers embedded in every frame. Additionally, it will send a metadata message with the current frame index. This example shows how sending metadata can be synchronized with media data streaming.

This application is designed to be used together with the [receiving metadata example](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-subscribe-metadata-example/).

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.