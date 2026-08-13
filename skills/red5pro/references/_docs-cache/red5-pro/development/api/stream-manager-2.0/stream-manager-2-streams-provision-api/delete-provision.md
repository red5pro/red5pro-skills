_From: Stream Manager 2.0 Streams Provision API_

## Delete Provision

Delete a Provision. A delete request will also be forwarded to any cluster nodes already hosting the provision.

### Delete Provision Request

DELETE `https://<host>/as/v1/streams/provision/<nodeGroupName>/<provisionGuid>`

No body.

### Delete Provision Response

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`, or no provision found for `provisionGuid`.
