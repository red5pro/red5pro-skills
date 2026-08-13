_From: WHEP Client_

## Using Init with a Configuration

If not using the first option of providing a **WHEP** endpoint in the constructor, you would simply instantiate the `WHEPClient` and use the `init()` and `subscribe()` calls to establish a connection and playback:

```js
try {
    const subscriber = new WHEPClient()
    subscriber.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await subscriber.init(configuration)
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

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
| `muteOnAutoplayRestriction` |   [-]    | `true`               | Flag to attempt to mute the `video` element when `autoplay` is restricted in the browser. [See section on Autoplay Restrictions](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-subscriber-other-information/)                                                                                                                                                             |
| `buffer`                    |   [-]    | `0`                  | Request to set a buffer - in seconds - for playback.                                                                                                                                                                                                                                                                                  |
| `maintainStreamVariant`     |   [-]    | `false`              | Flag to instruct the server - when utilizing transcoding - to not switch subscriber stream variants when network conditions change. By setting this to `true`, when you request to playback a stream that is transcoded, the server will not deliver a variant of higher or lower quality dependending on current network conditions. |
| `stats`                     |   [-]    | _None_               | Configuration object to enable stats reporting. See [Stats Reporting](#statistics) for more information.                                                                                                                                                                                                                              |
| `liveSeek`                  |   [-]    | _None_               | Configuration object to enable live seek capability. See [Live Seek](#live-seek) for more information.                                                                                                                                                                                                                                |

# Events

The `WHEPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
const handleSubscriberEvent = (event) => {
  // The name of the event:
  const { type } = event;
  // The dispatching subscriber instance:
  const { subscriber } = event;
  // Optional data releated to the event (not available on all events):
  const { data } = event;
};

const subscriber = new WHEPClient();
subscriber.on("*", handleSubscriberEvent);
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off("*", handleSubscriberEvent);
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHEPClient` and enumerated on the `SubscriberEventTypes` object:

| Access                     | Event Type                         | Meaning                                                                                                                                                                                                                                                                                                                                       |
| :------------------------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONNECT_SUCCESS`          | 'Connect.Success'                  | When the subscriber has established a required remote connection, such as to a WebSocket server.                                                                                                                                                                                                                                              |
| `CONNECT_FAILURE`          | 'Connect.Failure'                  | When the subscriber has failed to establish a required remote connection for consuming a stream.                                                                                                                                                                                                                                              |
| `SUBSCRIBE_START`          | 'Subscribe.Start'                  | When the subscriber has started a subscribing to a stream.                                                                                                                                                                                                                                                                                    |
| `SUBSCRIBE_STOP`           | 'Subscribe.Stop'                   | When the subscriber has successfully closed an active subscription to a stream.                                                                                                                                                                                                                                                               |
| `SUBSCRIBE_METADATA`       | 'Subscribe.Metadata'               | When metadata is received on the client from the server.                                                                                                                                                                                                                                                                                      |
| `VIDEO_DIMENSIONS_CHANGE`  | 'Subscribe.VideoDimensions.Change' | Invoked when `video` element has loaded metadata and the incoming stream dimensions are available.                                                                                                                                                                                                                                            |
| `ORIENTATION_CHANGE`       | 'Subscribe.Orientation.Change'     | Invoked when an orientation change is detected in metadata. Mobile (iOS and Android) broadcasts are sent with an orientation.                                                                                                                                                                                                                 |
| `STREAMING_MODE_CHANGE`    | 'Subscribe.StreamingMode.Change'   | Invoked when the broadcast has "muted" either or both their video and audio tracks.                                                                                                                                                                                                                                                           |
| `VOLUME_CHANGE`            | 'Subscribe.Volume.Change'          | Invoked when a change to volume is detected during playback. _From 0 to 1._                                                                                                                                                                                                                                                                   |
| `PLAYBACK_TIME_UPDATE`     | 'Subscribe.Time.Update'            | Invoked when a change in playhead time is detected during playback. _In seconds._                                                                                                                                                                                                                                                             |
| `PLAYBACK_STATE_CHANGE`    | 'Subscribe.Playback.Change'        | Invoked when a change in playback state has occured, such as when going from a `Playback.PAUSED` state to `Playback.PLAYING` state.                                                                                                                                                                                                           |
| `FULL_SCREEN_STATE_CHANGE` | 'Subscribe.FullScreen.Change'      | Invoked when a change in fullscreen state occurs during playback.                                                                                                                                                                                                                                                                             |
| `AUTO_PLAYBACK_FAILURE`    | 'Subscribe.Autoplay.Failure'       | Invoked when an attempt to `autoplay` on a media element throws a browser exception; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-subscriber-other-information/)                                                                       |
| `AUTO_PLAYBACK_MUTED`      | 'Subscribe.Autoplay.Muted'         | Invoked when an attempt to `autoplay` on a media element throws a browser exception and is muted based on the `muteOnAutoplayRestriction` config property; typically due to browser security restrictions and their autoplay policies. (WebRTC and HLS, only) [See section on Autoplay Restrictions](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-subscriber-other-information/) |

In addition to the above events, the following events are also dispatched from a `WHEPClient` and are defined on the `RTCSubscriberEventTypes` enum:

| Access                      | Event Type                        | Meaning                                                                                                                                                                                                               |
| :-------------------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available' | When the negotation process has produced a valid `PeerConnection`.                                                                                                                                                    |
| `OFFER_START`               | 'WebRTC.Offer.Start'              | When the subscriber requests to start an offer on the `PeerConnection`.                                                                                                                                               |
| `OFFER_END`                 | 'WebRTC.Offer.End'                | When the subscriber has received a `SessionDescription` from a requested offer over the `PeerConnection`.                                                                                                             |
| `ANSWER_START`              | 'WebRTC.Answer.Start'             | When the subscriber requests to send an answer on the `PeerConnection`.                                                                                                                                               |
| `ANSWER_END`                | 'WebRTC.Answer.End'               | When the subscriber has received an answer (in form of a `MediaStream`) over the `PeerConnection`.                                                                                                                    |
| `CANDIDATE_CREATE`          | 'WebRTC.Candidate.Create'         | When the subscriber requests to send a candidate on the `PeerConnection`.                                                                                                                                             |
| `CANDIDATE_RECEIVE`         | 'WebRTC.Candidate.Receive'        | When the subscriber has received a candidate over the `PeerConnection`.                                                                                                                                               |
| `ICE_TRICKLE_COMPLETE`      | 'WebRTC.IceTrickle.Complete'      | When the negotaiton process (a.k.a. trickle) has completed and the subscriber will attempt at consuming a stream.                                                                                                     |
| `ON_ADD_STREAM`             | 'WebRTC.Add.Stream'               | When a `MediaStream` object has become available for playback.                                                                                                                                                        |
| `TRACK_ADDED`               | 'WebRTC.PeerConnection.OnTrack'   | When a MediaTrack has become available on the underlying `RTCPeerConnection`.                                                                                                                                         |
| `DATA_CHANNEL_AVAILABLE`    | 'WebRTC.DataChannel.Available'    | the underlying `RTCDataChannel` is available when `includeDataChannel` configuration is used.                                                                                                                         |
| `DATA_CHANNEL_OPEN`         | 'WebRTC.DataChannel.Open'         | When the underlying `RTCDataChannel` is opened when `signalingServerOnly` configuration is used.                                                                                                                      |
| `DATA_CHANNEL_CLOSE`        | 'WebRTC.DataChannel.Close'        | When the underlying `RTCDataChannel` is closed when `includeDataChannel` configuration is used.                                                                                                                       |
| `DATA_CHANNEL_ERROR`        | 'WebRTC.DataChannel.Error'        | When an error has occurred within the underlying `RTCDataChannel` when `includeDataChannel` configuration is used.                                                                                                    |
| `DATA_CHANNEL_MESSAGE`      | 'WebRTC.DataChannel.Message'      | When a message has been delivered over the underlying `RTCDataChannel` when `includeDataChannel` configuration is used.                                                                                               |
| `HOST_ENDPOINT_CHANGED`     | 'WebRTC.Endpoint.Changed'         | Notification when the endpoint on which to signal and stream from has been asigned.                                                                                                                                   |
| `SUBSCRIBE_STREAM_SWITCH`   | 'WebRTC.Subscribe.StreamSwitch'   | Notification when request to switch stream on the connection is completed.                                                                                                                                            |
| `STATS_REPORT`              | 'WebRTC.Stats.Report'             | Notification of a statistics report generated from the stream connection. _Statistics are only reported based on the availability of `stats` on the init configuration or after calling [monitorStats](#statistics)._ |
| `LIVE_SEEK_UNSUPPORTED`     | 'WebRTC.LiveSeek.Unsupported'     | When `liveSeek` is specified but the browser does not support th integration of HLS.JS for Live VOD playback.                                                                                                         |
| `LIVE_SEEK_ENABLED`         | 'WebRTC.LiveSeek.Enabled'         | When `liveSeek` is used to playback Live VOD and the HLS video has been loaded and available to seek.                                                                                                                 |
| `LIVE_SEEK_DISABLED`        | 'WebRTC.LiveSeek.Disabled'        | When `liveSeek` is used to playback Live VOD and HLS video has not been loaded nor available to seek.                                                                                                                 |
| `LIVE_SEEK_ERROR`           | 'WebRTC.LiveSeek.Error'           | When `liveSeek` is used to playback Live VOD and HLS video and an error in playback has occurred. Inspect the `error` attribute on the event for more details.                                                        |
| `LIVE_SEEK_LOADING`         | 'WebRTC.LiveSeek.FragmentLoading' | When `liveSeek` is used to playback Live VOD and HLS video in currently loading a fragment during seeking.                                                                                                            |
| `LIVE_SEEK_LOADED`          | 'WebRTC.LiveSeek.FragmentLoaded'  | When `liveSeek` is used to playback Live VOD and HLS video has completed loading a fragment during seeking.                                                                                                           |
| `LIVE_SEEK_CHANGE`          | 'WebRTC.LiveSeek.Change           | When `liveSeek` is used, this event notifies on a change of state going from "live" to "vod" and vice versa.                                                                                                          |

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHEPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.
