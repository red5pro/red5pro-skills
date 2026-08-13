---
title: Latency
description: ""
menu_order: 4
---

The typical HLS player will have a latency of about the total duration of the playlist sliding window. Latency can be roughly determined by multiplying the segment duration by the segment count; a stream with a _segment count_ of 5 and _duration_ of 6 seconds will typically result in a latency of 30 seconds.

Since Red5 Pro passes through the media 'as-is', the first consideration for effective streaming is to set up the publisher to output HLS-friendly media. The live HLS experience is governed by the somewhat strict timing of the players, which check the playlist at a certain interval.

The dimensions of HLS are the `segment duration`, and the `segment count` in the playlist. Players are required to poll the playlist at an interval of half the segment duration. The server is required to update the playlist with a new segment so that players do not see a static playlist over 2 iterations. **Critical notes**: timely video keyframes to segment on; One segment is assumed to be on the wire at all times; Safari typically requires 3 segments to begin playback.

All that being said, the equation is derived:
`latency = ( ( segment_duration ) X ( playlist_count - 1 ) ) +/- ( fraction of segment_duration )`.

Some test results using the iOS SDK publisher which is capable of producing a steady keyframe every 2 seconds.

* The Red5 Pro distribution `hlsconfig.xml` file is set at 5 items and 6 seconds and has an average latency of 18-30 seconds.
* HLS playlist configured with `playlist count` of 4 items, `segment duration` of 4 seconds, produced latency between 10-16 seconds.
* HLS playlist configured with `playlist count` of 4 items, `segment duration` of 2 seconds, produced latency between 6-10 seconds.

The threshold variable sets the sensitivity of segmentation. When a key video frame is encountered after the segment_duration X threshold, HLS will segment. Values closer to 1 work well with steady frame rates. Lower values closer to .5 allow segmentation at half the duration and this can help with a very non-static frame rate. If your broadcasters output keyframes every 2 to 3 seconds, the lower threshold would allow HLS settings of segment_duration to work for both cases. Segment duration of 6 and a threshold of 0.6.
