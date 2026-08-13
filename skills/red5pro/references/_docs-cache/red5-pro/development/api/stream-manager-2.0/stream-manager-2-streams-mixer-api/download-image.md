_From: Stream Manager 2.0 Streams Mixer API_

### Download Image

Download an image file from a mixer host.

#### Download Image Request

GET `https://<host>/as/v1/streams/images/<filename>?host=<mixerHost>`

`filename`: Required. The name of the image file to download.

`host`: Required. The IP address or hostname of the mixer node to download the image from.

No body.

#### Download Image Response

**On success:**

HTTP 200: OK

Body: Raw image file data with appropriate Content-Type header (proxied from the mixer host).

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | The image file was not found on the specified host

HTTP 502: Bad Gateway | Error communicating with the specified mixer host
