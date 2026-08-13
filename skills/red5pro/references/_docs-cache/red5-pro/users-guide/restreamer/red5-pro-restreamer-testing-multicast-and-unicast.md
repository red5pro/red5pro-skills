---
title: Test Multicast and Unicast source with FFMPEG
description: ""
menu_order: 6
---

The basic format of an FFmpeg command is: `ffmpeg [input arguments] -i [input url] [output arguments] [output url]`

The input will be up to you based on whatever video sources you have available. For the output, all you need to do is make sure you're telling ffmpeg to output as MPEG-TS over UDP multicast or unicast.

### Windows

An example command looks like this:

```sh
ffmpeg -f dshow -i video="My Webcam" -f mpegts udp://239.5.5.5:5555?pkt_size=188
```

To determine the available a/v devices on windows, use this command:

```sh
ffmpeg -list_devices true -f dshow -i dummy
```

On an ASUS laptop, this command worked best:

```sh
ffmpeg -f dshow -rtbufsize 16M -i video="ASUS USB2.0 Webcam":audio="Microphone (Realtek High Definition Audio)" -video_size 640x480 -r 25 -threads 4 -c:v libx264 -pix_fmt yuv420p -bsf:v h264_mp4toannexb -profile:v baseline -level:v 3.2 -c:a aac -b:a 128k -ar 44100 -f mpegts "udp://239.5.5.5:5555"
```

Lenovo with external MS LifeCam example using alternate video source name:

```sh
./bin/ffmpeg -f dshow -rtbufsize 16M -video_size 352x288 -i video="@device_pnp_\\\\?\\usb#vid_045e&pid_075d&mi_00#7&efedfc8&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global":audio="Microphone (Lenovo USB Audio)" -s 352x288 -r 25 -c:v libx264 -pix_fmt yuv420p -bsf:v h264_mp4toannexb -profile:v baseline -level:v 3.2 -preset ultrafast -tune zerolatency -b:v 420k -c:a aac -b:a 64k -ar 44100 -f mpegts "udp://239.5.5.5:5555"
```

_The above output shows video bitrate forced to 420k, camera source capture matching the codec sizing, and codec presets_

### MacOS

Publish audio (aac 44100 stereo) and video (_h264 profile baseline 3.2_) over multicast:

```sh
ffmpeg -f avfoundation -video_size 640x480 -framerate 25 -i “0:0” -bsf:v h264_mp4toannexb -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level:v 3.2 -c:a aac -b:a 128k -ar 44100 -f mpegts “udp://239.1.1.1:1234?pkt_size=188"
```

### Linux

Publish a video-only stream over multicast:

```sh
ffmpeg -f video4linux2 -framerate 24 -i /dev/video0 -bsf:v h264_mp4toannexb -c:v libx264 -x264-params keyint=120:scenecut=0 -f mpegts udp://239.5.5.5:5555
```

Publish audio (aac 44100 stereo) and video (_h264 profile baseline 3.2_) over multicast:

```sh
ffmpeg -f pulse -i default -f video4linux2 -thread_queue_size 64 -framerate 25 -video_size 640x480 -i /dev/video0 -pix_fmt yuv420p -bsf:v h264_mp4toannexb -profile:v baseline -level:v 3.2 -c:v libx264 -x264-params keyint=120:scenecut=0 -c:a aac -b:a 128k -ar 44100 -f mpegts udp://239.5.5.5:5555
```

_video size and thread queue size are adjusted to allow better streaming with live in ffmpeg_

Verifying the stream by subscribing to it: `ffplay -i udp://239.5.5.5:5555`

### File source

Publishing a stream over multicast from a media source file:

```sh
ffmpeg -re -stream_loop -1 -i [media file] -c:v h264 -bsf:v h264_mp4toannexb -profile:v baseline -c:a aac -b:a 128k -ar 44100 -f mpegts udp://239.5.5.5:5555?pkt_size=188
```

### Unicast Testing with File Source

The test box has two NICs installed on a 10.0.0.x network, with the primary server binding on 10.0.0.5.

The first test is on the primary interface `10.0.0.5`, with the first step of creating the TS endpoint for consuming / listening:

```sh
http://localhost:5080/tsingest/mpegts?action=create&contextpath=live&streamname=mystream2&cast=unicast&ip=10.0.0.5&port=5678
```

Upon success message in the browser, start streaming with FFmpeg:

```sh
ffmpeg -re -stream_loop -1 -i sample.ts -c:v copy -c:a copy -f mpegts udp://10.0.0.5:5678?pkt_size=188
```

The second test is on the secondary interface `10.0.0.19`, with the first step of creating the TS endpoint for consuming / listening:

```sh
http://localhost:5080/tsingest/mpegts?action=create&contextpath=live&streamname=mystream1&cast=unicast&ip=10.0.0.19&port=1234
```

Upon success message in the browser, start streaming with FFmpeg:

```sh
ffmpeg -re -stream_loop -1 -i sample.ts -c:v copy -c:a copy -f mpegts udp://10.0.0.19:1234?pkt_size=188
```

Lastly is the binding on the *any* address `0.0.0.0`:

```sh
http://localhost:5080/tsingest/mpegts?action=create&contextpath=live&streamname=any&cast=unicast&ip=0.0.0.0&port=1111
```

Upon success message in the browser, start streaming with ffmpeg on a local IP to the box paying close attention that the ports match:

```sh
ffmpeg -re -stream_loop -1 -i sample.ts -c:v copy -c:a copy -f mpegts udp://10.0.0.5:1111?pkt_size=188
```