_From: Stream Manager 2.0 Admin API_

## List Proxy Sessions

Retrieve a list of all active AS-Proxy WebRTC connections. 

Note that ordinarily, proxy connections are short-lived during the initial handshake -- only in the persistent WebSocket case, where no switch to datachannel is allowed, is a proxy connection maintained for the duration of the WebRTC stream.

### List Proxy Sessions Request
GET `https://<host>/as/v1/admin/rtcproxy`

### List Proxy Sessions Response

**On success:**

HTTP 200: OK

```json
{
  "NodeKey|subscriber-7f17": {
    "streamGuid": "subscriber-7f17",
    "status": "CONNECTED",
    "sessionId": "b",
    "timestamp": 1709322384859
  }
}
```

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
