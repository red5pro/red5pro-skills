---
title: Stream Manager 2.0 NodeGroupConfig Example - Max Publishers/Subscribers
menu_order: 12
---

### Max Publishers/Subscribers

Limit the total max publishers and subscribers per NodeGroup. When either number is exceeded, a further request to publish or subscribe will cause the Streams Service to respond `503 Service Unavailable`. Note that when these fields are null (omitted), these limits are not applied.

```json
"maxPublishers":"1",
"maxSubscribers":"2",
```

**Complete Example:**

```json
{
    "name": "allinone-oci-1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "maxPublishers": "1",
    "maxSubscribers": "2",
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-12-2-4-b120",
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
