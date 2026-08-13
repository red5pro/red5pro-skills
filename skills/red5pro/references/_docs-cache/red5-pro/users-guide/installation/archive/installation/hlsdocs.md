---
title: HLS
description: ""
---

# Red5 Pro HLS Plugin

Note that HLS latency is generally between 12 and 30 seconds, so you will not be able to view your live video right away.

**Red5 Pro HLS Supports h264 and AAC broadcasts**

The HLS plugin `{red5pro}/plugins/red5pro-mpegts-plugin-*.jar` takes live streams from any application and transforms them into an mpeg live transport stream with a m3u8 playlist.

The HLS playlist represents a sliding window containing several short segments of media which play as one continuous stream. Red5 Pro passes through the media as-is without re-encoding or producing multi-bitrate variants.

> **If you do not require HLS playback, then you can remove this plugin to help optimize server performance.**

## URI Info

**Every live stream is transformed to HLS**

The URI of the HLS stream mimics the context path of the publisher stream.

The publisher with a stream consumable at the following URI:

* `rtsp://serverurl:8554/live/streamName`

will be also playable at the following URI, by a browser that supports native HLS playback (like Safari) or a third-party player like VLC:

* `https://serverurl/live/streamName.m3u8`

---

# Configuration

The HLS plugin provided with the Red5 Pro Server allows you to configure the sliding window parameters of the m3u8 playlist:

* segment duration
* segment count
* allowed variance
* where the segments are stored (RAM or Disk)

## hlsconfig.xml

The HLS Plugin included in the Red5 Pro Server distribution reads the configuration file at `conf/hlsconfig.xml`.

The following properties are defined to configure the HLS playlist:

* __itemCount__ - The number of segments in the sliding window
* __itemLength__ - The segment duration
* __itemThreshold__ - The HLS segmentation variance. It should be higher than 0.5 and less than 1
* __useDiskWrites__ - If you have a large duration and segment count, you may prefer to serve the HLS files from disk

_Property defaults from conf/hlsconfig.xml_

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean name="hlsConfig" class="com.red5pro.stream.transform.mpegts.HLSConfig" >
        <!-- Number of items in the HLS playlist -->
        <property name="itemCount" value="5"/>
        <!-- The segment duration in seconds for each item.  -->
        <property name="itemLength" value="6"/>
        <!-- The segment duration variance. The range should be higher than 0.5 and lower than 1.0.
        That is to configure segments generated more than half of the desired duration.
        The effectiveness of segmentation is dependant on the keyframe interval -->
        <property name="itemThreshold" value="0.7"/>
        <!--  -->
        <property name="useDiskWrites" value="true"/>
        <!-- Post processing mode:
              0 = Legacy, no append, no ffmpeg requirement (default)
              1 = Uses the Orientation Post Processor requiring ffmpeg and also enables "append" handling
        -->
        <property name="postProcessMode" value="0"/>
        <!-- Provide post-processing for recorded HLS files -->
        <property name="writerPostProcessors">
            <set>
                <!-- Creates a VOD playlist with associated segments and moves it to vod app or cloud storage upload
                     To use non-append mode, set `legacy` to `true`
                -->
                <value>com.red5pro.stream.transform.mpegts.processor.VODFilePostProcessor</value>
                <!-- Cleans up the .ts and .m3u8 files if they were written -->
                <value>com.red5pro.stream.transform.mpegts.processor.SegmentCleanupPostProcessor</value>
            </set>
        </property>
        <!-- Debug mode -->
        <property name="debug" value="false"/>
        <!-- Force VOD recording -->
        <property name="forceVODRecord" value="false"/>
        <!-- Cloud uploaders are queried in the post processor, no special configuration entry required here -->
    </bean>
</beans>
```

## Latency

The typical HLS player will have latency of about the total duration of the playlist sliding window. Latency can be roughly determined by multiplying the segment duration by the segment count; a stream with a _segment count_ of 5 and _duration_ of 6 seconds will typically result in a latency of 30 seconds.

Since Red5 Pro passes through the media 'as is', the first consideration to effective streaming is to set up the publisher to output HLS-friendly media. The live HLS experience is governed by the somewhat strict timing of the players, which check the playlist at a certain interval.

The dimensions of HLS are the `segment duration`, and the `segment count` in the playlist. Players are required to poll the playlist at an interval of half the segment duration. The server is required to update the playlist with a new segment so that players do not see a static playlist over 2 iterations. **Critical notes**: timely video key frames to segment on; One segment is assumed to be on the wire at all times; Safari typically require 3 segments to begin playback.

All that being said, the equation is derived:
`latency = ( ( segment_duration ) X ( playlist_count - 1 ) ) +/- ( fraction of segment_duration )`.

Some test results using the iOS SDK publisher which is capable of producing a steady key frames per 2 seconds.

* The Red5 Pro distribution `hlsconfig.xml` file is set at 5 items and 6 seconds and has average latency of 18-30 seconds.
* HLS playlist configured with `playlist count` of 4 items, `segment duration` of 4 seconds, produced latency between 10-16 seconds.
* HLS playlist configured with `playlist count` of 4 items, `segment duration` of 2 seconds, produced latency between 6-10 seconds.

The threshold variable sets the sensitivity of segmentation. When a key video frame is encountered after the segment_duration X threshold, HLS will segment. Values closer to 1 work well with steady frame rates. Lower values closer to .5 allow segmentation at half the duration and this can help with a very non-static frame rate. If your broadcasters output key frames every 2 to 3 seconds, the lower threshold would allow HLS settings of segment_duration to work for both cases. Segment duration of 6 and a threshold at 0.6.

## Segmentation

The segmentation engine relies on key frames provided by the publisher.

You can configure the threshold point at which the key frame creates a new segment. A lower threshold allows shorter duration in the segments; with a target _duration_ of 10 seconds and a _threshold_ of 0.7, the HLS plugin will start a new segment at the next key frame occuring at or after the 7 second mark:

<pre>
10 X 0.7 = 7.0 seconds minimum segment duration
</pre>

Use the threshold variable to prevent stalling the HLS subscribers when the broadcaster key frame interval does not match the segment duration.

__The segment duration should not be shorter than the expected minimum keyframe interval__

## Enabling RAM Writes

By default, disk writes of the video are set to `true`. The necessary settings to allow for writing to RAM are:

* Define the `useDistWrites` bean property in _conf/hlsconfig.xml_ as `false`.
* Ensure that the `servlet` and `servlet-mappings` for _hls_ and _hls2_ are defined in `red5pro-server/webapps/live/WEB-INF/web.xml`.

_The hls and hls2 definitions in red5pro-server/webapps/live/WEB-INF/web.xml:_

```xml
    <servlet>
        <servlet-name>hls</servlet-name>
        <servlet-class>com.red5pro.stream.transform.mpegts.server.TSServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>hls</servlet-name>
        <url-pattern>*.m3u8</url-pattern>
    </servlet-mapping>

    <servlet>
        <servlet-name>hls2</servlet-name>
        <servlet-class>com.red5pro.stream.transform.mpegts.server.TSServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
      <servlet-mapping>
        <servlet-name>hls2</servlet-name>
        <url-pattern>*.ts</url-pattern>
    </servlet-mapping>
```

## Enabling Disk Writes

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

**NOTE:** this property does not have anything to do with HLS VOD.

---

# Metadata and NetStreamSends

You can respond to stream events and access metadata using JavaScript.

A service is available from Red5 Pro to receive the script data tags within the live stream. The service is accessed via websockets:

```javascript
JavaScript
var service = "ws://SERVER_IP:6262/metadata";
var context = "/live"
var stream = "/stream1";
var request = service + context + stream;
var metasocket;

function connect(uri){
    metasocket = new WebSocket(uri);
    metasocket.onopen = function(evt){
        console.log("on open");
    };
    metasocket.onclose =  function(evt){
        console.log("on close");
    };
    metasocket.onmessage = function(evt){
        console.log("on message  "+evt.data);
        // json {"name":"onMetaData", "data":{"orientation":90,"otherstuff":"blablabla"}}
        // * metadata client will continue to receive script data tags other than metadata from publishers until socket is closed.
        // * metadata client can reveive server initiated calls.
        // * metadata client cannot initiate other service calls to server yet.
        // * Second Screen host sdk can initiate arbitrary RPC to server.
        // * Clients will receive periodic pings to check if IO is active. You can ignore `data` if it does not have a `name` property.
    };
    metasocket.onerror =  function(evt){
        console.log("on error");
    };
}
connect(request);
```

## HLS VOD

By default, all Red5 Pro recorded streams produce FLVs and HLS files.

The HLS recordings create, in `(red5pro)/webapps/live/streams`, a `streamname.m3u8` file and a number of `streamname_#.ts` files. In addition, if you are copying up to a storage bucket, then in the `live` directory, there will be a `streamname` sub-directory which contains the `m3u8` and `ts` files.

If you are using Amazon S3 Cloud storage, you can subscribe directly to the URL of the `m3u8` file with Safari browser or with a tool like VLC.

To list the HLS recordings on the `playback.jsp` page of the server distribution, append the URL with `&playlists=1` (e.g: `https://servertest.com/live/playback.jsp?host=servertest.com&playlists=1`).

## HLS Append Recording and Rotation Metadata

(feature available with Red5 Pro server release 5.6.0)

Append recording for HLS is achieved with post-processing, using the `OrientationPostprocessor` and `ffmpeg`. If you wish to use the `append` record type with HLS recordings, you will need to configure the following:

1. In `hlsconfig.xml`, set the post processor mode to `1` `<property name="postProcessMode" value="1"/>`
2. Configure the `OrientationPostProcessor` per the [Converting FLV files to MP4 via Post Processing](/docs/red5-pro/users-guide/protocols/converting/) document. **NOTE**: this requires that you install `ffmpeg`, minimum version 3.x. You will also need to modify the `conf/red5-common.xml` and `conf/cloudstorage-plugin.properties` files.

> The above configurations and post-processing are also necessary if you want HLS recordings of a mobile application (with Red5 Pro Mobile SDK) using rotation during the broadcast.