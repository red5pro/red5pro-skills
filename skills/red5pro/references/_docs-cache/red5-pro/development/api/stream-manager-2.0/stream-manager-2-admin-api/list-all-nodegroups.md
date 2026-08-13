_From: Stream Manager 2.0 Admin API_

## List All NodeGroups

Return a list of all active NodeGroups, by name. This does not include inactive schedules. For that, see List All Scheduled NodeGroups below.

### List All NodeGroups Request

GET `https://<host>/as/v1/admin/nodegroup`

### List All NodeGroups Response

**On success:**

HTTP 200: OK

Body:

```json
[
	"TEST-NODE-GROUP-2N40CI",
	"TEST-NODE-GROUP-J8SN31"
]
```

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
