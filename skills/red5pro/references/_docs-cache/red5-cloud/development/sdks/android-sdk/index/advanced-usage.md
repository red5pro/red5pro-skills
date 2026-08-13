_From: Android SDK_

## Advanced Usage

### Turn Off/On Camera

Toggle camera on/off during streaming:

```java
private boolean isCameraEnabled = true;

private void toggleCamera() {
    isCameraEnabled = !isCameraEnabled;
    webrtcClient.toggleSendVideo(isCameraEnabled);
}
```

### Switch Camera

```java
private void switchCamera() {
    webrtcClient.switchCamera();
}
```

### Mute/Unmute Microphone

```java
private boolean isMicEnabled = true;

private void toggleMic() {
    isMicEnabled = !isMicEnabled;
    webrtcClient.toggleSendAudio(isMicEnabled);
}
```

### Picture in Picture (PiP) Mode

Red5 SDK fully supports PiP mode for both publishing and subscribing.

**Auto-enter PiP mode when user navigates away:**

```java
@Override
protected void onUserLeaveHint() {
    super.onUserLeaveHint();

    // Auto-enter PiP mode when user navigates away (if publishing and supported)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O &&
        isPublishing &&
        !isInPictureInPictureMode()) {
        enterPictureInPictureMode();
    }
}
```

**Manually enter PiP mode:**

```java
@TargetApi(Build.VERSION_CODES.O)
public void enterPictureInPictureMode() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        Rational aspectRatio = new Rational(surfaceView.getWidth(), surfaceView.getHeight());

        PictureInPictureParams params = new PictureInPictureParams.Builder()
            .setAspectRatio(aspectRatio)
            .build();

        boolean result = enterPictureInPictureMode(params);
        if (!result) {
            Toast.makeText(this, "Could not enter Picture-in-Picture mode", Toast.LENGTH_SHORT).show();
        }
    }
}
```
