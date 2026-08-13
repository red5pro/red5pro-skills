---
title: Audio Only
menu_order: 3
---

This example demonstrates how to publish or subscribe to an **audio-only** stream — no camera capture, no video renderer required. This is useful for voice calls, radio-style broadcasts, or any scenario where video bandwidth is unnecessary.

## What You Will Learn

- How to disable video with `setVideoEnabled(false)`
- That no `RTCMTLVideoView` renderer is needed for audio-only sessions
- How to switch between publish and subscribe roles for audio
- That camera permission is not required when video is disabled

## Prerequisites

1. Add the Red5 Pro iOS SDK (`Red5WebRTCKit`) to your Xcode project via Swift Package Manager.
2. Copy `Config.swift` into your project and fill in your server details.
3. Add `NSMicrophoneUsageDescription` to your `Info.plist`. Camera permission is **not** required for audio-only.

## Key API Call

The single change from the minimal publish/subscribe examples is `.setVideoEnabled(false)`:

```swift
client = Red5WebrtcClientBuilder()
    .setServerIp(Config.serverIP)
    .setPort(Config.port)
    .setAppName(Config.appName)
    .setStreamName(Config.streamName)
    .setLicenseKey(Config.licenseKey)
    .setVideoEnabled(false)   // ← disable video track
    .setAudioEnabled(true)
    .setEventListener(self)
    .build()

// No setVideoRenderer() call needed
```

## Publishing Audio Only

Because video is disabled, no preview is needed. The license validation still fires, but you can call `publish()` immediately after:

```swift
func onLicenseValidated(validated: Bool, message: String) {
    if validated {
        client?.publish()   // no startPreview() needed
    }
}
```

## Subscribing Audio Only

```swift
client?.subscribe()

func onSubscribeStarted() {
    // audio is playing through the device speaker
    // no video renderer to show
}
```

## Compared to Video Sessions

| | Video Enabled | Audio Only |
|---|---|---|
| `setVideoEnabled` | `true` | `false` |
| Camera permission | Required | Not required |
| `setVideoRenderer` | Required | Not required |
| `startPreview` (publish) | Required | Not required |
| Bandwidth usage | Higher | Lower |

## Source Code

The full example is available in the [red5pro-ios-sdk-examples](https://github.com/red5pro/red5pro-ios-sdk-examples) repository under `03-AudioOnly/`.
