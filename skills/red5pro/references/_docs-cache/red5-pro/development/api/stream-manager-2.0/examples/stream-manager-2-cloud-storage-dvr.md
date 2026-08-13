---
title: Stream Manager 2.0 NodeGroupConfig Example - Cloud Storage/DVR
menu_order: 14
---

### Cloud Storage/DVR

Post-processing for cloud storage/DVR functionality using Amazon S3.

```json
"propertyOverrides": [
    {
        "fileName": "conf/cloudstorage-plugin.properties",
        "properties": {
            "services": "com.red5pro.media.storage.s3.S3Uploader,com.red5pro.media.storage.s3.S3BucketLister",
            "aws.access.key": "myAwsAccessKey",
            "aws.secret.access.key": "mySecretKey",
            "aws.bucket.name": "video",
            "aws.bucket.location": "us-west-1",
            "ffmpeg.path": "/usr/bin/ffmpeg",
            "max.transcode.minutes": 90,
            "delete.recordings": "true"
        }
    },
    {
        "fileName": "conf/red5-common.xml",
        "blocks": [
            "R5AS-POST",
            "R5AS-POST-ORIENTATION",
            "R5AS-POST-S3"
        ]
    },
    {
        "fileName": "webapps/live/WEB-INF/red5-web.xml",
        "blocks": [
            "R5AS-POST-S3"
        ]
    }
],
```

**Complete Example:**

```json
{
    "name": "allinone-oci-1",
    "description": "This is an OCI example. It configures S3 CloudStorage for all instances.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "propertyOverrides": [
        {
            "fileName": "conf/cloudstorage-plugin.properties",
            "properties": {
                "services": "com.red5pro.media.storage.s3.S3Uploader,com.red5pro.media.storage.s3.S3BucketLister",
                "aws.access.key": "myAwsAccessKey",
                "aws.secret.access.key": "mySecretKey",
                "aws.bucket.name": "video",
                "aws.bucket.location": "us-west-1",
                "ffmpeg.path": "/usr/bin/ffmpeg",
                "max.transcode.minutes": 90,
                "delete.recordings": "true"
            }
        },
        {
            "fileName": "conf/red5-common.xml",
            "blocks": [
                "R5AS-POST",
                "R5AS-POST-ORIENTATION",
                "R5AS-POST-S3"
            ]
        },
        {
            "fileName": "webapps/live/WEB-INF/red5-web.xml",
            "blocks": [
                "R5AS-POST-S3"
            ]
        }
    ],
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-12-2-4-b103",
            "cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
        }
    },
    "roles": {
        "allinone": {
            "name": "allinone",
            "imageName": "BaseImage",
            "capabilities": [
                "PUBLISH",
                "SUBSCRIBE",
                "TRANSCODE"
            ]
        }
    },
    "groups": {
        "ashburn": {
            "subGroupName": "ashburn",
            "groupType": "main",
            "cloudProperties": "region=us-ashburn-1",
            "rulesByRole": {
                "allinone": {
                    "nodeRoleName": "allinone",
                    "min": 1,
                    "max": 1,
                    "increment": 1,
                    "outExpression": "min(connections.client) > 75",
                    "inExpression": "avg(connections.client) < 1",
                    "capacityRankingExpression": "connections.client",
                    "capacityLimitExpression": "100"
                }
            }
        }
    }
}
```
