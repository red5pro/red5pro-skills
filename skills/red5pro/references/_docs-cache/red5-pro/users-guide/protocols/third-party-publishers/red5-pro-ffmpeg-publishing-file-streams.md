---
title: Publishing File Streams
description: ""
menu_order: 9
---

You can use FFmpeg to publish a media file as a live stream to Red5 Pro. Taking advantage of the vast range of decoders available in FFmpeg, we can read almost any file format and publish it to Red5 Pro as an H264 + AAC stream.

Below are sample commands to read an MP4 file and publish it to Red5 Pro.

__Sample command to publish a file as a stream to Red5 pro over RTMP__

__Linux__

```bash
ffmpeg  -i -re /tmp/sample.mp4  -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec libfdk_aac -ab 64000 -ar 48000 -ac 2 -f flv rtmp://127.0.0.1:1935/live/streamname
```

__Windows__

```bash
ffmpeg  -i -re C:\\Downloads\\uscenes_h-264_hd_test.mp4  -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec aac -ab 64000 -ar 48000 -ac 2 -strict experimental -f flv rtmp://127.0.0.1:1935/live/streamname
```

__Sample command to publish a file as a stream to Red5 pro over RTSP__

__Linux__

```bash
ffmpeg  -i -re /tmp/sample.mp4  -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec libfdk_aac -ab 64000 -ar 48000 -ac 2 -f rtsp rtsp://127.0.0.1:8554/live/streamname
```

__Windows__

```bash
ffmpeg  -i -re C:\\Downloads\\uscenes_h-264_hd_test.mp4  -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec aac -ab 64000 -ar 48000 -ac 2 -strict experimental -f rtsp rtsp://127.0.0.1:8554/live/streamname
```