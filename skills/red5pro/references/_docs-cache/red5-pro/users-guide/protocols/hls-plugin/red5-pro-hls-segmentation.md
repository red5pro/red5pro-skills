---
title: Segmentation
description: ""
menu_order: 5
---

The segmentation engine relies on keyframes provided by the publisher.

You can configure the threshold point at which the keyframe creates a new segment. A lower threshold allows shorter duration in the segments; with a target _duration_ of 10 seconds and a _threshold_ of 0.7, the HLS plugin will start a new segment at the next keyframe occurring at or after the 7-second mark:

<pre>
10 X 0.7 = 7.0 seconds minimum segment duration
</pre>

Use the threshold variable to prevent stalling the HLS subscribers when the broadcaster keyframe interval does not match the segment duration.

__The segment duration should not be shorter than the expected minimum keyframe interval__
