---
title: Publishing ABR variants from an Encoder
description: ""
menu_order: 9
---

Once the provision has been provided to the Stream Manager it is possible to start publishing. Make a broadcast request to the stream manager (using the GUID of your stream provision) to get the IP address of the most available origin server. The provision specifies the different variants of the video stream. Each variant can be broadcast with a media encoder like Wirecast, FFmpeg, or others. The different entities involved and their connections are shown in *Figure 3*. In this case, the same origin is used for all the different variants. The origin then sends the streams to the relays which then deliver it to the edges that eventually serve the subscribers.

![Figure 3: Overview of the system when a media encoder is used to publish three variants of a stream.](/_images/special/transcoder/TranscoderDoc3.png)

The following API call needs to be made:

**Method**:`GET`

**URL**: `https://yourstreammanager.com/streammanager/api/4.0/event/live/mystreamGUID?action=broadcast`

Where:

- *yourstreammanager.com*: is the host of your Stream Manager
- *mystreamGUID*: is the GUID of the stream provision

If the call is successful the Stream Manager will return an object that specifies the scope and address of the origin to use. These properties will then be used to define the endpoint in the media encoder stream configuration.

As an example, if the JSON object returned by the Stream Manager is:

```json
{
     "serverAddress": 192.168.0.23,
     "scope": "live",
     "name": "mystreamGUID"
}
```

You would want to broadcast, using RTMP, the stream variants that you defined in your provision.

Stream URLs:
- `rtmp://192.168.0.23:1935/live/mystream_1`
- `rtmp://192.168.0.23:1935/live/mystream_2`
- `rtmp://192.168.0.23:1935/live/mystream_3`
