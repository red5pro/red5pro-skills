---
title: Publish and Subscribe Examples
description: ""
menu_order: 15
---

*Stream Manager Proxy Publish and Subscribe Examples*

With the latest release, the `live` webapp includes two examples: `proxy-publisher.html` and `proxy-subscriber.html`. These examples will take the following query parameters:

| Name | Description | Default Value |
| --- | --- | ---|
| host | hostname or IP | window.location.hostname |
| protocol | protocol which Stream Manager is served over (HTTP or HTTPS) | window.location.protocol |
| port | port number that Stream Manager is served on | window.location.port |
| app | webapp name to stream to on the server | live |
| streamName | The unique stream name to broadcast with or subscribe to | **None. Required** |
| verbose | Flag to enable verbose logging in Dev Console | None. optional |
| view | Target broadcast tech (RTC, RTMP, or HLS) | None. Optional |

> Example URI: `https://streammanager.test.com/live/proxy-publisher.html?streamName=stream1&verbose=1`

*Red5 Pro HTML5 SDK Examples:*

[Stream Manager examples](https://github.com/red5pro/streaming-html5/tree/master/src/page/sm-test)

Note: the `streaming-html5` examples testbed is included with the Red5 Pro server distribution, and can be accessed via your stream manager at `https://your.server.url/webrtcexamples/`.

*Red5 Pro iOS SDK Examples:*

[Publish - Stream Manager](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/PublishStreamManager)

[Subscribe - Stream Manager](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/SubscribeStreamManager)

*Red5 Pro Android SDK Examples:*

[Publish - Stream Manager](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/PublishStreamManagerTest)

[Subscribe - Stream Manager](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/SubscribeStreamManagerTest)
