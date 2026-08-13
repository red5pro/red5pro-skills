_From: Stream Manager 2.0 Streams Mixer API_

### Delete Mixer Event

Delete the given mixer event, stopping all submixes.

#### Delete Mixer Event Request

DELETE `https://<host>/as/v1/streams/mixer/<nodeGroupName>/<eventId>`

No body.

#### Delete Mixer Event Response

**On success:**

HTTP 200: OKAY

```json
{
	"result": "UPDATED"
}
```

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`, or no mixer event found for `eventId` (see error response for details)


## Mixer Image Operations

The following operations manage static images that can be used in mixer render trees with `ImageSourceNode`. All operations forward requests to a specific mixer host specified by the `host` parameter.
