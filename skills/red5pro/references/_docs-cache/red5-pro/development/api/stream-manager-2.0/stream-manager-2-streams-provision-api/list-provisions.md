_From: Stream Manager 2.0 Streams Provision API_

## List Provisions

This returns all registered provisions.

### List Provisions Request

GET `https://<host>/as/v1/streams/provision/<nodeGroupName>`

No body.

### List Provisions Response

**On success:**

HTTP 200: OK

```json
{
  "provisionGuid": "live/test",
  "streams": [
    {
      "streamGuid": "live/test_3",
      "abrLevel": 3,
      "videoParams": {
        "videoWidth": 320,
        "videoHeight": 180,
        "videoBitRate": 500000
      }
    },
    {
      "streamGuid": "live/test_2",
      "abrLevel": 2,
      "videoParams": {
        "videoWidth": 640,
        "videoHeight": 360,
        "videoBitRate": 1000000
      }
    },
    {
      "streamGuid": "live/test_1",
      "abrLevel": 1,
      "videoParams": {
        "videoWidth": 1280,
        "videoHeight": 720,
        "videoBitRate": 2000000
      }
    }
  ]
}
```

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: No NodeGroup found with `nodeGroupName`.
