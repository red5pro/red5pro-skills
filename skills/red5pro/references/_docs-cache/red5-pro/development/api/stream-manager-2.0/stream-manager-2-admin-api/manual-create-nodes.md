_From: Stream Manager 2.0 Admin API_

## Manual Create Nodes

Manually create one or more nodes for a given SubGroup-Role. The role's `lifecycle` must be `MANUAL`.

### Manual Create Nodes Request

POST `https://<host>/as/v1/admin/nodegroup/<nodeGroupName>/<subGroupName>/<roleName>/manualscale?nodeCount=<numNodes>`

No Body.

`nodeGroupName`: the name of the NodeGroup

`subGroupName`: the name of the SubGroup

`roleName`: the name of the Role

`numNodes`: the number of new nodes to create

### Manual Create Nodes Response

**On success:**

HTTP 200: OK

**On error:**

HTTP 400: Bad Request | Invalid request parameter (see response)

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroupConfig found for `nodeGroupName`, SubGroup not found by `subGroupName`, or no Role with `roleName`, or no Node found for `nodeId` (see response)
