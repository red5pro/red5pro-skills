# Red5 Cloud iOS SDK

Source: local cache [`../_docs-cache/red5-cloud/development/sdks/ios-sdk/`](../_docs-cache/red5-cloud/development/sdks/ios-sdk/), mirrors [https://www.red5.net/docs/red5-cloud/development/sdks/ios-sdk/](https://www.red5.net/docs/red5-cloud/development/sdks/ios-sdk/)

Build low-latency streaming apps that publish via WHIP and subscribe via WHEP. Works against both Red5 Cloud (Stream Manager) and standalone Red5 Pro servers. SwiftUI-compatible.

## Requirements

- Red5 Pro SDK license key
- Camera/microphone permissions
- iOS 13.0+, Xcode 14.0+, Swift 5.5+

## Install (Swift Package Manager)

```swift
dependencies: [
    .package(url: "https://github.com/red5pro/red5pro-ios-sdk", from: "latest")
]
```

`Info.plist` keys required for publishing:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to stream video</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access to stream audio</string>
```

## Quick Start

```swift
import WebRTC
import Red5WebRTCKit

let videoRenderer = RTCMTLVideoView()
videoRenderer.contentMode = .scaleAspectFill
videoRenderer.videoContentMode = .scaleAspectFill

let webrtcClient = Red5WebrtcClientBuilder()
    .setStreamManagerHost("userid-xxx-xxx.cloud.red5.net") // Cloud. Standalone: setServerIp()
    .setPort(443)
    .setAppName("live")
    .setStreamName("myStream")
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setVideoWidth(640)
    .setVideoHeight(480)
    .setVideoFps(30)
    .setVideoBitrate(750)
    .setNodeGroup("default") // Cloud only — the node group this stream targets
    .setEventListener(self)
    .build()

webrtcClient.setVideoRenderer(videoRenderer)
webrtcClient.startPreview()
webrtcClient.publish()   // or .subscribe()
```

## Publish/Subscribe Flow

1. Request camera/mic authorization via `AVCaptureDevice.requestAccess(for:)` before building the client.
2. Build with `Red5WebrtcClientBuilder()` — `setStreamManagerHost(...)` for Cloud (optionally `.setNodeGroup(...)`), or `setServerIp(...)` for standalone. Auth options: `setUserName`/`setPassword` or `setToken`.
3. Attach an `RTCMTLVideoView` via `setVideoRenderer(...)`.
4. Client creation triggers a license check — implement `Red5ProWebrtcEventDelegate.onLicenseValidated(validated:message:)` and call `webrtcClient.startPreview()` only once validated.
5. Call `webrtcClient.publish()` or `webrtcClient.subscribe()`.

SwiftUI: wrap `RTCMTLVideoView` in a `UIViewRepresentable`.

## Events (`Red5ProWebrtcEventDelegate`)

`onPublishStarted()/Stopped()/Failed(error:)`, `onSubscribeStarted()/Stopped()/Failed(error:)`, `onIceConnectionStateChanged(state:)`, `onConnectionStateChanged(state:)`, `onError(error:)`, `onPreviewStarted()/Stopped()`, `onLicenseValidated(validated:message:)`, plus chat events below.

## Advanced Controls

```swift
webrtcClient.setVideoEnabled(enabled)  // camera on/off
webrtcClient.switchCamera()            // front/back
webrtcClient.setAudioEnabled(enabled)  // mic mute/unmute
webrtcClient.stopPublish()
webrtcClient.stopPreview()
```

## Conferencing (Multi-user Rooms)

**Platform note:** the iOS SDK docs don't state a Cloud requirement for conferencing, but the Android SDK docs explicitly say conferencing requires Red5 Cloud (Stream Manager) and does not work with standalone servers. Treat conferencing as Cloud-only on iOS too until confirmed otherwise — see [README.md § Cross-Cutting Notes](README.md#cross-cutting-notes).

```swift
webrtcClient.join(roomId: roomId, streamName: userId, role: "publisher" /* or "subscriber" */, metadata: metadataJson)
// ...
webrtcClient.leave()
```

`ConferenceDelegate` callbacks: `onJoinRoomSuccess(roomId:participants:)`, `onJoinRoomFailed(statusCode:message:)`, `onParticipantJoined(uid:role:metaData:videoEnabled:audioEnabled:renderer:)`, `onParticipantLeft(uid:)`, `onParticipantMediaUpdate(uid:videoEnabled:audioEnabled:timestamp:)`, `onParticipantRendererUpdate(uid:renderer:)`.

## Chat (PubNub-backed)

```swift
let webrtcClient = Red5WebrtcClientBuilder()
    .setPubnubPublishKey("your_publish_key")
    .setPubnubSubscribeKey("your_subscribe_key")
    // ...
    .build()

webrtcClient.subscribeChatChannel(channelName: "main-chat")
webrtcClient.sendChatTextMessage(channelName: "main-chat", message: "Hello World!", metaData: nil)
```

Delegate callbacks: `onChatConnected()/Disconnected()`, `onChatMessageReceived(channel:message:)`, `onChatSendSuccess(channel:timetoken:)`, `onChatSendError(channel:errorMessage:)`.

## Bundled Examples

The SDK docs ship self-contained single-feature example apps (copy `Config.swift` + the example file into a fresh Xcode project): Minimal Publish, Minimal Subscribe, Audio Only, Custom Video Settings, Camera Controls.

## When to Fetch More

Full class/protocol/enum reference lives in the local cache at [`../_docs-cache/red5-cloud/development/sdks/ios-sdk/api-reference.md`](../_docs-cache/red5-cloud/development/sdks/ios-sdk/api-reference.md) (mirrors [https://www.red5.net/docs/red5-cloud/development/sdks/ios-sdk/api-reference](https://www.red5.net/docs/red5-cloud/development/sdks/ios-sdk/api-reference)) — check it before inventing a method signature not shown above.
