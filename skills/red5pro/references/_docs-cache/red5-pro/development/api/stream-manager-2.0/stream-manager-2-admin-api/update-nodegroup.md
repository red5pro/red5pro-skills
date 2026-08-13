_From: Stream Manager 2.0 Admin API_

## Update NodeGroup

Create a new NodeGroup with the given configuration.
Unless `isScalingPaused` is explicitly `true` (it is `false` by default), the NodeGroup will begin scaling out immediately.

Note that if a NodeGroupConfig is created with a schedule, then it must always have at least one schedule. An update without schedules will be refused. Additionally, if a scheduled config overlays some base config, that cannot be changed later; the update will be refused.
In these cases, delete the offending config and then create a replacement.

### Update NodeGroup Request

PUT `https://<host>/as/v1/admin/nodegroup`

Body:

```json
  "name": "exampleOR-0",
{
  "description": "For integration tests.",
  "cloudPlatform": "DOCKER",
  "cloudProperties": "instance_type=1cpu_2gb;environment=testing",
  "images": {
    "Base Image": {
      "name": "Base Image",
      "image": "red5pro-docker.jfrog.io/red5pro-server-public:12.2.3",
      "cloudProperties": "example=1;foo=bar;baz=baf"
    }
  },
  "roles": {
    "origin": {
      "name": "origin",
      "imageName": "Base Image",
      "capacity": 70.0,
      "cloudProperties": "origprop=v2"
    },
    "edge": {
      "name": "edge",
      "imageName": "Base Image",
      "capacity": 70.0,
      "parentRoleName": "origin",
      "parentCardinality": "SUBGROUP",
      "cloudProperties": "edgeroleprop=v1"
    }
  },
  "groups": {
    "us-west" : {
      "subGroupName": "us-west",
      "groupType": "main",
      "rulesByRole": {
        "origin": {
          "nodeRoleName": "origin",
          "min": 1,
          "max": 10,
          "increment": 2,
          "outExpression": "avg(cpu.process.load) > 5.0",
          "inExpression": "avg(cpu.process.load) < 2.0",
          "capacityRankingExpression": "cpu.system.load * 10"
        },
        "edge": {
          "nodeRoleName": "edge",
          "min": 2,
          "max": 10,
          "increment": 1,
          "outExpression": "avg(cpu.process.load) > 5.0",
          "inExpression": "avg(cpu.process.load) < 2.0",
          "capacityRankingExpression": "cpu.system.load * 5"
        }
      },
      "cloudProperties": "region=nyc3"
    }
  }
}
```

The request body is a NodeGroupConfig. See **NodeGroupConfig** for details, below.

### Update NodeGroup Response

**On success:**

HTTP 200: OK

**On error:**
HTTP 400: Bad Request | Validation failure (see response body for details).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: No NodeGroup found with `name`.
