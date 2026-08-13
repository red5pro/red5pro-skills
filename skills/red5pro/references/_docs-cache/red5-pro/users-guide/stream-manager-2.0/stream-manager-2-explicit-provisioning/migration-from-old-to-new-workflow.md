_From: Stream Manager 2.0 Explicit Provisioning_

## Migration from Old to New Workflow

### For Ingest (RTSP, SRT, IP Cameras)

**Old:**
```bash
curl -X POST --data @provision.json .../provision/default
curl ".../publish/live/camera1?restream=true"
```

**New (equivalent):**
```bash
curl -X POST --data @provision.json .../provision/default
curl -X POST ".../distribute/camera-provision?capabilities=PUBLISH"
```

**New (explicit):**
```bash
curl -X POST --data @provision.json .../provision/default
curl -X POST ".../distribute/camera-provision?capabilities=PUBLISH"
curl ".../publish/live/camera1?distribute=false"
```

### For RTMP Push (Social Media)

**Old (ingest restreamer on origin):**
```json
{
  "provisionGuid": "social1",
  "streams": [{
    "streamGuid": "live/mystream",
    "camParams": { "properties": { "type": "rtmp-push", "rtmpUri": "..." } }
  }]
}
```
```bash
curl ".../publish/live/mystream?restream=true"
```

**New (egress restreamer on edge):**
```json
{
  "provisionGuid": "social1",
  "capabilities": ["SUBSCRIBE"],
  "streams": [{
    "streamGuid": "live/mystream",
    "camParams": { "properties": { "type": "rtmp-push", "rtmpUri": "..." } }
  }]
}
```
```bash
curl ".../publish/live/mystream"  # No restream flag
curl -X POST ".../distribute/social1?capabilities=SUBSCRIBE"
```

---
