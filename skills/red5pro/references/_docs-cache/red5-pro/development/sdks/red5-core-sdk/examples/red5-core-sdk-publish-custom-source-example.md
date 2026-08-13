---
title: Red5 Core SDK Examples - Custom source
description: ""
menu_order: 8
---

The Custom source example shows how to implement `ISingleSource` to use a raw audio/video file as a media source for publishing a stream.

`DataSource` implements the common part of a publishing source that is irrelevant to the media type. It is used to handle the file, count frames, and synchronize frames based on stream setup.

On the other hand, `VideoSource` and `AudioSource` show the difference between audio and video source types. The main difference is the media-description setup and frame-size calculation based on it those covered by related constructors. Also, these implementations support the generation of data if no source file is provided. This is also different for various data types. In the case of a video source, it will generate a frame filled with color based on the frame number. For an audio source, it will generate sine wave sound data.

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.