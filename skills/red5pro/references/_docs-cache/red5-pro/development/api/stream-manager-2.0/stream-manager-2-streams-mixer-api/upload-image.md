_From: Stream Manager 2.0 Streams Mixer API_

### Upload Image

Upload a static image to a mixer host.

#### Upload Image Request

POST `https://<host>/as/v1/streams/images?host=<mixerHost>`

`host`: Required. The IP address or hostname of the mixer node to upload the image to.

Body: multipart/form-data

Form field: `file` (required) - The image file to upload. Supports PNG, JPEG, GIF, BMP formats.

#### Upload Image Response

**On success:**

HTTP 201: CREATED

The response body is forwarded from the mixer host.

```json
{
  "filename": "logo.png",
  "message": "Image uploaded successfully"
}
```

**On error:**

HTTP 400: Bad Request | Validation failure or image format not supported

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 502: Bad Gateway | Error communicating with the specified mixer host
