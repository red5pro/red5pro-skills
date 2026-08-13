_From: Android SDK_

## Conferencing

The Red5 Android SDK provides infinitely scalable real-time conferencing capabilities. **Note:** Conferencing requires Red5 Cloud (Stream Manager) and does not work with standalone servers.

### Joining a Conference Room

#### Step 1: Initialize Red5WebrtcClient with Conference Listener

```java
private IRed5WebrtcClient red5Client;
private IRed5WebrtcClient.ConferenceListener conferenceListener;

private void initSdk() {
    conferenceListener = new IRed5WebrtcClient.ConferenceListener() {
        @Override
        public void onJoinRoomSuccess(String roomId, ArrayList participants) {
            Log.d(TAG, "Joined room: " + roomId + " with " + participants.size() + " participants");
        }

        @Override
        public void onJoinRoomFailed(int statusCode, String message) {
            Log.e(TAG, "Join failed: " + message);
        }

        @Override
        public void onParticipantJoined(String uid, String role, String metaData,
                                       boolean videoEnabled, boolean audioEnabled,
                                       Red5Renderer renderer) {
            Log.d(TAG, "Participant joined: " + uid + " (role: " + role + ")");
        }

        @Override
        public void onParticipantLeft(String uid) {
            Log.d(TAG, "Participant left: " + uid);
        }

        @Override
        public void onParticipantMediaUpdate(String uid, boolean videoEnabled,
                                            boolean audioEnabled, long timestamp) {
            Log.d(TAG, "Participant " + uid + " - video: " + videoEnabled + ", audio: " + audioEnabled);
        }
    };

    red5Client = IRed5WebrtcClient.builder()
        .setActivity(this)
        .setLicenseKey(YOUR_SDK_LICENSE_KEY)
        .setStreamManagerHost(YOUR_STREAM_MANAGER_HOST)
        .setVideoEnabled(true)
        .setAudioEnabled(true)
        .setVideoWidth(1280)
        .setVideoHeight(720)
        .setVideoFps(30)
        .setVideoBitrate(1500)
        .setVideoSource(IRed5WebrtcClient.StreamSource.FRONT_CAMERA)
        .setVideoRenderer(localVideoRenderer)
        .setEventListener(this)
        .setConferenceListener(conferenceListener)  // Set conference listener
        .build();
}
```

#### Step 2: Join the Room

```java
String roomId = "my-conference-room";
String userId = "john_" + System.currentTimeMillis();
String token = ""; // Optional authentication token
String role = "publisher"; // "publisher" or "subscriber"
String metaData = "{\"name\":\"John Doe\"}"; // Optional JSON metadata

red5Client.join(roomId, userId, token, role, metaData);
```

### Leaving a Conference Room

```java
red5Client.release();
```

### Listening for Conference Events

#### `onJoinRoomSuccess`

Called when you successfully join a conference room.

```java
@Override
public void onJoinRoomSuccess(String roomId, ArrayList participants) {
    runOnUiThread(() -> {
        Toast.makeText(this, "Joined room: " + roomId, Toast.LENGTH_SHORT).show();
        updateParticipantCount(participants.size());
    });
}
```

#### `onParticipantJoined`

Called when a new participant joins the room. This is where you receive their video renderer.

```java
@Override
public void onParticipantJoined(String uid, String role, String metaData,
                               boolean videoEnabled, boolean audioEnabled,
                               Red5Renderer renderer) {
    runOnUiThread(() -> {
        if (renderer != null) {
            participantContainer.addView(renderer);
        }
        updateParticipantList();
    });
}
```

#### `onParticipantMediaUpdate`

Called when a participant toggles their camera or microphone.

```java
@Override
public void onParticipantMediaUpdate(String uid, boolean videoEnabled,
                                    boolean audioEnabled, long timestamp) {
    runOnUiThread(() -> {
        updateParticipantMediaState(uid, videoEnabled, audioEnabled);

        if (!videoEnabled) {
            showCameraOffIndicator(uid);
        }
        if (!audioEnabled) {
            showMutedIndicator(uid);
        }
    });
}
```
