_From: WHIP Client_

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

# Events

The `WHIPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a publisher:

```js
const handlePublisherEvent = (event) => {
  // The name of the event:
  const { type } = event;
  // The dispatching publisher instance:
  const { publisher } = event;
  // Optional data releated to the event (not available on all events):
  const { data } = event;
};

const publisher = new WHIPClient();
publisher.on("*", handlePublisherEvent);
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the publisher instance will invoke the assign event handler.

To unsubscribe to all events from a publisher after assinging an event handler:

```js
publisher.off("*", handlePublisherEvent);
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.

You can also listen to events individually. The following describe the various events that can be listened for on the `WHIPClient` and enumerated on the `PublisherEventTypes` object:

| Access                           | Event Type                            | Meaning                                                                                                                                                                                                    |
| :------------------------------- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONNECT_SUCCESS`                | 'Connect.Success'                     | When the publisher has established a required remote connection, such as to a WebSocket or RTMP-based server.                                                                                              |
| `CONNECT_FAILURE`                | 'Connect.Failure'                     | When the publisher has failed to establish a required remote connection for streaming.                                                                                                                     |
| `PUBLISH_START`                  | 'Publish.Start'                       | When the publisher has started a broadcast stream.                                                                                                                                                         |
| `PUBLISH_FAIL`                   | 'Publish.Fail'                        | When the publisher has failed to start a broadcast stream.                                                                                                                                                 |
| `PUBLISH_INVALID_NAME`           | 'Publish.InvalidName'                 | When the publisher is rejected from starting a broadcast stream because the `streamName` provided is already in use.                                                                                       |
| `UNPUBLISH_SUCCESS`              | 'Unpublish.Success'                   | When the publisher has successfully closed an active broadcast stream.                                                                                                                                     |
| `PUBLISH_METADATA`               | 'Publish.Metadata'                    | When the publisher receives metadata from the server.                                                                                                                                                      |
| `PUBLISH_STATUS`                 | 'Publish.Status'                      | When a status event of the publisher has been receieved from the server.                                                                                                                                   |
| `PUBLISH_AVAILABLE`              | 'Publish.Available'                   | When the publisher stream has become available on the origin server to be consumed. This will follow the connection setup and `Publish.Start` event.                                                       |
| `PUBLISH_INSUFFICIENT_BANDWIDTH` | 'Publish.InsufficientBW'              | When the current broadcast session is experiencing insufficient bandwidth conditions.                                                                                                                      |
| `PUBLISH_RECOVERING_BANDWIDTH`   | 'Publish.RecoveringBW'                | Then the current broadcast has updated information related to bandwidth condition recovery.                                                                                                                |
| `PUBLISH_SUFFICIENT_BANDWIDTH`   | 'Publish.SufficientBW'                | When the current broadcast session has sufficient bandwidth conditions from previously experiencing network issues.                                                                                        |
| `CONNECTION_CLOSED`              | 'Publisher.Connection.Closed'         | Invoked when a close to the connection is detected.                                                                                                                                                        |
| `DIMENSION_CHANGE`               | 'Publisher.Video.DimensionChange'     | Notification when the Camera resolution has been set or change.                                                                                                                                            |
| `STATISTICS_ENDPOINT_CHANGE`     | 'Publisher.StatisticsEndpoint.Change' | Notification that the server has signaled a change in endpoint to deliver WebRTC Statistics based on RTCStatsReports. _Statistics are only reported after calling [monitorStats](#monitoring-statistics)._ |

In addition to the above events, the following events are also dispatched from a `WHIPClient` and are defined on the `RTCPublisherEventTypes` enum:

| Access                      | Event Type                         | Meaning                                                                                                                                                                                                                                                                                        |
| :-------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONSTRAINTS_ACCEPTED`      | 'WebRTC.MediaConstraints.Accepted' | When constraints have been accepted from the internal request to `getUserMedia`. The `data` property of this event contains a `requested` object detailing the constraints used in the `getUserMedia` request and an `accepted` object which is the current constraint settings for the media. |
| `CONSTRAINTS_REJECTED`      | 'WebRTC.MediaConstraints.Rejected' | Then constraints have been rejected from the internal request to `getUserMedia`. The `data` property of this event contains a `constraints` object detailing the constraints that were used and rejected from `getUserMedia`.                                                                  |
| `MEDIA_STREAM_AVAILABLE`    | 'WebRTC.MediaStream.Available'     | When the negotation process has returned a `MediaStream` object to use.                                                                                                                                                                                                                        |
| `PEER_CONNECTION_AVAILABLE` | 'WebRTC.PeerConnection.Available'  | When the negotation process has produced a valid `PeerConnection`.                                                                                                                                                                                                                             |
| `OFFER_START`               | 'WebRTC.Offer.Start'               | When the publisher requests to send an offer using a `SessionDescription` on the `PeerConnection`.                                                                                                                                                                                             |
| `OFFER_END`                 | 'WebRTC.Offer.End'                 | When the publisher has received an answer from the `SDP` offer on the `PeerConnection`.                                                                                                                                                                                                        |
| `CANDIDATE_CREATE`          | 'WebRTC.Candidate.Create'          | When the publisher requests to send a candidate on the `PeerConnection`.                                                                                                                                                                                                                       |
| `CANDIDATE_RECEIVE`         | 'WebRTC.Candidate.Receive'         | When the publisher has received a candidate over the `PeerConnection`.                                                                                                                                                                                                                         |
| `ICE_TRICKLE_COMPLETE`      | 'WebRTC.IceTrickle.Complete'       | When the negotaiton process (a.k.a. trickle) has completed and the publisher will attempt at opening a broadcast stream.                                                                                                                                                                       |
| `DATA_CHANNEL_AVAILABLE`    | 'WebRTC.DataChannel.Available'     | the underlying `RTCDataChannel` is available when `signalingSocketOnly` configuration is used.                                                                                                                                                                                                 |
| `DATA_CHANNEL_OPEN`         | 'WebRTC.DataChannel.Open'          | When the underlying `RTCDataChannel` is opened when `signalingSocketOnly` configuration is used.                                                                                                                                                                                               |
| `DATA_CHANNEL_CLOSE`        | 'WebRTC.DataChannel.Close'         | When the underlying `RTCDataChannel` is closed when `signalingSocketOnly` configuration is used.                                                                                                                                                                                               |
| `DATA_CHANNEL_ERROR`        | 'WebRTC.DataChannel.Error'         | When an error has occurred within the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used.                                                                                                                                                                            |
| `DATA_CHANNEL_MESSAGE`      | 'WebRTC.DataChannel.Message'       | When a message has been delivered over the underlying `RTCDataChannel` when `signalingSocketOnly` configuration is used.                                                                                                                                                                       |
| `STATS_REPORT`              | 'WebRTC.Stats.Report'              | An RTCStatsReport has been captured by the WebRTC client based on configurations from calling [monitorStats](#statistics).                                                                                                                                                                     |

# Statistics

With the `15.0.0` release of the SDK, we introduced statistics monitoring for `WHIPClient` to support the ability to monitor and POST statistics report data based on the underlying `RTCPeerConnection` of the client.
