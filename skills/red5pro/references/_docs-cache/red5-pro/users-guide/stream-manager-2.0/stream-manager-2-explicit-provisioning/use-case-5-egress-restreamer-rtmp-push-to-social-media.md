_From: Stream Manager 2.0 Explicit Provisioning_

## Use Case 5: Egress Restreamer (RTMP Push to Social Media)

**Scenario**: Push a live stream to a social media platform (YouTube, Facebook, custom RTMP) **from an edge node** to avoid loading the origin.

### Why Egress Restreaming?

**Traditional (Old) Workflow:**
- Restreamer provisions always go to origin/transcoder nodes (using `PUBLISH` or `TRANSCODE` capability)
- Origin node must both serve the stream AND push to social media
- Increases origin load

**New Egress Workflow:**
- Set `capabilities: ["SUBSCRIBE"]` to push restreamer to an edge node
- Edge node subscribes to the stream and pushes to social media
- Origin only serves the stream, egress load is offloaded to edge

### Provision Definition

**egress-rtmp-youtube.json**
```json
[
  {
    "provisionGuid": "social-youtube",
    "capabilities": ["SUBSCRIBE"],
    "streams": [
      {
        "streamGuid": "live/mystream",
        "abrLevel": 0,
        "camParams": {
          "properties": {
            "action": "create",
            "type": "rtmp-push",
            "rtmpUri": "rtmp://a.rtmp.youtube.com/live2/your-stream-key-here",
            "immediate": "false",
            "attempts": "3",
            "delayS": "10",
            "persist": "true"
          }
        }
      }
    ]
  }
]
```

**Parameters Explained:**
- `capabilities: ["SUBSCRIBE"]` - **Key change!** Pushes restreamer to edge node
- `type: "rtmp-push"` - Push mode (forwards stream to external RTMP server)
- `immediate: "false"` - Wait for source stream to be live before attempting push
- `attempts: "3"` - Try up to 3 times if push fails
- `delayS: "10"` - Wait 10 seconds between retries
- `persist: "true"` - If stream stops and restarts, automatically resume push

### Workflow Steps (Old Way - Ingest Restreamer)

For comparison, the old workflow for RTMP push:

```bash
# Create provision
curl -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" \
     -X POST --data @old-rtmp-push.json \
     https://streammanager.example.com/as/v1/streams/provision/default

# Get Server for Publish distributes restreamer to ORIGIN
curl "https://streammanager.example.com/as/v1/streams/stream/default/publish/live/mystream?restream=true"

# Publish to origin (origin pushes to YouTube)
```

**Problem:** Origin node handles both publishing and RTMP push.

### Workflow Steps (New Way - Egress Restreamer)

#### 1. Start Publishing First
```bash
# Get origin server
curl "https://streammanager.example.com/as/v1/streams/stream/default/publish/live/mystream"

# Publish to origin (normal workflow, no restreaming yet)
```

#### 2. Create Egress Provision
```bash
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${JWT}" \
     -X POST \
     --data @egress-rtmp-youtube.json \
     https://streammanager.example.com/as/v1/streams/provision/default
```

#### 3. Distribute to Edge Node (Egress)
```bash
curl -H "Authorization: Bearer ${JWT}" \
     -X POST \
     "https://streammanager.example.com/as/v1/streams/provision/default/distribute/social-youtube?capabilities=SUBSCRIBE&blocking=true"
```

**Response:**
```json
[
  {
    "streamGuid": "live/mystream",
    "serverAddress": "192.168.1.30",
    "nodeRole": "edge",
    "nodeState": "INSERVICE",
    "subGroup": "us-west"
  }
]
```

**What Happens:**
1. Provision distributed to **edge node** (not origin!)
2. Edge node subscribes to `live/mystream` from origin
3. Edge node pushes received stream to YouTube RTMP server
4. Origin continues serving stream normally

#### 4. Stream Stops and Restarts

If you stop publishing and restart, the `persist: "true"` flag ensures:
1. Edge detects stream came back online
2. RTMP push automatically resumes
3. No manual intervention needed

#### 5. Delete Provision (Stop Push)
```bash
curl -H "Authorization: Bearer ${JWT}" \
     -X DELETE \
     "https://streammanager.example.com/as/v1/streams/provision/default/social-youtube"
```

The edge node stops pushing to YouTube.

---
