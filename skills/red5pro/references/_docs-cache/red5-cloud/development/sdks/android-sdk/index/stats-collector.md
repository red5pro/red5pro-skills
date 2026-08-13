_From: Android SDK_

## Stats Collector

The Stats Collector automatically gathers WebRTC statistics every 2 seconds (configurable).

### Enabling Stats Collection

```java
IRed5WebrtcClient webrtcClient = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    .setStreamManagerHost(YOUR_STREAM_MANAGER_HOST)
    // ... other config ...
    .setStatsCollectorEnabled(true)
    .setStatsPollingIntervalMs(2000) // Optional: default is 2000ms
    .build();
```

### Receiving Stats

Implement the `onRtcStats()` callback in your `Red5EventListener`:

```java
@Override
public void onRtcStats(RTCStats stats) {
    Log.d(TAG, "TX Bitrate: " + stats.txKBitRate + " kbps");
    Log.d(TAG, "RX Bitrate: " + stats.rxKBitRate + " kbps");
    Log.d(TAG, "Packet Loss: " + stats.rxPacketLossRate + "%");
}
```

### Audio Levels

The Stats Collector provides real-time audio level monitoring for voice activity detection.

#### Local Audio Level

```java
@Override
public void onRtcStats(RTCStats stats) {
    // Local microphone level (0.0 = silence, 1.0 = maximum)
    double micLevel = stats.localAudioLevel;

    if (micLevel > 0.05) {
        showMicrophoneActivity();
    } else {
        hideMicrophoneActivity();
    }
}
```

#### Remote Participant Audio Levels

```java
@Override
public void onRtcStats(RTCStats stats) {
    for (Map.Entry<String, RemoteParticipantStats> entry : stats.participantStats.entrySet()) {
        String participantId = entry.getKey();
        RemoteParticipantStats pStats = entry.getValue();

        double audioLevel = pStats.audioLevel;

        if (audioLevel > 0.05) {
            highlightSpeakingParticipant(participantId);
        }
    }
}
```

### Conference Stats

Access per-participant statistics in conference mode:

```java
@Override
public void onRtcStats(RTCStats stats) {
    for (Map.Entry<String, RemoteParticipantStats> entry : stats.participantStats.entrySet()) {
        String participantUid = entry.getKey();
        RemoteParticipantStats pStats = entry.getValue();

        Log.d(TAG, "=== Participant: " + participantUid + " ===");
        Log.d(TAG, "Audio Level: " + pStats.audioLevel);
        Log.d(TAG, "RX Bitrate: " + pStats.rxKBitRate + " kbps");
        Log.d(TAG, "Packet Loss: " + pStats.packetLossRate + "%");
        Log.d(TAG, "RTT: " + pStats.rtt + " ms");
    }
}
```
