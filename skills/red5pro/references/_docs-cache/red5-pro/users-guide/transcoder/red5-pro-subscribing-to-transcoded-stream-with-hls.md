---
title: Subscribing to a Transcoded Stream with HLS
description: ""
menu_order: 13
---

Adaptive Bitrate is supported also by HLS subscribers. In this case it is necessary to subscribe to the *m3u8* stream with the GUID stream name, which contains the *m3u8* manifest. The HLS playback element has the capability to switch between them based on the conditions of the network.

As for WebRTC, the first step involves requesting an edge endpoint from the stream manager using any one of the existing variants for the stream name. The call is as follows:

**Method**:`GET`

**URL**: `https://yourstreammanager.com/streammanager/api/4.0/event/live/mystream_2?action=subscribe`

Where:

- *yourstreammanager.com:* is the host of your Stream Manager.
- *mystream_2*: is the name of the stream variant that you want to subscribe to initially.

A successful response will look like the following:

```json
{
  "serverAddress": "10.0.0.0",
  "scope": "live",
  "name": "mystream_2"
}
```

This data is then used in the initialization configuration for the *HLSSubscriber*  which will look like the following:

```json
(function (red5prosdk) {

  var subscriber = new red5prosdk.HLSSubscriber()
  subscriber.init({
    host: '10.0.0.0',
    app: 'live',
    streamName: 'mystream',
    protocol: 'html',
    port: 5080
  })
  .then(function () {
    subscriber.subscribe()
  })
  .catch(function (e) {
    console.error(e)
  })

})(window.red5prosdk)
```

This will make the Red5 Pro SDL request to subscribe to the HLS stream at:

`http://10.0.0.0:5080/live/mystream.m3u8`
