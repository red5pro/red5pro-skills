---
title: Enabling h.265 Transcoding
menu_order: 200
---

Red5 Pro can transcode h.265 to h.264, which can be useful in many situations. h.265 is not has limited support in browsers and is currently hidden behind special flags to enable it.  By transcoding h.265 to h.264 you get the benefits of h.265 ingest with the compatibility of h.264. Using h.265 for ingest can help by allowing encoders to stream in lower bitrate streams when bandwidth is limited. It is also useful in situations when content is only available in h.265 and needs to be streamed to a wider audience.

## Installing the h.265 Decoder Library

To enable transcoding h.265 to h.264 a decoder library must be installed on the Red5 Pro Transcoder nodes. To install the [libde265 Decoder library](https://launchpad.net/~strukturag/+archive/ubuntu/libde265) on Ubuntu, follow these steps:

```
sudo add-apt-repository ppa:strukturag/libde265
sudo apt update
sudo apt install libde265-0
```

If the headers are needed, the development package can be installed, but this is not needed in most cases:

```
sudo apt install libde265-dev
```

## Codec Configuration

[Codec Configuration](../../codecs/red5-pro-codec-configuration/) can be found in the [Codecs](../../codecs) section of the documentation.
