_From: iOS SDK_

## Quick Start

Here's a minimal example to get you started with publishing:

```swift
import WebRTC
import Red5WebRTCKit

// Create video renderer
let videoRenderer = RTCMTLVideoView()
videoRenderer.contentMode = .scaleAspectFill
videoRenderer.videoContentMode = .scaleAspectFill

// Build client
let webrtcClient = Red5WebrtcClientBuilder()
    .setStreamManagerHost("userid-xxx-xxx.cloud.red5.net")
    .setPort(443)
    .setAppName("live")
    .setStreamName("myStream")
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setVideoWidth(640)
    .setVideoHeight(480)
    .setVideoFps(30)
    .setVideoBitrate(750)
    .setEventListener(self)
    .build()

// Set renderer on client
webrtcClient.setVideoRenderer(videoRenderer)

// Start preview
webrtcClient.startPreview()

// Publish a stream
webrtcClient.publish()

// Subscribe to a stream
webrtcClient.subscribe()
```
