_From: iOS SDK_

## Basic Usage

The SDK supports both publishing to Red5 Cloud (Stream Manager deployments) and standalone Red5 Pro servers, as well as subscription (playback) for all streams on both cloud and standalone deployments.

**To publish:** Request camera/microphone permissions, create a `Red5WebrtcClient` using `Red5WebrtcClientBuilder()`, set up a video renderer, start preview, and call `webrtcClient.publish()`.

**To subscribe:** Create a `Red5WebrtcClient` using `Red5WebrtcClientBuilder()`, set up a video renderer, and call `webrtcClient.subscribe()`.

### Publishing to Red5 Cloud and Standalone

#### Step 1: Import the SDK

```swift
import SwiftUI
import AVFoundation
import WebRTC
import Red5WebRTCKit
```

#### Step 2: Request Publish Permissions

These permissions are required for publishing. Request them before starting the stream:

```swift
import AVFoundation

func checkPermissions(completion: @escaping (Bool) -> Void) {
    let cameraStatus = AVCaptureDevice.authorizationStatus(for: .video)
    let micStatus = AVCaptureDevice.authorizationStatus(for: .audio)

    if cameraStatus == .authorized && micStatus == .authorized {
        completion(true)
        return
    }

    AVCaptureDevice.requestAccess(for: .video) { cameraGranted in
        guard cameraGranted else {
            completion(false)
            return
        }

        AVCaptureDevice.requestAccess(for: .audio) { micGranted in
            completion(micGranted)
        }
    }
}
```

#### Step 3: Create Red5WebrtcClient with Red5WebrtcClientBuilder()

Create the WebRTC client when publish permissions are granted. This single object handles all streaming configuration.

> **Configuration Options:**
> - **For Red5 Cloud (Stream Manager):** Use `setStreamManagerHost()` with your stream manager host address (e.g., `userid-xxx-xxx.cloud.red5.net`)
> - **For Standalone Server:** Use `setServerIp()` with your server IP address and `setPort()` if different from default (443)

```swift
let webrtcClient = Red5WebrtcClientBuilder()
    .setStreamManagerHost("userid-xxx-xxx.cloud.red5.net") // For cloud
    // .setServerIp("192.168.1.100") // For standalone
    .setPort(443)
    .setAppName("live")
    .setStreamName("myStreamName")
    .setUserName("username") // If username/password auth enabled
    .setPassword("password") // If username/password auth enabled
    .setToken("authToken")   // If token auth enabled
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setVideoWidth(640)
    .setVideoHeight(480)
    .setVideoFps(30)
    .setVideoBitrate(750)
    .setNodeGroup("default") // Optional: specify node group for cloud
    .setEventListener(self)
    .build()
```

#### Step 4: Setup Video Renderer

Create and configure the video renderer for displaying the camera preview:

```swift
let videoRenderer = RTCMTLVideoView()
videoRenderer.contentMode = .scaleAspectFill
videoRenderer.videoContentMode = .scaleAspectFill

webrtcClient.setVideoRenderer(videoRenderer)
```

**For SwiftUI:**

```swift
struct VideoRendererView: UIViewRepresentable {
    let renderer: RTCMTLVideoView

    func makeUIView(context: Context) -> RTCMTLVideoView {
        return renderer
    }

    func updateUIView(_ uiView: RTCMTLVideoView, context: Context) {}
}

struct ContentView: View {
    @StateObject private var publishManager = PublishManager()

    var body: some View {
        if let renderer = publishManager.localVideoRenderer {
            VideoRendererView(renderer: renderer)
                .edgesIgnoringSafeArea(.all)
        }
    }
}
```

#### Step 5: Start Preview

When `webrtcClient` is created, it performs a license check. Implement `Red5ProWebrtcEventDelegate` in your class and override `onLicenseValidated`:

```swift
extension YourClass: Red5ProWebrtcEventDelegate {
    func onLicenseValidated(validated: Bool, message: String) {
        if validated {
            webrtcClient.startPreview()
            print("License check success")
        } else {
            print("License check failed: \(message)")
        }
    }
}
```

After successful validation, call `webrtcClient.startPreview()` to see the camera preview rendering on the video view.

#### Step 6: Start Publishing

Call `webrtcClient.publish()` to start publishing:

```swift
webrtcClient.publish()
```

### Subscribing to Red5 Cloud and Standalone Streams

#### Step 1: Import the SDK

```swift
import SwiftUI
import WebRTC
import Red5WebRTCKit
```

#### Step 2: Create Red5WebrtcClient with Red5WebrtcClientBuilder()

Configure the client for subscription. Use the same host configuration as publishing:

```swift
let webrtcClient = Red5WebrtcClientBuilder()
    .setStreamManagerHost("userid-755-2ccfa36e4c.cloud.red5.net") // For cloud
    // .setServerIp("192.168.1.100") // For standalone
    .setPort(443)
    .setAppName("live")
    .setStreamName("myStreamName")
    .setUserName("username") // If auth enabled
    .setPassword("password") // If auth enabled
    .setToken("authToken")   // If token auth enabled
    .setEventListener(self)
    .build()
```

#### Step 3: Setup Video Renderer

```swift
let videoRenderer = RTCMTLVideoView()
videoRenderer.contentMode = .scaleAspectFill
videoRenderer.videoContentMode = .scaleAspectFill

webrtcClient.setVideoRenderer(videoRenderer)
```

#### Step 4: Start Subscribing

```swift
webrtcClient.subscribe()
```
