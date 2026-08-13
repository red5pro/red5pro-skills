_From: WHIP Client_

## Using Init with a Configuration

If not using the first option of providing a **WHIP** endpoint in the constructor, you would simply instantiate the `WHIPClient` and use the `init()` and `publish()` calls to establish a connection and broadcast:

```js
try {
    const publisher = new WHIPClient()
    publisher.on('*', , (event) => console.log(event))

    // See next section: Init Configuration, for more details.
    await publisher.init(configuration)
    await publisher.publish()
} catch (error) {
    // Something went wrong...
}
```

> Note: If integrating with Red5 Cloud deployment with Stream Manager, you will need to provide an `endpoint` init configuration property. More details in next section of this document.

# Init Configuration

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
