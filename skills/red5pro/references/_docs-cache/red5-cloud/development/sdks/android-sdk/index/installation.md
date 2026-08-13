_From: Android SDK_

## Installation

> **Download Android Archive file:** [https://red5-cloud-sdk.cachefly.net/index.html](https://red5-cloud-sdk.cachefly.net/index.html)

Place the `.aar` SDK file in your `app/libs` folder.

Add dependencies to your app's `build.gradle` as follows:

```gradle
// Red5 SDK Dependencies
implementation fileTree(include: ['*.aar'], dir: 'libs')
implementation 'androidx.annotation:annotation:1.9.1'
implementation 'com.google.code.gson:gson:2.13.2'
implementation 'com.squareup.okhttp3:okhttp:5.1.0'
implementation 'io.github.webrtc-sdk:android:137.7151.03'
implementation 'com.pubnub:pubnub-gson:11.0.0'
```
