_From: Android SDK_

## Subscribing

### Step 1: Create an activity with Red5Renderer

```xml
<net.red5.android.core.Red5Renderer
    android:id="@+id/surface_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_centerInParent="true" />
```

### Step 2: Create Red5WebrtcClient object

Configure the client for subscription. Use the same host configuration as publishing.

```java
IRed5WebrtcClient webrtcClient = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    .setStreamManagerHost("userid-737-7f2a874662.cloud.red5.net") // For cloud
    .setUserName(USERNAME_IF_USERNAME_PASS_AUTH_ENABLED)
    .setPassword(PASSWORD_IF_USERNAME_PASS_AUTH_ENABLED)
    .setToken(AUTH_TOKEN_IF_ENABLED)
    .setVideoRenderer(surfaceView)
    .setEventListener(this)
    .build();
```

### Step 3: Start Subscribing

```java
webrtcClient.subscribe("myStreamName");
```
