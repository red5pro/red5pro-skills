---
title: HLS
description: ""
menu_order: 2
---

Note that HLS latency is generally between 12 and 30 seconds, so you will not be able to view your live video right away.

**Red5 Pro HLS Supports h264 and AAC broadcasts**

The HLS plugin `{red5pro}/plugins/red5pro-mpegts-plugin-*.jar` takes live streams from any application and transforms them into an MPEG live transport stream with an m3u8 playlist.

The HLS playlist represents a sliding window containing several short segments of media which play as one continuous stream. Red5 Pro passes through the media as-is without re-encoding or producing multi-bitrate variants.

> **If you do not require HLS playback, then you can remove this plugin to help optimize server performance.**
