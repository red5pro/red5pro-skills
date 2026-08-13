_From: Stream Manager 2.0 Streams Provision API_

## Get Provision Status

The provision is requested by key and can be returned directly from a table from a Kstream of the outbound ProvisionCommands.

### Get Provision Status Request

GET `https://<host>/as/v1/streams/provision/<nodeGroupName>/<provisionGuid>?status=true`

No body.

### Get Provision Status Response

The result is a list of NodeStreamStat on the hosting PUBLISH node (origin server), one for each of the Provision's Streams. Each includes the status and any error message.
If the Provision

**On success:**

**ABR Example:**

```json
[
  {
    "streamGuid": "live/test1_1",
    "serverAddress": "10.0.0.1",
    "nodeRole": "origin",
    "subGroup": "subGroup-g9ToU",
    "nodeState": "INSERVICE",
    "subscribers": 0,
    "durationMs": 600000
  },
  {
    "streamGuid": "live/test1_1",
    "serverAddress": "10.0.0.1",
    "nodeRole": "origin",
    "subGroup": "subGroup-g9ToU",
    "nodeState": "INSERVICE",
    "subscribers": 0,
    "durationMs": 600000
  },
  {
    "streamGuid": "live/test1_1",
    "serverAddress": "10.0.0.1",
    "nodeRole": "origin",
    "subGroup": "subGroup-g9ToU",
    "nodeState": "INSERVICE",
    "subscribers": 0,
    "durationMs": 600000
  }  
]
````

**Restreamer Example**

**Error Status Example**






**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: No NodeGroup found with `nodeGroupName`, or no provision found for `provisionGuid`.
