---
title: Using FFmpeg with Red5 Pro for live streaming RTMP and RTSP
description: ""
menu_order: 5
---

## Introduction

[FFmpeg](https://ffmpeg.org/) is an open-source audio/video processing software which is capable of grabbing, publishing, downloading and transcoding media streams in real-time and via post-processing.

Given its vast range of supported codecs, FFmpeg can be used as an encoder/decoder in conjunction with Red5 pro to work with media streams. [FFmpeg](https://ffmpeg.org/) also popularly known as the Swiss knife of streaming.

FFmpeg commands are command line based. They are generally executed from your shell/command prompt. Alternately you can also execute these commands from a  programming language API for executing command line processes.

__The basic format of an FFmpeg command:__

```bash
ffmpeg [input-flags] -i [input-source] [output-flags] [output-destination]
```

FFmpeg supports various types of streaming and non-streaming media inputs over a wide range of protocols. `[input-flags]` refers to special command line parameters that can be used to configure an input being read into FFmpeg. `[input-source]` refers to one or more input sources specified in the FFmpeg command. FFmpeg is capable of reading multiple inputs (streaming/non-streaming) through a single command. `[output-flags]` are used to configure the FFmpeg output such as quality, bitrate, format, container etcetera. And finally the `[output-destination]` specifies the format and container of the output media (streaming/non-streaming). Similar to inputs, FFmpeg is capable of providing multiple outputs as well. In the case of multiple outputs, combinations of `[output-flags]` and `[output-destination]` are repeated for each targeted output.

For more information on FFmpeg flags and outputs, please refer to the [Recommended links](/docs/red5-pro/users-guide/protocols/third-party-publishers/red5-pro-ffmpeg-reference-links/) section.
