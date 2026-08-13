---
title: Video Packager Environment Variables
description: Complete environment variable reference for the Video Packager service
menu_order: 3
---

The Video Packager runs inside a Docker container and is configured via environment variables.

For an overview of the Video Packager, see the [Video Packager User's Guide](/docs/red5-pro/users-guide/stream-manager-2.0/video-packager/).

## Output Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_OUTPUT_TYPE` | `s3` | Output destination: `s3` or `file` |

## S3 Output

Used when `R5AS_OUTPUT_TYPE=s3`:

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_S3_BUCKET` | (none) | **Required.** S3 bucket name |
| `R5AS_S3_REGION` | `us-east-1` | AWS region |
| `R5AS_S3_PATH_PREFIX` | (none) | Optional prefix for S3 object keys |
| `R5AS_S3_ACCESS_KEY_ID` | (none) | AWS access key ID (or use IAM role) |
| `R5AS_S3_SECRET_ACCESS_KEY` | (none) | AWS secret access key (or use IAM role) |

## File Output

Used when `R5AS_OUTPUT_TYPE=file`:

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_FILE_OUTPUT_BASE_PATH` | `/var/hls` | Base directory for HLS output |
| `R5AS_FILE_OUTPUT_MAX_FILES` | `0` | Max segments to retain (0 = unlimited) |
| `R5AS_FILE_OUTPUT_CLEANUP_ON_END` | `false` | Delete stream directory when stream ends |
| `R5AS_FILE_OUTPUT_SEND_KEYFRAME_REQUESTS` | `true` | Request keyframes from source |

## Built-in File Server

Optional HTTP server for serving HLS files directly (file output mode only):

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_FILE_SERVE_ENABLED` | `false` | Enable built-in file server |
| `R5AS_FILE_SERVE_PORT` | `8080` | HTTP port for file server |
| `R5AS_FILE_SERVE_BIND_ADDRESS` | `0.0.0.0` | Bind address |
| `R5AS_FILE_SERVE_PATH_PREFIX` | `/hls` | URL path prefix |
| `R5AS_FILE_SERVE_CORS_ORIGINS` | `*` | CORS allowed origins |

## Command API

The HTTP API that receives requests from Stream Manager:

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_COMMAND_PORT` | `5080` | HTTP port for command API |
| `R5AS_COMMAND_BIND_ADDRESS` | `0.0.0.0` | Bind address |

## HLS Settings

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_HLS_SEGMENT_DURATION_SECONDS` | `10` | Target segment duration in seconds |
| `R5AS_HLS_PLAYLIST_LENGTH_SEGMENTS` | `10` | Number of segments in playlist |
| `R5AS_HLS_ENABLE_PROGRAM_DATE_TIME` | `true` | Include EXT-X-PROGRAM-DATE-TIME tags |

## Kafka Reporting

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_KAFKA_ENABLED` | `false` | Enable Kafka metrics reporting |
| `R5AS_KAFKA_REPORTING_INTERVAL_MS` | `1000` | Reporting interval in milliseconds |

Kafka broker addresses and authentication are provided via `nodeStartConfig.json`, not environment variables.

## Pipeline Limits

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_PIPELINE_MAX_CONCURRENT` | `10` | Maximum concurrent streams |
| `R5AS_PIPELINE_INACTIVITY_TIMEOUT_SECONDS` | `300` | Stop stream after N seconds of no data |
| `R5AS_PIPELINE_MAX_DURATION_SECONDS` | `86400` | Maximum stream duration (24 hours) |

## Logging

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_LOG_OUTPUT` | `journal` | Output target: `journal` or `file` |
| `R5AS_LOG_LEVEL` | `info` | Log level: `trace`, `debug`, `info`, `warn`, `error` |
| `R5AS_LOG_FILE_PATH` | `/var/log/video-packager/video-packager.log` | Log file path (when `R5AS_LOG_OUTPUT=file`) |
| `R5AS_LOG_FILE_MAX_SIZE_MB` | `200` | Max log file size in MB |
| `R5AS_LOG_FILE_MAX_COUNT` | `5` | Max rotated log files to keep |

The `RUST_LOG` environment variable can also be used to control log levels (e.g., `RUST_LOG=debug`).

## Video Encoding

These settings control the video transcoding pipeline:

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_VIDEO_CODEC` | `x264enc` | GStreamer video encoder element |
| `R5AS_VIDEO_BITRATE` | `2500000` | Video bitrate in bits/second |
| `R5AS_VIDEO_PRESET` | `medium` | Encoder preset (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow) |
| `R5AS_VIDEO_TUNE` | `zerolatency` | Encoder tuning (zerolatency, film, animation, grain, stillimage, psnr, ssim, fastdecode) |

## Audio Encoding

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_AUDIO_CODEC` | `voaacenc` | GStreamer audio encoder element |
| `R5AS_AUDIO_BITRATE` | `128000` | Audio bitrate in bits/second |
| `R5AS_AUDIO_SAMPLE_RATE` | `48000` | Audio sample rate in Hz |
| `R5AS_AUDIO_CHANNELS` | `2` | Number of audio channels |

## GStreamer

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_GSTREAMER_PLUGIN_PATH` | `/usr/local/video-packager/lib/gstreamer-1.0` | Path to GStreamer plugins |

## Node Identity

Node identity is provided via `nodeStartConfig.json`, which is automatically created by Stream Manager and distributed to the node by Terraform.

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `R5AS_NODE_START_CONFIG` | (none) | Base64-encoded nodeStartConfig.json content |

## Docker Usage

Pass environment variables to the Docker container with `-e`:

```bash
docker run -d --name video-packager --network host \
  -e R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG \
  -e R5AS_S3_BUCKET=my-bucket \
  -e R5AS_S3_REGION=us-west-2 \
  -e R5AS_S3_ACCESS_KEY_ID=AKIA... \
  -e R5AS_S3_SECRET_ACCESS_KEY=... \
  -v /usr/local/red5pro/nodeStartConfig.json:/usr/local/video-packager/conf/nodeStartConfig.json \
  your-registry/video-packager:latest
```
