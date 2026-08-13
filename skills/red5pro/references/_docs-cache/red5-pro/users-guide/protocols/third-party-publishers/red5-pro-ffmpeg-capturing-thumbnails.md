---
title: Capturing Thumbnails
description: ""
menu_order: 12
---

Per this [FFmpeg documentation](https://trac.ffmpeg.org/wiki/Create%20a%20thumbnail%20image%20every%20X%20seconds%20of%20the%20video), you can capture a thumbnail on your server by running:

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -ss 00:00:14.435 -vframes 1 thumbnail.png
```