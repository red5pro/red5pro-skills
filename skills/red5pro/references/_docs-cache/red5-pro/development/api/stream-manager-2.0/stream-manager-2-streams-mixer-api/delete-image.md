_From: Stream Manager 2.0 Streams Mixer API_

### Delete Image

Delete an image from a mixer host.

#### Delete Image Request

DELETE `https://<host>/as/v1/streams/images/<filename>?host=<mixerHost>`

`filename`: Required. The name of the image file to delete.

`host`: Required. The IP address or hostname of the mixer node to delete the image from.

No body.

#### Delete Image Response

**On success:**

HTTP 200: OK

```json
{
  "result": "DELETED"
}
```

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | The image file was not found on the specified host

HTTP 502: Bad Gateway | Error communicating with the specified mixer host
