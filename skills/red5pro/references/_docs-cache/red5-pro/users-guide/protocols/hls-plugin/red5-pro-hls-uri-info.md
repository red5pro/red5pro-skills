---
title: HLS URI Info
description: ""
menu_order: 2
---

**Every live stream is transformed to HLS**

The URI of an HLS stream mimics the context path of the publisher stream.

For example, the publisher with a stream consumable at the URI `rtmp://serverurl/live/streamName` will be also playable at `https://serverurl/live/streamName.m3u8`, by a browser that supports native HLS playback (like Safari) or a third-party player like VLC.
