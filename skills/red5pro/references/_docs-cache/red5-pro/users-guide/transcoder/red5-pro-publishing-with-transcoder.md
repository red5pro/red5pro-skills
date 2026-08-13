---
title: Publishing with the Transcoder
description: ""
menu_order: 6
---

Publishing with a transcoder allows one to broadcast a single high quality video stream, then use the transcoder to generate the other variants of the stream at lower quality. These variants are then streamed to an origin which restreams to the edge server(s). The edges which will use REMB to determine what variant to serve to each subscriber based on the conditions of the network. An overview of the system and the connections between the servers is given in Figure 4 where, for simplicity, a single origin, edge, and transcoder are used.

![Figure 4: Overview of the system and the server connections when publishing a single stream with a transcoder.](/_images/special/transcoder/TranscoderDoc5.png)

Once the provision has been provided to the Stream Manager it is necessary to make a request to retrieve a transcoder endpoint. The request is as follows:

**Method**:`GET`

**URL**: `https://yourstreammanager.com/streammanager/api/4.0/event/live/mystream?action=broadcast&transcode=true`

Where:

- *yourstreammanager.com*: It is the host of your Stream Manager
- *mystream*: It is the guid of the stream that needs to be published

A successful response is a JSON object that specifies the *serverAddress, scope* and *name* that need to be used to start publishing.

As an example, the response JSON object will look like this:

```json
{
     "serverAddress": 192.168.0.13,
     "scope": "live",
     "name": "mystream"
}
```
