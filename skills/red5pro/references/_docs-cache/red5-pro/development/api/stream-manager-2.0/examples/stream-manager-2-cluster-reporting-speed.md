---
title: Stream Manager 2.0 NodeGroupConfig Example - Cluster Reporting Speed
menu_order: 10
---

### Cluster Reporting Speed

The Red5Pro Server nodes report status periodically. The default value is 1000 milliseconds, but this can be changed.

```json
"propertyOverrides": [
    {
        "fileName": "conf/autoscale.properties",
        "properties": {
            "reportingSpeed": "500"
        }
    }
],
```

**Complete Example:**

```json
{
    "name": "allinone-oci-1",
    "description": "This is an OCI example. It configures a webhook endpoint on all instances.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
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
            "image": "as-node-12-2-4-b137",
            "cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
        }
    },
    "roles": {
        "allinone": {
            "name": "allinone",
            "imageName": "BaseImage",
            "capabilities": ["PUBLISH", "SUBSCRIBE", "TRANSCODE"]
        }
    },
    "groups": {
        "ashburn" : {
            "subGroupName": "ashburn",
            "groupType": "main",
            "cloudProperties" : "region=us-ashburn-1",
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
