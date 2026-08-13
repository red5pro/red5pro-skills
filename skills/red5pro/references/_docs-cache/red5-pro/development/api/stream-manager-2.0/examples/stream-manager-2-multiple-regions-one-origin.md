---
title: Stream Manager 2.0 NodeGroupConfig Example - Multiple Regions, Origin in One Region
menu_order: 8
---

### Multiple Regions, Origin in One Region

![Multi-region 1O topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-multiple-regions-one-origin.png)

When defining multiple SubGroups, each SubGroup must define a ScaleRule for each NodeRole defined in the NodeGroupConfig. But sometimes you may intend for a given region to have NO nodes of a given role.

To accomplish this, you can set the `max` to 0 (and `min` must also be 0) for that role's ScaleRule. Also note that if `max` is 0, then the `inExpression` and `outExpression` are optional (may be omitted).

In this example we define two regions but only scale out origins in `ashburn`. In San Jose, where we do not want origins, we definte the origin ScaleRule like so:

```json
"origin": {
    "name": "origin",
    "imageName": "BaseImage",
    "capabilities": [
        "PUBLISH"
    ]
},
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
                    "min": 0,
                    "max": 0,
                    "increment": 1,
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