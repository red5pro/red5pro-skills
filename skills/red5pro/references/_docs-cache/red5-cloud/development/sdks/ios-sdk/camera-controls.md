---
title: Camera Controls
menu_order: 5
---

This example demonstrates how to control the camera and microphone during an active publish session: switching between front and back cameras, muting/unmuting the video track, and muting/unmuting the audio track. All three controls work while the stream is live.

## What You Will Learn

- How to switch cameras with `switchCamera()`
- How to mute/unmute the video track with `setVideoEnabled(_:)`
- How to mute/unmute the audio track with `setAudioEnabled(_:)`
- That these methods are called on the client instance, not the builder

## Prerequisites

1. Add the Red5 Pro iOS SDK (`Red5WebRTCKit`) to your Xcode project via Swift Package Manager.
2. Copy `Config.swift` into your project and fill in your server details.
3. Add `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` to your `Info.plist`.

## Key API Calls

Controls are instance methods on `Red5WebrtcClient`. Call them any time after `startPreview()` has completed.

### Switch Camera (Front ↔ Back)

```swift
client?.switchCamera()
```

Each call toggles between the front and rear camera. The switch is seamless — the stream continues without interruption.

### Mute / Unmute Video

```swift
// Mute — viewer sees a black frame or frozen frame
client?.setVideoEnabled(false)

// Unmute — live camera resumes
client?.setVideoEnabled(true)
```

### Mute / Unmute Audio

```swift
// Mute — viewer hears silence
client?.setAudioEnabled(false)

// Unmute — microphone resumes
client?.setAudioEnabled(true)
```

## SwiftUI Pattern

Track mute state locally and pass through to the client:

```swift
@State private var videoMuted = false
@State private var audioMuted = false

Button("Mute Video") {
    videoMuted.toggle()
    client?.setVideoEnabled(!videoMuted)
}

Button("Flip Camera") {
    client?.switchCamera()
}
```

## Behavior Details

| Control | Effect on Publisher's Preview | Effect on Subscriber's Stream |
|---|---|---|
| `switchCamera()` | Camera feed switches | Subscriber sees the new angle |
| `setVideoEnabled(false)` | Preview goes black | Subscriber receives a black/frozen frame |
| `setAudioEnabled(false)` | Microphone is muted locally | Subscriber hears silence |

## Source Code

The full example is available in the [red5pro-ios-sdk-examples](https://github.com/red5pro/red5pro-ios-sdk-examples) repository under `05-CameraControls/`.
