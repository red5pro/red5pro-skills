---
title: Stream Manager 2.0 NodeGroupConfig Example - JWT Authentication
menu_order: 16
---

### JWT Authentication

Enable JWT authentication for stateless, token-based authentication with external identity providers.

See also [JWT Authentication](/docs/red5-pro/users-guide/authentication/jwt-authentication/).

```json
"propertyOverrides": [
    {
        "fileName": "webapps/live/WEB-INF/red5-web.properties",
        "properties": {
            "jwt.secret": "changeme-to-a-strong-32-byte-secret-key",
            "jwt.ttl.minutes": "60",
            "jwt.issuer": ""
        }
    },
    {
        "fileName": "webapps/live/WEB-INF/red5-web.xml",
        "blocks": [
            "R5AS-JWT-AUTH"
        ]
    }
],
```

**Complete Example:**

```json
{
    "name": "allinone-oci-jwt-1",
    "description": "This is an OCI example. It configures JWT Authentication on all instances.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-deployments-multiregion-subnet-public;security_group=red5-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "propertyOverrides": [
        {
            "fileName": "webapps/live/WEB-INF/red5-web.properties",
            "properties": {
                "jwt.secret": "changeme-to-a-strong-32-byte-secret-key",
                "jwt.ttl.minutes": "60",
                "jwt.issuer": ""
            }
        },
        {
            "fileName": "webapps/live/WEB-INF/red5-web.xml",
            "blocks": [
                "R5AS-JWT-AUTH"
            ]
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
