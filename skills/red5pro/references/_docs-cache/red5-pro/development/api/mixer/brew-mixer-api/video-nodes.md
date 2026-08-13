_From: Brew Mixer API_

## Video Nodes

### Solid Color Node

The `SolidColorNode` takes no input and produces a field of solid color filling the entire frame. This is useful when source videos may not be present, or when they may not fill the entire frame. With a `SolidColorNode` drawn first, the "empty spaces" will have a determinate color. (Otherwise, indeterminate results may occur, such as junk data left over from the previous frame.)

```json
{
    "red": 0,
    "green": 0,
    "blue": 0,
    "alpha": 1,
    "node": "SolidColorNode"
}
```

`red`: Float, between 0.0 and 1.0.
`green`: Float, between 0.0 and 1.0.
`blue`: Float, between 0.0 and 1.0.
`alpha`: Float, between 0.0 and 1.0.
`node`: String, always `SolidColorNode`.

### Video Source Node

A `VideoSourceNode` provides pixel data from a given live stream. You supply both the source rectangle (what part of the incoming pixel data will we copy) and the destination rectangle (where in the mixer video frame will the source be drawn), allowing you to crop, stretch, and mirror source videos.

```json
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
}
```

`streamGuid`: String, up to 1024 characters. The full path and name of the source stream.
`sourceX`: Integer, between 0 and 7680 inclusive. 
`sourceY`: Integer, between 0 and 4320 inclusive.
`sourceWidth`: Integer, from 0 and 7680 inclusive. 
`sourceHeight`: Integer, from 0 to 4320 inclusive.
`destX`: Integer, between 0 and 7680 inclusive.
`destY`: Integer, between 0 and 4320 inclusive.
`destWidth`: Integer, from -7680 and 7680 inclusive. Negative values imply mirroring.
`destHeight`: Integer, from -4320 to 4320 inclusive. Negative values imply mirroring.
`node`: Always `VideoSourceNode`.

### Image Source Node

An `ImageSourceNode` provides pixel data from a cached static image. You supply both the source rectangle (what part of the image will be copied) and the destination rectangle (where in the mixer video frame the image will be drawn), allowing you to crop, stretch, and mirror images. If source dimensions are omitted, the full image is used.

Images must first be uploaded via the `/brewmixer/2.0/images/` endpoint before they can be referenced by filename.

```json
{
    "filename": "logo.png",
    "sourceX": 0,
    "sourceY": 0,
    "sourceWidth": 400,
    "sourceHeight": 200,
    "destX": 960,
    "destY": 540,
    "destWidth": 400,
    "destHeight": 200,
    "node": "ImageSourceNode"
}
```

`filename`: String, up to 1024 characters. The name of the cached image file (previously uploaded via the images API).
`sourceX`: (Optional) Integer, between 0 and 7680 inclusive. Default is 0.
`sourceY`: (Optional) Integer, between 0 and 4320 inclusive. Default is 0.
`sourceWidth`: (Optional) Integer, from 0 and 7680 inclusive. Default uses full image width.
`sourceHeight`: (Optional) Integer, from 0 to 4320 inclusive. Default uses full image height.
`destX`: Integer, between 0 and 7680 inclusive.
`destY`: Integer, between 0 and 4320 inclusive.
`destWidth`: Integer, from -7680 and 7680 inclusive. Negative values imply mirroring.
`destHeight`: Integer, from -4320 to 4320 inclusive. Negative values imply mirroring.
`node`: Always `ImageSourceNode`.

### Compositor Node

The `CompositorNode` draws a list of source nodes in order from first to last into the mixer frame. Therefore, the last node is drawn "on top". You can manipulate the order of the list to control the order of drawing.

```json
{
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
    ...
  ],
  "node": "CompositorNode"
}
```

`nodes`: Array/list of video nodes.
`node`: String, always `CompositorNode`.
