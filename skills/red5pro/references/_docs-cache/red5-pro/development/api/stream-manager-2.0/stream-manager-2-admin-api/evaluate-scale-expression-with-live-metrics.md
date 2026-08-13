_From: Stream Manager 2.0 Admin API_

## Evaluate Scale Expression (with live metrics)

Evaluate a Scale Expression and return the result. This request is used to experiment with expressions while taking no action. For more information about Scale Expressions and ScaleRule Expressions in general, see **ScaleRule Expressions** below.

All Scale Expressions require a set of aggregated server metrics for a particular NodeRole within a particular SubGroup (a "SubGroup-Role"). This version of this request requires a `nodeGroupName`, `subGroupName` and `role`, which must identify a real SubGroup-Role with current aggregate metrics (there must be at least one running cluster node).

### Evaluate Scale Expression (live metrics) Request

POST `https://<host>/as/v1/admin/evaluate/scale/<nodeGroupName>/<subGroupName>/<nodeRoleName>`

`nodeGroupName`: the name of the NodeGroup where the node exists

`subGroupName`: the name of the SubGroup to use as the source of the aggregated metrics.

`nodeRoleName`: the name of the NodeRole to use as the source of the aggregated metrics.

Body:

```
avg(cpu.process.load) < 1.0 && avg(cpu.system.load) < 2.0
```

**On success:**

HTTP 200: OK

Body: 

```json
{
   "result" : true
}
```

**On error:**

HTTP 400: Error while evaluating expression (see response).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No master NodeGroupConfig found for `nodeGroupName`, no Node found for `nodeId`.
