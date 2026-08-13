_From: Brew Mixer API_

## Update Mixer RenderTrees

Update the RenderTree(s) for a given event.


### Update Mixer RenderTrees Request

PUT `${scheme}://${mixerHost}/brewmixer/1.0/${eventName}`
PUT `${scheme}://${mixerHost}/brewmixer/2.0/mixers/${eventName}`

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


### Update Mixer RenderTrees Response

**On error:**
HTTP 400: Bad Request | Validation failure (see `error` response).

HTTP 404: Not found | The event `eventName` is not found.
