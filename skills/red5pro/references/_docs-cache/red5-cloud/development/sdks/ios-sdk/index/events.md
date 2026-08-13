_From: iOS SDK_

## Events

The iOS SDK uses an event-driven architecture. Implement `Red5ProWebrtcEventDelegate` in your class to handle SDK events.

### Event Types

| Event | Description | Parameters |
|---|---|---|
| `onPublishStarted()` | Publishing started successfully | None |
| `onPublishStopped()` | Publishing stopped | None |
| `onPublishFailed(error:)` | Publishing failed | `error: String` |
| `onSubscribeStarted()` | Subscription started successfully | None |
| `onSubscribeStopped()` | Subscription stopped | None |
| `onSubscribeFailed(error:)` | Subscription failed | `error: String` |
| `onIceConnectionStateChanged(state:)` | ICE connection state changed | `state: IceConnectionState` |
| `onConnectionStateChanged(state:)` | Peer connection state changed | `state: PeerConnectionState` |
| `onError(error:)` | General error occurred | `error: String` |
| `onPreviewStarted()` | Camera preview started | None |
| `onPreviewStopped()` | Camera preview stopped | None |
| `onLicenseValidated(validated:message:)` | License validation completed | `validated: Bool, message: String` |
| `onChatMessageReceived(channel:message:)` | Chat message received | `channel: String, message: JSONCodable` |
| `onChatConnected()` | Chat connection established | None |
| `onChatDisconnected()` | Chat connection closed | None |
| `onChatSendError(channel:errorMessage:)` | Failed to send chat message | `channel: String, errorMessage: String` |
| `onChatSendSuccess(channel:timetoken:)` | Chat message sent successfully | `channel: String, timetoken: NSNumber` |

### Connection State Handling

```swift
extension YourClass: Red5ProWebrtcEventDelegate {
    func onIceConnectionStateChanged(state: IceConnectionState) {
        DispatchQueue.main.async {
            switch state {
            case .connected:
                print("Connected to server")
            case .disconnected, .failed:
                print("Connection lost")
            default:
                break
            }
        }
    }
}
```

### Full Working Example

```swift
import SwiftUI
import AVFoundation
import WebRTC
import Red5WebRTCKit

class PublishManager: NSObject, ObservableObject {
    private var webrtcClient: Red5WebrtcClient?
    @Published var localVideoRenderer: RTCMTLVideoView?
    @Published var isReady: Bool = false

    func setup() {
        self.localVideoRenderer = RTCMTLVideoView()
        self.localVideoRenderer?.contentMode = .scaleAspectFill
        self.localVideoRenderer?.videoContentMode = .scaleAspectFill

        webrtcClient = Red5WebrtcClientBuilder()
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

        webrtcClient?.setVideoRenderer(self.localVideoRenderer!)
    }

    func startPublish() { webrtcClient?.publish() }
    func stopPublish() { webrtcClient?.stopPublish() }
    func stopPreview() { webrtcClient?.stopPreview() }

    func release() {
        webrtcClient?.stopPublish()
        webrtcClient?.stopPreview()
        webrtcClient = nil
        localVideoRenderer = nil
    }
}

extension PublishManager: Red5ProWebrtcEventDelegate {
    func onLicenseValidated(validated: Bool, message: String) {
        DispatchQueue.main.async {
            if validated {
                self.webrtcClient?.startPreview()
            } else {
                print("License invalid: \(message)")
            }
        }
    }

    func onPreviewStarted() {
        DispatchQueue.main.async { self.isReady = true }
    }

    func onPublishStarted() { DispatchQueue.main.async { print("Publish started") } }
    func onPublishStopped() { DispatchQueue.main.async { print("Publish stopped") } }
    func onPublishFailed(error: String) { DispatchQueue.main.async { print("Publish failed: \(error)") } }
    func onSubscribeStarted() { DispatchQueue.main.async { print("Subscribe started") } }
    func onSubscribeStopped() { DispatchQueue.main.async { print("Subscribe stopped") } }
    func onSubscribeFailed(error: String) { DispatchQueue.main.async { print("Subscribe failed: \(error)") } }
    func onError(error: String) { DispatchQueue.main.async { print("Error: \(error)") } }
    func onPreviewStopped() { DispatchQueue.main.async { print("Preview stopped") } }
    func onIceConnectionStateChanged(state: IceConnectionState) { DispatchQueue.main.async { print("ICE state: \(state)") } }
    func onConnectionStateChanged(state: PeerConnectionState) { DispatchQueue.main.async { print("Connection state: \(state)") } }
}
```
