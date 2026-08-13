---
title: Recording and Restreaming
description: ""
menu_order: 16
---

#### Recording & re-streaming at the same time

__Sample command to save a Red5 Pro stream to disk and at the same time, re-stream it back to Red5 Pro with a different bitrate__

__Linux__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -acodec copy -vcodec libx264 -preset fast -f mp4 stream.mp4 -vcodec libx264 -s 640x480 -vb 500k  -acodec libfdk_aac -ab 128k -f flv "rtmp://127.0.0.1:1935/live/streamname_500 live=1"
```

__Windows__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -acodec copy -vcodec libx264 -preset fast -f mp4 stream.mp4 -vcodec libx264 -s 640x480 -vb 500k  -acodec aac -strict experimental -ab 128k -f flv "rtmp://127.0.0.1:1935/live/streamname_500 live=1"
```