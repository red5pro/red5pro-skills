---
title: Optimizing
description: ""
menu_order: 18
---

You can further optimize FFmpeg commands for improving latency, processing speed, video quality, audio quality etc: Here a few short-hand tips & recommendations on optimizations.

1. FFmpeg provides a flag `-tune zerolatency` to reduce latency on the video processing. Although not a magic wand, you can always try it on your own to see if it makes a difference.
    Reference: [https://trac.ffmpeg.org/wiki/StreamingGuide](https://trac.ffmpeg.org/wiki/StreamingGuide)
2. FFmpeg provides presets to determine frame processing speed. Sometimes a higher speed may skip frame details when reading & processing. On the other hand, slow processing may add to overall latency. Based on your use case and stream content you can select an optimal `preset` in your FFmpeg command.
3. The Newer versions of FFmpeg include multithreading support which can take advantage of a multi-core processor more efficiently. You can read more about it in the [official page](https://trac.ffmpeg.org/wiki/StreamingGuide#CPUusageFilesize).
4. When re-encoding take special care to match your video frame rate & audio sample rate properly otherwise you may run into a/v sync issues.