_From: Android SDK_

## Quick Start

Here's a minimal example using the builder pattern:

```java
// Publishing/subscribing to cloud.
// For standalone, use setServerIp() and setServerPort() instead of setStreamManagerHost()

IRed5WebrtcClient webrtcClient = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    .setStreamManagerHost(YOUR_STREAM_MANAGER_HOST_ADDRESS) // e.g. "userid-737-7f2a874662.cloud.red5.net"
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

// Publish a stream
webrtcClient.publish("myStream");

// Subscribe to a stream
webrtcClient.subscribe("myStream");
```
