_From: WHEP Client_

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCSubscriberStats",
  "created": 1727789134165,
  "device": {
    "browser": "chrome",
    "version": 129,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "stream1",
    "subscriptionId": "subscriber-922e"
  },
  "type": "stats-report",
  "timestamp": 1727789139169,
  "data": {
    "type": "inbound-rtp",
    "kind": "video",
    "codecId": "CIT01_102_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
    "jitter": 0.005,
    "packetsLost": 0,
    "packetsReceived": 439,
    "bytesReceived": 412627,
    "firCount": 0,
    "frameWidth": 640,
    "frameHeight": 480,
    "framesDecoded": 143,
    "framesDropped": 0,
    "framesPerSecond": 30,
    "framesReceived": 143,
    "freezeCount": 0,
    "keyFramesDecoded": 3,
    "nackCount": 0,
    "pauseCount": 0,
    "pliCount": 0,
    "totalFreezesDuration": 0,
    "totalPausesDuration": 0,
    "estimatedBitrate": 660
  }
}
```

# Live Seek

Included in the SDK is the ability to subscribe to a live stream and provide capabilities to seek and playback to previous segments of the stream.

This capability is not inherent in browsers nor the live `MediaStream`. As such, this feature of "live seek" requires [HLS.JS](https://github.com/video-dev/hls.js/) as a dependency in order to load and playback historical HLS segments stored on the server or in cloud storage.

> This feature also requires some server-side configurations in order to capture and server HLS: [https://www.red5.net/docs/red5-pro/users-guide/dvr/](https://www.red5.net/docs/red5-pro/users-guide/dvr/)
