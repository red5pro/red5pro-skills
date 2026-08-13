---
title: Create Node Group
menu_order: 7
---

To communicate with the Stream Manager 2.0 API, you can use the integrated Swagger UI, Postman, or curl from the command line.

Stream Manager 2.0 include OpenAPI/Swagger UI by default, you can find it on the main Stream Manager 2.0 web page `https://<STREAM_MANAGER_DOMAIN_NAME>` or using direct url: `https://<STREAM_MANAGER_DOMAIN_NAME>/swagger-ui/index.html`

> If you are using Stream Manager 2.0 without an SSL certificate and domain name, use `http://<STREAM_MANAGER_IP_ADDRESS>` instead.

Documentation: [Stream Manager 2.0 API Overview](/docs/red5-pro/development/api/stream-manager-2-0/).

## Get JWT Token

JWT token is used to authenticate and authorize users, ensuring secure access to the API.

* First example using username and password in the URL:

> Please do not use this example if you have special characters like `@` in your R5AS_AUTH_USER or R5AS_AUTH_PASS variables.

```bash
curl -H "Content-Type: application/json" \
-X PUT https://<R5AS_AUTH_USER>:<R5AS_AUTH_PASS>@<STREAM_MANAGER_DOMAIN_NAME>/as/v1/auth/login
```

* Second example using Base64 encoding for your username and password:

```bash
curl -X 'PUT' \
'https://<STREAM_MANAGER_DOMAIN_NAME>/as/v1/auth/login' \
-H 'accept: application/json' \
-H 'Authorization: Basic <USER_AND_PASSWORD_IN_BASE64>'
```

In this example, you need to replace `<USER_AND_PASSWORD_IN_BASE64>` with your Base64-encoded username and password. To generate this encoded string, combine your username and password in the format `username:password`, then encode this string using Base64. You can use the following command to encode it:

```bash
echo -n 'username:password' | base64
```

* `R5AS_AUTH_USER` - Authentication user name used to get JWT token. You set this secret in the `.env` file during the configuration of Stream Manager 2.0.
* `R5AS_AUTH_PASS` - Authentication user password used to get JWT token. You set this secret in the `.env` file during the configuration of Stream Manager 2.0.

* Response body

```json
{
  "token": "YOUR_JWT_TOKEN"
}
```

## Create Node Group Config

Creating a new node group will immediately begin scaling out Red5 Pro nodes using your configuration.

```bash
curl -X POST \
'https://<STREAM_MANAGER_DOMAIN_NAME>/as/v1/admin/nodegroup' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer <YOUR_JWT_TOKEN>" \
--data "@node-group-create.json"
```

Json `node-group-create.json` body:

```json
{
    "name": "<NODE_GROUP_NAME>",
    "description": "This is an AWS nodegroup example",
    "cloudProperties": "environment=example;vpc=<NODE_VPC_NAME>;security_group=<NODE_SECURITY_GROUP>;volume_size=16",
    "cloudPlatform": "AWS",
    "isScalingPaused": false,
    "images": {
        "base_image": {
            "name": "base_image",
            "image": "<NODE_IMAGE_NAME>",
            "cloudProperties": "instance_type=<NODE_INSTANCE_TYPE>"
        }
    },
    "roles": {
        "origin": {
            "name": "origin",
            "imageName": "base_image",
            "capabilities": [
                "PUBLISH"
            ]
        },
        "edge": {
            "name": "edge",
            "imageName": "base_image",
            "capabilities": [
                "SUBSCRIBE"
            ],
            "parentRoleName": "origin",
            "parentCardinality": "GLOBAL"
        }
    },
    "groups": {
        "<SUB_GROUP_NAME>": {
            "subGroupName": "<SUB_GROUP_NAME>",
            "nodeGroupName": "<NODE_GROUP_NAME>",
            "groupType": "main",
            "rulesByRole": {
                "origin": {
                    "nodeGroupName": "<NODE_GROUP_NAME>",
                    "subGroupName": "<SUB_GROUP_NAME>",
                    "nodeRoleName": "origin",
                    "min": 1,
                    "max": 5,
                    "increment": 1,
                    "outExpression": "(avg(connections.client) / 200) * 0.5 + (avg(connections.publisher) / 50) * 0.5 > 1.0",
                    "inExpression": "avg(connections.client) < 10",
                    "capacityRankingExpression": "(connections.client / 200) * 10",
                    "capacityLimitExpression": "10"
                },
                "edge": {
                    "nodeGroupName": "<NODE_GROUP_NAME>",
                    "subGroupName": "<SUB_GROUP_NAME>",
                    "nodeRoleName": "edge",
                    "min": 1,
                    "max": 10,
                    "increment": 1,
                    "outExpression": "(avg(connections.client) / 200) * 0.5 + (avg(connections.subscriber) / 50) * 0.5 > 1.0",
                    "inExpression": "avg(connections.client) < 10",
                    "capacityRankingExpression": "(connections.client / 200) * 10",
                    "capacityLimitExpression": "10"
                }
            },
            "cloudProperties": "region=<NODE_AWS_REGION>"
        }
    },
    "internalVersionCount": 0
}
```

Please replace these variables with the values you recorded in the previous steps:

* `NODE_GROUP_NAME` - The name of node group. Min 1 char, max 16 chars. Alphanumeric, plus -, _, and .. Must be GLOBALLY unique (no two Node Groups can share the same name) Example: `node-group-test`
* `SUB_GROUP_NAME` - The name of this SubGroup. Min 1 char, max 16 chars. Example: `sub-group-test`
* `NODE_VPC_NAME` - The name of the VPC you created when setting up the network (VPC). Example: `red5pro-autoscaling`
* `NODE_SECURITY_GROUP` - The name of the security group for Red5 Pro nodes, created during the network (VPC) setup. Example: `red5pro-autoscaling-node-sg`
* `NODE_IMAGE_NAME` - The name of the Red5 Pro node instance image you created when preparing the Red5 Pro node image. Example: `red5pro-autoscaling-node-image`
* `NODE_AWS_REGION` - The AWS region where you deployed your Stream Manager. This is the region where the Stream Manager will create autoscaling Red5 Pro nodes. Example: `us-west-1`.
* `NODE_INSTANCE_TYPE` - AWS instance type (Instance Type). Example: `c5.large` (2 CPUs and 4GB of memory)
* Follow the [docs](https://aws.amazon.com/ec2/instance-types/) for instance types details.

**Examples:**

| NODE_INSTANCE_TYPE | Category | CPUs | GB memory |
| ------------------ | -------- | ---- | --------- |
| c5.large | Compute Optimized | 2 | 4 |
| c5.xlarge | Compute Optimized | 4 | 8 |
| c5.2xlarge | Compute Optimized | 8 | 16 |
| c5.4xlarge | Compute Optimized | 16 | 32 |

> This example node group config will create 2 Red5 Pro node instances (origin and edge)

## Get node group lists

```bash
curl -X 'GET' \
  'https://<STREAM_MANAGER_DOMAIN_NAME>/as/v1/admin/nodegroup' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'
```

* Response body

```json
[
  "<NODE_GROUP_NAME>"
]
```

## Delete node group

```bash
curl -X 'DELETE' \
  'https://<STREAM_MANAGER_DOMAIN_NAME>/as/v1/admin/nodegroup/<NODE_GROUP_NAME>' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer <YOUR_JWT_TOKEN>'
```

## Debug page

Debug UI it is extra web application which can help with checking active node groups, streams, and more using UI interface.

Stream Manager 2.0 includes a Debug UI web page, which you can find on the main Stream Manager 2.0 web page at `https://<STREAM_MANAGER_DOMAIN_NAME>` or directly at `https://<STREAM_MANAGER_DOMAIN_NAME>/debug/`.
