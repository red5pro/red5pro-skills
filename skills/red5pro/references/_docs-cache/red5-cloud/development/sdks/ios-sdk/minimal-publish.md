---
title: Minimal Publish
menu_order: 1
---

This example shows the fewest lines of code needed to publish a live stream with the Red5 Pro iOS SDK. It covers the complete publish lifecycle: building the client, starting a camera preview, and going live.

## What You Will Learn

- How to build a `Red5WebrtcClient` with `Red5WebrtcClientBuilder`
- How to attach a local video renderer
- The correct order of lifecycle calls for publishing (`startPreview` → `publish`)
- How to handle the essential delegate callbacks

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

3. Add `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` to your `Info.plist`.

## Key API Calls

### 1. Build the Client

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

### 2. Start Camera Preview (after license validates)

The SDK validates the license asynchronously. Wait for `onLicenseValidated` before starting the preview:

```swift
func onLicenseValidated(validated: Bool, message: String) {
    if validated {
        client?.startPreview()
    }
}
```

### 3. Publish (after preview is ready)

Enable the publish button only after `onPreviewStarted` fires:

```swift
func onPreviewStarted() {
    isReady = true   // unlock the UI
}

// Called from a button tap:
client?.publish()
```

### 4. Stop

```swift
client?.stopPublish()
client?.stopPreview()
```

## Lifecycle Summary

```
Red5WebrtcClientBuilder.build()
        ↓
onLicenseValidated(validated: true)
        ↓
client.startPreview()
        ↓
onPreviewStarted()          ← enable Publish button here
        ↓
client.publish()
        ↓
onPublishStarted()          ← stream is live
        ↓
client.stopPublish()
        ↓
onPublishStopped()
```

## Source Code

The full example is available in the [red5pro-ios-sdk-examples](https://github.com/red5pro/red5pro-ios-sdk-examples) repository under `01-MinimalPublish/`.
