---
title: Stream Manager 2.0 NodeGroupConfig Example - Transcoder-Origin-Relay-Edge
menu_order: 6
---

### Transcoder-Origin-Relay-Edge

![Origin-Edge-Relay-Transcoder topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-transcoder-origin-relay-edge.png)

This combines transcoding with the relay topology.

**Complete Example:**

```json
{
    "name": "oert-oci-1",
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
        },
        "transcoder": {
            "name": "transcoder",
            "imageName": "BaseImage",
            "capabilities": [
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
