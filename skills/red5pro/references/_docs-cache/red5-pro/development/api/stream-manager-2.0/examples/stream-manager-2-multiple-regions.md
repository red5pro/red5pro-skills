---
title: Stream Manager 2.0 NodeGroupConfig Example - Multiple Regions
menu_order: 7
---

### Multiple Regions

![Multi-region topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-multiple-regions.png)

SubGroups are used to model regions. A SubGroup acts as a region by carrying region-related `cloudProperties` -- all nodes created for this SubGroup will carry these properties, which the Terraform Service will use when creating nodes in the cloud platform.

```json
"cloudProperties" : "region=us-ashburn-1",
```

With this configuration, Get Server for Publish/Subscribe requests can now specify `subgroup=<region>` to request a server from either `ashburn` or `sanjose` (with `strict` flag set if desired).

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
        },
        "sanjose": {
            "subGroupName": "sanjose",
            "groupType": "main",
            "cloudProperties": "region=us-sanjose-1",
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
