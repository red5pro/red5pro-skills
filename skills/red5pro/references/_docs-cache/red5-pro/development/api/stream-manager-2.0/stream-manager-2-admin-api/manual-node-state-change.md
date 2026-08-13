_From: Stream Manager 2.0 Admin API_

## Manual Node State Change

Directly change a node's scaling state. The node's role `lifecycle` must be `MANUAL`.

### Manual Node State Change Request

PUT `https://<host>/as/v1/admin/nodegroup/<nodeGroupName>/<nodeId>/manualscale?currentState=<currentState>&desiredState=<desiredState>`

No Body.

`nodeGroupName`: the name of the NodeGroup

`subGroupName`: the name of the SubGroup

`roleName`: the name of the Role

`nodeId`: the ID of the node in the given SubGroup-Role

`currentState`: the node's expected current state (must match actual state or the request will fail)

`desiredState`: the desired new state

### Manual Node State Change Response

**On success:**

HTTP 200: OK

**On error:**

HTTP 400: Bad Request | Invalid request parameter, or current state does not match expected (see response)

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroupConfig found for `nodeGroupName`, SubGroup not found by `subGroupName`, no Role with `roleName`, or no Node found for `nodeId` (see response)
