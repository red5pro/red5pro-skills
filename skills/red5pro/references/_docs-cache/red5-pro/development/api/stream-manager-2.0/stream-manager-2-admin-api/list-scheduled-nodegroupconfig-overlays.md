_From: Stream Manager 2.0 Admin API_

##  List Scheduled NodeGroupConfig Overlays 

Retrieve all overlays of a given base NodeGroupConfig.

### Read Scheduled NodeGroups Request

GET `https://<host>/as/v1/admin/nodegroup/scheduled/<nodeGroupName>`

`nodeGroupName`: Required. The name of the base NodeGroupConfig.

### Read Scheduled NodeGroups Response

**On success:**

HTTP 200: OK

```json
[
	"allinone-overlay-1"
]
```

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No master NodeGroupConfig found for `nodeGroupName`
