---
title: Migrating from `5.0.0` to `5.4.0`
description: ""
menu_order: 56
---

# Migrating from `5.0.0` to `5.4.0`

The `5.4.0` release of the Red5 Pro WebRTC SDK saw some minor changes related to WebRTC clients, and in particular how WebSoskcet and RTCPeerConnections are made:

* The default ports used for WebSocket connection change from `8081` and `8083` (insecure and secure, respectively) to `5080` and `443` (insecure and secure, respectively.
  * WebSocket communication with the Red5 Pro Server will now be made over the same port for HTTP/S.
  * To support backward compatiibilty for webapps out in the wild, the WebRTC SDK will recognize previously defaulted values and silently change the values to new default values.
* The `iceServers` configuration property has been deprecated in favor of the new `rtcConfiguration` configuration property.
  * [Refer to section: RTCConfiguration](#rtcconfiguration)

## RTCConfiguration

Prior to the `5.4.0` release of the Red5 Pro WebRTC SDK, configuration of underlying `RTCPeerConnection`s for both publisher and subscriber clients was constructed "under the hood". The only property exposed on the initialization configuration was the `iceServers` property.

Using the `iceServers` configuration property, developers could deine the set of ICE endpoints desired in the peer negotiation process.

The `iceServers` configuration property has been deprecated in favor of the newly introduced `rtcConfiguration` property, exposing to developers more control over the `RTCConfiguration` used when establishing `RTCPeerConnection`s for both publisher and subscriber clients.

The `rtcConfiguration` is an object that directly correlates to the `RTCConfiguration` object that is handed to a `RTCPeerConnection` upon instantiation:

[https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection)

### RTCConfiguration Example

Previously, developers would define the desired ICE endpoints for negotiation using the `iceServers` initialization configuration property:

```js
const config = {
  host: 'myserver.com',
  protocol: 'wss',
  port: 443,
  app: 'live',
  streamName: 'mystream',
  iceServers: [{urls: 'stun:stun2.l.google.com:19302'}]
}
var publisher = new red5prosdk.RTCPublisher()
publisher.init(config)
  .then(() => {
    publisher.publish()
  })
  .catch(error => {
    // handle error.
  })
```

With the introduction of the `rtcConfiguration` initialization configuration property, developers can still define the desired `iceServers` but as a nested attribute in the `rtcConfiguration` map:

```js
const config = {
  host: 'myserver.com',
  protocol: 'wss',
  port: 443,
  app: 'live',
  streamName: 'mystream',
  rtcConfiguration: {
    iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
    iceCandidatePoolSize: 2,
    bundlePolicy: 'max-bundle'
  }
}
var publisher = new red5prosdk.RTCPublisher()
publisher.init(config)
  .then(() => {
    publisher.publish()
  })
  .catch(error => {
    // handle error.
  })
```

> The `rtcConfiguration` is an object that directly correlates to the `RTCConfiguration` object that is handed to a `RTCPeerConnection` upon instantiation: [https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection)
