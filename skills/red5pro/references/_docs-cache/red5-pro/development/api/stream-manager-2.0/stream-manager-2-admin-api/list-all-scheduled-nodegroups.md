_From: Stream Manager 2.0 Admin API_

## List All Scheduled NodeGroups

Retrieve the set of the names of all scheduled NodeGroupConfigs.

For more information about scheduled configuration changes, see **Scheduling** in the **NodeGroupConfig** doc below.

### List All Scheduled NodeGroups Request

GET `https://<host>/as/v1/admin/nodegroup/scheduled`

### List All Scheduled NodeGroups Response

**On success:**

HTTP 200: OK

```json
[
	"allinone-overlay-1"
]
```

The response is an array of scheduled NodeGroup names. 

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
