---
title: Migrating from `7.2.0` to `8.0.0`
description: ""
menu_order: 54
---

# Important Note About `8.0.0` Release

**Red5 Pro SDK has been published on NPM!**

While currently not open source, the SDK build has been published to NPM to allow you to integrate into your projects with greater ease and dependency management.

## Install as `script` in HTML page

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

... or if you know the version:

```
<script src="https://unpkg.com/red5pro-webrtc-sdk@8.0.0/red5pro-sdk.min.js"></script>
```

## Install using `npm` or `yarn` for you browser-based projects

```
npm install --save-dev red5pro-webrtc-sdk
```

```
yarn install --dev red5pro-webrtc-sdk
```

### Usage

All members exposed on the otherwise global `window.red5prosdk` if loading as a script on an HTML page are importable from the `red5pro-webrtc-sdk` module:

_publisher-example.js_

```
import { RTCPublisher } from 'red5pro-webrtc-sdk'
```

# Updates and Modifications in `8.0.0`

The `8.0.0` release of the Red5 Pro HTML SDK includes the ability for WebRTC based clients - `RTCPublisher` and `RTCSubscriber` - to use WebSockets only for signaling purposes. Once they have finished their negotiation process and have begun broadcasting or consuming a stream, repsectively, they will open a `RTCDataChannel` connection and close the underlying `WebSocket` used for signaling.

The benefit of closing the `WebSocket` and switching to a `RTCDataChannel` after signaling is complete is cutting down on the number of open socket connections to the server; in a Stream Manager Proxy scenario, this can be a significant benefit as the Proxy is no longer needed to keep alive while the stream is being delivered to the Origin(s) or from the Edge(s).

## Configuration

The initialization configuration object for the `RTCPublisher` and `RTCSubscriber` have the following attribute that flags whether to use the `WebSocket` only as a signaling connection:

* `signalingSocketOnly`

If `true`, the `RTCPublisher` and `RTCSubscriber` will use a `WebSocket` to establish an `RTCPeerConnection` and once established, will switch over to using a `RTCDataChannel` to do any event handling and futher communication with the server. _It is set to `true`, by default._

> Further communication could be calling the Mute API for `RTCPublisher` and Standby API for `RTCSubscriber`.

By setting `signalingSocketOnly` to `true` the switch works seemlessly under the hood, allowing you - as a developer - to not care about how to switch the message transport layers explicitly.

An additional initialization configuration is also available as it relates to the switch to `RTCDataChannel` after signalling is complete:

* `dataChannelConfiguration`

By default, the `dataChannelConfiguration` has the following structure and declaration:

```js
dataChannelConfiguration = {
  name: 'red5pro'
}
```

The `name` value will be used in the underlying `RTCDataChannel` created from the `RTCPeerConnection`.

> It should be noted that any `Red5ProSharedObject` instances created using an underlying connection through a `RTCPublisher` or `RTCSubscriber` will be switched over to using `RTCDataChannel` for communication.
 
## Access

Once the `RTCDataChannel` has been switched to from the `WebSocket`, you can access the instance from `RTCPublisher` and `RTCSubsciber` by calling the following:

```js
+ getDataChannel()
```

The will return the actual underlying `RTCDataChannel` instance used in communication.

## Events

The following events have been added to the `RTCPublisher` and `RTCSubscriber` that can be listened to:

|  |  |
|---|---|---|
| `DATA_CHANNEL_AVAILABLE` | 'WebRTC.DataChannel.Available' |  the underlying `RTCDataChannel` is available when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_OPEN` | 'WebRTC.DataChannel.Open' | When the underlying `RTCDataChannel` is opened when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_CLOSE` | 'WebRTC.DataChannel.Close' | When the underlying `RTCDataChannel` is closed when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_ERROR` | 'WebRTC.DataChannel.Error' | When an error has occurred within the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |
| `DATA_CHANNEL_MESSAGE` | 'WebRTC.DataChannel.Message' | When a message has been delivered over the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used. |