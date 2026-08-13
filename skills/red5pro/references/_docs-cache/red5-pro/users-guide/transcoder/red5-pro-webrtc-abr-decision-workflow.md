---
title: WebRTC ABR - Decision Workflow
description: ""
menu_order: 15
---

The following shows the decision-making workflow performed to know when to move up and down variants.

1. Check if an upgrade is possible → if they qualify → **upgrade**
  * Note - if the client is requesting a keyframe then **don’t upgrade**
2. If the client doesn’t qualify → then we test for trial → if they qualify for trial & are above downgrade of target  → **attempt upgrade**
3. If the client is requesting a keyframe or has dropped frames → **downgrade**
4. Otherwise **downgrade** based on calculation

These checks are run each keyframe received or per the `mbr.test.delay` setting in `red5pro/conf/webrtc-plugin.properties` file.
