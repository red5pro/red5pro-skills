---
title: Core SDK Examples - Custom Renderer
description: ""
menu_order: 13
---

The Custom Renderer example shows how to implement the `ISingleRenderer` to store received raw audio/video into a file.

`RawDataRenderer` provides a unified way to handle received data. The main difference is in the initialization media description in the constructor. After creating a new client object we should set up available renderers. To do this, we call the `AddStream` method with two new `RawDataRenderer` objects. The first one will handle received video data, the second will handle audio.

Note that each `ISingleRenderer` object can receive only one media stream, so you need to provide a separate object for each data type you need to handle.

Also, note that this example requires a live stream running on a Red5 Pro server.

---
