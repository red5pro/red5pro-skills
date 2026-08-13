---
title: Stream Manager 2.0 Scheduling NodeGroups API
menu_order: 8
---

Scheduled NodeGroups use cron expressions. For help creating or reading these, see: http://www.cronmaker.com/

## New NodeGroup Case

Suppose that you wanted to schedule this NodeGroupConfig to only exist on Saturday and Sunday each week:
```json
{
	"name": "allinone-oci-1",
	"description": "This is an OCI example.",
	"cloudPlatform": "OCI",
	"cloudProperties": "environment=testing;subnet=public-subnet-red5-ci-deployments-vnet;security_group=red5-ci-deployments-nodes-nsg;volume_size=50",
	"images": {
		"Base Image": {
			"name": "Base Image",
			"image": "as-node-12-2-4-b79",
			"cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
		}
	},
	"roles": {
		"transcoder": {
			"name": "transcoder",
			"imageName": "Base Image",
			"capabilities": ["PUBLISH", "SUBSCRIBE", "TRANSCODE"]
		}
	},
	"groups": {
		"mumbai" : {
			"subGroupName": "mumbai",
			"groupType": "main",
			"cloudProperties" : "region=ap-mumbai-1",
			"rulesByRole": {
				"transcoder": {
					"nodeRoleName": "transcoder",
					"min": 1,
					"max": 1,
					"increment": 1,
					"outExpression": "(min(connections.client) / 200) * 0.5 + (avg(memory.vm.free) / avg(memory.vm.total)) * 0.5 > 1.0",
					"inExpression": "avg(connections.client) < 10",
					"capacityRankingExpression": "(connections.client / 200) * 10",
					"capacityLimitExpression": "200"
				}
			}
		}
	}
}
```

We need cron expressions for the start of the schedule (when the NodeGroup will scale out). We want our schedule to start weekly at 12:00AM Saturday. CronMaker says **Result: Cron format:** `0 0 12 ? * SAT *`

We also need to calculate the duration of the event, in seconds. We want our event to last 48 hours, which is 48 * 60 * 60 = 172800 seconds.

Modify the NodeGroupConfig to add `schedules` and then Create NodeGroup with this as body.
```json
{
	"name": "allinone-oci-1",
	"description": "This is an OCI example.",
	"cloudPlatform": "OCI",
	"cloudProperties": "environment=testing;subnet=public-subnet-vnet;security_group=nodes-nsg;volume_size=50",
	"schedules": {
		"weekends": {
			"name": "weekends",
            "startAt": "0 0 0 ? * SAT *",
            "durationS": 172800
		}
	}.
	"images": {
		"Base Image": {
			"name": "Base Image",
			"image": "as-node-12-2-4-b79",
			"cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
		}
	},
	"roles": {
		"transcoder": {
			"name": "transcoder",
			"imageName": "Base Image",
			"capabilities": ["PUBLISH", "SUBSCRIBE", "TRANSCODE"]
		}
	},
	"groups": {
		"mumbai" : {
			"subGroupName": "mumbai",
			"groupType": "main",
			"cloudProperties" : "region=ap-mumbai-1",
			"rulesByRole": {
				"transcoder": {
					"nodeRoleName": "transcoder",
					"min": 1,
					"max": 1,
					"increment": 1,
					"outExpression": "(min(connections.client) / 200) * 0.5 + (avg(memory.vm.free) / avg(memory.vm.total)) * 0.5 > 1.0",
					"inExpression": "avg(connections.client) < 10",
					"capacityRankingExpression": "(connections.client / 200) * 10",
					"capacityLimitExpression": "200"
				}
			}
		}
	}
}
```

## Existing NodeGroup Case

Suppose that you have a small cluster most of the time. You Create NodeGroup with its regular configuration:

```json
{
	"name": "allinone-oci-1",
	"description": "This is an OCI example.",
	"cloudPlatform": "OCI",
	"cloudProperties": "environment=testing;subnet=public-subnet-vnet;security_group=nodes-nsg;volume_size=50",
	"images": {
		"Base Image": {
			"name": "Base Image",
			"image": "as-node-12-2-4-b79",
			"cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
		}
	},
	"roles": {
		"transcoder": {
			"name": "transcoder",
			"imageName": "Base Image",
			"capabilities": ["PUBLISH", "SUBSCRIBE", "TRANSCODE"]
		}
	},
	"groups": {
		"mumbai" : {
			"subGroupName": "mumbai",
			"groupType": "main",
			"cloudProperties" : "region=ap-mumbai-1",
			"rulesByRole": {
				"transcoder": {
					"nodeRoleName": "transcoder",
					"min": 1,
					"max": 1,
					"increment": 1,
					"outExpression": "(min(connections.client) / 200) * 0.5 + (avg(memory.vm.free) / avg(memory.vm.total)) * 0.5 > 1.0",
					"inExpression": "avg(connections.client) < 10",
					"capacityRankingExpression": "(connections.client / 200) * 10",
					"capacityLimitExpression": "200"
				}
			}
		}
	}
}
```

And every Saturday you want to scale up to 4 nodes each.

Create another NodeGroupConfig for the scheduled portion, making sure to set the `baseNodeGroupName`:

```json
{
	"name": "fourup-oci-1",
	"description": "This is an OCI example.",
	"cloudPlatform": "OCI",
	"cloudProperties": "environment=testing;subnet=public-subnet-vnet;security_group=nodes-nsg;volume_size=50",
	"baseNodeGroupName": "allinone-oci-1",
	"schedules": {
		"sat": {
			"name": "sat",
            "startAt": "0 0 0 ? * SAT *",
            "durationS": 86400
		}
	}.
	"images": {
		"Base Image": {
			"name": "Base Image",
			"image": "as-node-12-2-4-b79",
			"cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
		}
	},
	"roles": {
		"transcoder": {
			"name": "transcoder",
			"imageName": "Base Image",
			"capabilities": ["PUBLISH", "SUBSCRIBE", "TRANSCODE"]
		}
	},
	"groups": {
		"mumbai" : {
			"subGroupName": "mumbai",
			"groupType": "main",
			"cloudProperties" : "region=ap-mumbai-1",
			"rulesByRole": {
				"transcoder": {
					"nodeRoleName": "transcoder",
					"min": 4,
					"max": 4,
					"increment": 1,
					"outExpression": "(min(connections.client) / 200) * 0.5 + (avg(memory.vm.free) / avg(memory.vm.total)) * 0.5 > 1.0",
					"inExpression": "avg(connections.client) < 10",
					"capacityRankingExpression": "(connections.client / 200) * 10",
					"capacityLimitExpression": "200"
				}
			}
		}
	}
}
```
