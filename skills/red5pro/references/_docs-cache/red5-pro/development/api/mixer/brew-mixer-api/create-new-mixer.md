_From: Brew Mixer API_

## Create New Mixer

Create a new mixer event.

Note that here, the word "event" is used in the sense of a music concert or sporting event, rather than the EventListener sense.

### Create New Mixer Request

POST `${scheme}://${mixerHost}/brewmixer/1.0/${eventName}`

Body:

```json
{
  "event": "event1",
  "path": "live",
  "streamName": "mix1",
  "doForward": true,
  "originIp": "192.168.1.222",
  "width": 1920,
  "height": 1080,
  "frameRate": 30,
  "bitRate": 4000000,
  "maxBitRate": 7000000,
  "qpMin": 28,
  "qpMax": 48,
  "audioSampleRate": 48000,
  "audioChannels": 2,
  "subMixes": 2,
  "action": "create",
  "digest": "03CA2E9BC968DA07BBF16FDC51D5051BFC50DC0CCFA111EBE023981F4453B050",
  "timestamp": 1690333081423
}
```

`event`: String, alphanumeric, up to 256 characters. Name of this mixer or set of mixers. 
`path`: String, up to 1024 characters total for `path` + `/` + `streamName`.
`streamName`: String, up to 1024 characters total for `path` + `/` + `streamName`.
`doForward`: Boolean. True if forwarding stream to another instance (`originIp`).
`originIp`: (Optional if not `doForward`) String, up to 45 characters. Origin node to forward to. Must be a routable address. Usually an Origin node within a cluster.
`width`: Integer, between 2 and 7680. Video frame width in pixels.
`height`: Integer, between 2 and 4320. Video frame height in pixels.
`bitRate`: Integer, between 100 and 1048576. Video data rate in bits per second.
`maxBitRate`: Integer, between 100 and 1048576. Maximum video data rate in bits per second.
`qpMin`: Integer, between 0 and 63. Must be less than or equal to `qpMax`. Minimum h264 quantizer.
`qpMax`: Integer, between 0 and 63. Must be greater than or equal to `qpMin`. Maximum h264 quantizer.
`audioSampleRate`: Integer, between 8000 and 96000. Audio data rate in samples per second.
`audioChannels`: Integer, either 1 and 2 (mono or stereo).
`subMixes`: (Optional) Integer, between 1 and 10. The number of simultaneous mixers to create for this event. Default is 1.

**Authentication params (required for clustered mixers)**
`action`: Always `create`.
`digest`: String, up to 2048 characters.
`timestamp`: Integer (64-bit). Milliseconds since epoch.

**NOTE** that the above validation rules represent the extremes that the REST API will allow. This does not guarantee that the video or audio encoder will truly be able to accomodate the request, or that enough CPU or memory are available. 

**NOTE** For Openh264:
* 12 bits per pixel per frame is lossless.
* Encoder errors when resolution exceeds 3840x2160
* Encoder errors when compressed frame size exceeds half uncompressed size
* Decoder errors when compressed frame size exceeds 1MB

### Create New Mixer Response

**On success:**
HTTP 201: Created.

No body.

**On error:**  
HTTP 400: Bad Request | Validation failure (see `error` response).

HTTP 401: Unauthorized | Missing or invalid `username` or `password`.

Body:

```json
{
  "error" : "<error description>"
}
```
