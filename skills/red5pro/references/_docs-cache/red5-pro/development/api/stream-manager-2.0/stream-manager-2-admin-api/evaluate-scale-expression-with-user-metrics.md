_From: Stream Manager 2.0 Admin API_

## Evaluate Scale Expression (with user metrics)

Evaluate a Scale Expression and return the result. This request is used to experiment with expressions while taking no action. For more information about Scale Expressions and ScaleRule Expressions in general, see **ScaleRule Expressions** below.

All Scale Expressions require a set of aggregated server metrics for a particular NodeRole within a particular SubGroup (a "SubGroup-Role"). This version of this request takes aggregate metrics in the body of the request (from the user). **XXX hard to produce -- can't query for examples**

### Evaluate Scale Expression (user metrics) Request

POST `https://<host>/as/v1/admin/evaluate/scale/`

Body:

```json
{
	"expression":"avg(cpu.process.load) \u003c 1.0 \u0026\u0026 avg(cpu.system.load) \u003c 2.0",
	"metrics":{"disk":{"name":"disk","sum":0.0,"count":0,"children":{"freeswap":{"name":"freeswap","sum":1.5E10,"min":5.0E9,"max":1.0E10,"count":2,"children":{}},"totalswap":{"name":"totalswap","sum":1.6E11,"min":8.0E10,"max":8.0E10,"count":2,"children":{}}}},"memory":{"name":"memory","sum":0.0,"count":0,"children":{"system":{"name":"system","sum":0.0,"count":0,"children":{"committedvirtual":{"name":"committedvirtual","sum":5.4E10,"min":2.5E10,"max":2.9E10,"count":2,"children":{}},"freephysical":{"name":"freephysical","sum":1.0E10,"min":3.0E9,"max":7.0E9,"count":2,"children":{}},"totalphysical":{"name":"totalphysical","sum":7.0E10,"min":3.5E10,"max":3.5E10,"count":2,"children":{}}}},"vm":{"name":"vm","sum":0.0,"count":0,"children":{"total":{"name":"total","sum":4.8E9,"min":2.4E9,"max":2.4E9,"count":2,"children":{}},"max":{"name":"max","sum":4.0E9,"min":2.0E9,"max":2.0E9,"count":2,"children":{}},"free":{"name":"free","sum":1.4E9,"min":4.0E8,"max":1.0E9,"count":2,"children":{}}}}}},"cpu":{"name":"cpu","sum":0.0,"count":0,"children":{"process":{"name":"process","sum":0.0,"count":0,"children":{"load":{"name":"load","sum":0.20800000000000002,"min":0.05,"max":0.158,"count":2,"children":{}},"time":{"name":"time","sum":5.109375E10,"min":2.4546875E10,"max":2.6546875E10,"count":2,"children":{}}}},"system":{"name":"system","sum":0.0,"count":0,"children":{"load":{"name":"load","sum":1.06,"min":0.43,"max":0.63,"count":2,"children":{}}}},"processors":{"name":"processors","sum":40.0,"min":20.0,"max":20.0,"count":2,"children":{}}}},"connections":{"name":"connections","sum":0.0,"count":0,"children":{"subscriber":{"name":"subscriber","sum":134.0,"min":37.0,"max":97.0,"count":2,"children":{}},"publisher":{"name":"publisher","sum":38.0,"min":12.0,"max":26.0,"count":2,"children":{}},"client":{"name":"client","sum":220.0,"min":80.0,"max":140.0,"count":2,"children":{}}}}}
}
```

`expression`: the Capacity Expression to evaluate

`metrics`: the set of metrics to use (should contain all metrics that real nodes provide, in aggregate format with `sum`, `min`, `max`, and `count` fields), representing the aggregated metrics for nodes belonging to a SubGroup-Role.

### Evaluate Scale Expression (user metrics) Response

**On success:**

HTTP 200: OK

Body: 

```json
{"result":true}
```

`result`: the boolean result of the given expression

**On error:**

HTTP 400: Error while evaluating expression (see response).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
