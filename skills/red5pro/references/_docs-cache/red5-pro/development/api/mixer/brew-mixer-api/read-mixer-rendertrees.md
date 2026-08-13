_From: Brew Mixer API_

## Read Mixer RenderTrees

Read the list of RenderTrees for the given event.

### Read Mixer RenderTrees Request
GET `${scheme}://${mixerHost}/brewmixer/1.0/${eventName}`
GET `${scheme}://${mixerHost}/brewmixer/2.0/mixers/${eventName}`

No body.

### Read Mixer RenderTrees Response

**On success:**
HTTP 200: OK

The response is an array of the current RenderTrees for the given event, one for each submix.

```json
[
  {
    "rootVideoNode": {
      "nodes": [
        {
          "streamGuid": "live/stream1",
          "sourceX": 0,
          "sourceY": 0,
          "sourceWidth": 1920,
          "sourceHeight": 1080,
          "destX": 0,
          "destY": 0,
          "destWidth": 1920,
          "destHeight": 1080,
          "node": "VideoSourceNode"
        }
      ],
      "node": "CompositorNode"
    },
    "rootAudioNode": {
      "nodes": [
        {
          "streamGuid": "live/stream1",
          "pan": 0.0,
          "gain": 0.0,
          "node": "AudioSourceNode"
        }
      ],
      "node": "SumNode"
    }
  }
]
```

**On error:**
HTTP 404: Not found | The event `eventName` is not found.
