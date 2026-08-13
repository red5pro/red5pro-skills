---
title: Locating Streams
description: Locating Red5 Pro stream resources
menu_order: 7
---

Red5 Pro resources are defined in the context of `scopes`. Scopes are virtual provisions (analogous to hard drive partitions) within which Red5 resources such as connections, streams etc reside. When you `connect` to Red5 Pro, you basically connect to an application running on the Red5 Pro instance to publish/subscribe.

### The basic format of a Red5 Pro connection URL

```bash
protocol://server-host:port/application-name
```

* protocol: The Red5 Pro supported protocol using which you wish to connect to the server for consuming services. Red5 Pro supports RTMP, RTSP and HLS protocols in the context of FFmpeg streaming.
* server-host: The Red5 Pro instance host (DNS/IP) address.
* port: The port over which the connection is to be established. Ports are based on supported protocols. For example, RTMP uses 1935, RTSP uses 8554 etc. For more information, you can check out [this article on supported Red5 Pro ports](https://customer.support.red5.net/servicedesk/customer/portal/3/article/2998927741).
* application-name: The application is the connection point on the server where the client connects to. The application is a special type of `scope` (top-level scope) where all the resources are created. The most commonly used application in the Red5 Pro server for streaming is the `live` application. The `live` app is distributed with every Red5 Pro release.

> When attempting to publish or subscribe a stream on Red5 Pro, we use the following format.

```bash
protocol://server-host:port/application-name/streamname
```

### Viewing a stream

To view a live stream which is running on Red5 Pro, you can navigate to the subscribe page: `http://{host}:5080/live/subscribe.jsp?host={host}` and open the link to the listed stream that you wish to view in a new page. If your stream is not listed on the subscribe page, then your stream is not being published to Red5 Pro.

![Viewing streams](/_images/protocols/ffmpegstreaming/subscribe_page.png)
