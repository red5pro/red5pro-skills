---
title: Conference SDK Examples
menu_order: 1
---
# Conference SDK Examples

The Red5 Pro Conference SDK comes with a suite of examples that demonstrate its core functionality. Below are code snippets and explanations for the most common use cases based on the provided examples.

## 01 – Basic Join

Joining a room, publishing your camera and microphone, and automatically subscribing to other participants.

```javascript
import { ConferenceClient, ConferenceEvents } from 'red5pro-conference-sdk';

const client = new ConferenceClient({
  host: 'your-server.red5.net',
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// Auto-subscribe to new participants
client.addEventListener(ConferenceEvents.NEW_PARTICIPANT, async (e) => {
  const user = e.detail;
  try {
    const info = await client.subscribe(user);
    if (info?.mediaStream) {
       // display info.mediaStream in a <video> element
    }
  } catch (err) {
    console.error('Subscribe failed', err);
  }
});

const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
await client.join('room-id', 'user-id', 'token', 'publisher', localStream, true, true);
```

## 02 – Mute Controls

Toggling your audio and video mute states during an active session.

```javascript
// Mute / Unmute Audio
await client.muteAudio();
await client.unmuteAudio();

// Mute / Unmute Video
await client.muteVideo();
await client.unmuteVideo();

// Listen for state changes
client.addEventListener(ConferenceEvents.AUDIO_MUTED, () => console.log('Audio is muted'));
client.addEventListener(ConferenceEvents.VIDEO_UNMUTED, () => console.log('Video is unmuted'));
```

## 03 – Screen Share

Sharing your screen with other participants in the room.

```javascript
// Start Screen Sharing
await client.startScreenShare({
  includeAudio: true,
  metaData: { type: 'presentation' }
});

// Stop Screen Sharing
await client.stopScreenShare();
```

## 04 – Local Recording

Recording participant streams directly in the browser.

```javascript
// Generate a ZIP file of the local recording
const zipBlob = await client.generateLocalRecordingZip();

// Prompt download for the user
await client.downloadLocalRecording('my-recording-file');
```

## 05 – Virtual Background

Applying a virtual background (blur or image) to your local video. This feature relies on `@mediapipe/selfie_segmentation`.

```javascript
// Initialize the background processor
await client.initializeVirtualBackground();

// Apply a blur
await client.enableVirtualBackground('blur', { blurAmount: 10 });

// Apply an image
await client.enableVirtualBackground('image', { imageUrl: 'path/to/image.jpg' });

// Remove the background
await client.disableVirtualBackground();
```

## 06 – Network Stats

Monitoring your WebRTC connection and network statistics.

```javascript
// Listen for issues detected
client.addEventListener(ConferenceEvents.ISSUES_DETECTED, (e) => {
  console.warn('Network or WebRTC issues:', e.detail);
});
```

## 07 – Device Switch

Seamlessly switching between different cameras or microphones.

```javascript
// Switch to a new camera using track replacement
await client.switchVideoDeviceWithTrackReplacement(newCameraDeviceId);
```

## 08 – Chat

Sending and receiving text messages using the built-in chat functionality (powered by PubNub).

```javascript
// Listen for chat messages
client.addEventListener(ConferenceEvents.CHAT_MESSAGE, (e) => {
  const message = e.detail;
  console.log('New message:', message.text);
});

// Send a chat message
client.sendChatMessage('Hello everyone!');
```

## 09 – Guest Management

Managing roles and permissions for users joining the conference.

```javascript
// Listen for room state updates
client.addEventListener(ConferenceEvents.ROOM_STATE_UPDATE, (e) => {
  const state = e.detail;
  console.log('Room users updated:', state.users);
});
```

## 10 – File Transfer

Transferring files between participants in the room.

```javascript
// Example implementation depends on data channel or PubNub configurations
// Check the SDK's file transfer capabilities for specific usage
```
