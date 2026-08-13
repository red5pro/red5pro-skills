---
title: HLS Append Recording
description: HLS Append Recording and Rotation Metadata
menu_order: 3
---

(feature available with Red5 Pro server release 5.6.0)

Append recording for HLS is achieved with post-processing, using the `OrientationPostprocessor` and `ffmpeg`. If you wish to use the `append` record type with HLS recordings, you will need to configure the following:

1. In `hlsconfig.xml`, set the post processor mode to `1` `<property name="postProcessMode" value="1"/>`
2. Configure the `OrientationPostProcessor` per the [Converting FLV files to MP4 via Post Processing]<!-- FIXME-DOM(flvconvertomp4)--> document. **NOTE**: this requires that you install `ffmpeg`, minimum version 3.x. You will also need to modify the `conf/red5-common.xml` and `conf/cloudstorage-plugin.properties` files.

> The above configurations and post-processing are also necessary if you want HLS recordings of a mobile application (with Red5 Pro Mobile SDK) using rotation during the broadcast.
