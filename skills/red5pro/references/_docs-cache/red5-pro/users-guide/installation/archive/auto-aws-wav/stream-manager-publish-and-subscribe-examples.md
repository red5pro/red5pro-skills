---
title: Publish and Subscribe Examples
description: ""
---

# Publishing and Subscribing Via Wavelength Zones

Because the Stream Manager can't communicate to the Wavelength nodes via their Carrier IP addresses, it is necessary to proxy websocket/ssl calls via private IP. From the `https://<streammanager>/webrtcexamples/` settings page, scroll down to the **STREAM MANAGER SPECIFIC** section, and place a check next to **Use Private Proxy**.

To request a server in the wavelength zone, you will need to include the wavelength zone in your broadcast request. For example: `https://<streammanager>/streammanager/api/4.0/event/live/test123?action=broadcast&region=us-west-2&zone=us-west-2-wl1-lax-wlz-1`

Similarly, if you want to force connection to a non-wavelength zone instance you'll need to specify the zone where your nodes were launched. For example: `https://<streammanager>/streammanager/api/4.0/event/live/test123?action=broadcast&region=us-west-2&zone=us-west-2a`

To use this with the webrtcexamples, include the region and zone in the **Region** field, such as `us-west-2&zone=us-west-2-wl1-lax-wlz-1`

![wavtarget](/_images/installation/server/awswavelength/wavtarget.png)

If you do not set a zone for your connection then the stream manager will round-robin publish/subscribe requests between available origin/edge nodes for the **first connection attempts only**. After there are connected clients, then the stream manager will target the **least-used** node for new connections.

---

*Red5 Pro HTML5 SDK Examples:*

[Stream Manager examples](https://github.com/red5pro/streaming-html5/tree/master/src/page/sm-test)

Note: the `streaming-html5` examples testbed is included with the Red5 Pro server distribution, and can be accessed via your stream manager at `https://your.server.url/webrtcexamples/`.

*Red5 Pro iOS SDK Examples:*

[Publish - Stream Manager](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/PublishStreamManager)

[Subscribe - Stream Manager](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/SubscribeStreamManager)

*Red5 Pro Android SDK Examples:*

[Publish - Stream Manager](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/PublishStreamManagerTest)

[Subscribe - Stream Manager](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/SubscribeStreamManagerTest)
