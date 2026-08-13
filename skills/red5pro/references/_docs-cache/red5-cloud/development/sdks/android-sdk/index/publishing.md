_From: Android SDK_

## Publishing

To publish, you need to request camera/microphone permissions, create a `Red5WebrtcClient`, and call `publish()`.

### Step 1: Create an activity with Red5Renderer

Set up your activity and add a `Red5Renderer` to your layout for preview display. This is an extension of WebRTC's `SurfaceViewRenderer`.

```java
private Red5Renderer surfaceView;
```

```xml
<net.red5.android.core.Red5Renderer
    android:id="@+id/surface_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_centerInParent="true" />
```

### Step 2: Request Publish Permissions

```java
private static final String[] REQUIRED_PERMISSIONS = {
    Manifest.permission.CAMERA,
    Manifest.permission.RECORD_AUDIO
};

private void checkPermissions() {
    if (hasAllPermissions()) {
        createWebrtcClient();
    } else {
        ActivityCompat.requestPermissions(this, REQUIRED_PERMISSIONS, PERMISSION_REQUEST_CODE);
    }
}

private boolean hasAllPermissions() {
    for (String permission : REQUIRED_PERMISSIONS) {
        if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
            return false;
        }
    }
    return true;
}
```

### Step 3: Create Red5WebrtcClient object

Create the WebRTC client when publish permissions are granted. This single object handles all streaming configuration.

**Kotlin Example:**

```kotlin
val webrtcClient: IRed5WebrtcClient? = IRed5WebrtcClient.builder()
    .setActivity(this.requireActivity())
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    .setStreamManagerHost("userid-737-7f2a874662.cloud.red5.net") // For cloud
    // .setServerIp("192.168.1.100") // For standalone
    // .setServerPort(5080) // For standalone (optional, default is 5080)
    .setUserName(USERNAME_IF_USERNAME_PASS_AUTH_ENABLED)
    .setPassword(PASSWORD_IF_USERNAME_PASS_AUTH_ENABLED)
    .setToken(AUTH_TOKEN_IF_ENABLED)
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setVideoWidth(1280)
    .setVideoHeight(720)
    .setVideoFps(30)
    .setVideoBitrate(1500)
    .setVideoSource(IRed5WebrtcClient.StreamSource.FRONT_CAMERA)
    .setVideoRenderer(surfaceView)
    .setEventListener(this)
    .build()
```

**Java Example:**

```java
IRed5WebrtcClient webrtcClient = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    .setStreamManagerHost("userid-000-xxxxxxxxxx.cloud.red5.net") // For cloud
    // .setServerIp("192.168.1.100") // For standalone
    // .setServerPort(5080) // For standalone (optional, default is 5080)
    .setUserName(USERNAME_IF_USERNAME_PASS_AUTH_ENABLED)
    .setPassword(PASSWORD_IF_USERNAME_PASS_AUTH_ENABLED)
    .setToken(AUTH_TOKEN_IF_ENABLED)
    .setVideoEnabled(true)
    .setAudioEnabled(true)
    .setVideoWidth(1280)
    .setVideoHeight(720)
    .setVideoFps(30)
    .setVideoBitrate(1500)
    .setVideoSource(IRed5WebrtcClient.StreamSource.FRONT_CAMERA)
    .setVideoRenderer(surfaceView)
    .setEventListener(this)
    .build();
```

### Step 4: Start Preview

When `webrtcClient` is created, it performs a license check. Implement `IRed5WebrtcClient.Red5EventListener` in your activity and override `onLicenseValidated`.

```java
@Override
public void onLicenseValidated(boolean validated, String message) {
    if (validated) {
        webrtcClient.startPreview();
        Toast.makeText(this, "License check success", Toast.LENGTH_SHORT).show();
    } else {
        Toast.makeText(this, "License check failed: " + message, Toast.LENGTH_SHORT).show();
    }
}
```

### Step 5: Start Publishing

Call `webrtcClient.publish(YOUR_STREAM_NAME)` to start publishing.

```java
webrtcClient.publish("myStreamName");
```
