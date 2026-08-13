---
title: Restreaming with FFMpeg
description: ""
menu_order: 13
---

Re-streaming means re-transmitting stream packets. In a typical streaming environment, you can choose to re-stream to the same media server with a different stream name and stream parameters or re-stream to a completely different media server instance/type.

__Sample command to re-stream a live stream back to Red5 Pro with a new bitrate__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -vcodec libx264 -s 320x240 -vb 250k  -acodec copy -f flv "rtmp://127.0.0.1:1935/live/streamname_250 live=1"
```