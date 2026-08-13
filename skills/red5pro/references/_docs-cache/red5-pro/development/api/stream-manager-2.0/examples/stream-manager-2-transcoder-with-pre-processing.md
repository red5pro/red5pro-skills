---
title: Stream Manager 2.0 NodeGroupConfig Example - Transcoder with Pre-Processing
menu_order: 18
---

### Transcoder with Pre-Processing

This example shows how `propertyOverrides` can be used at the role level to define preprocessing only for transcoder nodes.

**Complete Example:**

```json
{
    "name": "oet-oci-1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=public-subnet-red5-ci-deployments-vnet;security_group=red5-ci-deployments-nodes-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-12-2-4-b101",
            "cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
        }
    },
    "roles": {
        "origin": {
            "name": "origin",
            "imageName": "BaseImage",
            "capabilities": [
                "PUBLISH"
            ]
        },
        "edge": {
            "name": "edge",
            "imageName": "BaseImage",
            "parentRoleName": "origin",
            "parentCardinality": "GLOBAL",
            "capabilities": [
                "SUBSCRIBE"
            ]
        },
        "transcoder": {
            "name": "transcoder",
            "imageName": "BaseImage",
            "capabilities": [
                "TRANSCODE"
            ],
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
            ]
        }
    },
    "groups": {
        "ashburn": {
            "subGroupName": "ashburn",
            "groupType": "main",
            "cloudProperties": "region=us-ashburn-1",
            "rulesByRole": {
                "origin": {
                    "nodeRoleName": "origin",
                    "min": 1,
                    "max": 10,
                    "increment": 1,
                    "outExpression": "avg(connections.publisher) > 15",
                    "inExpression": "avg(connections.publisher) < 2",
                    "capacityRankingExpression": "connections.publisher",
                    "capacityLimitExpression": "20"
                },
                "edge": {
                    "nodeRoleName": "edge",
                    "min": 1,
                    "max": 10,
                    "increment": 1,
                    "outExpression": "avg(connections.subscriber) > 150",
                    "inExpression": "avg(connections.subscriber) < 20",
                    "capacityRankingExpression": "connections.subscriber",
                    "capacityLimitExpression": "200"
                },
                "transcoder": {
                    "nodeRoleName": "transcoder",
                    "min": 1,
                    "max": 10,
                    "increment": 1,
                    "outExpression": "avg(connections.publisher) > 15",
                    "inExpression": "avg(connections.publisher) < 2",
                    "capacityRankingExpression": "connections.publisher",
                    "capacityLimitExpression": "20"
                }
            }
        }
    }
}
```


