---
title: Enabling Disk Writes
description: ""
menu_order: 7
---

The following configuration is used for the default Red5 Pro server distribution.

In order for disk writes to happen, you will need to:

* Define the `useDiskWrites` bean property in `conf/hlsconfig.xml` as `true`
* Remove or comment out the `servlet` and `servlet-mapping` nodes for __hls__ and __hls2__ from `_webapps/live/WEB-INF/web.xml`

The behavior of the server is the same when publishing a stream. The URI of the HLS stream mimics the context path of the publisher stream.

The publisher with a stream consumable at the following URI:

* `rtsp://server:8554/live/streamName`

will be also playable at the following URI:

* `http://server:5080/live/streamName.m3u8`

The `.ts` files are written into the `red5pro-server/webapps/live/streams` directory. Each `.ts` file will be removed after approximately 30 seconds, and all `.ts` files, plus the `.m3u8` file will be removed approximately 30 seconds after the stream has been stopped.

**NOTE:** This property does not have anything to do with HLS recording or VOD.
