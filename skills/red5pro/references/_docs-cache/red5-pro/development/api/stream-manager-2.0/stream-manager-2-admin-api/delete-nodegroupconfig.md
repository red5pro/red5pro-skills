_From: Stream Manager 2.0 Admin API_

## Delete NodeGroupConfig

Delete the configuration for a given NodeGroup, by name.
When a NodeGroup is deleted, all of its nodes, schedules, and any scheduled overlays are destroyed.

### Delete NodeGroupConfig Request

DELETE `https://<host>/as/v1/admin/nodegroup/<name>`

`name`: the name of the NodeGroup to delete.

### Delete NodeGroupConfig Response

**On success:**

HTTP 200: OK

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: No NodeGroup found with `name`.
