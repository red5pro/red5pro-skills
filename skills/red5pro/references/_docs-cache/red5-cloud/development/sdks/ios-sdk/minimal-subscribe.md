---
title: Minimal Subscribe
menu_order: 2
---

This example shows the fewest lines of code needed to subscribe to a live stream with the Red5 Pro iOS SDK. Unlike publishing, subscribing does not require a preview step — you build the client, attach a renderer for the incoming video, and call `subscribe()`.

## What You Will Learn

- How to build a `Red5WebrtcClient` configured for subscribing
- How to attach a remote video renderer
- The subscribe lifecycle and its delegate callbacks
- How to cleanly stop a subscribe session

## Prerequisites

1. Add the Red5 Pro iOS SDK (`Red5WebRTCKit`) to your Xcode project via Swift Package Manager.
2. Copy `Config.swift` into your project and fill in your server details:

```swift
enum Config {
    static let serverIP   = "your-server-ip"
    static let port       = 8554
    static let appName    = "live"
    static let streamName = "stream1"
    static let licenseKey = "XXXX-XXXX-XXXX-XXXX"
}
```

3. Ensure a publisher is already streaming to `streamName` on your server before subscribing.

## Key API Calls

### 1. Build the Client

The builder configuration is the same as for publishing. The SDK infers the role (subscriber vs publisher) from which action you call first.

```swift
client = Red5WebrtcClientBuilder()
    .setServerIp(Config.serverIP)
    .setPort(Config.port)
    .setAppName(Config.appName)
    .setStreamName(Config.streamName)
    .setLicenseKey(Config.licenseKey)
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setEventListener(self)
    .build()

client?.setVideoRenderer(renderer)
```

### 2. Subscribe

No preview step is needed. Call `subscribe()` directly:

```swift
client?.subscribe()
```

### 3. Handle Incoming Stream

Show the video renderer once the stream arrives:

```swift
func onSubscribeStarted() {
    hasVideo = true   // show the RTCMTLVideoView in the UI
}
```

### 4. Stop

```swift
client?.stopSubscribe()
```

## Lifecycle Summary

```
Red5WebrtcClientBuilder.build()
        ↓
client.subscribe()
        ↓
onSubscribeStarted()        ← stream is playing
        ↓
client.stopSubscribe()
        ↓
onSubscribeStopped()
```

## Difference from Publish

| | Publish | Subscribe |
|---|---|---|
| Preview step required | Yes — `startPreview()` | No |
| License callback needed before action | Yes | No (but still fires) |
| First action to call | `startPreview()` | `subscribe()` |
| Video direction | Local camera → server | Server → local renderer |

## Source Code

The full example is available in the [red5pro-ios-sdk-examples](https://github.com/red5pro/red5pro-ios-sdk-examples) repository under `02-MinimalSubscribe/`.
