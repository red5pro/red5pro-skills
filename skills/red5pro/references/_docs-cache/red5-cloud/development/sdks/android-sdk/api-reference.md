---
title: API Reference
menu_order: 2
---

Complete API reference for the Red5 Android SDK (`IRed5WebrtcClient`).

<div style={{margin: '16px 0'}}>
  <button id="copyLLMBtn" onclick="(function(){var el=document.querySelector('article')||document.querySelector('main')||document.querySelector('.entry-content')||document.querySelector('.content')||document.body;navigator.clipboard.writeText(el.innerText).then(function(){var f=document.getElementById('copyFeedback');f.style.display='inline';setTimeout(function(){f.style.display='none'},2000)});})()" style={{background:'#000',color:'#fff',border:'none',padding:'8px 18px',borderRadius:'4px',cursor:'pointer',fontSize:'13px',fontFamily:'inherit'}}>Copy for LLMs</button>
  <span id="copyFeedback" style={{display:'none',marginLeft:'10px',color:'#27ae60',fontSize:'13px'}}>Copied!</span>
</div>

---

## Red5WebrtcClientBuilder

Builder for constructing an `IRed5WebrtcClient` instance. Obtain via `IRed5WebrtcClient.builder()`, chain setters, and call `build()`.

```java
IRed5WebrtcClient client = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey("XXXX-XXXX-XXXX-XXXX")
    .setStreamManagerHost("userid-xxx.cloud.red5.net")
    .setEventListener(this)
    .build();
```

### Connection

| Method | Description |
|---|---|
| `setActivity(Activity activity)` | The host Activity (required) |
| `setServerIp(String serverIp)` | Standalone server IP address |
| `setServerPort(int port)` | Standalone server port (default: `5080`) |
| `setStreamManagerHost(String host)` | Stream Manager host for Red5 Cloud (e.g. `userid-xxx.cloud.red5.net`) |
| `setStreamName(String streamName)` | Default stream name |
| `setAppName(String appName)` | App/scope name (default: `"live"`) |
| `setNodeGroup(String nodeGroup)` | Node group name |

### Authentication

| Method | Description |
|---|---|
| `setLicenseKey(String licenseKey)` | Red5 Pro license key (required) |
| `setUserName(String userName)` | Username for username/password auth |
| `setPassword(String password)` | Password for username/password auth |
| `setToken(String token)` | Auth token |

### Video

| Method | Description |
|---|---|
| `setVideoEnabled(boolean enabled)` | Enable or disable video (default: `true`) |
| `setVideoWidth(int width)` | Capture width in pixels (default: `1280`) |
| `setVideoHeight(int height)` | Capture height in pixels (default: `720`) |
| `setVideoFps(int fps)` | Frame rate (default: `30`) |
| `setVideoBitrate(int bitrateKbps)` | Bitrate in kbps (default: `1500`) |
| `setVideoSource(IRed5WebrtcClient.StreamSource source)` | Camera or screen source |
| `setVideoRenderer(SurfaceViewRenderer renderer)` | Renderer view for local/remote video |

### Audio

| Method | Description |
|---|---|
| `setAudioEnabled(boolean enabled)` | Enable or disable audio (default: `true`) |

### Stats

| Method | Description |
|---|---|
| `setStatsCollectorEnabled(boolean enabled)` | Enable WebRTC stats collection (default: `true`) |
| `setStatsPollingIntervalMs(int intervalMs)` | Stats polling interval in ms (default: `2000`) |

### Chat (PubNub)

| Method | Description |
|---|---|
| `setChatUserId(String userId)` | Unique user ID for chat |
| `setChatToken(String chatToken)` | Chat auth token from your backend |
| `setPubnubPublishKey(String key)` | PubNub publish key |
| `setPubnubSubscribeKey(String key)` | PubNub subscribe key |

### Conference

| Method | Description |
|---|---|
| `setConferenceListener(IRed5WebrtcClient.ConferenceListener listener)` | Conference event listener |

### Listeners

| Method | Description |
|---|---|
| `setEventListener(IRed5WebrtcClient.Red5EventListener listener)` | SDK event listener |

### Build

| Method | Returns | Description |
|---|---|---|
| `build()` | `IRed5WebrtcClient` | Constructs and returns the configured client |

---

## IRed5WebrtcClient

Main interface for all streaming operations. Created via `IRed5WebrtcClient.builder().build()`.

### Publishing

| Method | Description |
|---|---|
| `publish(String streamName)` | Start publishing with the given stream name |
| `publish()` | Start publishing using the stream name from configuration |
| `startPreview()` | Start local camera preview without publishing |
| `stopPreview()` | Stop the local camera preview |
| `stopPublish()` | Stop the active publish session |

### Subscribing

| Method | Description |
|---|---|
| `subscribe(String streamName)` | Subscribe to the named stream |
| `subscribe()` | Subscribe using the stream name from configuration |
| `stopSubscribe()` | Stop the active subscribe session |
| `stop()` | Stop all active operations (publish or subscribe) |

### Camera & Media Control

| Method | Description |
|---|---|
| `switchCamera()` | Toggle between front and rear camera |
| `setVideoEnabled(boolean enabled)` | Enable/disable video before starting; for in-call use `toggleSendVideo` |
| `setAudioEnabled(boolean enabled)` | Enable/disable audio before starting; for in-call use `toggleSendAudio` |
| `toggleSendVideo(boolean enabled)` | Mute/unmute outgoing video during an active session |
| `toggleSendAudio(boolean enabled)` | Mute/unmute outgoing audio during an active session |
| `isSendVideoEnabled()` | Returns `true` if video is currently being sent |
| `isSendAudioEnabled()` | Returns `true` if audio is currently being sent |
| `isLocalVideoTrackEnabled()` | Returns `true` if the local video track is enabled |
| `isLocalAudioTrackEnabled()` | Returns `true` if the local audio track is enabled |

### Video Configuration

| Method | Description |
|---|---|
| `changeCaptureFormat(int width, int height, int framerate)` | Change resolution and frame rate on the fly |
| `changeVideoSource(StreamSource newSource)` | Switch video source while live |
| `setVideoBitrate(int bitrateKbps)` | Update the outgoing video bitrate |
| `setDegradationPreference(RtpParameters.DegradationPreference pref)` | Set bandwidth degradation preference |
| `getStats()` | Request a WebRTC stats report (result delivered via `onRtcStats`) |

### State

| Method | Returns | Description |
|---|---|---|
| `isPublishing()` | `boolean` | `true` if currently publishing |
| `isSubscribing()` | `boolean` | `true` if currently subscribing |
| `isReleased()` | `boolean` | `true` if the client has been released |
| `getVersion()` | `String` | SDK release version string |

### Custom Capturer

| Method | Description |
|---|---|
| `getVideoCapturer()` | Get the active `VideoCapturer` |
| `setVideoCapturer(VideoCapturer capturer)` | Inject a custom video capturer |

### Runtime Configuration

| Method | Description |
|---|---|
| `getConfig()` | Get the current `Red5WebrtcClientConfig` object |
| `setVideoRenderer(SurfaceViewRenderer renderer)` | Set or replace the video renderer |

### Lifecycle

| Method | Description |
|---|---|
| `onActivityResume()` | Call from `Activity.onResume()` to restore camera and audio after screen lock/unlock |
| `release()` | Release all resources |

### Chat

| Method | Description |
|---|---|
| `subscribeChatChannel(String channelName)` | Subscribe to a PubNub chat channel |
| `unsubscribeChatChannel(String channelName)` | Unsubscribe from a PubNub chat channel |
| `sendChatTextMessage(String channelName, String message, Object metaData)` | Send a plain-text chat message |
| `sendChatJsonMessage(String channelName, JsonObject jsonObject, Object metaData)` | Send a JSON chat message |
| `setChatToken(String chatToken)` | Update the chat auth token after initialization |
| `getSubscribedChatChannels()` | Returns `List<String>` of currently subscribed channels |
| `disconnectChat()` | Disconnect from the PubNub chat service |
| `destroyChat()` | Destroy the chat client and release resources |

### Conferencing

| Method | Description |
|---|---|
| `join(String roomId, String userId, String token, String role, String metaData)` | Join a conference room |

### Data Channel

| Method | Description |
|---|---|
| `sendDataChannelMessage(String message)` | Send a UTF-8 text message via data channel |
| `sendDataChannelMessage(byte[] data)` | Send binary data via data channel |
| `isDataChannelOpen()` | Returns `true` if the data channel is open |
| `setDataChannelListener(DataChannelListener listener)` | Set a listener for data channel events |

---

## Red5EventListener

Interface for receiving SDK lifecycle events. Implement this in your Activity or Fragment.

### Publish Events

| Callback | Description |
|---|---|
| `onPublishStarted()` | The publish session started successfully |
| `onPublishStopped()` | The publish session ended |
| `onPublishFailed(String error)` | The publish session failed |

### Subscribe Events

| Callback | Description |
|---|---|
| `onSubscribeStarted()` | The subscribe session started successfully |
| `onSubscribeStopped()` | The subscribe session ended |
| `onSubscribeFailed(String error)` | The subscribe session failed |

### Connection Events

| Callback | Description |
|---|---|
| `onIceConnectionStateChanged(IceConnectionState state)` | ICE connection state changed |
| `onConnectionStateChanged(PeerConnectionState state)` | Peer connection state changed |

### Lifecycle Events

| Callback | Description |
|---|---|
| `onPreviewStarted()` | Local camera preview is running |
| `onPreviewStopped()` | Local camera preview stopped |
| `onLicenseValidated(boolean validated, String message)` | License check completed; always fires first |
| `onError(String error)` | An unrecoverable error occurred |

### Stats Events

| Callback | Description |
|---|---|
| `onRtcStats(RTCStats stats)` | Fires on each stats polling interval with updated WebRTC metrics |

### Chat Events

| Callback | Description |
|---|---|
| `onChatConnected()` | Connected to the PubNub chat service |
| `onChatDisconnected()` | Disconnected from the PubNub chat service |
| `onChatMessageReceived(String channel, JsonElement message)` | A message was received on the subscribed channel |
| `onChatSendSuccess(String channel, Long timetoken)` | A message was sent successfully |
| `onChatSendError(String channel, String errorMessage)` | A message failed to send |
| `onChatError(String error)` | A general chat error occurred |

---

## ConferenceListener

Interface for conference room events.

| Callback | Description |
|---|---|
| `onJoinRoomSuccess(String roomId, ArrayList<Red5ConferenceParticipant> participants)` | Successfully joined the room; provides current participant list |
| `onJoinRoomFailed(int httpStatusCode, String message)` | Failed to join the room (e.g., `401` Unauthorized, `403` Forbidden) |
| `onParticipantJoined(String uid, String role, String metaData, boolean videoEnabled, boolean audioEnabled, Red5Renderer renderer)` | A new participant joined; provides their `Red5Renderer` |
| `onParticipantLeft(String uid)` | A participant left the room |
| `onParticipantMediaUpdate(String uid, boolean videoEnabled, boolean audioEnabled, long timestamp)` | A participant toggled their camera or microphone |

---

## DataChannelListener

Interface for raw WebRTC data channel events.

| Callback | Description |
|---|---|
| `onDataChannelOpen()` | Data channel is open and ready |
| `onDataChannelClosed()` | Data channel was closed |
| `onDataChannelMessage(String message)` | A UTF-8 text message was received |
| `onDataChannelMessage(byte[] data)` | Binary data was received |
| `onDataChannelError(String error)` | A data channel error occurred |

---

## Red5ConferenceParticipant

Model representing a participant in a conference room.

| Property | Type | Description |
|---|---|---|
| `uid` | `String` | Unique participant identifier |
| `role` | `String` | `"publisher"` or `"subscriber"` |
| `videoEnabled` | `boolean` | Whether the participant's camera is on |
| `audioEnabled` | `boolean` | Whether the participant's microphone is on |
| `metaData` | `String` | Optional JSON metadata string |

---

## RTCStats

WebRTC statistics delivered via `onRtcStats()`. Updated on every polling interval (default: every 2 seconds).

### Local Stats

| Field | Type | Description |
|---|---|---|
| `txKBitRate` | `double` | Outgoing video bitrate in kbps |
| `rxKBitRate` | `double` | Incoming video bitrate in kbps |
| `rxPacketLossRate` | `double` | Incoming packet loss percentage |
| `localAudioLevel` | `double` | Local microphone level (`0.0` = silence, `1.0` = maximum) |

### Per-Participant Stats (Conference)

| Field | Type | Description |
|---|---|---|
| `participantStats` | `Map<String, RemoteParticipantStats>` | Stats keyed by participant UID |

### RemoteParticipantStats

| Field | Type | Description |
|---|---|---|
| `audioLevel` | `double` | Participant's audio level (`0.0`–`1.0`) |
| `rxKBitRate` | `double` | Incoming bitrate from this participant in kbps |
| `packetLossRate` | `double` | Packet loss rate for this participant |
| `rtt` | `double` | Round-trip time to this participant in ms |

---

## Enums

### StreamSource

Video source for publishing.

| Value | Description |
|---|---|
| `FRONT_CAMERA` | Front-facing camera (default) |
| `REAR_CAMERA` | Rear-facing camera |
| `SCREEN` | Screen capture |
| `CUSTOM` | Custom video capturer |

### IceConnectionState

ICE connection states reported by `onIceConnectionStateChanged`.

| Value | Description |
|---|---|
| `NEW` | Gathering has not started |
| `CHECKING` | Checking connectivity |
| `CONNECTED` | At least one valid candidate pair found |
| `COMPLETED` | All checks done; best path selected |
| `FAILED` | No valid candidate pair found |
| `DISCONNECTED` | Connection dropped; may recover |
| `CLOSED` | Connection closed permanently |

### PeerConnectionState

Peer connection states reported by `onConnectionStateChanged`.

| Value | Description |
|---|---|
| `NEW` | Not yet connected |
| `CONNECTING` | Establishing connection |
| `CONNECTED` | Fully connected |
| `DISCONNECTED` | Temporarily disconnected |
| `FAILED` | Connection failed |
| `CLOSED` | Connection closed |

### Mode

Internal client mode.

| Value | Description |
|---|---|
| `PUBLISH` | Publishing mode |
| `SUBSCRIBE` | Subscribing mode |
