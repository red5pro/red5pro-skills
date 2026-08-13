---
title: API Reference
menu_order: 6
---

Complete API reference for the Red5 iOS SDK (`Red5WebRTCKit`).

<div style={{margin: '16px 0'}}>
  <button id="copyLLMBtn" onclick="(function(){var el=document.querySelector('article')||document.querySelector('main')||document.querySelector('.entry-content')||document.querySelector('.content')||document.body;navigator.clipboard.writeText(el.innerText).then(function(){var f=document.getElementById('copyFeedback');f.style.display='inline';setTimeout(function(){f.style.display='none'},2000)});})()" style={{background:'#000',color:'#fff',border:'none',padding:'8px 18px',borderRadius:'4px',cursor:'pointer',fontSize:'13px',fontFamily:'inherit'}}>Copy for LLMs</button>
  <span id="copyFeedback" style={{display:'none',marginLeft:'10px',color:'#27ae60',fontSize:'13px'}}>Copied!</span>
</div>

---

## Red5WebrtcClientBuilder

Builder for constructing a `Red5WebrtcClient` instance. Chain setters and call `build()` to create the client.

```swift
let client = Red5WebrtcClientBuilder()
    .setStreamManagerHost("userid-xxx.cloud.red5.net")
    .setLicenseKey("XXXX-XXXX-XXXX-XXXX")
    .setEventListener(self)
    .build()
```

### Connection

| Method | Returns | Description |
|---|---|---|
| `setServerIp(_ serverIp: String)` | `Self` | Standalone server IP address |
| `setStreamManagerHost(_ host: String)` | `Self` | Stream Manager host (Red5 Cloud) |
| `setPort(_ port: Int)` | `Self` | Server port (default: `443`) |
| `setAppName(_ appName: String)` | `Self` | App/scope name (default: `"live"`) |
| `setStreamName(_ streamName: String)` | `Self` | Stream name |
| `setNodeGroup(_ nodeGroup: String)` | `Self` | Node group name |
| `setMode(_ mode: String)` | `Self` | Client mode (`"publish"` or `"subscribe"`) |

### Authentication

| Method | Returns | Description |
|---|---|---|
| `setLicenseKey(_ licenseKey: String)` | `Self` | Red5 Pro license key |
| `setUserName(_ userName: String)` | `Self` | Username for auth |
| `setPassword(_ password: String)` | `Self` | Password for auth |
| `setToken(_ token: String)` | `Self` | Auth token |
| `setAuthToken(_ authToken: String)` | `Self` | Bearer auth token (sent as `Authorization` header) |
| `setStreamManagerAdminUsername(_ username: String)` | `Self` | Stream Manager admin username |
| `setStreamManagerAdminPassword(_ password: String)` | `Self` | Stream Manager admin password |

### Video

| Method | Returns | Description |
|---|---|---|
| `setVideoEnabled(_ videoEnabled: Bool)` | `Self` | Enable or disable video (default: `true`) |
| `setVideoWidth(_ videoWidth: Int)` | `Self` | Capture width in pixels (default: `640`) |
| `setVideoHeight(_ videoHeight: Int)` | `Self` | Capture height in pixels (default: `480`) |
| `setVideoFps(_ videoFps: Int)` | `Self` | Frame rate (default: `30`) |
| `setVideoBitrate(_ videoBitrate: Int)` | `Self` | Bitrate in kbps (default: `500`) |
| `setVideoCodec(_ videoCodec: String)` | `Self` | Video codec (default: `"H264"`) |
| `setVideoSource(_ videoSource: StreamSource)` | `Self` | Camera or screen source |
| `setVideoRenderer(_ videoRenderer: RTCVideoRenderer)` | `Self` | Renderer for local/remote video |
| `setScalingType(_ scalingType: VideoScalingType)` | `Self` | Video scaling mode |
| `setKeyFramerate(_ keyFramerate: Int)` | `Self` | Key frame interval (default: `30`) |

### Audio

| Method | Returns | Description |
|---|---|---|
| `setAudioEnabled(_ audioEnabled: Bool)` | `Self` | Enable or disable audio (default: `true`) |
| `setUseHardwareAcousticEchoCanceler(_ value: Bool)` | `Self` | Hardware AEC (default: `true`) |
| `setUseHardwareNoiseSuppressor(_ value: Bool)` | `Self` | Hardware noise suppressor (default: `true`) |
| `setNoAudioProcessing(_ value: Bool)` | `Self` | Disable all audio processing (default: `false`) |
| `setCustomAudioFeed(_ value: Bool)` | `Self` | Use a custom audio source (default: `false`) |
| `setBluetoothEnabled(_ value: Bool)` | `Self` | Bluetooth audio routing (default: `false`) |

### Network / ICE

| Method | Returns | Description |
|---|---|---|
| `addIceServer(_ iceServer: RTCIceServer)` | `Self` | Add a STUN or TURN server |
| `setTurnServer(uri:username:password:)` | `Self` | Convenience method to add a TURN server |
| `setTrickleIce(_ trickleIce: Bool)` | `Self` | Enable trickle ICE (default: `true`) |
| `setTcpCandidatePolicy(_ policy: RTCTcpCandidatePolicy)` | `Self` | TCP candidate policy (default: `.enabled`) |
| `setDtlsSetup(_ dtlsSetup: String)` | `Self` | DTLS setup role: `"active"`, `"passive"`, or `"actpass"` |

### Hardware & Advanced

| Method | Returns | Description |
|---|---|---|
| `setHwCodecAcceleration(_ value: Bool)` | `Self` | Hardware codec acceleration (default: `true`) |
| `setDataChannelEnabled(_ value: Bool)` | `Self` | Enable WebRTC data channel (default: `true`) |
| `setSignalEnabled(_ value: Bool)` | `Self` | Enable signaling (default: `true`) |
| `setInitiateBeforeStream(_ value: Bool)` | `Self` | Initiate connection before streaming (default: `false`) |
| `setReconnectionEnabled(_ value: Bool)` | `Self` | Auto-reconnect on disconnect (default: `false`) |
| `setViewController(_ vc: UIViewController)` | `Self` | Associate a view controller |

### Chat (PubNub)

| Method | Returns | Description |
|---|---|---|
| `setPubnubPublishKey(_ key: String)` | `Self` | PubNub publish key |
| `setPubnubSubscribeKey(_ key: String)` | `Self` | PubNub subscribe key |
| `setPubnubAuthKey(_ key: String)` | `Self` | PubNub auth key (token-based access) |

### Conference

| Method | Returns | Description |
|---|---|---|
| `setConferenceDelegate(_ delegate: ConferenceDelegate)` | `Self` | Conference event delegate |

### Build

| Method | Returns | Description |
|---|---|---|
| `build()` | `Red5WebrtcClient` | Constructs and returns the configured client |
| `getConfig()` | `Red5WebrtcClientConfig` | Returns the current configuration object |

---

## Red5WebrtcClient

Protocol defining all streaming operations. The object returned by `Red5WebrtcClientBuilder.build()` conforms to this protocol.

### Properties

| Property | Type | Description |
|---|---|---|
| `delegate` | `Red5ProWebrtcEventDelegate?` | Event callback delegate |

### Publishing

| Method | Description |
|---|---|
| `publish(streamName: String)` | Start publishing with the given stream name |
| `publish()` | Start publishing using the stream name from configuration |
| `startPreview()` | Start local camera preview without publishing |
| `stopPreview()` | Stop the local camera preview |
| `stopPublish()` | Stop the active publish session |

### Subscribing

| Method | Description |
|---|---|
| `subscribe(streamName: String)` | Subscribe to the named stream |
| `subscribe()` | Subscribe using the stream name from configuration |
| `stopSubscribe()` | Stop the active subscribe session |
| `stop()` | Stop all active operations (publish or subscribe) |

### Conferencing

| Method | Description |
|---|---|
| `join(roomId:streamName:role:metadata:)` | Join a conference room |
| `leave()` | Leave the current conference room |
| `subscribe(streamName:renderer:)` | Subscribe to a specific participant stream with a renderer |

### Camera & Media Control

| Method | Description |
|---|---|
| `switchCamera()` | Toggle between front and rear camera |
| `setVideoEnabled(_ enabled: Bool)` | Enable/disable video before starting; for in-call use `toggleSendVideo` |
| `setAudioEnabled(_ enabled: Bool)` | Enable/disable audio before starting; for in-call use `toggleSendAudio` |
| `toggleSendVideo(_ enabled: Bool)` | Mute/unmute outgoing video during an active session |
| `toggleSendAudio(_ enabled: Bool)` | Mute/unmute outgoing audio during an active session |
| `isSendVideoEnabled() -> Bool` | Returns `true` if video is currently being sent |
| `isSendAudioEnabled() -> Bool` | Returns `true` if audio is currently being sent |
| `isLocalVideoTrackEnabled() -> Bool` | Returns `true` if the local video track is enabled |
| `isLocalAudioTrackEnabled() -> Bool` | Returns `true` if the local audio track is enabled |

### Video Configuration

| Method | Description |
|---|---|
| `changeCaptureFormat(width:height:framerate:)` | Change resolution and frame rate on the fly |
| `changeVideoSource(_ newSource: StreamSource)` | Switch video source while live (camera, screen, custom) |
| `setVideoBitrate(_ bitrateKbps: Int)` | Update the outgoing video bitrate |
| `setDegradationPreference(_ preference: RTCDegradationPreference)` | Set bandwidth degradation preference |
| `getStats()` | Request a WebRTC stats report (result delivered via delegate) |

### State

| Method | Returns | Description |
|---|---|---|
| `isPublishing()` | `Bool` | `true` if currently publishing |
| `isSubscribing()` | `Bool` | `true` if currently subscribing |
| `isReleased()` | `Bool` | `true` if the client has been released |
| `isLicenseValidated()` | `Bool` | `true` if the license has been validated |

### Custom Capturer

| Method | Description |
|---|---|
| `getVideoCapturer() -> RTCVideoCapturer?` | Get the active video capturer |
| `setVideoCapturer(_ capturer: RTCVideoCapturer)` | Inject a custom video capturer |

### Runtime Configuration

| Method | Description |
|---|---|
| `getConfig() -> Red5WebrtcClientConfig` | Get the current config object |
| `setVideoRenderer(_ renderer: RTCVideoRenderer)` | Set or replace the video renderer |
| `setStreamName(_ streamName: String)` | Update stream name at runtime |
| `setNodeGroup(_ nodeGroup: String)` | Update node group at runtime |
| `setStreamManagerHost(_ host: String)` | Update Stream Manager host at runtime |

---

## Red5ProWebrtcEventDelegate

Delegate protocol for receiving SDK lifecycle events. All methods have default no-op implementations, making them optional.

### Publish Events

| Callback | Description |
|---|---|
| `onPublishStarted()` | The publish session started successfully |
| `onPublishStopped()` | The publish session ended |
| `onPublishFailed(error: String)` | The publish session failed |

### Subscribe Events

| Callback | Description |
|---|---|
| `onSubscribeStarted()` | The subscribe session started successfully |
| `onSubscribeStopped()` | The subscribe session ended |
| `onSubscribeFailed(error: String)` | The subscribe session failed |

### Connection Events

| Callback | Description |
|---|---|
| `onIceConnectionStateChanged(state: IceConnectionState)` | ICE connection state changed |
| `onConnectionStateChanged(state: PeerConnectionState)` | Peer connection state changed |
| `onIceCandidate(candidate: RTCIceCandidate)` | A new ICE candidate was generated |

### Lifecycle Events

| Callback | Description |
|---|---|
| `onPreviewStarted()` | Local camera preview is running |
| `onPreviewStopped()` | Local camera preview stopped |
| `onLicenseValidated(validated: Bool, message: String)` | License check completed; always fires first |
| `onError(error: String)` | An unrecoverable error occurred |

### Chat Events

| Callback | Description |
|---|---|
| `onChatConnected()` | Connected to the PubNub chat service |
| `onChatDisconnected()` | Disconnected from the PubNub chat service |
| `onChatMessageReceived(channel: String, message: Any)` | A message was received on the subscribed channel |
| `onChatSendSuccess(channel: String, timetoken: NSNumber)` | A message was sent successfully |
| `onChatSendError(channel: String, errorMessage: String)` | A message failed to send |

---

## ConferenceDelegate

Delegate protocol for conference room events.

| Callback | Description |
|---|---|
| `onJoinRoomSuccess(roomId: String, participants: [Red5ConferenceParticipant])` | Successfully joined the room; provides current participant list |
| `onJoinRoomFailed(statusCode: Int, message: String)` | Failed to join the room (e.g., `401` Unauthorized, `403` Forbidden) |
| `onParticipantJoined(uid:role:metaData:videoEnabled:audioEnabled:renderer:)` | A new participant joined; provides their video renderer if available |
| `onParticipantLeft(uid: String)` | A participant left the room |
| `onParticipantMediaUpdate(uid:videoEnabled:audioEnabled:timestamp:)` | A participant toggled their camera or microphone |
| `onParticipantRendererUpdate(uid: String, renderer: RTCVideoRenderer)` | A participant's video renderer was updated |

---

## Red5ConferenceParticipant

Model representing a participant in a conference room.

| Property | Type | Description |
|---|---|---|
| `uid` | `String` | Unique participant identifier |
| `role` | `String` | `"publisher"` or `"subscriber"` |
| `videoEnabled` | `Bool` | Whether the participant's camera is on |
| `audioEnabled` | `Bool` | Whether the participant's microphone is on |
| `metaData` | `String` | Optional JSON metadata string |

---

## Red5WebrtcClientConfig

Configuration object used by `Red5WebrtcClientBuilder`. All properties have defaults.

### Connection

| Property | Type | Default | Description |
|---|---|---|---|
| `serverIp` | `String?` | `nil` | Standalone server IP |
| `streamManagerHost` | `String?` | `nil` | Stream Manager host (Red5 Cloud) |
| `port` | `Int` | `443` | Server port |
| `appName` | `String` | `"live"` | App/scope name |
| `streamName` | `String?` | `nil` | Stream name |
| `nodeGroup` | `String?` | `nil` | Node group |
| `mode` | `String` | `"publish"` | Client mode |

### Authentication

| Property | Type | Default | Description |
|---|---|---|---|
| `licenseKey` | `String?` | `nil` | Red5 Pro license key |
| `userName` | `String?` | `nil` | Auth username |
| `password` | `String?` | `nil` | Auth password |
| `token` | `String?` | `nil` | Auth token |
| `authToken` | `String?` | `nil` | Bearer auth token |
| `streamManagerAdminUsername` | `String?` | `nil` | Stream Manager admin username |
| `streamManagerAdminPassword` | `String?` | `nil` | Stream Manager admin password |

### Video

| Property | Type | Default | Description |
|---|---|---|---|
| `videoEnabled` | `Bool` | `true` | Enable video |
| `videoWidth` | `Int` | `640` | Capture width |
| `videoHeight` | `Int` | `480` | Capture height |
| `videoFps` | `Int` | `30` | Frame rate |
| `videoBitrate` | `Int` | `500` | Bitrate in kbps |
| `videoCodec` | `String` | `"H264"` | Video codec |
| `videoSource` | `StreamSource` | `.frontCamera` | Video source |
| `videoRenderer` | `RTCVideoRenderer?` | `nil` | Video renderer |
| `scalingType` | `VideoScalingType` | `.aspectFit` | Video scaling |
| `keyFramerate` | `Int` | `30` | Key frame interval |
| `hwCodecAcceleration` | `Bool` | `true` | Hardware codec |

### Audio

| Property | Type | Default | Description |
|---|---|---|---|
| `audioEnabled` | `Bool` | `true` | Enable audio |
| `useHardwareAcousticEchoCanceler` | `Bool` | `true` | Hardware AEC |
| `useHardwareNoiseSuppressor` | `Bool` | `true` | Hardware noise suppressor |
| `noAudioProcessing` | `Bool` | `false` | Disable all audio processing |
| `customAudioFeed` | `Bool` | `false` | Use custom audio source |
| `bluetoothEnabled` | `Bool` | `false` | Bluetooth audio |

### Network / ICE

| Property | Type | Default | Description |
|---|---|---|---|
| `iceServers` | `[RTCIceServer]` | Google STUN | ICE server list |
| `trickleIce` | `Bool` | `true` | Trickle ICE |
| `tcpCandidatePolicy` | `RTCTcpCandidatePolicy` | `.enabled` | TCP candidates |
| `dtlsSetup` | `String?` | `nil` | DTLS role for WHEP |

### Advanced

| Property | Type | Default | Description |
|---|---|---|---|
| `enableDataChannel` | `Bool` | `true` | WebRTC data channel |
| `signalEnabled` | `Bool` | `true` | Signaling |
| `initiateBeforeStream` | `Bool` | `false` | Connect before streaming |
| `reconnectionEnabled` | `Bool` | `false` | Auto-reconnect |

### Chat (PubNub)

| Property | Type | Default | Description |
|---|---|---|---|
| `pubnubPublishKey` | `String?` | `nil` | PubNub publish key |
| `pubnubSubscribeKey` | `String?` | `nil` | PubNub subscribe key |
| `pubnubAuthKey` | `String?` | `nil` | PubNub auth key |

### Delegates

| Property | Type | Description |
|---|---|---|
| `eventListener` | `Red5ProWebrtcEventDelegate?` | SDK event delegate |
| `conferenceDelegate` | `ConferenceDelegate?` | Conference event delegate |

### Static Methods

| Method | Returns | Description |
|---|---|---|
| `Red5WebrtcClientConfig.getVersion()` | `String` | Returns the current SDK version string |

---

## Enums

### StreamSource

Video source for publishing.

| Case | Description |
|---|---|
| `.frontCamera` | Front-facing camera (default) |
| `.rearCamera` | Rear-facing camera |
| `.screen` | Screen capture |
| `.custom` | Custom video capturer |

### IceConnectionState

ICE connection states reported by `onIceConnectionStateChanged`.

| Case | Description |
|---|---|
| `.new` | Gathering has not started |
| `.checking` | Checking connectivity |
| `.connected` | At least one valid candidate pair found |
| `.completed` | All checks done; best path selected |
| `.failed` | No valid candidate pair found |
| `.disconnected` | Connection dropped; may recover |
| `.closed` | Connection closed permanently |

### PeerConnectionState

Peer connection states reported by `onConnectionStateChanged`.

| Case | Description |
|---|---|
| `.new` | Not yet connected |
| `.connecting` | Establishing connection |
| `.connected` | Fully connected |
| `.disconnected` | Temporarily disconnected |
| `.failed` | Connection failed |
| `.closed` | Connection closed |

### VideoScalingType

How the video frame is scaled within the renderer.

| Case | Description |
|---|---|
| `.aspectFit` | Letterbox — preserves aspect ratio, may show bars (default) |
| `.aspectFill` | Crop — fills the view, may clip edges |
| `.fill` | Stretch — fills the view, may distort |

### ClientMode

Internal mode used by the SDK.

| Case | Description |
|---|---|
| `.publish` | Publishing mode |
| `.subscribe` | Subscribing mode |
