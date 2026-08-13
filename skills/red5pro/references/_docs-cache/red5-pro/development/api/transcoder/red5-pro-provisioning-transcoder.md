---
title: Provisioning the Transcoder
description: ""
menu_order: 1
---

See this [resolution/bitrate guide](/docs/red5-pro/users-guide/troubleshooting-and-best-practices/stream-quality/red5-pro-best-practices-bitrate/) for industry-recommended bitrates to use with standard resolutions.

See [Rest API for Stream Provisioning](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-provision-api/) for more details on provisioning API call.

## Provisioning

The first step to set up an Adaptive Bitrate video streaming is to provide a provision of stream variants to the Stream Manager. This is achieved by making a POST request with a JSON object as payload:

**Method**:`POST`

**URL**: `https://yourstreammanager.com/streammanager/api/4.0/admin/event/meta/live/guid?accessToken=myaccessToken`

Where:

- *yourstreammanager.com*: is the url of your Stream Manager
- *guid*: is the unique identifier of the stream provisions
- *accessToken*: is the access token defined in the Stream Manager configuration.
- *videoBR*: is video bitrate in `bits`

The JSON object needs to have the following structure:

```json
{
  "meta": {
      "authentication": {
      "username": "",
      "password": ""
     },
      "stream": [
        {
          "name": "<variant1_name>",
          "level": "1",
          "properties": {
          "videoHeight": <value>,
          "videoWidth": <value>,
          "videoBR": <value>,
          "videoFPS": <value>
          }
         },
                 {
          "name": "<variant2_name>",
          "level": "2",
          "properties": {
          "videoHeight": <value>,
          "videoWidth": <value>,
          "videoBR": <value>,
          "videoFPS": <value>

          }
         },
                 {
          "name": "<variant3_name>",
          "level": "3",
          "properties": {
          "videoHeight": <value>,
          "videoWidth": <value>,
          "videoBR": <value>,
          "videoFPS": <value>

          }
         }
],
      "georules": {
      "regions": [
        ""
      ],
      "restricted": "false"
    },
    "qos": "3"
  }
}
```

Where:

- *stream*: an array that defines, for each version of the same stream, an object with the stream’s level, name, bitrate, height and width, and frames per second (optional).
- *qos*: is an integer that indicates the quality of service that needs to be provided (currently 3 is the only valid level).

The following variables need to be included in the provision even if they are left blank:

- *authentication*: specifies the username and password that have been configured for the video stream if required.
- *georules*: based on the restricted boolean value, this specifies which regions should be allowed or restricted to subscribe to a video stream.

As an example, using *mystream* as the GUID and defining three variants for the stream, the POST and JSON object would look like the following:

`https://yourstreammanager.com/streammanager/api/4.0/admin/event/meta/live/mystream?accessToken=myaccessToken`

```json
{
  "meta": {
      "authentication": {
      "username": "",
      "password": ""
     },
      "stream": [
        {
          "name": "mystream_1",
          "level": "1",
          "properties": {
          "videoHeight": 720,
          "videoWidth": 1280,
          "videoBR": "2000000",
          "videoFPS": 30
          }
         },
                 {
          "name": "mystream_2",
          "level": "2",
          "properties": {
          "videoHeight": 360,
          "videoWidth": 640,
          "videoBR": "1000000",
          "videoFPS": 24

          }
         },
                 {
          "name": "mystream_3",
          "level": "3",
          "properties": {
          "videoHeight": 180,
          "videoWidth": 320,
          "videoBR": "500000",
          "videoFPS": 15

          }
         }
],
      "georules": {
      "regions": [
        ""
      ],
      "restricted": "false"
    },
    "qos": "3"
  }
}
```

> **NOTE**: It is **critical** to use the same aspect ratio for all variants for an optimal subscriber ABR experience. See [this list of 16:9 resolutions](https://pacoup.com/2011/06/12/list-of-true-169-resolutions/) for a list <br/>
> **NOTE #2**: ABR works best if the 2x the bitrate overlaps with the next level up (for example, for a 3-level provision, if level 2 is 1,000 kbps, then level 1 should be 2,000 kbps or under and level 3 should be 500 kbps or over). <br/>
> NOTE #3: the provision level names can correspond to the levels (e.g. stream_1, stream_2, stream_3) or to the bitrates (e.g. stream_2000, stream_1000, stream_500), but should all include the GUID prefix for management purposes.

A successful response will return an object with the top-level stream name and the meta field populated with the JSON object sent in the POST call:

```json
{
    "name": "mystream",
    "scope": "live",
    "data": {
        "meta": {
            "authentication": {
                "username": "",
                "password": ""
            },
            "stream": [
                {
                    "name": "mystream_1",
                    "level": "1",
                    "properties": {
                        "videoHeight": 720,
                        "videoWidth": 1280,
                        "videoBR": 2000000,
                        "videoFPS": 30
                    }
                },
                {
                    "name": "mystream_2",
                    "level": "2",
                    "properties": {
                        "videoHeight": 360,
                        "videoWidth": 640,
                        "videoBR": 1000000,
                        "videoFPS": 30
                    }
                },
                {
                    "name": "mystream_3",
                    "level": "3",
                    "properties": {
                        "videoHeight": 180,
                        "videoWidth": 320,
                        "videoBR": 500000,
                        "videoFPS": 24
                    }
                }
            ],
            "georules": {
                "regions": [
                    ""
                ],
                "restricted": "false"
            },
            "qos": "3"
        }
    },
    "updated": 1539880127208
}
```

It is possible to access the provision using the Stream Manager as follows:

**Method**:`GET`

**URL**: `https://yourstreammanager.com/streammanager/api/4.0/admin/event/meta/live/guid?accessToken=myaccessToken`

Where:

- *yourstreammanager.com*: is the url of your Stream Manager
- *guid*: is the unique identifier of the stream provisions
- *accessToken*: is the access token defined in the Stream Manager configuration.
