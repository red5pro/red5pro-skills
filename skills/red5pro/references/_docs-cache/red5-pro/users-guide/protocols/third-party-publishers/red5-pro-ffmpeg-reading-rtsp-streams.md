---
title: Reading RTSP Streams
description: ""
menu_order: 11
---

RTSP (Real Time Streaming Protocol) is a network control protocol designed for use in entertainment and communications systems to control streaming media servers. Its purpose is to establish and control media sessions between endpoints, making it ideal for live streaming applications. RTSP allows for real-time control of the media stream, including play, pause, and record functionalities. IP Cameras frequently use RTSP as their default protocol. RTSP typically uses the RTP (Real-time Transport Protocol) to transit the encoded video, audio and metadata.

FFmpeg is a versatile and powerful multimedia framework capable of decoding, encoding, transcoding, muxing, demuxing, streaming, filtering, and playing almost any media format. At its core it uses libav, a library used by several other projects.

Combining RTSP with FFmpeg allows users to handle live media streams effectively. FFmpeg can decode RTSP/RTP streams from servers, process the media data, and save or transform it as needed. This combination is widely used in various applications, from live event broadcasting to security camera monitoring, due to its flexibility and broad support for different media formats and protocols.

Reading an RTSP stream using FFmpeg from an RTSP server is little different from our RTMP examples. Here we don't use the librtmp module. Instead, FFmpeg makes use of its own internal FFmpeg RTSP reader and RTP decoder.

The Red5 Pro media server can stream RTSP and the protocol is enabled by default without the need to edit a configuration file. RTSP typically uses port 554, but, in the case of Red5 Pro, the default is port 8554, this can be changed by editing the (configuration file `conf/red5pro-activation.xml`)[https://www.red5.net/blog/changing-port-numbers/]

## Sample command to dump a live stream to an MP4 file.

This command takes an RTSP stream (`streamname`) from a Red5 Pro RTSP server (in this case a local rtsp server `127.0.0.1`, or`localhost`) and writes the live stream information into a file (`stream.mp4`). In this case, we do not transcode the stream while saving it to the video file, we're just copying the audio (`-acodec copy`) and video (`-vcodec copy`) data.

```bash
ffmpeg  -i rtsp://127.0.0.1:8554/live/streamname  -acodec copy -vcodec copy -f mp4 stream.mp4
```

### Sample Output

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
[rtsp @ 00000000007c6c80] method SETUP failed: 461 Unsupported transport
Input #0, rtsp, from 'rtsp://127.0.0.1:8554/live/streamname':
  Metadata:
    title           : streamname
  Duration: N/A, start: 6461.310000, bitrate: N/A
    Stream #0:0: Audio: aac (LC), 48000 Hz, mono, fltp
    Stream #0:1: Video: h264 (Constrained Baseline), yuv420p(progressive), 640x480, 30 fps, 62.50 tbr, 90k tbn, 60 tbc

Press [q] to stop, [?] for help
frame=   31 fps= 21 q=-1.0 size=     111kB time=00:00:01.53 bitrate= 590.5kbits/s speed=1.02x
```

__When reading stream over RTSP you may see this in the FFmpeg output: `[rtsp @ 0000000000026c80] method SETUP failed: 461 Unsupported transport`. But the processing will resume nevertheless after a 1-second pause.__

> NOTE: Throughout the examples in this document, we will be reading a Red5 Pro stream over RTMP to demonstrate various commands. You can use RTSP protocol as well if you wish, as explained earlier.

## Sample command to re-encode & dump an RTMP live stream to an MP4 file

The following command listens to a Red5 Pro server (in this case a local RTMP server `127.0.0.1`, or`localhost`) that is streaming (`streamname`) and writes the stream information into a file (`stream.mp4`). In this case, we do transcode the live stream while saving it to the video file, transforming the video using the libx264 codec (`-vcodec libx264`) to 500Kbps (`-vb 500k`) using the baseline level 3.0 profile (`-vprofile baseline -level 3.0`), and the audio using the aac codec (`-acodec libfdk_aac`) at 60Kbps (`-ab 64000`) 48Khz (`-ar 48000`) in stereo (`-ac 2`) using the fast preset (`-preset fast`).

### Linux

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec libfdk_aac -ab 64000 -ar 48000 -ac 2 -preset fast -f mp4 stream.mp4
```

### Windows

```bash
ffmpeg  -i "rtmp://127.0.0.1:1935/live/streamname live=1 timeout=2" -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec aac -ab 64000 -ar 48000 -ac 2 -strict experimental -preset fast -f mp4 stream.mp4
```

## Sample command to re-encode & dump an RTSP live stream to an MP4 file

The following command listens to a Red5 Pro server (in this case a local RTSP server `127.0.0.1`, or`localhost`) that is streaming RTSP (`streamname`) and writes the stream information into a file (`stream.mp4`). In this case, we do transcode the live stream while saving it to the video file, transforming the video using the libx264 codec (`-vcodec libx264`) to 500Kbps (`-vb 500k`) using the baseline level 3.0 profile (`-vprofile baseline -level 3.0`), and the audio using the aac codec (`-acodec libfdk_aac`) at 60Kbps (`-ab 64000`) 48Khz (`-ar 48000`) in stereo (`-ac 2`) using the fast preset (`-preset fast`).

### Linux

```bash
ffmpeg  -i rtsp://127.0.0.1:8554/live/streamname  -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec libfdk_aac -ab 64000 -ar 48000 -ac 2 -preset fast -f mp4 stream.mp4
```

### Windows

```bash
ffmpeg  -i rtsp://127.0.0.1:8554/live/streamname -vcodec libx264  -vb 500k -vprofile baseline -level 3.0 -acodec aac -ab 64000 -ar 48000 -ac 2 -strict experimental -preset fast -f mp4 stream.mp4
```

## Sample command to stream a video file to a Red5 Pro RTSP server

The following command sends a video file (`-i stream.mp4`) as an RTSP stream (`-f rtsp`) to a local RTSP server (`rtsp://127.0.0.1:8554/live/streamname`).  The video file is looping forever because we added the `-stream_loop -1` switch after the input streamname. We don't want to handle UDP streams, so we switched this to TCP by adding `-rtsp_transport tcp` before the Real Time Streaming Protocol url. In this case, we're not transcoding the stream while saving it to the video file, we're just copying the audio (`-acodec copy`) and video (`-vcodec copy`) data.

### Linux

```bash
ffmpeg -i stream.mp4 -stream_loop -1 -vcodec copy -acodec copy -f rtsp -rtsp_transport tcp rtsp://127.0.0.1:8554/live/streamname
```

### Windows

```bash
ffmpeg -i stream.mp4 -stream_loop -1 -vcodec copy -acodec copy -strict experimental -f rtsp -rtsp_transport tcp rtsp://127.0.0.1:8554/live/streamname
```

## Testing from a Docker Container

In many cases it can be tricky running FFmpeg locally, especially if you want the latest version for testing purposes. Fortunately you can use a Docker container to start streaming with FFmpeg, RTSP and other protocols. We use the (FFmpeg container provided by the linuxserver.io team)[https://github.com/linuxserver/docker-ffmpeg], which can be easily pulled to your local system:

```bash
docker pull linuxserver/ffmpeg:latest
```

Details about building it locally are included on the github page linked above.
