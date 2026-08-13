_From: Stream Manager 2.0 Explicit Provisioning_

## Use Case 3: Ingest Restreamer (SRT/RTSP/IP Camera)

**Scenario**: Ingest a stream from an external source (SRT listener, RTSP camera, MPEG-TS) onto an origin node.

### Provision Definition

**ingest-srt-persist.json**
```json
[
  {
    "provisionGuid": "srt-camera1",
    "streams": [
      {
        "streamGuid": "live/camera1",
        "abrLevel": 0,
        "camParams": {
          "properties": {
            "action": "create",
            "type": "srt",
            "ip": "0.0.0.0",
            "port": "9000",
            "frameType": 0,
            "latency": 120,
            "reorder": 16,
            "overhead": 100,
            "keyLength": 0,
            "unlinkClock": false,
            "audio": true,
            "video": true,
            "persist": "true"
          }
        }
      }
    ]
  }
]
```

**Parameters Explained:**
- `type: "srt"` - SRT listener mode (other options: `rtsp`, `mpegts`, `zixi-push`, `zixi-pull`)
- `persist: "true"` - If the stream goes away, automatically retry/redistribute
- `port: "9000"` - Listen on port 9000 for incoming SRT connection

### Workflow Steps

#### 1. Create Provision
```bash
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${JWT}" \
     -X POST \
     --data @ingest-srt-persist.json \
     https://streammanager.example.com/as/v1/streams/provision/default
```

#### 2. Distribute to Origin Node
```bash
curl -H "Authorization: Bearer ${JWT}" \
     -X POST \
     "https://streammanager.example.com/as/v1/streams/provision/default/distribute/srt-camera1?capabilities=PUBLISH&blocking=true"
```

**Response:**
```json
[
  {
    "streamGuid": "live/camera1",
    "serverAddress": "192.168.1.10",
    "nodeRole": "origin",
    "nodeState": "INSERVICE",
    "subGroup": "us-east"
  }
]
```

#### 3. Get Server for Publish (Alternative)
```bash
curl "https://streammanager.example.com/as/v1/streams/stream/default/publish/live/camera1?restream=true"
```

This combines steps 2-3 using the implicit distribution approach.

#### 4. Send SRT Stream to Origin

From your camera or encoder, send SRT stream to `srt://192.168.1.10:9000`:

```bash
ffmpeg -f lavfi -re -i testsrc=size=1280x720:rate=30 \
       -f lavfi -re -i sine=frequency=1000:sample_rate=44100 \
       -pix_fmt yuv420p -c:v libx264 -b:v 2000k \
       -c:a aac -b:a 128k \
       -f mpegts "srt://192.168.1.10:9000?pkt_size=1316"
```

#### 5. Verify Stream is LIVE
```bash
curl -H "Authorization: Bearer ${JWT}" \
     "https://streammanager.example.com/as/v1/streams/stream/default/live/camera1?stats=true"
```

Expected state: `"state": "LIVE"`

#### 6. Subscribe
```bash
curl "https://streammanager.example.com/as/v1/streams/stream/default/subscribe/live/camera1"
```

#### 7. Stream Stops - Automatic Recovery

If the SRT source disconnects and then reconnects, the `persist: "true"` flag ensures the restreamer automatically retries and the stream comes back without manual intervention.

---
