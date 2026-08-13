_From: Stream Manager 2.0 Streams Mixer API_

### Update RenderTrees

Update the RenderTree for each submix in a given Mixer Event.

#### Update RenderTrees Request

PUT `https://<host>/as/v1/streams/mixer/<nodeGroupName>/<eventId>`

Body:

```json
[
    {
        "rootVideoNode": {
            "red": 0,
            "green": 0,
            "blue": 1,
            "alpha": 1,
            "node": "SolidColorNode"
        },
        "rootAudioNode": {
            "nodes": [
                {
                    "streamGuid": "live/stream1",
                    "pan": 0,
                    "gain": 0,
                    "node": "AudioSourceNode"
                }
            ],
            "node": "SumNode"
        }
    }
]
```

Note that if the request contains fewer RenderTrees than the mixer event has submixes, only the first submixes will receive updates and remaining submixes will be ignored. However if additional (too many) RenderTrees are supplied, this is an error (400).


#### Update RenderTrees Response

**On success:**

HTTP 200: OKAY

Body:

```json
{
	"result": "UPDATED"
}
```

**On error:**

HTTP 400: Bad Request | Validation failure (see response body for details).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`, or no mixer event found for `eventId` (see error response for details)
