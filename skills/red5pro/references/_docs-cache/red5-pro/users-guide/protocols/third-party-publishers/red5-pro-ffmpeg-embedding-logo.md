---
title: Embedding Logo
description: Embedding logo on a live stream
menu_order: 15
---

FFmpeg also provides complex a/v filters which allow us to manipulate audio and video in a rather complex manner. We can use this to embed a png image as a brand logo on the live stream. Here we re-encode the stream to have the logo in each video frame and then package it along with the audio stream before publishing it to Red5 Pro.

__Sample command to add a logo to a live stream to a Red5 Pro live stream and re-transmit it as a new stream__

__Linux__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -i /home/rajdeeprath/Downloads/red5pro_logo.png -filter_complex "overlay=0:0" -vcodec libx264 -acodec libfdk_aac -ab 128k -f flv "rtmp://127.0.0.1:1935/live/streamname_logo live=1"
```

__Windows__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -i M:\\workspace-ffmpeg\\red5pro_logo.png -filter_complex "overlay=0:0" -vcodec libx264 -acodec aac -strict experimental -ab 128k -f flv "rtmp://127.0.0.1:1935/live/streamname_logo live=1"
```

![Overlaying a logo on a Red5 pro live stream](/_images/protocols/ffmpegstreaming/video_with_logo.png)