---
title: WebRTC Configuration Properties
description: ""
menu_order: 7
---

# Init Configuration

## WHIPClient

When using the `init()` call of a `WHIPClient` - or, alternatively, when using a **WHIP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property                   | Required |                         Default                         | Description                                                                                                                                                                                               |
| :------------------------- | :------: | :-----------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| `host`                     |   [x]    |                         _None_                          | The IP or address that the WebSocket server resides on.                                                                                                                                                   |
| `streamName`               |   [x]    |                         _None_                          | The name of the stream to subscribe to.                                                                                                                                                                   |
| `protocol`                 |   [x]    |                         `https`                         | The protocol of the host for the signaling communication.                                                                                                                                                 |
| `port`                     |   [x]    |                          `443`                          | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively).                                                                                                 |
| `app`                      |   [x]    |                         `live`                          | The webapp context name that the stream is on.                                                                                                                                                            |
| `endpoint`                 |   [-]    |                       `undefined`                       | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**                                                                                      |
| `streamMode`               |   [x]    |                         `live`                          | The mode to broadcast; `live`, `record` or `append`.                                                                                                                                                      |
| `keyFramerate`             |   [-]    |                         `3000`                          | The framerate (in milliseconds) between sending key frames in broadcast.                                                                                                                                  |
| `mediaElementId`           |   [-]    |                   `red5pro-publisher`                   | The target `video` or `audio` element `id` attribute which will display the preview media.                                                                                                                |
| `rtcConfiguration`         |   [-]    |                         _Basic_                         | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)     |
| `includeDataChannel`       |   [-]    |                         `true`                          | Flag to open a datachannel for messaging between server and client once connection is established.                                                                                                        |
| `dataChannelConfiguration` |   [-]    |                   `{name: "red5pro"}`                   | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_                                                                                            |
| `iceTransport`             |   [-]    |                          `UDP`                          | The transport type to use in ICE negotiation. Either `UDP` or `TCP`                                                                                                                                       |
| `bandwidth`                |   [-]    |                `{audio: 56, video: 750}`                | A configuration object to setup bandwidth setting in publisher.                                                                                                                                           |
| `connectionParams`         |   [-]    |                       `undefined`                       | An object of connection parameters to send to the server upon connection request.                                                                                                                         |
| `mediaConstraints`         |   [x]    | [see below](#using-mediaconstraints-and-ongetusermedia) | A object representative of the [Media Constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) to use while setting up the Media (via `getUserMedia` internally to the SDK). |
| `onGetUserMedia`           |   [-]    | [see below](#using-mediaconstraints-and-ongetusermedia) | An override method for performing your own `getUserMedia` request. Expected return is a `Promise`                                                                                                         |
| `videoEncoding`            |   [-]    |                       `undefined`                       | `PublishVideoEncoder` enum: `VP8`                                                                                                                                                                         | `H264` | `H265` . |
| `audioEncoding`            |   [-]    |                       `undefined`                       | `PublishAudioEncoder` enum.                                                                                                                                                                               |
| `offerSDPResolution`       |   [-]    |                         `false`                         | Request to send the initial resolution on the SDP offer in an attribute line with the following format: `a=framesize:${width}-${height}`                                                                  |
| `stats`                    |   [-]    |                         _None_                          | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information.                                                                                                  |

## Using MediaConstraints and onGetUserMedia

The Red5 Pro WebRTC SDK will handle the `getUserMedia` requirements internally to set up your Camera and/or Microphone for a broadcast. As such, you can provide the [Media Constraint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) object to be used on the `init` configuration:

```js
const config = {
  host: "mycloud.red5",
  streamName: "mystream",
  mediaConstraints: {
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1280,
      },
      height: {
        min: 360,
        max: 720,
      },
      frameRate: {
        min: 15,
        max: 60,
      },
    },
  },
};

const publisher = new WHIPClient();
await publisher.init(config);
await publisher.publish();
```

Internally, the Red5 Pro WebRTC SDK will use the provided _Media Constraint_ to test if the resolutions requested are supported by the browser. If not, it will find the nearest supported lower neighbor based on the originally provided area dimension(s) of the resolutions.

> If you would like to bypass the internal determination of resolution, you can use the `onGetUserMedia` override of the configuration properties.

If you know exactly the proper configurations needed for your requirements and would like to fine-tune the generated `MediaStream` to be used in the broadcast, you can also optionally return that using the `onGetUserMedia` init configuration:

```js
const config = {
  host: "mycloud.red5",
  streamName: "mystream",
  onGetUserMedia: () => {
    return navigator.getUserMedia({
      audio: true,
      video: {
        width: {
          min: 640,
          max: 1280,
        },
        height: {
          min: 360,
          max: 720,
        },
        frameRate: {
          min: 15,
          max: 60,
        },
      },
    });
  },
};

const publisher = new WHIPClient();
await publisher.init(config);
await publisher.publish();
```

The `onGetUserMedia` method - when defined on the configuration provide to a WebRTC-based Publisher - will override the internal call to `getUserMedia` in the Red5 Pro WebRTC SDK.

You can provide your own logic on how `getUserMedia` is invoked and a [Media Stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) attained by setting the `onGetUserMedia` attribute to a method that conforms to the following guidelines:

- No input arguments are provided to `onGetUserMedia`.
- It is _expected_ that a `Promise` object is returned.
- A `MediaStream` object must be provided in the resolve of the `Promise`.
- The error provided in the reject of the `Promise` is optional, but recommended as a `String`.

Be aware that overriding `onGetUserMedia` you are losing the logic from the Red5 Pro WebRTC SDK that attempts to pick the optimal resolution supported by your browser. **Use with descretion.**

> To read more about `getUserMedia` please read the following document from Mozilla Developer Network: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

## WHEPClient

When using the `init()` call of a `WHEPClient` - or, alternatively, when using a **WHEP** endpoint with additional options in the constructor - the following initialization properties are available:

| Property                    | Required | Default              | Description                                                                                                                                                                                                                                                                                                                           |
| :-------------------------- | :------: | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`                      |   [x]    | _None_               | The IP or address that the WebSocket server resides on.                                                                                                                                                                                                                                                                               |
| `streamName`                |   [x]    | _None_               | The name of the stream to subscribe to.                                                                                                                                                                                                                                                                                               |
| `protocol`                  |   [x]    | `https`              | The protocol of the host for the signaling communication.                                                                                                                                                                                                                                                                             |
| `port`                      |   [x]    | `443`                | The port on the host that the Red5 server listens on; `5080` or `443` (insecure or secure, respectively).                                                                                                                                                                                                                             |
| `app`                       |   [x]    | `live`               | The webapp context name that the stream is on.                                                                                                                                                                                                                                                                                        |
| `endpoint`                  |   [-]    | `undefined`          | The full URL of the endpoint to stream to. **This is primarily used in Stream Manager 2.0 integration for clients.**                                                                                                                                                                                                                  |
| `mediaElementId`            |   [-]    | `red5pro-subscriber` | The target `video` or `audio` element `id` attribute which will display the stream.                                                                                                                                                                                                                                                   |
| `rtcConfiguration`          |   [-]    | _Basic_              | The `RTCConfiguration` to use in setting up `RTCPeerConnection`. [RTCConfiguration](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary)                                                                                                                                 |
| `includeDataChannel`        |   [-]    | `true`               | Flag to open a datachannel for messaging between server and client once connection is established.                                                                                                                                                                                                                                    |
| `dataChannelConfiguration`  |   [-]    | `{name: "red5pro"}`  | An object used in configuring a n `RTCDataChannel`. _Only used when `includeDataChannel` is defined as `true`_                                                                                                                                                                                                                        |
| `iceTransport`              |   [-]    | `UDP`                | The transport type to use in ICE negotiation. Either `UDP` or `TCP`                                                                                                                                                                                                                                                                   |
| `subscriptionId`            |   [x]    | auto-generated       | A unique string representing the requesting client.                                                                                                                                                                                                                                                                                   |
| `connectionParams`          |   [-]    | `undefined`          | An object of additional connection parameters to send to the server upon connection request.                                                                                                                                                                                                                                          |
| `videoEncoding`             |   [-]    | _None_               | Specifies target video encoder.                                                                                                                                                                                                                                                                                                       |
| `audioEncoding`             |   [-]    | _None_               | Specifies target audio encoder.                                                                                                                                                                                                                                                                                                       |
| `muteOnAutoplayRestriction` |   [-]    | `true`               | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser.                                                                                                                                                                                                                                             |
| `buffer`                    |   [-]    | `0`                  | Request to set a buffer - in seconds - for playback.                                                                                                                                                                                                                                                                                  |
| `maintainStreamVariant`     |   [-]    | `false`              | Flag to instruct the server - when utilizing transcoding - to not switch subscriber stream variants when network conditions change. By setting this to `true`, when you request to playback a stream that is transcoded, the server will not deliver a variant of higher or lower quality dependending on current network conditions. |
| `stats`                     |   [-]    | _None_               | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information.                                                                                                                                                                                                                              |

## Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHEPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.

The configuration used for statistics monitoring has the following structure:

```js
{
  // Optional.
  // If provided, it will POST stats to this endpoint.
  // If undefined, it will post stats to message transport.
  // If null, it will only emit status events.
  endpoint: undefined,
  additionalHeaders: undefined,
  interval: 5000, // Interval to poll stats, in milliseconds.
  include: [], // Empty array allows SDK to be judicious about what stats to include.
}
```

### endpoint

- If the `endpoint` is defined, the SDK will attempt to make `POST` requests with a JSON body representing each individual report.
- If the `endpoint` is left `undefined`, the SDK will post metadata with type `stats-report` on the underlying message transport (DataChannel) if available.
- If the `endpoint` is set to `null`, the SDK will only emit events with the metadata on the `WebRTC.StatsReport` event.

### additionalHeaders

By default, if an `endpoint` is defined, the `POST` request body will be in JSON and have the `{ 'Content-Type': 'application/json' }` header set. If requirements - such as authentication - are required, a map of additional headers can be provided to be sent along with the request.

### interval

The polling interval (in milliseconds) to access the `RTCStatsReport` from the underlying `RTCPeerConnection` of the subscriber client.

### include

An array of static type strings. These directly map to the listing of type available for `RTCStatsReport` objects. If left empty or undefined, the SDK will report the statistics it deems suitable for tracking proper broadcast conditions.

e.g.,

```js
include: ["inbound-rtp", "transport"];
```

> More information about the statistic types are available at [https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#the_statistic_types)

### Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCSubscriberStats",
  "created": 1727789134165,
  "device": {
    "browser": "chrome",
    "version": 129,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "stream1",
    "subscriptionId": "subscriber-922e"
  },
  "type": "stats-report",
  "timestamp": 1727789139169,
  "data": {
    "type": "inbound-rtp",
    "kind": "video",
    "codecId": "CIT01_102_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
    "jitter": 0.005,
    "packetsLost": 0,
    "packetsReceived": 439,
    "bytesReceived": 412627,
    "firCount": 0,
    "frameWidth": 640,
    "frameHeight": 480,
    "framesDecoded": 143,
    "framesDropped": 0,
    "framesPerSecond": 30,
    "framesReceived": 143,
    "freezeCount": 0,
    "keyFramesDecoded": 3,
    "nackCount": 0,
    "pauseCount": 0,
    "pliCount": 0,
    "totalFreezesDuration": 0,
    "totalPausesDuration": 0,
    "estimatedBitrate": 660
  }
}
```
