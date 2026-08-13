---
title: Red5 Pro Troubleshooting and Best Practices
description: ""
menu_order: 180
---

# Planning your production environment:

Using the [Server Performance Metrics](/docs/red5-pro/resources/release-notes/archive/red5pro-server-releasenotes/latest-server-performance-metrics/) to determine connection capacity of your servers is a good start, but there are additional factors that affect load on your servers.

The main factors to consider are:

1. The number of concurrent publishers (how many streams), and the quality (resolution, bitrate, framerate) of the stream(s).
2. The number of concurrent subscribers per stream (one to one; one to many; many to many).
3. The rate of connection load-in (how quickly subscribers join an event).
4. Total number of origins to total number of edges in your (autoscale) cluster.

# Red5 Pro Connections

If you look at the connection logging on an origin node, you'll see stats for `edge-proxy`, `re-streamers`, and `total count`.

* The **total count** stat is the number of direct publishers (and direct subscribers). This is the number that determines whether a node scales up or down, based on the connection capacity defined in the [launch configuration](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-launchconfig/) policy.
* The **edge-proxy** stat is the number of child connections: edge servers (or relays if you have them).
* The **re-streamers** count is the number of cluster-restreamers. The number of restreamers is equal to the number of streams times the edge-proxy connections.

![single-stream](/_images/troubleshooting/restreamers/single-stream-pub-sub.drawio.png)

So, with a single origin, single edge, and a single stream, the origin only has one edge proxy and one restreamer, no matter how many subscribers are connected to the stream on the edge. And the load on the origin would be:

* total count: 1
* edge proxy: 1
* restreamers: 1


**IMPORTANT:** If you have 100 edges - even with the same 3 streams - you then have 300 restreamer connections plus 100 edge-proxy connections. The stream manager only scales the origins based on the publisher count; so even though the total count on the origin is 3, there are essentially 400 RTMP subscriber connections as well.


Now, referring back to the [Server Performance Metrics](/docs/red5-pro/resources/release-notes/archive/red5pro-server-releasenotes/latest-server-performance-metrics/): since communication between the origin and edge is over RTMP, the capacity numbers for RTMP subscribers can be used as a guideline for origin restreamer capacity.

# Best Practices

In summary, use the performance metrics for a base, but adjust your scaling based on your streaming use-case for environment stability.

> **The number of restreamers is equal to the number of streams times the edge-proxy connections.**
