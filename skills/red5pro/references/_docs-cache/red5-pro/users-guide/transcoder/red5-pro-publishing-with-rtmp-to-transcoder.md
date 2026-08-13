---
title: Publishing with RTMP to the Transcoder
description: ""
menu_order: 8
---

When publishing via RTMP, such as via ffmpeg or OBS, after you have provisioned your stream, you must then make the stream manager [broadcast](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-streams/#broadcaster) transcoding request, using the `GUID` of your stream provision:

```txt
http://{host}:{port}/streammanager/api/4.0/event/{scopeName}/{streamGUID}?action=broadcast&transcode=true
```

You will then need to broadcast the 1st level (highest) variant via RTMP.

For example, if your stream provision is:

```json
https://streammanagerurl/streammanager/api/4.0/admin/event/meta/live/stream?accessToken=token

{
  "meta": {
      "authentication": {
      "username": "",
      "password": ""
     },
      "stream": [
        {
          "name": "stream_1",
          "level": "1",
          "properties": {
          "videoHeight": 720,
          "videoWidth": 1280,
          "videoBR": 2500000,
          "videoFPS": 24
          }
         },
                 {
          "name": "stream_2",
          "level": "2",
          "properties": {          
          "videoHeight": 360,
          "videoWidth": 640,
          "videoBR": 1000000,
          "videoFPS": 24
          }
         },
                 {
          "name": "stream_3",
          "level": "3",
          "properties": {          
          "videoHeight": 180,
          "videoWidth": 320,
          "videoBR": 500000,
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

Then your transcoder broadcast query would be: `https://streammanagerurl/streammanager/api/4.0/event/live/stream?action=broadcast&transcode=true`

and your rtmp target would be: `rtmp://<transcoderip>/live/stream_1`
