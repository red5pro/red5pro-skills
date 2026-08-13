---
title: Stream Manager 2.0 NodeGroupConfig Example - Multiple Regions in a Hierarchy of GeoZones
menu_order: 9
---

### Multiple Regions in a Hierarchy of GeoZones

![GeoZone topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-multiple-regions-geozones.png)

SubGroups can represent any kind of hierarchical grouping, not just regions. Here we group regions together into "geo zones", defining `ashburn` and `sanjose` as children of a group named `usa`, and putting `cardiff` and `milan` under `europe`.

With this configuration, Get Server for Publish/Subscribe requests can now specify `subgroup=usa` to request any server from either `ashburn` or `sanjose`, in addition to making a request for a specific region. That is, users can now request servers from a group of regions.

**Complete Example:**

```json
{
    "name": "oergz-oci-1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "2",
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-b3228-b185",
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
        "usa": {
            "subGroupName": "usa",
            "groupType": "geozone",
            "childGroups": [
                {
                    "subGroupName": "ashburn",
                    "groupType": "region",
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
                {
                    "subGroupName": "sanjose",
                    "groupType": "region",
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
            ]
        },
        "europe": {
            "subGroupName": "europe",
            "groupType": "geozone",
            "childGroups": [
                {
                    "subGroupName": "cardiff",
                    "groupType": "region",
                    "cloudProperties": "region=uk-cardiff-1",
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
                {
                    "subGroupName": "milan",
                    "groupType": "region",
                    "cloudProperties": "region=eu-milan-1",
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
            ]
        }
    }
}
```