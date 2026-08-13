---
title: Stream Manager 2.0 NodeGroupConfig Example - Pre-Processor
menu_order: 13
---

### Pre-Processor

Pre-processing can be used to normalize the stream to Baseline for WebRTC delivery, as well as to scale or otherwise reencode the input stream.

See also [Preprocessor](https://www.red5.net/docs/red5-pro/users-guide/red5-pro-preprocessor/)

```json
"propertyOverrides": [
    {
        "fileName": "webapps/live/WEB-INF/red5-web.properties",
        "properties": {
            "preprocess.videoWidth": "640",
            "preprocess.videoHeight": "360",
            "preprocess.videoQPMin": "1",
            "preprocess.videoQPMax": "48",
            "preprocess.videoBR": "1000000",
            "preprocess.videoBRMax": "1000000"
        }
    },
    {
        "fileName": "webapps/live/WEB-INF/red5-web.xml",
        "blocks": [
            "R5AS-PREPROCESSOR"
        ]
    }
],
```

**Complete Example:**

```json
{
    "name": "allinone-oci-1",
    "description": "This is an OCI example. It configures the Preprocessor for all instances.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "propertyOverrides": [
        {
            "fileName": "webapps/live/WEB-INF/red5-web.properties",
            "properties": {
                "preprocess.videoWidth": "640",
                "preprocess.videoHeight": "360",
                "preprocess.videoQPMin": "1",
                "preprocess.videoQPMax": "48",
                "preprocess.videoBR": "1000000",
                "preprocess.videoBRMax": "1000000"
            }
        },
        {
            "fileName": "webapps/live/WEB-INF/red5-web.xml",
            "blocks": [
                "R5AS-PREPROCESSOR"
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

