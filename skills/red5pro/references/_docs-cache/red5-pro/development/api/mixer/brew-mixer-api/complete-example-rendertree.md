_From: Brew Mixer API_

## Complete Example RenderTree

This example render tree takes four input streams and renders them in a 2x2 grid. The audio is a mix of all four streams, each at -6dB (anticipating the sum will be 0dB).

```json
[
  {
    "rootVideoNode": {
      "nodes": [
        {
          "red": 0,
          "green": 0,
          "blue": 0,
          "alpha": 1,
          "node": "SolidColorNode"
        },
        {
          "streamGuid": "live/stream1",
          "sourceX": 0,
          "sourceY": 0,
          "sourceWidth": 1920,
          "sourceHeight": 1080,
          "destX": 0,
          "destY": 0,
          "destWidth": 960,
          "destHeight": 540,
          "node": "VideoSourceNode"
        },
        {
          "streamGuid": "live/stream2",
          "sourceX": 0,
          "sourceY": 0,
          "sourceWidth": 1920,
          "sourceHeight": 1080,
          "destX": 960,
          "destY": 0,
          "destWidth": 960,
          "destHeight": 540,
          "node": "VideoSourceNode"
        },
        {
          "streamGuid": "live/stream3",
          "sourceX": 0,
          "sourceY": 0,
          "sourceWidth": 1920,
          "sourceHeight": 1080,
          "destX": 0,
          "destY": 540,
          "destWidth": 960,
          "destHeight": 540,
          "node": "VideoSourceNode"
        },
        {
          "streamGuid": "live/stream4",
          "sourceX": 0,
          "sourceY": 0,
          "sourceWidth": 1920,
          "sourceHeight": 1080,
          "destX": 960,
          "destY": 540,
          "destWidth": 960,
          "destHeight": 540,
          "node": "VideoSourceNode"
        }
      ],
      "node": "CompositorNode"
    },
    "rootAudioNode": {
      "nodes": [
        {
          "streamGuid": "live/stream1",
          "pan": 0,
          "gain": -6,
          "node": "AudioSourceNode"
        },
        {
          "streamGuid": "live/stream2",
          "pan": 0,
          "gain": -6,
          "node": "AudioSourceNode"
        },
        {
          "streamGuid": "live/stream3",
          "pan": 0,
          "gain": -6,
          "node": "AudioSourceNode"
        },
        {
          "streamGuid": "live/stream4",
          "pan": 0,
          "gain": -6,
          "node": "AudioSourceNode"
        }
      ],
      "node": "SumNode"
    }
  }
]
```
