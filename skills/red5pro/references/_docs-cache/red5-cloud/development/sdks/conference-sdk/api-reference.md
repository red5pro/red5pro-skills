---
title: API Reference
menu_order: 2
---

Complete API reference for the Red5 Pro Conference SDK.

<div style={{margin: '16px 0'}}>
  <button id="copyLLMBtn" onclick="(function(){var el=document.querySelector('article')||document.querySelector('main')||document.querySelector('.entry-content')||document.querySelector('.content')||document.body;navigator.clipboard.writeText(el.innerText).then(function(){var f=document.getElementById('copyFeedback');f.style.display='inline';setTimeout(function(){f.style.display='none'},2000)});})()" style={{background:'#000',color:'#fff',border:'none',padding:'8px 18px',borderRadius:'4px',cursor:'pointer',fontSize:'13px',fontFamily:'inherit'}}>Copy for LLMs</button>
  <span id="copyFeedback" style={{display:'none',marginLeft:'10px',color:'#27ae60',fontSize:'13px'}}>Copied!</span>
</div>

---

## ConferenceClient

The main entry point for joining, publishing, and subscribing to a Red5 Pro conference.

### Constructor

```javascript
const client = new ConferenceClient(config: ConferenceConfig);
```

### Room Management

| Method | Returns | Description |
|---|---|---|
| `join(roomId, userId, token, role, mediaStream, videoEnabled, audioEnabled)` | `Promise<boolean>` | Join a conference room. |
| `leave()` | `Promise<void>` | Disconnect and leave the conference room. |
| `getRoomUsers()` | `Object` | Get a dictionary of all current room users. |
| `getIsJoined()` | `boolean` | `true` if currently joined in a room. |
| `getIsPublishing()` | `boolean` | `true` if currently publishing a stream. |

### Subscribing

| Method | Returns | Description |
|---|---|---|
| `subscribe(user: User)` | `Promise<{ subscriber, user, mediaStream }>` | Start subscribing to another participant's stream. |
| `unsubscribe(userId: string)` | `Promise<void>` | Stop subscribing to a participant's stream. |

### Media Controls

| Method | Returns | Description |
|---|---|---|
| `muteAudio()` | `Promise<void>` | Mute local microphone. |
| `unmuteAudio()` | `Promise<void>` | Unmute local microphone. |
| `muteVideo()` | `Promise<void>` | Mute local camera. |
| `unmuteVideo()` | `Promise<void>` | Unmute local camera. |
| `switchVideoDeviceWithTrackReplacement(deviceId)` | `Promise<MediaStream>` | Seamlessly switch camera source without dropping the connection. |
| `switchAudioDeviceWithTrackReplacement(deviceId)` | `Promise<MediaStream>` | Seamlessly switch microphone source without dropping the connection. |

### Advanced Features (Screen Share, Backgrounds, Recording)

| Method | Returns | Description |
|---|---|---|
| `startScreenShare(options)` | `Promise<void>` | Start sharing the screen with the room. |
| `stopScreenShare()` | `Promise<void>` | Stop sharing the screen. |
| `initializeVirtualBackground()` | `Promise<void>` | Load necessary polyfills and models for virtual backgrounds. |
| `enableVirtualBackground(type, options)` | `Promise<void>` | Apply a virtual background (e.g. 'blur', 'image'). |
| `disableVirtualBackground()` | `Promise<void>` | Remove the active virtual background. |
| `changeVirtualBackground(type, options)` | `Promise<void>` | Switch the background to a new configuration. |
| `generateLocalRecordingZip()` | `Promise<Blob>` | Generates a ZIP blob of all locally recorded media segments. |
| `downloadLocalRecording(baseFilename)` | `Promise<boolean>` | Automatically downloads the local recording as a ZIP file. |

### Chat & File Transfer

| Method | Returns | Description |
|---|---|---|
| `sendChatMessage(messageText: string)` | `boolean` | Send a text message to all users in the room via PubNub. |
| `sendFile(file: File)` | `Promise<SendFileResult>` | Transfer a file to users in the room. |
| `downloadFile(fileId, fileName)` | `Promise<Blob>` | Download a file shared in the room. |

---

## ConferenceConfig

Configuration object for instantiating the `ConferenceClient`.

| Property | Type | Default | Description |
|---|---|---|---|
| `host` | `string` | **Required** | The Red5 Pro Server address. |
| `nodeGroup` | `string` | `undefined` | Target node group for stream scaling. |
| `iceServers` | `RTCIceServer[]` | `undefined` | STUN/TURN server configurations. |
| `reconnectionEnabled` | `boolean` | `false` | Enable automatic reconnection. |
| `maxVideoBitrateKbps` | `number` | `undefined` | Maximum video bitrate for publishing. |
| `statsPollingInterval` | `number` | `undefined` | WebRTC Stats polling interval in ms. |
| `pubnubPublishKey` | `string` | `undefined` | PubNub key for chat. |
| `pubnubSubscribeKey` | `string` | `undefined` | PubNub key for chat. |
| `enableNoiseCancellation` | `boolean` | `false` | Enable RNNoise noise suppression. |

---

## Events & Constants

### ConferenceEvents

Listen to SDK events using `client.addEventListener()`.

| Event | Description |
|---|---|
| `USER_PUBLISHED` | Local client successfully published. |
| `NEW_PARTICIPANT` | A new participant joined the room. |
| `PARTICIPANT_DISCONNECTED` | A participant left the room. |
| `SUBSCRIBE_SUCCESS` | Successfully subscribed to a participant. |
| `ROOM_STATE_UPDATE` | Room users, roles, or states were updated. |
| `CHAT_MESSAGE` | A chat message was received. |
| `ISSUES_DETECTED` | Network or WebRTC issues were detected by the Stats monitor. |
| `VIDEO_MUTED` / `AUDIO_MUTED` | Video or audio was successfully muted. |

### VirtualBackgroundTypes

| Constant | Description |
|---|---|
| `VirtualBackgroundTypes.NONE` | No background processing. |
| `VirtualBackgroundTypes.BLUR` | Strong blur background. |
| `VirtualBackgroundTypes.SLIGHT_BLUR`| Light blur background. |
| `VirtualBackgroundTypes.IMAGE` | Image replacement background. |
| `VirtualBackgroundTypes.COLOR` | Solid color replacement background. |

### ChatEventTypes

| Constant | Description |
|---|---|
| `ChatEventTypes.MESSAGE_RECEIVED` | Standard text message. |
| `ChatEventTypes.RAISED_HAND` | User raised their hand. |
| `ChatEventTypes.TURN_YOUR_MIC_OFF` | Request to mute microphone. |
