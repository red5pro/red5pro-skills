_From: Android SDK_

## Configuration Notes

Ensure you have the necessary permissions in your `AndroidManifest.xml` for publishing:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Requirements

- Red5 Pro SDK license key
- Camera and microphone permissions for publishing
- Internet permission for both publishing and subscribing
