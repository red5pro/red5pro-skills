---
title: Stream Manager 2.0 NodeGroupConfig Example - WebHooks
menu_order: 17
---

### WebHooks

Enable and configure WebHooks.

See also [Social Media Pusher](https://www.red5.net/docs/special/webhooks/overview/)

```json
"propertyOverrides": [
    {
        "fileName": "webapps/live/WEB-INF/red5-web.properties",
        "properties": {
            "webhooks.endpoint": "http://localhost:3246/webhook",
            "webhooks.muteCategories": "WEBSOCKET"
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
            "fileName": "webapps/live/WEB-INF/red5-web.properties",
            "properties": {
                "webhooks.endpoint": "http://localhost:3246/webhook",
                "webhooks.muteCategories": "WEBSOCKET"
            }
        }
    ],
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-12-2-4-b103",
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


