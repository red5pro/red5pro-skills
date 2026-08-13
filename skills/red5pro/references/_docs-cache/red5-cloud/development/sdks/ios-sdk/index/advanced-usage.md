_From: iOS SDK_

## Advanced Usage

### Turn Off/On Camera

Toggle camera on/off during streaming:

```swift
private var isCameraEnabled = true

func toggleCamera() {
    isCameraEnabled.toggle()
    webrtcClient.setVideoEnabled(isCameraEnabled)
}
```

### Switch Camera

Switch between front and back cameras:

```swift
func switchCamera() {
    webrtcClient.switchCamera()
}
```

### Mute/Unmute Microphone

Toggle microphone on/off during streaming:

```swift
private var isMicEnabled = true

func toggleMic() {
    isMicEnabled.toggle()
    webrtcClient.setAudioEnabled(isMicEnabled)
}
```
