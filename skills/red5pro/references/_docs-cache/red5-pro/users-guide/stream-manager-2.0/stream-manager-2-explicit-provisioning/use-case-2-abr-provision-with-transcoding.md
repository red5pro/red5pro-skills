_From: Stream Manager 2.0 Explicit Provisioning_

## Use Case 2: ABR Provision With Transcoding

**Scenario**: Publish one high-quality stream, let the server transcode it into multiple ABR variants.

### Provision Definition

**abr-transcode.json**
```json
[
  {
    "provisionGuid": "abr-transcode1",
    "capabilities": ["TRANSCODE"],
    "streams": [
      {
        "streamGuid": "live/mystream_3",
        "abrLevel": 3,
        "videoParams": {
          "videoWidth": 320,
          "videoHeight": 180,
          "videoBitRate": 500000
        }
      },
      {
        "streamGuid": "live/mystream_2",
        "abrLevel": 2,
        "videoParams": {
          "videoWidth": 640,
          "videoHeight": 360,
          "videoBitRate": 1000000
        }
      },
      {
        "streamGuid": "live/mystream_1",
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

#### 1. Create Provision
```bash
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${JWT}" \
     -X POST \
     --data @abr-transcode.json \
     https://streammanager.example.com/as/v1/streams/provision/default
```

#### 2. Distribute to Origin AND Transcoder (Explicit)
```bash
curl -H "Authorization: Bearer ${JWT}" \
     -X POST \
     "https://streammanager.example.com/as/v1/streams/provision/default/distribute/abr-transcode1?capabilities=PUBLISH,TRANSCODE&endpoints=1&blocking=true"
```

**Response:**
```json
[
  {
    "streamGuid": "live/mystream_1",
    "serverAddress": "192.168.1.20",
    "nodeRole": "transcoder",
    "nodeState": "INSERVICE",
    "subGroup": "us-east"
  },
  {
    "streamGuid": "live/mystream_1",
    "serverAddress": "192.168.1.10",
    "nodeRole": "origin",
    "nodeState": "INSERVICE",
    "subGroup": "us-east"
  }
]
```

**Note:** The transcoder is listed first - this is where you should publish.

#### 3. Get Server for Publish (Combined Approach)

Alternatively, use the traditional approach with `transcode=true`:
```bash
curl "https://streammanager.example.com/as/v1/streams/stream/default/publish/live/mystream_1?transcode=true&distribute=true"
```

This both selects servers and distributes the provision in one call.

#### 4. Publish to Transcoder

Publish **only** `live/mystream_1` to the transcoder address (first result).

The transcoder will:
- Receive your high-quality stream
- Transcode it into all three variants
- Forward all variants to the origin

#### 5. Verify All Variants Exist
```bash
curl -H "Authorization: Bearer ${JWT}" \
     "https://streammanager.example.com/as/v1/streams/stream/default/live/mystream_1?stats=true"
```

You should see three streams (`mystream_1`, `mystream_2`, `mystream_3`) all on the origin node.

---
