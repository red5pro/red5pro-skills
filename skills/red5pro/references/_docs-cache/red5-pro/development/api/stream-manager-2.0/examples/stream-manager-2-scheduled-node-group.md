---
title: Stream Manager 2.0 NodeGroupConfig Example - Multiple Regions in a Hierarchy of GeoZones
menu_order: 19
---

### Scheduled NodeGroup

A scheduled NodeGroup that is only active on weekends.

```json
"schedules": {
    "main": {
        "name": "main",
        "startAt": "0 0 0 ? * SAT *",
        "durationS": 172800
    }
}
```

**Complete Example:**

```json
{
    "name": "allinone-oci-1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "maxPublishers": "100",
    "maxSubscribers": "200",
    "propertyOverrides": [
        {
            "fileName": "conf/autoscale.properties",
            "properties": {
                "reportingSpeed": "500"
            }
        }
    ],
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-12-2-4-b156",
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
    },
    "schedules": {
        "main": {
            "name": "main",
            "startAt": "0 0 0 ? * SAT *",
            "durationS": 172800
        }
    }
}
```
