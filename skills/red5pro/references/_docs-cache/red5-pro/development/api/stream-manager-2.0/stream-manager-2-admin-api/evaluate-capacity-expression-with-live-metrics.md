_From: Stream Manager 2.0 Admin API_

## Evaluate Capacity Expression (with live metrics)

Evaluate a Capacity Expression and return the result. This request is used to experiment with expressions while taking no action. For more information about Capacity Expressions and ScaleRule Expressions in general, see **ScaleRule Expressions** below.

All Capacity Expressions require a set of server metrics. This version of this request requires the ID of a live cluster node, and uses its most recent metrics for evaluation. You can query node metrics yourself for current values with **Read NodeGroup Status**, see above.

### Evaluate Capacity Expression (live metrics) Request

POST `https://<host>/as/v1/admin/evaluate/capacity/<nodeGroupName>/<nodeId>`

`nodeGroupName`: the name of the NodeGroup where the node exists

`nodeId`: the ID of the cluster node to use as the source of the metrics.

Body: String. The Capacity Expression.

```
cpu.system.load * 10
```

### Evaluate Capacity Expression (live metrics) Response
The response contains both `doubleResult` which is used within the AS-Autoscaling service to sort nodes when scaling in, and `integerResult` which is the rounded 32-bit value used in the AS-Streams service to direct traffic.

**On success:**

HTTP 200: OK

Body: 

```json
{
   "doubleResult" : 0.0555864369093941,
   "integerResult" : 0
}
```

**On error:**

HTTP 400: Error while evaluating expression (see response).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No master NodeGroupConfig found for `nodeGroupName`, no Node found for `nodeId`.
