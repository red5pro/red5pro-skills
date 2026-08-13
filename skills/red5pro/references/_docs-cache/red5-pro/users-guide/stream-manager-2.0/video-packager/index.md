---
title: Video Packager
description: Convert RTMP streams to HLS for CDN delivery
menu_order: 115
---

The Video Packager is a service that transcodes RTMP streams to HLS format. It integrates with the Red5 Pro autoscaling system via Stream Manager 2.0, automatically packaging live streams for CDN delivery or local storage.

## Overview

The Video Packager:

- Receives requests from Stream Manager to transcode specific streams
- Pulls RTMP from Red5 Pro origin nodes
- Outputs HLS segments to S3 or local filesystem
- Reports metrics to Kafka for autoscaling visibility

## Use Cases

**CDN Distribution**: Package RTMP streams to HLS for delivery via AWS CloudFront or other CDNs:

```
Origin Node (RTMP) → Video Packager → S3 → CloudFront → Viewers
```

**Local HLS Serving**: For deployments without S3 access, output to local storage with built-in HTTP serving:

```
Origin Node (RTMP) → Video Packager → Local Files → Built-in Server → Viewers
```

## Architecture

The Video Packager runs as a separate node type in the autoscaling cluster:

When a stream starts on an origin node, Stream Manager sends a request to the Video Packager to begin transcoding. The Video Packager pulls the RTMP stream, generates HLS segments, and uploads them to the configured output destination.

## Output Modes

### S3 Output (Default)

HLS segments are uploaded directly to Amazon S3:

```
s3://{bucket}/{prefix}/hls/{stream_guid}/
├── playlist.m3u8
├── segment00000.ts
├── segment00001.ts
└── ...
```

Configure with:
- `R5AS_OUTPUT_TYPE=s3`
- `R5AS_S3_BUCKET={bucket-name}`
- `R5AS_S3_REGION={region}`

### File Output

HLS segments are written to local filesystem:

```
{base_path}/hls/{stream_guid}/
├── playlist.m3u8
├── segment00000.ts
├── segment00001.ts
└── ...
```

Configure with:
- `R5AS_OUTPUT_TYPE=file`
- `R5AS_FILE_OUTPUT_BASE_PATH=/var/hls`
- `R5AS_FILE_SERVE_ENABLED=true` (optional built-in HTTP server)

## Quick Start

### 1. Configure NodeGroupConfig

Add a video_packager role to your NodeGroupConfig:

```json
{
  "images": {
    "video_packager": {
      "name": "video_packager",
      "image": "video-packager-base-image",
      "cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
    }
  },
  "roles": {
    "video_packager": {
      "name": "video_packager",
      "imageName": "video_packager",
      "capabilities": ["VIDEO_PACKAGER"],
      "lifecycle": "AUTO",
      "initScripts": [
        "docker run -d --name as-video-packager --network host -e R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG -e R5AS_S3_BUCKET=my-bucket -e R5AS_S3_REGION=us-west-2 -e R5AS_S3_ACCESS_KEY_ID=AKIA... -e R5AS_S3_SECRET_ACCESS_KEY=... -v /usr/local/red5pro/nodeStartConfig.json:/usr/local/video-packager/conf/nodeStartConfig.json your-registry/video-packager:latest"
      ]
    }
  },
  "groups": {
    "region1": {
      "rulesByRole": {
        "video_packager": {
          "nodeRoleName": "video_packager",
          "min": 1,
          "max": 3
        }
      }
    }
  }
}
```

### 2. Deploy the NodeGroup

Deploy the NodeGroupConfig via Stream Manager Admin API. See [NodeGroupConfig documentation](/docs/red5-pro/users-guide/stream-manager-2.0/stream-manager-2-node-group-config/) for details.

### 3. Verify Operation

Once deployed, verify the Video Packager is healthy:

```bash
curl http://{video-packager-ip}:5080/health
```

For more detail including active streams:

```bash
curl http://{video-packager-ip}:5080/health/details
```

**Security note:** Port 5080 is the internal command port used by Stream Manager to control the Video Packager. Do not expose this port to the public internet. Configure your cloud security groups to allow access only from Stream Manager and your internal network.

## Stream States

When a stream is being processed, it transitions through these states:

| State | Description |
|-------|-------------|
| `WAIT` | Stream starting, connecting to RTMP source |
| `LIVE` | Stream active, HLS segments being generated |
| `ERROR` | Stream failed (connection lost, source ended unexpectedly) |

Streams transition from WAIT to LIVE once the RTMP connection is established and HLS output begins. When the source stream ends normally, the stream is removed. If an error occurs, the stream briefly enters ERROR state before being cleaned up.

## Next Steps

- [NodeGroupConfig Examples](/docs/red5-pro/development/api/stream-manager-2.0/video-packager/)
- [Environment Variables Reference](/docs/red5-pro/development/api/stream-manager-2.0/video-packager/video-packager-environment-variables/)
