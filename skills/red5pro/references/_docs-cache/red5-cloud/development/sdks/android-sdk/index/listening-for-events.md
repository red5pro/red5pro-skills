_From: Android SDK_

## Listening For Events

Implement `IRed5WebrtcClient.Red5EventListener` in your activity to handle SDK events.

### Event Types

```java
void onPublishStarted();
void onPublishStopped();
void onPublishFailed(String error);
void onSubscribeStarted();
void onSubscribeStopped();
void onSubscribeFailed(String error);
void onIceConnectionStateChanged(IceConnectionState state);
void onConnectionStateChanged(PeerConnectionState state);
void onError(String error);
void onPreviewStarted();
void onPreviewStopped();
void onLicenseValidated(boolean validated, String message);
```

### Connection State Handling

```java
@Override
public void onIceConnectionStateChanged(IRed5WebrtcClient.IceConnectionState state) {
    switch (state) {
        case CONNECTED:
            runOnUiThread(() -> {
                Toast.makeText(this, "Connected to server", Toast.LENGTH_SHORT).show();
            });
            break;
        case DISCONNECTED:
        case FAILED:
            runOnUiThread(() -> {
                Toast.makeText(this, "Connection lost", Toast.LENGTH_SHORT).show();
            });
            break;
        default:
            break;
    }
}
```
