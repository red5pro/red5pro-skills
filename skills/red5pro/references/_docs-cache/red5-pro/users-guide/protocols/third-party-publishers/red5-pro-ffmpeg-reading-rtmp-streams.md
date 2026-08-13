---
title: Reading RTMP Streams
description: ""
menu_order: 10
---


### Reading a stream from Red5 Pro

There are times when you may want to read a stream from the Red5 Pro server for the purpose of subscribing/recording/re-streaming.

__Reading a RTMP Stream__

Compared to other media server the Red5 Pro media server requires a specific amount of time delay for the handshake + resource discovery to be successful. This time delay is provided as `librtmp` parameter from within the FFmpeg command.

__Sample command to dump a live stream to an MP4 file.__

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -acodec copy -vcodec libx264 -preset fast -f mp4 stream.mp4
```

> From FFmpeg guide: The FFmpeg's `"-re"` flag means to "Read input at native frame rate. Mainly used to simulate a grab device." i.e. if you wanted to stream a video file, then you would want to use this, otherwise, it might stream it too fast (it attempts to stream at line speed by default).

__Sample Output__

```bash
ffmpeg version N-82597-gd316b21 Copyright (c) 2000-2016 the FFmpeg developers
  built with gcc 5.4.0 (GCC)
  configuration: --enable-gpl --enable-version3 --disable-w32threads --enable-dxva2 --enable-libmfx --enable-nvenc --enable-avisynth --enable-bzlib --enable-fontconfig --enable-frei0r --enable-gnutls --enable-iconv --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libfreetype --enable-libgme --enable-libgsm --enable-libilbc --enable-libmodplug --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenh264 --enable-libopenjpeg --enable-libopus --enable-librtmp --enable-libschroedinger --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs --enable-libxvid --enable-libzimg --enable-lzma --enable-decklink --enable-zlib
  libavutil      55. 40.100 / 55. 40.100
  libavcodec     57. 66.106 / 57. 66.106
  libavformat    57. 58.100 / 57. 58.100
  libavdevice    57.  2.100 / 57.  2.100
  libavfilter     6. 67.100 /  6. 67.100
  libswscale      4.  3.101 /  4.  3.101
  libswresample   2.  4.100 /  2.  4.100
  libpostproc    54.  2.100 / 54.  2.100
Metadata:
  type                  rtc
  audioBR               56.00
  videoBR               750.00
[flv @ 0000000000d36e60] video stream discovered after head already parsed
[flv @ 0000000000d36e60] audio stream discovered after head already parsed
Input #0, flv, from 'rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2':
  Metadata:
    type            : rtc
    audioBR         : 56
    videoBR         : 750
  Duration: N/A, start: 0.000000, bitrate: N/A
    Stream #0:0: Video: h264 (Constrained Baseline), yuv420p(progressive), 640x480, 30.30 fps, 62.50 tbr, 1k tbn, 60 tbc
    Stream #0:1: Audio: aac (LC), 48000 Hz, mono, fltp

> It is important to note the `librtmp` parameters `live=1` and `timeout=2`. These are params used by the `librtmp` module to access the RTMP stream from the Red5 pro server. without the `live` param FFmpeg attempts to access a VOD(video on demand) file by the same name as the live stream.
```

> Note: it is important to note that if you are unsure about the original codecs of the stream then it is always best to re-encode it to make it compatible with the format you are going to save it into.