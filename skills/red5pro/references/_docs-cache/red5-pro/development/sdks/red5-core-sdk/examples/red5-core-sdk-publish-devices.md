---
title: Red5 Core SDK Examples - Simple Publish
description: ""
menu_order: 6
---

The Simple publish example shows how to use `r5::device` for publishing a stream using data from the camera and microphone. The application will get the first camera and microphone from the set provided by `r5::device`, and use it to initialize streams in the client object.

NOTE: The application will fail if no camera or microphone is available for publishing

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.