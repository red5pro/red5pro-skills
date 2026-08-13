_From: Brew Mixer API_

## Audio Nodes

### Audio Source Node

An `AudioSourceNode` takes no input, and produces audio chunks from a given video stream. The node can also adjust the gain and panning of the source.

```json
{
    "streamGuid": "live/stream1",
    "pan": 0,
    "gain": -6,
    "node": "AudioSourceNode"
}
```

`streamGuid`: String, up to 1024 characters. The full path and name of the source stream.
`pan`: Float, from -100 to 100 inclusive. -100 is fully left, 0 is centered, and 100 is fully right.
`gain`: Float, from -100 to 0. Gain in decibels.
`node`: String, always `AudioSourceNode`.

### Sum Node

A `SumNode` takes a list of one or more input Audio Nodes and outputs the sum. Note that the sum node simply sums, and if the resulting total gain is excessive, clipping will occur. Make sure that the gain of the input signals is sufficiently low to prevent clipping.

Because addition is commutative, the order of the addend nodes is unimportant.

```json
      "nodes": [
        {
          "streamGuid": "live/stream1",
          "pan": 0,
          "gain": -6,
          "node": "AudioSourceNode"
        },
        ...
      ],
      "node": "SumNode"
```

`nodes`: Array/list of audio nodes.
`node`: String, always `SumNode`.
