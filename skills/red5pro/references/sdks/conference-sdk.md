# Red5 Pro Conference SDK (Web)

Source: live docs at [https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/](https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/)

A professional-grade toolkit for building multi-party video conferencing web apps on Red5 Pro / Red5 Cloud. Handles room management, WHIP/WHEP media streaming, WebRTC statistics, PubNub-powered interactivity (chat/presence), and advanced features like virtual backgrounds and local recording.

## Install

```bash
npm install red5pro-conference-sdk
```

## Quick Start

```javascript
import { ConferenceClient, ConferenceEvents } from 'red5pro-conference-sdk';

const config = {
  host: 'your-red5-pro-host',
  nodeGroup: 'your-node-group',
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  pubnubPublishKey: 'your-pubnub-publish-key',
  pubnubSubscribeKey: 'your-pubnub-subscribe-key',
};

const client = new ConferenceClient(config);

client.addEventListener(ConferenceEvents.USER_PUBLISHED, (event) => {
  console.log('Successfully published to room:', event.streamName);
});

client.addEventListener(ConferenceEvents.NEW_PARTICIPANT, (participant) => {
  console.log('New participant joined:', participant.userId);
  client.subscribe(participant); // auto-subscribe to new participants
});

await client.join(
  'my-awesome-room',                 // roomId
  'user-' + Math.floor(Math.random() * 1000), // userId
  'your-auth-token',                 // token
  'publisher',                       // role
  await navigator.mediaDevices.getUserMedia({ video: true, audio: true }), // mediaStream
  true,                               // videoEnabled
  true,                               // audioEnabled
);
```

## Configuration (`ConferenceConfig`)

| Parameter | Type | Description |
|---|---|---|
| `host` | `string` | Red5 Pro server host address |
| `nodeGroup` | `string` | Optional node group for autoscaling (Red5 Cloud) — see platform note below |
| `iceServers` | `RTCIceServer[]` | ICE servers for WebRTC |
| `reconnectionEnabled` | `boolean` | Auto-reconnect (default `true`) |
| `maxVideoBitrateKbps` | `number` | Max publish video bitrate |
| `pubnubPublishKey` / `pubnubSubscribeKey` | `string` | PubNub keys for chat/signaling |

## Platform Note: Cloud Requirement

`nodeGroup` above is documented as optional, which reads as if this SDK might work against a standalone Red5 Pro server. The Android SDK docs, however, explicitly state conferencing requires Red5 Cloud (Stream Manager) and does not work with standalone servers, and this SDK's own config still expects a Stream Manager-style `host`. Treat conferencing as Red5 Cloud-only until confirmed otherwise for this SDK specifically — see [README.md § Cross-Cutting Notes](README.md#cross-cutting-notes).

## Auth Token

The `token` passed to `join(...)` is expected to come from a backend-issued conference token — see [backend-sdk.md](backend-sdk.md).

## When to Fetch More

The complete event catalog, participant-management methods beyond `subscribe()`, and the virtual-background/local-recording APIs are documented at [https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/](https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/){api-reference,examples}/ — pull those before implementing anything beyond the join/publish/subscribe flow shown above.
