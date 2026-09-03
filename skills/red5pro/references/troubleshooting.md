# Troubleshooting & Capacity Planning

Source: live docs at [https://www.red5.net/docs/red5-pro/users-guide/troubleshooting-and-best-practices/](https://www.red5.net/docs/red5-pro/users-guide/troubleshooting-and-best-practices/)

**Scope: capacity and connection-*load* planning only** — the math for how many connections a cluster generates under a given publisher/subscriber count. For a WebRTC session that fails to connect at all (SSL, ICE/NAT, TURN), see [protocols/README.md#debugging-a-failed-webrtc-connection](protocols/README.md#debugging-a-failed-webrtc-connection) instead — that's a different failure mode than anything below.

## Planning a Production Environment

Beyond raw server performance metrics, the main load factors to account for:

1. Number of concurrent publishers, and the quality (resolution/bitrate/framerate) of each stream.
2. Number of concurrent subscribers per stream (1:1, 1:many, many:many).
3. Rate of connection load-in — how quickly subscribers join an event (a burst vs. a trickle matters).
4. Ratio of origins to edges in an autoscale cluster.

## Reading Origin Connection Stats

An origin node's connection logs report three numbers:

- **total count** — direct publishers and subscribers on that origin. This is the number the Stream Manager scales on (based on launch-configuration connection-capacity policy).
- **edge-proxy** — child connections: edge servers (or relays, if present).
- **re-streamers** — cluster-restreamer connections, equal to **(number of streams) × (edge-proxy connections)**.

Since origin↔edge communication runs over RTMP, use documented RTMP subscriber capacity numbers as the guideline for origin restreamer capacity.

**Worked example**: 1 origin, 1 edge, 1 stream → total count 1, edge-proxy 1, restreamers 1.
But 1 origin with **100 edges** and **3 streams** → 300 restreamer connections + 100 edge-proxy connections on that origin — even though total count (direct publishers) is still only 3. Autoscaling only reacts to publisher count, so this restreamer/edge-proxy load must be planned for manually.

## Best Practice

> The number of restreamers is equal to the number of streams times the edge-proxy connections.

Use published server performance metrics as a baseline, then adjust cluster sizing (origin:edge ratio, relay usage) for your specific use case rather than assuming autoscaling alone will keep the environment stable.

## Other Troubleshooting Areas

The live docs also cover Red5 Pro server-specific issues (`red5-pro-server/`), Stream Manager 1 legacy issues (`stream-manager-1/`), and general stream-*quality* problems like bitrate/transcode tuning (`stream-quality/`) — these aren't summarized in this file, so consult the corresponding page under [https://www.red5.net/docs/red5-pro/users-guide/troubleshooting-and-best-practices/](https://www.red5.net/docs/red5-pro/users-guide/troubleshooting-and-best-practices/) for the specific symptom rather than guessing at a cause. For a connection that won't establish in the first place, use [protocols/README.md#debugging-a-failed-webrtc-connection](protocols/README.md#debugging-a-failed-webrtc-connection), not this page's `webrtc/` subfolder — that subfolder is just a pointer to `chrome://webrtc-internals`, already covered there.
