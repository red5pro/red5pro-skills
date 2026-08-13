_From: Stream Manager 2.0 Streams Mixer API_

### Get All Mixer Events

Get all mixer events in a given NodeGroup.

#### Get All Mixer Events Request

GET `https://<host>/as/v1/streams/mixer/<nodeGroupName>`

No body.

#### Get All Mixer Events Response

**On success:**

HTTP 200: OKAY

```json
{
   "event1" : {
      "durationMs" : 0,
      "nodeRole" : "mixer",
      "nodeState" : "INSERVICE",
      "serverAddress" : "129.213.150.214",
      "streamGuid" : "live/mix1",
      "subscribers" : 0
   }
}
```

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`.
