---
title: Stream Manager 2.0 NodeGroupConfig Example - Origin-Edge
menu_order: 3
---

### Origin-Edge

![Origin-Edge topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-origin-edge.png)

This example shows a basic production-ready topology. The most important thing is the roles.

The origin role defines PUBLISH capability, so the Streams Service will direct publish requests to these nodes. The edge, meanwhile, defines SUBSCRIBE capability and will thus serve subscribe requests. Note also that the edge defines origin as its parent role.

```json
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
}
```

Note that no nodes provide the TRANSCODE capability -- this toplogy does not support the transcode testbeds.

**Complete Example:**

```json
{
    "name": "oe-oci-1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-b3228-b183",
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
                }
            }
        }
    }
}
```


