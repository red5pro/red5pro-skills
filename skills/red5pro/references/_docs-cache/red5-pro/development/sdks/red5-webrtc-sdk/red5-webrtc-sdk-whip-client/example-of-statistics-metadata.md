_From: WHIP Client_

## Example of Statistics Metadata

The following is an example of a statistics metadata that is emitted in a `WebRTC.StatsReport` event and POSTed to any defined optional endpoint:

```json
{
  "name": "RTCPublisherStats",
  "created": 1758037554636,
  "device": {
    "browser": "chrome",
    "version": 140,
    "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "vendor": "Google Inc."
  },
  "client": {
    "enabled": true,
    "endpoint": null,
    "host": "myred5.deploy",
    "app": "live",
    "streamName": "todd"
  },
  "type": "stats-report",
  "timestamp": 1758037561373,
  "data": {
    "type": "outbound-rtp",
    "kind": "video",
    "codecId": "COT01_96_level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;sps-pps-idr-in-keyframe=1",
    "mediaType": "video",
    "active": true,
    "bytesSent": 212534,
    "packetsSent": 245,
    "firCount": 0,
    "pliCount": 3,
    "frameWidth": 640,
    "frameHeight": 360,
    "framesEncoded": 128,
    "framesPerSecond": 29,
    "framesSent": 128,
    "keyFramesEncoded": 4,
    "qualityLimitationReason": "bandwidth",
    "qualityLimitationDurations": {
      "bandwidth": 4.734,
      "cpu": 0,
      "none": 0.004,
      "other": 0
    },
    "estimatedBitrate": 435
  }
}
```

# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:
