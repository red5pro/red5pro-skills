---
title: Publishing ABR variants from an RTMP Encoder
description: ""
menu_order: 10
---

Figure 1 shows an overview of the system when different variants of the same stream are published using a **media encoder**, such as Wirecast or FMLE, which can publish multiple profiles of the same stream. The process works as follows:

1. A provision is provided to the stream manager to specify the different variants of the stream that will be published.
2. The stream manager selects a suitable `origin` and provisions it to expect multiple versions of the same stream.
3. The stream manager returns a JSON object with the details of the `origin` endpoint that should be used to broadcast.
4. The broadcaster can then use its media encoder to publish to the `origin`.

![Figure 1: Overview of the system when a media encoder is used to publish multiple versions of a stream.](/_images/special/transcoder/TranscoderDoc1.png)
