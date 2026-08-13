---
title: Multi-Bitrate streaming
description: ""
menu_order: 14
---

FFmpeg allows multiple outputs in a single command. This enables us to create different outputs with different encoding settings. Let us take a look at an example of multi-bitrate encoding using FFmpeg.

__Sample command to generate multi-bitrate streams from a live stream & publish it back to Red5 Pro__

__Linux__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -vcodec libx264 -s 640x480 -vb 500k  -acodec libfdk_aac -ab 128k -f flv "rtmp://127.0.0.1:1935/live/streamname_500 live=1" -vcodec libx264 -s 320x240 -vb 250k -acodec libfdk_aac -ab 48k -f flv "rtmp://127.0.0.1:1935/live/streamname_250 live=1"
```

__Windows__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -vcodec libx264 -s 640x480 -vb 500k  -acodec aac -strict experimental -ab 128k -f flv "rtmp://127.0.0.1:1935/live/streamname_500 live=1" -vcodec libx264 -s 320x240 -vb 250k -acodec aac -strict experimental -ab 48k -f flv "rtmp://127.0.0.1:1935/live/streamname_250 live=1"
```

![Generating Multiple bitrates](/_images/protocols/ffmpegstreaming/multi-bitrate-streams.png)
