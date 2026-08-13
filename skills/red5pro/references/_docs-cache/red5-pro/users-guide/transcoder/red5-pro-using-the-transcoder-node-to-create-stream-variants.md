---
title: Using the Transcoder node to create stream variants
description: ""
menu_order: 3
---

Figure 2 provides an overview of the system when using a **transcoder** node. The process works as follows:

1. A provision is provided to the Stream Manager. Specifying the different variants of the stream that will be published. Then, the Stream Manager API is used to request a `transcoder` endpoint.
2. Stream Manager selects a suitable origin and transcoder. The `Origin` is provisioned to expect multiple versions of the stream; the `Transcoder` is provisioned with details of the variants it needs to create.
3. The Stream Manager returns a JSON object with the details of the `transcoder` endpoint that should be used to broadcast.
4. The broadcaster can then start to publishing a single stream to the `transcoder`.

![Figure 2: Overview of the system when a transcoder server is used to generate multiple versions of the same stream.](/_images/special/transcoder/Transcoder2.png)

This document will explain the process that needs to be followed and the API calls involved to deliver an adaptive bitrate video stream.
