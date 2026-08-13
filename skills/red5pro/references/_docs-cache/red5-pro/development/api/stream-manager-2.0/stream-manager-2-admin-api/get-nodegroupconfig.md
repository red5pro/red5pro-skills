_From: Stream Manager 2.0 Admin API_

## Get NodeGroupConfig

Return the configuration for a given NodeGroup, by name.
For details of the `NodeGroupConfig` structure, see **NodeGroupConfig**, below.
This request can return any NodeGroupConfig, scheduled or not.

### Get NodeGroupConfig Request

GET `https://<host>/as/v1/admin/nodegroup/<name>?isEffective=false`

`name`: the name of the requested NodeGroup.

`isEffective`: Optional. Boolean. Default: false. If true return the "effective" config for this name (that is, return the active overlay if any, or else return the base). If false, return the given config by name.

### Get NodeGroupConfig Response

**On success:**

HTTP 200: OK

Body:

```json
{
  "name": "TEST-simple-orig-edge-0",
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

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: No NodeGroup found with `name`.
