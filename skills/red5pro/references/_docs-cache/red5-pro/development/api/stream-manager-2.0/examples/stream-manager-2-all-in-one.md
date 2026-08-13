---
title: Stream Manager 2.0 NodeGroupConfig Example - All-in-One
menu_order: 2
---

### All-in-One

![All-in-One topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-all-in-one.png)

The main thing this example shows is that a single role can be defined with **multiple capabilities**, and that the SM 2.0 Streams Service directs traffic base on the capabilities assigned to a server's role.

```json
"capabilities": ["PUBLISH", "SUBSCRIBE", "TRANSCODE"],
```

This is useful for development and some test cases, where most testbed functionality can be used with a very small cluster.

**Complete Example:**

```json
{
    "name": "oci-allinone1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "tags": {
        "ngcTag": "This is an example tag at NodeGroupConfig level"
    },
    "shuffleSizeExpression": "1",
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-12-2-4-b179",
            "cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4",
            "tags": {
                "imageTag": "This is an example tag at NodeImage level"
            }
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
            ],
            "tags": {
                "roleTag": "This is an example tag at NodeRole level"
            }
        }
    },
    "groups": {
        "ashburn": {
            "subGroupName": "ashburn",
            "groupType": "main",
            "cloudProperties": "region=us-ashburn-1",
            "tags": {
                "regionTag": "This is an example tag at SubGroupConfig level"
            },
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