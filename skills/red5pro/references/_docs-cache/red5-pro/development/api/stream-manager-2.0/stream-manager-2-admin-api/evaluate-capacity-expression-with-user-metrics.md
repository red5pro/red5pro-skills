_From: Stream Manager 2.0 Admin API_

## Evaluate Capacity Expression (with user metrics)

Evaluate a Capacity Expression and return the result. This request is used to experiment with expressions while taking no action. For more information about Capacity Expressions and ScaleRule Expressions in general, see **ScaleRule Expressions** below.

All Capacity Expressions require a set of server metrics. This version of this request takes metrics in the body of the request (from the user). This request does not require an active NodeGroup. You can query node metrics yourself for examples with **Read NodeGroup Status**, see above.

### Evaluate Capacity Expression (user metrics) Request

POST `https://<host>/as/v1/admin/evaluate/capacity/`

Body:

```json
{
    "expression":"cpu.process.load * 20",
    "metrics":[{"name":"cpu","children":[{"name":"processors","value":20},{"name":"system","children":[{"name":"load","value":0.43}]},{"name":"process","children":[{"name":"load","value":0.058589355798315125},{"name":"time","value":26546875000}]}]},{"name":"memory","children":[{"name":"vm","children":[{"name":"free","value":1786280192},{"name":"max","value":2147483648},{"name":"total","value":2147483648}]},{"name":"system","children":[{"name":"committedvirtual","value":2479390720},{"name":"freephysical","value":2266726400},{"name":"totalphysical","value":34276769792}]}]},{"name":"disk","children":[{"name":"freeswap","value":11859357696},{"name":"totalswap","value":79887192064}]},{"name":"connections","children":[{"name":"publisher","value":0},{"name":"subscriber","value":0},{"name":"client","value":0}]}]
}
```

`expression`: the Capacity Expression to evaluate

`metrics`: the set of metrics to use (should contain all metrics that real nodes provide)

### Evaluate Capacity Expression (user metrics) Response

**On success:**

HTTP 200: OK

Body: 

```json
{"doubleResult":1.1717871159663025,"integerResult":1}
```

**On error:**

HTTP 400: Error while evaluating expression (see response).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
