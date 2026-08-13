---
title: Stream Manager 2.0 NodeGroupConfig Example - Origin-Relay-Edge
menu_order: 4
---

### Origin-Relay-Edge

![Origin-Edge-Relay topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-origin-relay-edge.png)

To support larger numbers of subscribers, relay nodes can be used. Each relay is the parent of a dedicated group of edges. This is known as "fan-out".

The edge role's `parentCardinality` is set to `AUTOGROUP` so that at runtime, each relay serves as the parent to an automatically defined dedicated SubGroup of edge nodes. The Autoscale Service applies the edge ScaleRules to each of these automatic SubGroups independently.

```json
"edge": {
    "name": "edge",
    "imageName": "BaseImage",
    "parentRoleName": "relay",
    "parentCardinality": "AUTOGROUP",
    "capabilities": [
        "SUBSCRIBE"
    ]
},
"relay": {
    "name": "relay",
    "imageName": "BaseImage",
    "parentRoleName": "origin",
    "parentCardinality": "GLOBAL",
    "capabilities": []
}
```

**Complete Example:**

```json
{
    "name": "oer-oci-1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-12-2-4-b179",
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
            "parentRoleName": "relay",
            "parentCardinality": "AUTOGROUP",
            "capabilities": [
                "SUBSCRIBE"
            ]
        },
        "relay": {
            "name": "relay",
            "imageName": "BaseImage",
            "parentRoleName": "origin",
            "parentCardinality": "GLOBAL",
            "capabilities": []
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
                "relay": {
                    "nodeRoleName": "relay",
                    "min": 1,
                    "max": 10,
                    "increment": 1,
                    "outExpression": "avg(connections.clusterchildren) > 8",
                    "inExpression": "avg(connections.clusterchildren) < 2",
                    "capacityRankingExpression": "0",
                    "capacityLimitExpression": "0"
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
