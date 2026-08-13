---
title: Stream Manager 2.0 NodeGroupConfig Example - Mixer-Origin-Edge
menu_order: 5
---

### Mixer-Origin-Edge

![Mixer-Origin-Edge topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-mixer-origin-edge.png)

First, two `images` are defined. The mixer requires more CPU and memory than a typical node.

Next this example adds a mixer to `roles` having the MIX capability and using the mixer image. Note that the mixer role does not define any parent role.

Then finally, `initScripts` will run the mixer install script, deploying the BrewMixer plugin and webapp when mixer nodes are created by Terraform service.

**Complete Example:**

```json
{
    "name": "oem-oci-1",
    "description": "This is an OCI example.",
    "cloudPlatform": "OCI",
    "cloudProperties": "environment=testing;subnet=public-subnet-red5-ci-deployments-vnet;security_group=red5-ci-deployments-nodes-nsg;volume_size=50",
    "shuffleSizeExpression": "1",
    "images": {
        "BaseImage": {
            "name": "BaseImage",
            "image": "as-node-b20-b375",
            "cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
        },
        "MixerImage": {
            "name": "MixerImage",
            "image": "as-node-b20-b375",
            "cloudProperties": "instance_type=VM.Standard.E4.Flex-4-16"
        }
    },
    "roles": {
        "origin": {
            "name": "origin",
            "imageName": "BaseImage",
            "capabilities": ["PUBLISH"],
            "initScripts": ["sudo chown -R ubuntu /usr/local/red5pro"]
        },
        "edge": {
            "name": "edge",
            "imageName": "BaseImage",
            "parentRoleName": "origin",
            "parentCardinality": "GLOBAL",
            "capabilities": ["SUBSCRIBE"],
            "initScripts": ["sudo chown -R ubuntu /usr/local/red5pro"]
        },
        "mixer": {
            "name": "mixer",
            "imageName": "MixerImage",
            "capabilities": ["MIX"],
            "initScripts": ["sudo /usr/local/red5pro/extras/brewmixer/node-mixer-sm-deploy.sh"]
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
                "edge": {
                    "nodeRoleName": "edge",
                    "min": 1,
                    "max": 10,
                    "increment": 1,
                    "outExpression": "avg(connections.subscriber) > 150",
                    "inExpression": "avg(connections.subscriber) < 20",
                    "capacityRankingExpression": "connections.subscriber",
                    "capacityLimitExpression": "200"
                },
                "mixer": {
                    "nodeRoleName": "mixer",
                    "min": 1,
                    "max": 1,
                    "increment": 1,
                    "outExpression": "avg(connections.subscriber) > 150",
                    "inExpression": "avg(connections.subscriber) < 10",
                    "capacityRankingExpression": "connections.subscriber",
                    "capacityLimitExpression": "200"
                }
            }
        }
    }
}
```