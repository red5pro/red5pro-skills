_From: Stream Manager 2.0 Streams Mixer API_

### Get RenderTrees for Mixer Event Response

**On success:**

HTTP 200: OKAY

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

The response is an array of RenderTrees, one for each of the event's submixes.

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`, or no mixer event found for `eventId` (see error response for details)
