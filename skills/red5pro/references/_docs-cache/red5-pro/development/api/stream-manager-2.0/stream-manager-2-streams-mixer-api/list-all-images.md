_From: Stream Manager 2.0 Streams Mixer API_

### List All Images

List all uploaded images on a mixer host.

#### List All Images Request

GET `https://<host>/as/v1/streams/images?host=<mixerHost>`

`host`: Required. The IP address or hostname of the mixer node to list images from.

No body.

#### List All Images Response

**On success:**

HTTP 200: OK

The response body is forwarded from the mixer host.

```json
[
    {
        "filename": "logo.png",
        "width": 1920,
        "height": 1080,
        "sizeBytes": 2048576
    },
    {
        "filename": "background.jpg",
        "width": 1280,
        "height": 720,
        "sizeBytes": 1024768
    }
]
```

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 502: Bad Gateway | Error communicating with the specified mixer host
