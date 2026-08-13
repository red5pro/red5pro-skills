---
title: Recording RTMP and ERTMP Ingest Streams
description: ""
menu_order: 2
---

Recording using Red5 Pro SDKs is done by setting the streamMode to `record` or `append`.

If you are using an RTMP encoder to publish then there are a few ways to initiate a recording.

## Red5 Pro Server streams API

One way to initiate a recording of a stream is via the Red5 Pro Server [recordLiveStream API](/docs/red5-pro/development/api/server/red5-pro-server-streams-api/#recordlivestream) and the [stopStreamRecord](/docs/red5-pro/development/api/server/red5-pro-server-streams-api/#stopstreamrecord). This can be used for any ingest source, and can be used to record all or just a portion of a live broadcast.

The recordLiveStream API can also be used to append a recording, or can be used to save an FLV recording with a name that is different than the source stream.

## broadcaststream.auto.record

If you want to produce an FLV and an HLS recording of you stream, then modify the `red5pro/conf/red5.proprties` `broadcaststream.auto.record` value from `false` to `true`. This modification will force a recording of all incoming streams. There is no `append` option with this setting.

*You will need to restart your red5pro service for this setting to take effect.*

## HLS forceVODRecord

If you wish only to capture HLS recordings for all of your incoming streams, then modify `red5pro/conf/hlsconfig.xml`, changing `<property name="forceVODRecord" value="false"/>` to `<property name="forceVODRecord" value="true"/>`.

*You will need to restart your red5pro service for this setting to take effect.*