_From: Stream Manager 2.0 Explicit Provisioning_

## Workflow Comparison

### Old Workflow (Implicit Distribution)

**Simple case: ABR with transcoding**

1. Create ABR provision with videoParams
2. Get Server for Publish (implicitly distributes to origin + transcoder)
3. Publish to returned server (transcoder)

```bash
POST /as/v1/streams/provision/{nodeGroup}
GET /as/v1/streams/stream/{nodeGroup}/publish/{streamGuid}?transcode=true
```

**Limitations:**
- Distribution happens automatically during Get Server for Publish
- Limited control over where provisions go (always origin + transcoder for `transcode=true`)
- Restreamer provisions always go to origin/transcoder nodes (ingest restreaming only)
- Cannot test distribution separately from publishing
- **Complex case:** To use both `transcode=true` AND `restream=true`, you must create TWO separate provisions with different `provisionGuid` values, where the restreamer provision's `streamGuid` matches the top-level ABR variant

### New Workflow (Explicit Distribution)

**Simple case: ABR with transcoding**

1. Create ABR provision

```
POST /as/v1/streams/provision/{nodeGroup}
```

2. Explicitly distribute provision to origin and transcoder

```
POST /as/v1/streams/provision/{nodeGroup}/distribute/{provisionGuid}?capabilities=PUBLISH,TRANSCODE
```

3. Get Server for Publish (optionally skip distribution with `distribute=false`)

```
GET /as/v1/streams/stream/{nodeGroup}/publish/{streamGuid}?distribute=false
```

4. Publish to returned server (transcoder)

```bash
ffmpeg -stream_loop -1 -re -i testvideo.mp4 -c:v libx264 -profile:v baseline -c:a aac -b:v 500k -f flv rtmp://158.0.0.223:1935/live/test1_1
```

**Benefits:**
- Separate distribution from server selection
- Precise control via capabilities parameter
- **Can push restreamers to edge nodes** (egress restreaming) using `capabilities=SUBSCRIBE`
- Easier testing and debugging
- Same workflow works for both simple and complex cases

---
