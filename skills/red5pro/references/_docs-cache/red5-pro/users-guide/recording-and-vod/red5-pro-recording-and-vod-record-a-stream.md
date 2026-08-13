---
title: Recording a Stream
description: ""
menu_order: 2
---

## Client-side

To record a file using a mobile client using the [Red5 Pro Mobile Streaming SDKs](https://account.red5.net/login), set the `R5Record` type to `Record` or `Append` instead of `Live`.

*Using the Red5 Pro iOS Streaming SDK:*

```c
self.publishStream!.publish(Testbed.getParameter("stream1") as! String, type: R5RecordTypeRecord)
```

*Using the Red5 Pro Android Streaming SDK:*

```java
publish.publish(TestContent.GetPropertyString("stream1"), R5Stream.RecordType.Record);
```

To record a stream from a WebRTC client, using the Red5 Pro WebRTC SDK, Set `streamMode` to `record` or `append` instead of `live`.

*Using the Red5 Pro WebRTC SDK:*


```http
import { WHIPClient } from 'red5pro-webrtc-sdk'

const start = async () => {
  try {
    const publisher = new WHIPClient()
    await publisher.init({
      protocol: 'ws',
      port: 5080,
      host: 'localhost',
      app: 'live',
      streamName: 'mystream',
      rtcConfiguration: {
        iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
        iceCandidatePoolSize: 2,
        bundlePolicy: 'max-bundle'
      }, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
      streamMode: 'record',
      mediaElementId: 'red5pro-publisher',
      bandwidth: {
        audio: 56,
        video: 512
      },
      mediaConstraints: {
        audio: true,
        video: {
          width: {
            exact: 640
          },
          height: {
            exact: 480
          },
          frameRate: {
            min: 8
            max: 24
          }
        }
      }
    })
    await publisher.publish()
  } catch (e) {
    // An error occured in establishing a broadcast session.
  }
}
```

## Server-side

You will find a `/streams` directory listed under the app directory you are publishing to. For example, `/webapps/live/streams`. While you are publishing/recording, you will see the placeholder files (`.info` and `.ser`).

![In progress](/_images/protocols/vodwithred5pro/inprogressrecord.png)

And, when you stop broadcasting, there will be a Flash Video (`.flv`) file in the directory with your stream name (i.e., `stream1.flv`)

![Finished](/_images/protocols/vodwithred5pro/finishedrecording.png)'

You can convert the `.flv` file to an `.mp4` file using the [orientation post processing](/docs/red5-pro/users-guide/protocols/converting/).

In addition to the FLV, If the HLS plugin (`red5pro-mpegts*.jar`) clients will automatically record an [HLS stream](/docs/red5-pro/users-guide/protocols/hls-plugin/). HLS recordings consist of a number of timestamp (`.ts`) files and one master record (`.m3u8`) for each recorded stream.
