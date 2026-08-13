---
title: Red5 Core SDK Examples - Setup Transcoder Provisions
description: ""
menu_order: 16
---

The Setup Ttranscoding Provisions example shows how to send the [stream provisioning API](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-streamprovision/) request to a Red5 Pro Stream Manager for transcoding node after submitting a stream provision.

The `Red5ProStreamManager` interface can be used to integrate interactions with *Stream Manager* into a client application. Its result can be used to set up the `ServerDescription` structure, which can be used to establish a connection with the server node. The application uses `parseProvisions` for parsing a JSON file with the targeted provision levels.

Note: this example requires a Red5 Pro autoscale setup with at least one transcoder node. See [this document](/docs/red5-pro/users-guide/transcoder/) for more information on Red5 Pro transcoder nodes and subscriber ABR support. Keep in mind that

Here is an example of JSON structure with a description of provision levels:

```javascript
{
    "stream": [
        {
            "level": 1,
            "name": "level_1",
            "properties": {
                "videoBR": 750000,
                "videoFPS": 30,
                "videoHeight": 720,
                "videoWidth": 1280
            }
        },
        {
            "level": 2,
            "name": "level_2",
            "properties": {
                "videoBR": 500000,
                "videoFPS": 30,
                "videoHeight": 480,
                "videoWidth": 640
            }
        },
        {
            "level": 3,
            "name": "level_3",
            "properties": {
                "videoBR": 300000,
                "videoFPS": 15,
                "videoHeight": 240,
                "videoWidth": 320
            }
        }
    ]
}
```


Note that the stream and level names will be configured depending on corresponding configuration structures, so the same profile description can be used for multiple streams.

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.