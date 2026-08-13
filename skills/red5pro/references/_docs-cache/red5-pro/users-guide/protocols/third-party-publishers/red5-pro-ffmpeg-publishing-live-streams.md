---
title: Publishing Live Streams
description: ""
menu_order: 8
---

### Publish from devices

FFmpeg allows publishing standard a/v devices to Red5 Pro media server. A detailed article is published [on the FFmpeg trac site](https://trac.ffmpeg.org/wiki/Capture/Webcam), describing how to get a list of devices on your OS platform and using one of those devices to publish a stream to Red5 Pro.

__Sample command to get the list of devices (Windows)__

```bash
ffmpeg -list_devices true -f dshow -i dummy
```

__Sample output__

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
[dshow @ 0000000000da6a80] DirectShow video devices (some may be both video and audio devices)
[dshow @ 0000000000da6a80]  "Logitech HD Webcam C510"
[dshow @ 0000000000da6a80]     Alternative name "@device_pnp_\\\\?\\usb#vid_046d&pid_081d&mi_02#7&29fdfa74&0&0002#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\{bbefb6c7-2fc4-4139-bb8b-a58bba724083}"
[dshow @ 0000000000da6a80] DirectShow audio devices
[dshow @ 0000000000da6a80]  "Microphone (HD Webcam C510)"
[dshow @ 0000000000da6a80]     Alternative name "@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\wave_{47BA1941-1678-4E33-8FB0-657C31D79FDA}"
```

__Sample command to publish device(s) to Red5 pro over RTMP__

```bash
ffmpeg -f dshow -i video="Logitech HD Webcam C510":audio="Microphone (HD Webcam C510)" -vcodec libx264 -pix_fmt yuv420p -s 640x480 -vb 500k -vprofile baseline -level 3.0 -acodec aac -ab 64000 -ar 48000 -ac 2 -strict experimental -f flv rtmp://127.0.0.1:1935/live/streamname
```

__Sample command to publish device(s) to Red5 pro over RTSP__

```bash
ffmpeg -f dshow -i video="Logitech HD Webcam C510":audio="Microphone (HD Webcam C510)" -vcodec libx264 -pix_fmt yuv420p -s 640x480 -vb 500k -vprofile baseline -level 3.0 -acodec aac -ab 64000 -ar 48000 -ac 2 -strict experimental -f rtsp rtsp://127.0.0.1:8554/live/streamname
```

> It is important to note that we are re-encoding the raw data from camera/microphone as h264 + aac before transmitting it to Red5 pro.
>
> Depending on your os platform you can use a different audio library of aac For example on Linux, __libfdk-aac__ is preferred over the internal aac library.
