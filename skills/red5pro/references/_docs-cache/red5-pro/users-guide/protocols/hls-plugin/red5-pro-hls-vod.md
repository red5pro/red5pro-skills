---
title: HLS VOD
description: ""
menu_order: 10
---

By default, all Red5 Pro recorded streams produce FLVs and HLS files.

The HLS recordings create, in `(red5pro)/webapps/live/streams`, a `streamname.m3u8` file and a number of `streamname_#.ts` files. In addition, if you are copying up to a storage bucket, then in the `live` directory, there will be a `streamname` sub-directory which contains the `m3u8` and `ts` files.

If you are using [cloudstorage](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/red5-pro-cloud-storage-overview/), you can subscribe directly to the URL of the `m3u8` file with the Safari browser or with a tool like VLC.

To list the HLS recordings on the `playback.jsp` page of the server distribution, append the URL with `&playlists=1` (e.g: `https://servertest.com/live/playback.jsp?host=servertest.com&playlists=1`).

## HLS Append Recording and Rotation Metadata

(feature available with Red5 Pro server release 5.6.0)

Append recording for HLS is achieved with post-processing, using the `OrientationPostprocessor` and `FFmpeg`. If you wish to use the `append` record type with HLS recordings, you will need to configure the following:

1. In `hlsconfig.xml`, set the post-processor mode to `1` `<property name="postProcessMode" value="1"/>`
2. Configure the `OrientationPostProcessor` per the [Converting FLV files to MP4 via Post Processing](/docs/red5-pro/users-guide/protocols/converting/) document.

> The above configurations and post-processing are also necessary if you want HLS recordings of a mobile stream (via the Red5 Pro Mobile SDK) that uses rotation during the broadcast.