---
title: Post Process File Conversion to MP4
description: ""
menu_order: 1
---

# Orientation Post Processor


By default, Red5 Pro records files as FLV(.flv) and HLS (.m3u8 and .ts) format.

The Red5 Pro `OrientationPostProcessor` utilizes FFmpeg to transcode a supplied FLV into an MP4 with all of the recorded orientation events applied to the final video output. This allows the media to be played back without needing to handle orientation metadata. The processor may be used in combination with the [CloudstoragePostProcessor](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/red5-pro-cloud-storage-overview/) to upload converted media once completed; the MP4 will be uploaded to the cloud alongside the FLV. Note that it does take time to convert to MP4, depending on the length of your recording, so the MP4 version will not be immediately available.
