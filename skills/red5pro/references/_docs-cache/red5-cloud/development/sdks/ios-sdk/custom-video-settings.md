---
title: Custom Video Settings
menu_order: 4
---

This example demonstrates how to configure video resolution, frame rate, and bitrate before starting a publish session. Choosing the right settings lets you balance video quality against bandwidth and server load.

## What You Will Learn

- How to set video width and height with `setVideoWidth` / `setVideoHeight`
- How to set frame rate with `setVideoFps`
- How to set target bitrate with `setVideoBitrate`
- How these settings interact with each other

## Prerequisites

1. Add the Red5 Pro iOS SDK (`Red5WebRTCKit`) to your Xcode project via Swift Package Manager.
2. Copy `Config.swift` into your project and fill in your server details.
3. Add `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` to your `Info.plist`.

## Key API Calls

All video settings are applied on the builder before calling `.build()`. They cannot be changed after the client is created.

```swift
client = Red5WebrtcClientBuilder()
    .setServerIp(Config.serverIP)
    .setPort(Config.port)
    .setAppName(Config.appName)
    .setStreamName(Config.streamName)
    .setLicenseKey(Config.licenseKey)
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setVideoWidth(1280)      // pixels
    .setVideoHeight(720)      // pixels
    .setVideoFps(30)          // frames per second
    .setVideoBitrate(1500)    // kilobits per second
    .setEventListener(self)
    .build()
```

## Recommended Presets

| Quality | Width | Height | FPS | Bitrate |
|---|---|---|---|---|
| 360p | 640 | 360 | 30 | 400 kbps |
| 480p | 854 | 480 | 30 | 750 kbps |
| 720p | 1280 | 720 | 30 | 1500 kbps |
| 720p 60fps | 1280 | 720 | 60 | 2500 kbps |
| 1080p | 1920 | 1080 | 30 | 3000 kbps |

## Important Notes

- **Settings are immutable after build.** To change resolution or bitrate, call `stopPublish()`, `stopPreview()`, release the client (`client = nil`), rebuild with the new settings, and restart.
- **Bitrate is a target, not a guarantee.** WebRTC's congestion control may lower the bitrate dynamically if network conditions degrade.
- **The device camera must support the requested resolution.** Most modern iPhones support up to 4K, but simulators are limited.
- **Higher FPS increases CPU usage.** For most live streams 30 fps is sufficient; use 60 fps only when motion smoothness is critical (e.g., gaming, sports).

## Source Code

The full example is available in the [red5pro-ios-sdk-examples](https://github.com/red5pro/red5pro-ios-sdk-examples) repository under `04-CustomVideoSettings/`.
