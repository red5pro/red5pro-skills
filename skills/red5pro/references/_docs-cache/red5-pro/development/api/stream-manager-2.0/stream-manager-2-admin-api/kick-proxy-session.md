_From: Stream Manager 2.0 Admin API_

## Kick Proxy Session

Force an AS-Proxy session to close.

### Kick Proxy Session Request
DELETE `https://<host>/as/v1/admin/rtcproxy/<sessionIdOrStreamGuid>`

`sessionIdOrStreamGuid`: to terminate an individual session, supply `sessionId`. Or, terminate all sessions for a stream, give the `streamGuid`.

### Kick Proxy Session Response

**On success:**

HTTP 200: OK

No body.

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No matching `sessionId` or `streamGuid` found.
