---
title: Passing Connection Parameters
description: ""
menu_order: 17
---

A lot of use cases, such as `client authentication` etc require passing connection parameters to the media server. When using a client such as `FFmpeg`, you can pass parameters to Red5 Pro for an `RTMP` request but not an `RTSP` request (currently not supported).

For 'non-flash' RTMP clients, Red5 Pro allows passing connections params in the connection URL only. An important thing to remember is that parameters arrive at Red5 Pro as a part of the **connection URL** and **not the stream name**. The stream name should always appear at the end of the connection URL.

Parameters need to be appended to the RTMP connection URL as a query string a shown below.

```bash
rtmp://<host>:1935/live?param1=value1&param2=value2
```

__Sample command to connect & stream a file to a Red5 Pro media server instance requiring parameters `username` and `password`__

__Linux__

```bash
ffmpeg  -i /tmp/sample.mp4  -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec libfdk_aac -ab 64000 -ar 48000 -ac 2 -f flv rtmp://127.0.0.1:1935/live?username=testuser&password=testpass/streamname
```

__Windows__

```bash
ffmpeg  -i C:\Downloads\\uscenes_h-264_hd_test.mp4  -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec aac -ab 64000 -ar 48000 -ac 2 -strict experimental -f flv rtmp://127.0.0.1:1935/live?username=testuser&password=testpass/streamname
```

> Passing parameters over `RTSP` using FFmpeg is currently not supported.