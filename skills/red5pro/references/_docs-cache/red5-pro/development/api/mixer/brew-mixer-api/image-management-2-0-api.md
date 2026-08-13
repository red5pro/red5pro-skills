_From: Brew Mixer API_

## Image Management (2.0 API)

The following endpoints are available only in the 2.0 API for managing static images used with `ImageSourceNode`.

### Upload Image

Upload a static image file to be cached and used in mixer compositions.

#### Upload Image Request

POST `${scheme}://${mixerHost}/brewmixer/2.0/images/`

Content-Type: `multipart/form-data`

Form field: `file` (required) - The image file to upload. Supports PNG, JPEG, GIF, BMP formats.

#### Upload Image Response

**On success:**

HTTP 201: Created

```json
{
  "filename": "logo.png",
  "message": "Image uploaded successfully"
}
```

**On error:**

HTTP 400: Bad Request | Validation failure (see `error` response).

```json
{
  "error" : "<error description>"
}
```

### List All Images

List all uploaded images with metadata.

#### List All Images Request

GET `${scheme}://${mixerHost}/brewmixer/2.0/images/`

No body.

#### List All Images Response

**On success:**

HTTP 200: OK

The response is an array of image metadata objects.

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

`filename`: String. The name of the uploaded image file.
`width`: Integer. Image width in pixels.
`height`: Integer. Image height in pixels.
`sizeBytes`: Integer. File size in bytes.

### Delete Image

Remove an uploaded image from the cache.

#### Delete Image Request

DELETE `${scheme}://${mixerHost}/brewmixer/2.0/images/${filename}`

`filename`: The name of the image file to delete.

No body.

#### Delete Image Response

**On success:**

HTTP 200: OK

No body.

**On error:**

HTTP 404: Not Found | The image `filename` is not found.
