---
title: Stream Manager 2.0 NodeGroupConfig Example - Round-Trip Authentication 
menu_order: 15
---

### Round-Trip Authentication 

Enable round-trip authentication using third-party remote host `authtest.red5pro.com`.

See also [Simple Authentication Plugin](https://www.red5.net/docs/special/authplugin/simple-auth/).

```json
"propertyOverrides": [
    {
        "fileName": "webapps/live/WEB-INF/red5-web.properties",
        "properties": {
            "server.validateCredentialsEndPoint": "/validateCredentials",
            "server.invalidateCredentialsEndPoint": "/invalidateCredentials",
            "server.host": "authtest.red5pro.com",
            "server.port": "3000",
            "server.protocol": "http://"
        }
    },
    {
        "fileName": "webapps/live/WEB-INF/red5-web.xml",
        "blocks": [
            "R5AS-RTA"
        ]
    }
],
```

**Complete Example:**

```json
{
    "name": "allinone-oci-1",
    "description": "This is an OCI example. It configures Round Trip Authentication (RTA) on all instances.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=red5-ci-deployments-multiregion-subnet-public;security_group=red5-ci-deployments-multiregion-node-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "propertyOverrides": [
        {
            "fileName": "webapps/live/WEB-INF/red5-web.properties",
            "properties": {
                "server.validateCredentialsEndPoint": "/validateCredentials",
                "server.invalidateCredentialsEndPoint": "/invalidateCredentials",
                "server.host": "authtest.red5pro.com",
                "server.port": "3000",
                "server.protocol": "http://"
            }
        },
        {
            "fileName": "webapps/live/WEB-INF/red5-web.xml",
            "blocks": [
                "R5AS-RTA"
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

