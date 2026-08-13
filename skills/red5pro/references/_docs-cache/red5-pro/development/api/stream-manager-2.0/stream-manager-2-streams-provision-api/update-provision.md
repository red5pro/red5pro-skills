_From: Stream Manager 2.0 Streams Provision API_

## Update Provision

Update an existing Provision. 

Note a Provision cannot be updated after it has been distributed to nodes (via Get Server for Publish request). After that to change the provision, it must be deleted and re-created.

### Update Provision Request

PUT `https://<host>/as/v1/streams/provision/<nodeGroupName>`

Body:

```json
[
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
]
```

The body is an array of one or more ProvisionRequests (see **Create Provision** above for details of the ProvisionRequest).

### Update Provision Response

HTTP 400: Bad Request | Validation failure (see response body for details).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`, or no provision found for `provisionGuid`.
