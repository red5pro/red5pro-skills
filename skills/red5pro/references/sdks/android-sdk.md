# Red5 Cloud Android SDK

Source: live docs at [https://www.red5.net/docs/red5-cloud/development/sdks/android-sdk/](https://www.red5.net/docs/red5-cloud/development/sdks/android-sdk/)

Build low-latency streaming apps that publish via WHIP and subscribe (play) via WHEP. Compatible with both Red5 Cloud (Stream Manager) and standalone Red5 Pro servers — same client class, different builder config.

## Install

Download the `.aar` from `https://red5-cloud-sdk.cachefly.net/index.html`, place it in `app/libs/`, and add to `build.gradle`:

```gradle
implementation fileTree(include: ['*.aar'], dir: 'libs')
implementation 'androidx.annotation:annotation:1.9.1'
implementation 'com.google.code.gson:gson:2.13.2'
implementation 'com.squareup.okhttp3:okhttp:5.1.0'
implementation 'io.github.webrtc-sdk:android:137.7151.03'
implementation 'com.pubnub:pubnub-gson:11.0.0'
```

`AndroidManifest.xml` permissions required for publishing:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Requires a Red5 Pro SDK license key; camera/mic permissions for publishing; internet permission for both roles.

## Quick Start (builder pattern)

```java
// Cloud: use setStreamManagerHost() + setNodeGroup(). Standalone: use setServerIp() + setServerPort() instead.
IRed5WebrtcClient webrtcClient = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    .setStreamManagerHost(YOUR_STREAM_MANAGER_HOST_ADDRESS) // e.g. "userid-737-7f2a874662.cloud.red5.net"
    .setNodeGroup(YOUR_NODE_GROUP) // Cloud only — the node group this stream targets
    .setUserName(USERNAME_IF_USERNAME_PASS_AUTH_ENABLED)
    .setPassword(PASSWORD_IF_USERNAME_PASS_AUTH_ENABLED)
    .setToken(AUTH_TOKEN_IF_ENABLED)
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setVideoWidth(1280)
    .setVideoHeight(720)
    .setVideoFps(30)
    .setVideoBitrate(1500)
    .setVideoSource(IRed5WebrtcClient.StreamSource.FRONT_CAMERA)
    .setVideoRenderer(surfaceView)
    .setEventListener(this)
    .build();

webrtcClient.publish("myStream");
webrtcClient.subscribe("myStream");
```

`surfaceView` is a `net.red5.android.core.Red5Renderer` (an extension of WebRTC's `SurfaceViewRenderer`) placed in your layout.

## Publish/Subscribe Flow

1. Request `CAMERA`/`RECORD_AUDIO` permissions before creating the client.
2. Build `IRed5WebrtcClient` with a `Red5Renderer` attached via `.setVideoRenderer(...)`.
3. Client creation triggers a license check — implement `Red5EventListener.onLicenseValidated(boolean, String)` and only call `webrtcClient.startPreview()` once validated.
4. Call `webrtcClient.publish("streamName")` or `.subscribe("streamName")`.

## Events (`IRed5WebrtcClient.Red5EventListener`)

`onPublishStarted/Stopped/Failed(error)`, `onSubscribeStarted/Stopped/Failed(error)`, `onIceConnectionStateChanged(state)`, `onConnectionStateChanged(state)`, `onError(error)`, `onPreviewStarted/Stopped`, `onLicenseValidated(validated, message)`.

## Advanced Controls

```java
webrtcClient.toggleSendVideo(enabled);   // camera on/off
webrtcClient.switchCamera();             // front/back
webrtcClient.toggleSendAudio(enabled);   // mic mute/unmute
```

**Picture-in-Picture**: fully supported for publish and subscribe. Call `enterPictureInPictureMode()` (API 26+) manually, or trigger it from `onUserLeaveHint()` for auto-PiP when the user navigates away while publishing.

## Chat (PubNub-backed)

Configure at build time with `.setChatUserId(...)`, `.setPubnubPublishKey(...)`, `.setPubnubSubscribeKey(...)` (and optional `.setChatToken(...)`).

```java
webrtcClient.subscribeChatChannel("my-chat-room");
webrtcClient.sendChatTextMessage(channelName, message, metadata);
webrtcClient.sendChatJsonMessage(channelName, jsonObject, metadata);
webrtcClient.unsubscribeChatChannel(channelName);
List<String> channels = webrtcClient.getSubscribedChatChannels();
webrtcClient.disconnectChat();
webrtcClient.destroyChat();
```

Listener callbacks: `onChatConnected/Disconnected()`, `onChatMessageReceived(channel, message)`, `onChatSendSuccess(channel, timetoken)`, `onChatSendError(channel, errorMessage)`, `onChatError(error)` (general chat error, distinct from a specific send failure).

## Data Channel

`webrtcClient.sendDataChannelMessage(String)` / `sendDataChannelMessage(byte[])` send arbitrary data over the WebRTC data channel; `isDataChannelOpen()` checks state. Set `.setDataChannelListener(...)` for `onDataChannelOpen/Closed/Message/Error` callbacks. Separate from the PubNub-backed Chat above — this is a direct peer data channel, not routed through PubNub.

## Conferencing

**Requires Red5 Cloud (Stream Manager) — does not work with standalone servers.**

```java
IRed5WebrtcClient.ConferenceListener conferenceListener = new IRed5WebrtcClient.ConferenceListener() {
    public void onJoinRoomSuccess(String roomId, ArrayList participants) { /* ... */ }
    public void onJoinRoomFailed(int statusCode, String message) { /* ... */ }
    public void onParticipantJoined(String uid, String role, String metaData,
                                     boolean videoEnabled, boolean audioEnabled,
                                     Red5Renderer renderer) { /* attach renderer to a view */ }
    public void onParticipantLeft(String uid) { /* ... */ }
    public void onParticipantMediaUpdate(String uid, boolean videoEnabled,
                                          boolean audioEnabled, long timestamp) { /* ... */ }
};

IRed5WebrtcClient red5Client = IRed5WebrtcClient.builder()
    // ... same media config as above ...
    .setConferenceListener(conferenceListener)
    .build();

red5Client.join(roomId, userId, token, role /* "publisher" or "subscriber" */, metaDataJson);
// ...
red5Client.release(); // leave the room
```

## Stats Collector

Polls WebRTC stats every 2s by default (`.setStatsCollectorEnabled(true)`, `.setStatsPollingIntervalMs(ms)`), delivered via `onRtcStats(RTCStats stats)`:

- `stats.txKBitRate` / `stats.rxKBitRate`, `stats.rxPacketLossRate`
- `stats.localAudioLevel` (0.0–1.0, for local mic activity indicators)
- `stats.participantStats` — a map of per-participant `RemoteParticipantStats` (`audioLevel`, `rxKBitRate`, `packetLossRate`, `rtt`) for conference mode.

## When to Fetch More

Full class/method signatures live at [https://www.red5.net/docs/red5-cloud/development/sdks/android-sdk/api-reference/](https://www.red5.net/docs/red5-cloud/development/sdks/android-sdk/api-reference/) — check it for anything not covered above rather than guessing a method name.
