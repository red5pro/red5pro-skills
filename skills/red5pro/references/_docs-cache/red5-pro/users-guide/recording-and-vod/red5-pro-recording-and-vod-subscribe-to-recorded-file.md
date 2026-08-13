---
title: Subscribing to a Recorded File
description: ""
menu_order: 4
---

If you want to subscribe to your recorded stream using the Red5 Pro client SDK, you simply need to **include the file extension** (so `stream.flv`, or `file.mp4`) when calling the subscribe method.

The client automatically look for the recorded file in the `streams` subdirectory if you include a file extension. Without the extension, the system assumes the stream is live.

You can view the list of available `mp4` and `flv` files in the **live** streams directory by visiting `http://localhost:5080/live/mediafiles`:

```xml
{"mediafiles":[{"name":"stream1.flv","lastModified":1506014299000,"length":21739350,"url":"stream1.flv"},{"name":"stream2.flv","lastModified":1506012451000,"length":1560502,"url":"stream2.flv"},{"name":"stream3.flv","lastModified":1506012893000,"length":30032180,"url":"stream3.flv"}]}
```

You can also view the available `HLS (m3u8)` files by visiting `http://localhost:5080/live/playlists`:

```xml
{"playlists":[{"name":"stream4.m3u8","lastModified":1506012452000,"length":836,"url":"stream4.m3u8"},{"name":"stream5.m3u8","lastModified":1506014300000,"length":1786,"url":"stream5.m3u8"},{"name":"stream6.m3u8","lastModified":1506012894000,"length":2481,"url":"stream6.m3u8"}]}
```

> If you are using the [Red5 Pro cloud storage plugin](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/red5-pro-cloud-storage-overview/), these calls will also list out the files that are stored in your cloud storage bucket.
> For HLS VOD details, see the [HLS VOD documentation](/docs/red5-pro/users-guide/protocols/hls-plugin/red5-pro-hls-vod/).
