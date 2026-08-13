---
title: Transcoding Quality Troubleshooting
description: ""
menu_order: 3
---

Red5 Pro transcoding for ABR uses the source stream to create lower-quality provisions. Here are some tips to ensure that all streams' quality is acceptable:

1. Make sure that your broadcast source can transmit the resolution, bitrate, and framerate you have set for your high-level provision.
2. Lower-level transcoded stream provisions need to maintain the same aspect ratio as your incoming stream.
3. Each provisioned level counts as a stream connection on a transcoder node, so set your server capacity accordingly. For example, if you intend to generate 6 transcoded levels make sure that your scale threshold for your transcoder is 7 or higher.
4. The quality of your incoming stream plus the quality and number of variants created will contribute to CPU and memory load on your transcoder node.
  * For example, an incoming 1080p stream transcoded into 720p, 480p and 240p variants will have more overhead than one transcoding into 540p and 220p variants.