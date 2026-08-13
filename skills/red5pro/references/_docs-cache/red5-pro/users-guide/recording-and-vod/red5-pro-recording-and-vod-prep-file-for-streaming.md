---
title: Preparing a Video File for Streaming
description: ""
menu_order: 3
---

Red5 Pro supports the following media formats for streaming:

* Streaming Video (FLV, F4V, MP4, 3GP)
* Streaming Audio (MP3, F4A, M4A, AAC)

In order for Red5 Pro to be able to stream a recorded media to client, it needs to be in a format understood by Red5 Pro, supported by the protocol used (RTMP/RTSP) and also readable by the client-side player.

A file format is like a container which holds audio and/or video data in a single file. Each file format in turn allows storing data encoded in specific [codecs](https://en.wikipedia.org/wiki/Codec) only. To keep things simple, we won't be venturing into the depth of codecs and encoding here. However, let’s take a look at the basic video formats compatible with Red5 Pro and their supported codecs.

Commonly used video formats for VOD transmission:

* FLV  : (VIDEO: [Sorenson](https://sorenson.com/) / [VP6](https://en.wikipedia.org/wiki/VP6) + AUDIO: [Mp3](https://en.wikipedia.org/wiki/MP3) / [Nellymoser](https://en.wikipedia.org/wiki/Nellymoser) / [Speex](https://en.wikipedia.org/wiki/Speex))
* MP4 : (VIDEO: [H264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) + AUDIO: [AAC](https://en.wikipedia.org/wiki/Advanced_Audio_Coding)).
* F4V  : (VIDEO: [H264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) + AUDIO: [AAC](https://en.wikipedia.org/wiki/Advanced_Audio_Coding)/ [MP3](https://en.wikipedia.org/wiki/MP3)).

__If your file is not in one of these formats you might need to [encode](https://www.techtarget.com/searchnetworking/definition/encoding-and-decoding) your video for compatibility with Flash player using a tool such as [Adobe Media Encoder](https://www.adobe.com/products/media-encoder.html) or the open source [FFmpeg encoder](https://ffmpeg.org//).__

Useful Links

* [https://trac.ffmpeg.org/wiki/EncodingForStreamingSites](https://trac.ffmpeg.org/wiki/EncodingForStreamingSites)
* [https://trac.ffmpeg.org/wiki/Encode/H.264](https://trac.ffmpeg.org/wiki/Encode/H.264)
* [http://www.avanti.arrozcru.org/](http://www.avanti.arrozcru.org/) (Windows GUI for ffmpeg executable)
