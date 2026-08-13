_From: Stream Manager 2.0 Admin API_

## Get NodeGroup Idle Time

Retrieve the minimum `lastIdleMs` metric from all `INSERVICE` nodes in the given NodeGroup.

### Get NodeGroup Idle Time Request

GET `https://<host>/as/v1/admin/nodegroup/<nodeGroupName>/idle`

### Get NodeGroup Idle Time Response

**On success:**

HTTP 200: OK

```json
{
	"lastPubSubMs": 574000
}
```

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No master NodeGroupConfig found for `nodeGroupName`
