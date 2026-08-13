_From: Stream Manager 2.0 Explicit Provisioning_

## Use Case 4: Combined ABR + Restreamer (Ingest with Transcoding)

**Scenario**: Ingest from an IP camera and transcode into multiple variants.

### Provisions

Create **two separate provisions**:

**ingest-camera.json** (Restreamer)
```json
[
  {
    "provisionGuid": "camera-ingest",
    "streams": [
      {
        "streamGuid": "live/camera1",
        "abrLevel": 0,
        "camParams": {
          "properties": {
            "action": "create",
            "type": "rtsp",
            "rtspUri": "rtsp://192.168.100.50:554/stream",
            "immediate": "true",
            "persist": "true"
          }
        }
      }
    ]
  }
]
```

**transcode-camera.json** (ABR Transcoding)
```json
[
  {
    "provisionGuid": "camera-abr",
    "capabilities": ["TRANSCODE"],
    "streams": [
      {
        "streamGuid": "live/camera1_3",
        "abrLevel": 3,
        "videoParams": {
          "videoWidth": 320,
          "videoHeight": 180,
          "videoBitRate": 500000
        }
      },
      {
        "streamGuid": "live/camera1_2",
        "abrLevel": 2,
        "videoParams": {
          "videoWidth": 640,
          "videoHeight": 360,
          "videoBitRate": 1000000
        }
      },
      {
        "streamGuid": "live/camera1_1",
        "abrLevel": 1,
        "videoParams": {
          "videoWidth": 1280,
          "videoHeight": 720,
          "videoBitRate": 2000000
        }
      }
    ]
  }
]
```

### Workflow Steps

#### 1. Create Both Provisions
```bash
curl -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" \
     -X POST --data @ingest-camera.json \
     https://streammanager.example.com/as/v1/streams/provision/default

curl -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" \
     -X POST --data @transcode-camera.json \
     https://streammanager.example.com/as/v1/streams/provision/default
```

#### 2. Distribute Restreamer to Origin
```bash
curl -H "Authorization: Bearer ${JWT}" -X POST \
     "https://streammanager.example.com/as/v1/streams/provision/default/distribute/camera-ingest?capabilities=PUBLISH&blocking=true"
```

The origin node immediately begins ingesting from the RTSP camera.

#### 3. Distribute ABR to Origin and Transcoder
```bash
curl -H "Authorization: Bearer ${JWT}" -X POST \
     "https://streammanager.example.com/as/v1/streams/provision/default/distribute/camera-abr?capabilities=PUBLISH,TRANSCODE&blocking=true"
```

The transcoder pulls `live/camera1` from the origin and begins creating variants.

#### 4. Verify All Streams
```bash
curl -H "Authorization: Bearer ${JWT}" \
     "https://streammanager.example.com/as/v1/streams/stream/default?stats=false"
```

You should see `camera1`, `camera1_1`, `camera1_2`, `camera1_3`.

---
