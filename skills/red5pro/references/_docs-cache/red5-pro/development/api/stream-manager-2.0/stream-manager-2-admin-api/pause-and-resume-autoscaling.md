_From: Stream Manager 2.0 Admin API_

## Pause and Resume Autoscaling

Pause or resume autscaling for a given nodegroup. This can be useful for maintenance purposes.

### Pause and Resume Autoscaling Request

PUT `https://<host>/as/v1/admin/nodegroup/<nodeGroupName>/pause?resume=true`

No Body.

`nodeGroupName`: the name of the NodeGroup

`resume`: Optional. Default `false`. If `true`, the NodeGroupConfig's `isScalingPaused` flag will be set to `true`, resuming scaling. If `false` or omitted, the NodeGroupConfig's `isScalingPaused` flag will be set to `false`, preventing automatic scaling for this NodeGroup.

### Pause and Resume Autoscaling Response

**On success:**

HTTP 200: OK

**On error:**

HTTP 400: Bad Request | Invalid request parameter (see response)

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroupConfig found for `nodeGroupName`, SubGroup not found by `subGroupName`, or no Role with `roleName`, or no Node found for `nodeId` (see response)
