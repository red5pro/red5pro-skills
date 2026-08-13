---
title: Video Packager NodeGroupConfig
description: NodeGroupConfig examples for deploying Video Packager
menu_order: 2
---

This page provides NodeGroupConfig examples for deploying Video Packager nodes in a Stream Manager 2.0 autoscaling cluster.

See also:
- [Video Packager Overview](/docs/red5-pro/users-guide/stream-manager-2.0/video-packager/)
- [NodeGroupConfig reference](/docs/red5-pro/users-guide/stream-manager-2.0/stream-manager-2-node-group-config/)

## Basic Structure

Video Packager nodes require:

1. **Image definition**: The Docker image containing the Video Packager
2. **Role definition**: Node role with `VIDEO_PACKAGER` capability
3. **Scaling rules**: Min/max nodes and scaling expressions

## S3 Output Example

Complete NodeGroupConfig for Video Packager with S3 output:

```json
{
  "name": "production-cluster",
  "description": "Production cluster with video packager",
  "cloudPlatform": "AWS",
  "cloudProperties": "environment=production;subnet=subnet-12345;security_group=sg-12345",
  "images": {
    "BaseImage": {
      "name": "BaseImage",
      "image": "red5pro-node-ami-v1",
      "cloudProperties": "instance_type=c5.xlarge"
    },
    "video_packager": {
      "name": "video_packager",
      "image": "video-packager-base-image",
      "cloudProperties": "instance_type=c5.large"
    }
  },
  "roles": {
    "origin": {
      "name": "origin",
      "imageName": "BaseImage",
      "capabilities": ["PUBLISH"]
    },
    "edge": {
      "name": "edge",
      "imageName": "BaseImage",
      "parentRoleName": "origin",
      "parentCardinality": "GLOBAL",
      "capabilities": ["SUBSCRIBE"]
    },
    "video_packager": {
      "name": "video_packager",
      "imageName": "video_packager",
      "capabilities": ["VIDEO_PACKAGER"],
      "lifecycle": "AUTO",
      "initScripts": [
        "docker run -d --name as-video-packager --network host -e R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG -e R5AS_S3_BUCKET=my-hls-bucket -e R5AS_S3_REGION=us-west-2 -e R5AS_S3_ACCESS_KEY_ID=AKIA... -e R5AS_S3_SECRET_ACCESS_KEY=... -v /usr/local/red5pro/nodeStartConfig.json:/usr/local/video-packager/conf/nodeStartConfig.json your-registry/video-packager:latest"
      ]
    }
  },
  "groups": {
    "us-west-2": {
      "subGroupName": "us-west-2",
      "groupType": "main",
      "cloudProperties": "region=us-west-2",
      "rulesByRole": {
        "origin": {
          "nodeRoleName": "origin",
          "min": 1,
          "max": 10,
          "increment": 1,
          "outExpression": "avg(cpu.usage) > 60.0",
          "inExpression": "avg(cpu.usage) < 25.0",
          "capacityRankingExpression": "cpu.usage",
          "capacityLimitExpression": "90.0"
        },
        "edge": {
          "nodeRoleName": "edge",
          "min": 1,
          "max": 20,
          "increment": 2,
          "outExpression": "avg(cpu.usage) > 60.0",
          "inExpression": "avg(cpu.usage) < 25.0",
          "capacityRankingExpression": "cpu.usage",
          "capacityLimitExpression": "90.0"
        },
        "video_packager": {
          "nodeRoleName": "video_packager",
          "min": 1,
          "max": 5,
          "increment": 1,
          "outExpression": "avg(cpu.usage) > 55.0",
          "inExpression": "avg(cpu.usage) < 20.0",
          "capacityRankingExpression": "cpu.usage",
          "capacityLimitExpression": "90.0"
        }
      }
    }
  }
}
```

## File Output Example

NodeGroupConfig for Video Packager with local file output and built-in server:

```json
{
  "roles": {
    "video_packager": {
      "name": "video_packager",
      "imageName": "video_packager",
      "capabilities": ["VIDEO_PACKAGER"],
      "lifecycle": "AUTO",
      "initScripts": [
        "docker run -d --name as-video-packager --network host -e R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG -e R5AS_OUTPUT_TYPE=file -e R5AS_FILE_SERVE_ENABLED=true -v /usr/local/red5pro/nodeStartConfig.json:/usr/local/video-packager/conf/nodeStartConfig.json -v /var/hls:/var/hls your-registry/video-packager:latest"
      ]
    }
  }
}
```

## OCI (Oracle Cloud) Example

NodeGroupConfig for OCI deployment:

```json
{
  "name": "oci-cluster",
  "cloudPlatform": "OCI",
  "cloudProperties": "environment=production;subnet=ocid1.subnet...;security_group=ocid1.networksecuritygroup...",
  "images": {
    "video_packager": {
      "name": "video_packager",
      "image": "video-packager-base-image",
      "cloudProperties": "instance_type=VM.Standard.E4.Flex-2-8"
    }
  },
  "roles": {
    "video_packager": {
      "name": "video_packager",
      "imageName": "video_packager",
      "capabilities": ["VIDEO_PACKAGER"],
      "lifecycle": "AUTO",
      "initScripts": [
        "docker run -d --name as-video-packager --network host -e R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG -e R5AS_S3_ACCESS_KEY_ID=... -e R5AS_S3_SECRET_ACCESS_KEY=... -e R5AS_S3_BUCKET=my-bucket -v /usr/local/red5pro/nodeStartConfig.json:/usr/local/video-packager/conf/nodeStartConfig.json iad.ocir.io/namespace/video-packager:latest"
      ]
    }
  }
}
```

## Role Configuration

### Capabilities

The Video Packager role must include the `VIDEO_PACKAGER` capability:

```json
"capabilities": ["VIDEO_PACKAGER"]
```

This capability enables Stream Manager to route transcoding requests to Video Packager nodes.

### initScripts

The `initScripts` array contains commands executed when the node starts. For Video Packager, this is a `docker run` command:

```json
"initScripts": [
  "docker run -d --name as-video-packager --network host -e R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG -e R5AS_S3_BUCKET=my-bucket -e R5AS_S3_REGION=us-west-2 -e R5AS_S3_ACCESS_KEY_ID=AKIA... -e R5AS_S3_SECRET_ACCESS_KEY=... -v /usr/local/red5pro/nodeStartConfig.json:/usr/local/video-packager/conf/nodeStartConfig.json your-registry/video-packager:latest"
]
```

All configuration of the Video Packager nodes is done by modifying this `docker run` command.

**Required for S3 output:**

| Environment Variable | Description |
|---------------------|-------------|
| `R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG` | Node identity (passed by Terraform) |
| `R5AS_S3_BUCKET=my-bucket` | Your S3 bucket name |
| `R5AS_S3_REGION=us-west-2` | AWS region of your bucket |
| `R5AS_S3_ACCESS_KEY_ID=AKIA...` | AWS access key ID |
| `R5AS_S3_SECRET_ACCESS_KEY=...` | AWS secret access key |

**Required for file output:**

| Environment Variable | Description |
|---------------------|-------------|
| `R5AS_NODE_START_CONFIG=$R5AS_NODE_START_CONFIG` | Node identity (passed by Terraform) |
| `R5AS_OUTPUT_TYPE=file` | Switch to file output mode |
| `-v /var/hls:/var/hls` | Mount HLS output directory |

**Also configure:**

| Option | Description |
|--------|-------------|
| `image:tag` | Your container registry and image version |

For the complete list of environment variables, see [Environment Variables Reference](/docs/red5-pro/development/api/stream-manager-2.0/video-packager/video-packager-environment-variables/).

**Don't change these** (required for proper operation):

| Option | Description |
|--------|-------------|
| `-d` | Run in detached mode |
| `--name as-video-packager` | Container name (used by autoscaling system) |
| `--network host` | Host networking for RTMP access to origin nodes |
| `-v .../nodeStartConfig.json:...` | Mount node identity config (provided by Terraform) |

## Multi-Region Deployment

For multi-region deployments, define Video Packager nodes in each region:

```json
{
  "groups": {
    "us-west-2": {
      "subGroupName": "us-west-2",
      "cloudProperties": "region=us-west-2",
      "rulesByRole": {
        "video_packager": {
          "nodeRoleName": "video_packager",
          "min": 1,
          "max": 5
        }
      }
    },
    "us-east-1": {
      "subGroupName": "us-east-1",
      "cloudProperties": "region=us-east-1",
      "rulesByRole": {
        "video_packager": {
          "nodeRoleName": "video_packager",
          "min": 1,
          "max": 5
        }
      }
    }
  }
}
```

Each region should have its own S3 bucket in the same region to minimize latency and data transfer costs.
