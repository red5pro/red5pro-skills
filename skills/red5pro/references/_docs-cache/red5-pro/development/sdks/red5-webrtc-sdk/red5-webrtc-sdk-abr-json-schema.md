---
title: ABR - JSON Schema
description: ""
menu_order: 46
---

## ABR Provisions

In SM 2.0 an ABR Provision is created and modified like any other Provision, using the [Streams service's Provision API.](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-provision-api/) Note that the Provision API requires JWT authentication. See [Auth service doc.](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-auth-api/)

The Provision format has changed in SM 2.0. An example three-variant ABR Provision now looks like this:

```json
[
  {
    "provisionGuid": "live/test01",
    "streams": [
      {
        "streamGuid": "live/test01_3",
        "abrLevel": 3,
        "videoParams": {
          "videoWidth": 320,
          "videoHeight": 180,
          "videoBitRate": 500000
        }
      },
      {
        "streamGuid": "live/test01_2",
        "abrLevel": 2,
        "videoParams": {
          "videoWidth": 640,
          "videoHeight": 360,
          "videoBitRate": 1000000
        }
      },
      {
        "streamGuid": "live/test01_1",
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

The Streams-Provision API has create, read, update, and delete (CRUD) methods using `provisionGuid` to identify Provisions. This ID must be unique among provisions within a given NodeGroup. While it may be useful for the `provisionGuid` to be similar to or the same as some part of the `streamGuid`, this is not necessary. However, the HTML test bed that we will use to subscribe does assume that `provisionGuid` is the basis of `streamGuid` as above, so it is necessary in this example.

## Usage

Once a provision is in the system, create a new broadcast session using `WHIPClient` and the media specifics related to the high-level variant of the provision, so the transcoder on the server can produce the proper ladders:

```js
const publisher = new WHIPClient();
await publisher.init({
  endpoint: `https://myred5.cloud.red5.net/as/v1/proxy/whip/live/mystream`,
  connectionParams: {
    nodeGroup: "my-node-group",
    transcode: true,
  },
  streamName: "mystream",
  mediaConstraints: {
    audio: true,
    video: {
      width: {
        exact: 1280,
      },
      height: {
        exact: 720,
      },
      frameRate: {
        ideal: 60,
      },
    },
  },
  bandwidth: {
    audio: 128,
    video: 2000,
  },
});
await publisher.publish();
```
