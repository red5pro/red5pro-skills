_From: Stream Manager 2.0 Curl Cheat Sheet_

## Stream Manager 2.0 Admin

### Create NodeGroupConfig -- All-in-One 

"All-in-one" means that all server roles are represented by a single, multi-capable role. Also, the cluster consists of one such server.

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @allinone-oci-ashburn.json https://as-test1.example.org/as/v1/admin/nodegroup
```

where  `allinone-oci-ashburn.json` is:

```json
{
	"name": "allinone-oci-1",
	"description": "This is an OCI example.",
	"cloudPlatform": "OCI",
	"cloudProperties": "environment=testing;subnet=public-subnet-red5-ci-deployments-vnet;security_group=red5-ci-deployments-nodes-nsg;volume_size=50",
	"images": {
		"Base Image": {
			"name": "Base Image",
			"image": "as-node-12-2-4-b67",
			"cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
		}
	},
	"roles": {
		"allinone": {
			"name": "allinone",
			"imageName": "Base Image",
			"capacity": 70.0,
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
					"outExpression": "avg(cpu.process.load) > 95.0",
					"inExpression": "avg(cpu.process.load) < 2.0",
					"capacityRankingExpression": "cpu.system.load * 10"
				}
			}
		}
	}
}
```

### List All NodeGroups

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/nodegroup | json_pp
```

### Get NodeGroupConfig

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/nodegroup/allinone-oci-1 | json_pp
```

### Update NodeGroupConfig

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X PUT --data @allinone-oci-ashburn.json https://as-test1.example.org/as/v1/admin/nodegroup
```

Where `allinone-oci-ashburn.json` is the modified NodeGroupConfig (see **Create NodeGroupConfig** example above).

### Delete NodeGroupConfig (and terminate nodes)

```
curl -s -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/admin/nodegroup/allinone-oci-1
```

### Manual Node State Change

```
curl -s -H "Authorization: Bearer ${JWT}" -X PUT "https://as-test1.red5pro.net/as/v1/admin/nodegroup/allinone-oci-1/oggbvv1aqpim/manualscale?currentState=FAULT&desiredState=INSERVICE"
```

### Manual Create Nodes

```
curl -s -H "Authorization: Bearer ${JWT}" -X POST "https://as-test1.red5pro.net/as/v1/admin/nodegroup/allinone-oci-1/ashburn/origin/manualscale?nodeCount=3"
```

### Pause Auto Scaling

```
curl -s -H "Authorization: Bearer ${JWT}" -X PUT https://as-test1.red5pro.net/as/v1/admin/nodegroup/allinone-oci-1/pause
```

### Resume Auto Scaling

```
curl -s -H "Authorization: Bearer ${JWT}" -X PUT "https://as-test1.red5pro.net/as/v1/admin/nodegroup/allinone-oci-1/pause?resume=true"
```

### Terraform: List Images

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/terraform/image | json_pp
```

### Terraform: List Instance Types

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/terraform/instanceType | json_pp
```

### Terraform: List Nodes

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/terraform/node | json_pp
```


### Terraform: List Regions

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/terraform/region | json_pp
```

### Terraform: List Terraform Events

```
curl -s --H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/terraform/events/allinone-oci-1 | json_pp
```

### Terraform: Update Info

```
curl -s -H "Authorization: Bearer ${JWT}" -X GET https://nate244b-sm2.example.org/as/v1/admin/terraform/updateInfo
```

### List All Scheduled NodeGroups

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/nodegroup/scheduled
```

### Read Scheduled NodeGroupConfig

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/admin/nodegroup/scheduled/allinone-oci-1
```

### Request NodeGroup status:

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test2.example.org/as/v1/admin/nodegroup/status/allinone-oci-1 | json_pp
```

**with metrics:**

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test2.example.org/as/v1/admin/nodegroup/status/allinone-oci-1?metrics=true | json_pp
```

### Get NodeGroup Idle

```
curl -s -H "Authorization: Bearer ${JWT}" -X GET https://nate274-sm2.example.org/as/v1/admin/nodegroup/nate-allinone-oci-1/idle | json_pp
```

### Evaluate Capacity Expression (live metrics)

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST https://as-test1.example.org/as/v1/admin/evaluate/capacity/allinone-oci-1/hrnqyWNDD1 -d "cpu.process.load * 100" | json_pp
```

### Evaluate Capacity Expression (user metrics)

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @capacity-expression-request.json https://as-test1.example.org/as/v1/admin/evaluate/capacity
```

where `capacity-expression-request.json` is:

```json
{ 
    "expression":"cpu.process.load * 20", 
    "metrics":[{"name":"cpu","children":[{"name":"processors","value":20},{"name":"system","children":[{"name":"load","value":0.43}]},{"name":"process","children":[{"name":"load","value":0.058589355798315125},{"name":"time","value":26546875000}]}]},{"name":"memory","children":[{"name":"vm","children":[{"name":"free","value":1786280192},{"name":"max","value":2147483648},{"name":"total","value":2147483648}]},{"name":"system","children":[{"name":"committedvirtual","value":2479390720},{"name":"freephysical","value":2266726400},{"name":"totalphysical","value":34276769792}]}]},{"name":"disk","children":[{"name":"freeswap","value":11859357696},{"name":"totalswap","value":79887192064}]},{"name":"connections","children":[{"name":"publisher","value":0},{"name":"subscriber","value":0},{"name":"client","value":0}]}] 
}
```

### Evaluate Scale Expression (live metrics)

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST https://as-test1.example.org/as/v1/admin/evaluate/scale/allinone-oci-1/ashburn/allinone -d "avg(cpu.process.load) \u003c 1.0 \u0026\u0026 avg(cpu.system.load) \u003c 2.0"
```

### Evaluate Scale Expression (user metrics)

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @scale-expression-request.json https://as-test1.example.org/as/v1/admin/evaluate/scale
```

where `scale-expression-request.json` is:

```json
{ 
    "expression":"avg(cpu.process.load) \u003c 1.0 \u0026\u0026 avg(cpu.system.load) \u003c 2.0", 
    "metrics":{"disk":{"name":"disk","sum":0.0,"count":0,"children":{"freeswap":{"name":"freeswap","sum":1.5E10,"min":5.0E9,"max":1.0E10,"count":2,"children":{}},"totalswap":{"name":"totalswap","sum":1.6E11,"min":8.0E10,"max":8.0E10,"count":2,"children":{}}}},"memory":{"name":"memory","sum":0.0,"count":0,"children":{"system":{"name":"system","sum":0.0,"count":0,"children":{"committedvirtual":{"name":"committedvirtual","sum":5.4E10,"min":2.5E10,"max":2.9E10,"count":2,"children":{}},"freephysical":{"name":"freephysical","sum":1.0E10,"min":3.0E9,"max":7.0E9,"count":2,"children":{}},"totalphysical":{"name":"totalphysical","sum":7.0E10,"min":3.5E10,"max":3.5E10,"count":2,"children":{}}}},"vm":{"name":"vm","sum":0.0,"count":0,"children":{"total":{"name":"total","sum":4.8E9,"min":2.4E9,"max":2.4E9,"count":2,"children":{}},"max":{"name":"max","sum":4.0E9,"min":2.0E9,"max":2.0E9,"count":2,"children":{}},"free":{"name":"free","sum":1.4E9,"min":4.0E8,"max":1.0E9,"count":2,"children":{}}}}}},"cpu":{"name":"cpu","sum":0.0,"count":0,"children":{"process":{"name":"process","sum":0.0,"count":0,"children":{"load":{"name":"load","sum":0.20800000000000002,"min":0.05,"max":0.158,"count":2,"children":{}},"time":{"name":"time","sum":5.109375E10,"min":2.4546875E10,"max":2.6546875E10,"count":2,"children":{}}}},"system":{"name":"system","sum":0.0,"count":0,"children":{"load":{"name":"load","sum":1.06,"min":0.43,"max":0.63,"count":2,"children":{}}}},"processors":{"name":"processors","sum":40.0,"min":20.0,"max":20.0,"count":2,"children":{}}}},"connections":{"name":"connections","sum":0.0,"count":0,"children":{"subscriber":{"name":"subscriber","sum":134.0,"min":37.0,"max":97.0,"count":2,"children":{}},"publisher":{"name":"publisher","sum":38.0,"min":12.0,"max":26.0,"count":2,"children":{}},"client":{"name":"client","sum":220.0,"min":80.0,"max":140.0,"count":2,"children":{}}}}} 
}
```
