---
title: Stream Manager 2.0 Migration Guide - ABR and Transcoding
menu_order: 3
---

## ABR Overview

In SM 2.0, two major adaptive bitrate (ABR) use-cases are supported. In the first case, each stream of the ABR ladder is provided by publisher. In the second case, a single publisher provides the top-quality variant to a Transcoder node which then creates the other variants.

More information about ABR in general [can be found here.](/docs/red5-pro/users-guide/transcoder/)

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

### Distributing Provisions

A Red5Pro server must have a local copy of a Provision before a stream is published to it. The Streams service accomplishes this in the Stream API when [Get Server for Publish](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-api/#GetServerforPublish) is called.

This call is effectively a request for an "origin" IP, and the publisher supplies the guid of the stream they will publish. During this call, the Streams service checks to see if there is a Provision for this stream, and if so forwards the provision to the chosen server(s). A transcode request (Get Server for Publish with `transcode=true`) with an associated (previously-created) ABR Provision will prompt the Streams service to choose two servers -- a transcoder to generate the additional decimated variants, and an origin server to accept the transcoder output and provide the streams to the cluster (to its cluster children).

Then, Get Server for Publish returns the chosen origin, or the chosen transcoder and origin, to the caller. So then when the publisher publishes, the chosen server has just received the Provision data.

### ABR Ladder with Publisher-Supplied Variants

In this scenario, the publisher wishes to supply three variants from their encoder device.

**Authenticate to receive JWT**

```
curl -X PUT https://admin:abcdef12@example.org/as/v1/auth/login
```

Response: 

```
{"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiUk9MRV9BRE1JTiIsImV4cCI6MTczMDg2NDM2M30.hP90V8o0ZvKKWjRmOpmVfFL2zNyDA_dQIMzzWkJgx7U"}
```

Then create an environment variable:

```
export JWT="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiUk9MRV9BRE1JTiIsImV4cCI6MTczMDg2NDM2M30.hP90V8o0ZvKKWjRmOpmVfFL2zNyDA_dQIMzzWkJgx7U"
```

**Create Provision**

Assuming the example ABR Provision JSON above is written to a local file, `provision.json`, call the Streams service with the JWT to create the provision:

```
curl -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @provision.json https://example.org/as/v1/streams/provision/default
```

Response:

```
{"result":"CREATED"}
```

**Get Server for Publish**

Note that we want to publish all three variants to the same origin. Therefore we call **Get Server for Publish** only one time. The Streams service will distribute the Provision based on any of its streams. Here we use the highest variant.

```
curl -H "Content-Type: application/json" https://example.org/as/v1/streams/stream/default/publish/live/test01_1
```

Response:

```
[{"streamGuid":"live/test01_1","serverAddress":"129.213.19.44","nodeRole":"origin","subGroup":"ashburn","nodeState":"INSERVICE","subscribers":0}]
```

**Publish Streams**

Now that we know the origin server address we can construct our publishing URLs. 

```
ffmpeg -re -stream_loop -1 -i 1080p_2500kbps_30fps.mp4 -c:v libx264 -profile:v baseline -f flv rtmp://129.213.19.44:1935/live/test01_1
```

```
ffmpeg -re -stream_loop -1 -i 720p_1500kbps_30fps.mp4 -c:v libx264 -profile:v baseline -f flv rtmp://129.213.19.44:1935/live/test01_2
```

```
ffmpeg -re -stream_loop -1 -i 480p_750kbps_30fps.mp4 -c:v libx264 -profile:v baseline -f flv rtmp://129.213.19.44:1935/live/test01_3
```

**Subscribe to ABR ladder**

To test subscribing to the streams of the ABR ladder, use the WebRTC HTML Testbeds page **Subscriber Stream Manager Transcoder Proxy Test (RTC)]** on your server at `https://example.org/red5/sm-test/subscribeStreamManagerProxyTranscoderRTC/)`

To use the testbed successfully, make sure to set the following:
* set `Stream1 Name:` to `test01`
* set `Stream Manager Admin User:` to your admin username
* set `Stream Manager Admin Password:` to your admin password

### ABR Ladder with Transcoded Variants

This scenario requires a node belonging to a role capable of TRANSCODE, a transcoder. Just like above, create JWT, create Provision, and then...

**Get Server for Publish**

Note that we want to publish with `transcode=true` to signal our intent. 

```
curl -H "Content-Type: application/json" https://example.org/as/v1/streams/stream/default/publish/live/test01_1?transcode=true
```

Response:

```
[{"streamGuid":"live/test01_1","serverAddress":"129.213.27.42","nodeRole":"transcoder","subGroup":"ashburn","nodeState":"INSERVICE","subscribers":0},
{"streamGuid":"live/test01_1","serverAddress":"129.213.150.43","nodeRole":"origin","subGroup":"ashburn","nodeState":"INSERVICE","subscribers":0}]
```

Note that you should publish to the first server in the response (the transcoder) -- the second server (the origin) receives streams from the transcoder and is included in this response as additional information about how the stream is routed.


**Publish Streams**

Now publish the top-quality variant stream to the first server in the Get Server for Publish response.

```
ffmpeg -re -stream_loop -1 -i 1080p_2500kbps_30fps.mp4 -c:v libx264 -profile:v baseline -f flv rtmp://129.213.27.42:1935/live/test01_1
```

**Subscribe to ABR ladder**

To test subscribing to the streams of the ABR ladder, use the WebRTC HTML Testbeds page **Subscriber Stream Manager Transcoder Proxy Test (RTC)]** on your server at `https://example.org/red5/sm-test/subscribeStreamManagerProxyTranscoderRTC/)`

To use the testbed successfully, make sure to set the following:
* set `Stream1 Name:` to `test01`
* set `Stream Manager Admin User:` to your admin username
* set `Stream Manager Admin Password:` to your admin password?


