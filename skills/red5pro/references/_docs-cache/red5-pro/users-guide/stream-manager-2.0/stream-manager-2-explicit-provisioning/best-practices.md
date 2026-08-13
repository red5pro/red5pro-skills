_From: Stream Manager 2.0 Explicit Provisioning_

## Best Practices

### 1. Use Explicit Distribution for Testing

Separate distribution from publishing when testing:

```bash
# Test distribution
curl -X POST ".../distribute/my-provision?capabilities=PUBLISH"

# Verify it worked
curl ".../provision/default/my-provision?status=true"

# Then publish
curl ".../publish/live/mystream?distribute=false"
```

### 2. Egress Restreaming for Scale

For RTMP push (social media, CDN), always use egress restreaming:

```json
{
  "capabilities": ["SUBSCRIBE"],
  "streams": [{
    "camParams": {
      "properties": {
        "type": "rtmp-push",
        "rtmpUri": "rtmp://..."
      }
    }
  }]
}
```

This offloads push to edge nodes.

### 3. Persist for Reliability

Always use `"persist": "true"` for production restreamers (ingest and egress):

```json
"camParams": {
  "properties": {
    "persist": "true"
  }
}
```

The Stream Manager will automatically retry/redistribute if the stream goes away.

### 4. Immediate Flag for Ingest

For ingest restreamers, use `"immediate": "true"` when the source is already streaming:

```json
"camParams": {
  "properties": {
    "type": "rtsp",
    "rtspUri": "rtsp://camera.local/stream",
    "immediate": "true"
  }
}
```

For egress/push, use `"immediate": "false"` to wait for the source stream.

### 5. Retry Configuration

For unreliable networks, configure retries:

```json
"camParams": {
  "properties": {
    "attempts": "20",
    "delayS": "15"
  }
}
```

This gives 20 attempts × 15 seconds = 5 minutes of retry time.

---
