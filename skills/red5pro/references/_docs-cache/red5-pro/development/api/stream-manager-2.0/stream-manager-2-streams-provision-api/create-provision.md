_From: Stream Manager 2.0 Streams Provision API_

## Create Provision

Provisioning is used to supply additional publishing parameters for a given stream, such as third-party authentication credentials, cloud storage params, transcoding params, encoder params, IP cam ingest params and more.

After a Provision has been created, when a Get Server for Publish request is made for (one of) the Provision's streams, the Provision will is distributed to the chosen server(s). See Get Server for Publish in the Streams service Stream API doc.

For more examples, see **Example Provisions** below.

### Create Provision Request

POST `https://<host>/as/v1/streams/provision/<nodeGroupName>`

Body:

```json
[
  {
    "provisionGuid": "live/test",
    "streams": [
      {
        "streamGuid": "live/test_3",
        "abrLevel": 3,
        "videoParams": {
          "videoWidth": 320,
          "videoHeight": 180,
          "videoBitRate": 500000
        }
      },
      {
        "streamGuid": "live/test_2",
        "abrLevel": 2,
        "videoParams": {
          "videoWidth": 640,
          "videoHeight": 360,
          "videoBitRate": 1000000
        }
      },
      {
        "streamGuid": "live/test_1",
        "abrLevel": 1,
        "videoParams": {
          "videoWidth": 1280,
          "videoHeight": 720,
          "videoBitRate": 2000000
        }
      }
    ]
  }
]
```

The body is an array of one or more ProvisionRequests.

**ProvisionRequest**

`provisionGuid`: Required. String. Minimum 3 characters. Maximum 256 characters. Alphanumeric, plus `-`, `_`, and `.`  The unique ID of the provision.

`credentials`: Optional. `ProvisionCredentials`. See `ProvisionCredentials` below. If specified, these credentials will be supplied for third-party authentication. See https://www.red5.net/docs/special/authplugin/overview/

`geoRules`: Optional. `GeoRules`. See `GeoRules` below. If specified, prefer or restrict search results by SubGroup.

`streams`: Required. Array of `StreamProvision`. See `StreamProvision` below. At least one `StreamProvision` must be provided.

`capabilities`: Optional. Array of String, an enum. Valid values are one of `"TRANSCODE"`, `"MIX"`, `"XILINX"`, or `"ZIXI"`. 

**ProvisionCredentials**

`username`: Optional. Required if `password` is provided. String. Minimum 2 characters, max 1024 characters.

`password`: Optional. Required if `username` is provided. String. Minimum 2 characters, max 1024 characters. One of `password` or `token` must be provided.

`token`: Optional. String. Minimum 2 characters, max 4096 characters. One of `password` or `token` must be provided.

**ProvisionStream**

`streamGuid`: Required. String. Minimum 3 characters. Maximum 1024 characters. The "context path" of the provisioned stream: `<scope>/[<room>/]<streamName>`. Must contain at least a valid (extant) `scope` and unused `streamName`. Must contain at least one `/` (slash) character.

`abrLevel`: Optional. Integer. Default (best-quality) `1`. Must be a greater than or equal to zero. The Adaptive Bit Rate level. See https://www.red5.net/docs/development/abr/abr-publishing/

`qos`: Optional. Integer. Default `0`. Network Quality-Of-Service flags. See https://www.red5.net/docs/development/rest-api-v-400/parameter-index/

`destUri`: Optional. String. Maximum 4096 characters. Must be a valid URI, or a hostname, or IP address. RTMP forwarding destination.

`vidoeParams`: Optional. `ProvisionVideo`. See `ProvisionVideo` below. Used in cases with ABR and pre-processing.

`groupParams`: Optional. `ProvisionGroup`. See `ProvisionGroup` below. Used in conference scenarios.

`camParams`: Optional. `ProvisionIngest`. See `ProvisionIngest` below. Used for ingest scenarios such as IP cams, MPEG-TS, Zixi, etc.

`cloudParams`: Optional. `CloudStorage`. See `CloudStorage` below. Used for recording and DVR playback scenarios.

**ProvisionVideo**

`videoWidth`: Integer, between 2 and 7680. The width of the video frame.

`videoHeight`: Integer, between 2 and 4320. The height of the video frame.

`videoBitRate`: Integer, between 100 and 10485760. H264 encoder param. Video data rate, nominal.

`videoQpMin`: Integer, between 0 and 63. Must be less than or equal to `videoQpMax`. Minimum h264 quantizer.

`videoQpMax`: Integer, between 0 and 63. Must be greater than or equal to `videoQpMin`. Maximum h264 quantizer.

`videoBrMax`: Integer, between 100 and 10485760. H264 encoder param. Video data rate max.

`videoKey`: Integer, greater than or equal to 1, maximum 600. H264 encoder param. Keyframe interval (in frames).

`videoProfile`: String. H264 encoder param. One of `baseline`, `main`, `high`.

`videoEntropyProfile`: String. H264 encoder param. Valid values are `0` (CALVC) and `1` (CABAC).

`videoEncMode`: Integer. H264 encoder param. Stream content (`1`) or camera realtime (`0`).

`videoEncComplexity`: Integer. Low `0`, medium `1` and high `2`.

**ProvisionGroup**

`group`: String. Required. Minimum 4 characters, maximum 64 characters. The name of the group.

`core`: String. Optional. Maximum 65535 characters. The name of the implementation class (FQCN).

`audioTracks`: Integer. Min 1, max 3.  Number of required audio streams.

`videoTracks`: Integer. Min 1, max 1. Number of required video streams.

**ProvisionIngest**

`properties`: `Map<String, String>`. A map of parameters for use by ingest. See https://github.com/infrared5/red5pro-plugins/blob/develop/restreamer-plugin/Readme.md

**CloudStorage**

`bucketName`: String. Minimum 3 characters, Maximum 63. Required. 

`fileStorageName`: String. Minimum 1 characters, Maximum 1024. Required.

### Create Provision Response

**On success:**

HTTP 201: Created

No body.

**On error:**
HTTP 400: Bad Request | Validation failure (see response body for details).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 409: Conflict | A `Provision` with this `streamGuid` already exists.
