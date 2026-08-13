---
title: SRT Restreaming
description: ""
menu_order: 7
---

SRT restreaming is supported on Ubuntu for Red5 Pro distributions. Please see [Ubuntu setup document](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/) for requirements.

## SRT Configuration

To configure Red5 Pro Server for SRT, the following steps are required:

* Enable SRT by modifying `red5pro/conf/restreamer-plugin.properties`, and setting `enable.srtingest=true`
* Enable the Restreamer servlet, details are found on in [Restreamer Server Configuration](./red5-pro-restreamer-server-configuration/).

* An optional step is to modify the `socket.idle.timeout=` value in `red5pro/conf/srt-ingest-plugin.properties` to set a longer timeout for socket idle, if the default of 2 minutes is not sufficient (time is configured in milliseconds)
* Other options may be configured in `red5pro/conf/srt-ingest-plugin.properties` as needed such as encryption key passphrase, length, etc.

## Continuity Gap Handling

SRT ingest carries MPEG-TS packets. When a transport-stream continuity-counter gap is detected, Red5 Pro can briefly hold the mismatched packet and scan the queued packets for the missing counter before declaring a discontinuity. This avoids unnecessary whole-GOP freezes when packets arrive slightly out of order during bursty or high-bitrate ingest.

The wait is configured with `cc.gap.wait.ms` in `red5pro/conf/ts-ingest-plugin.properties`. The default is `100` milliseconds. Set it to `0` for legacy immediate-discontinuity behavior. For higher-latency SRT or Zixi ingest, a value in the `200` to `300` millisecond range may be useful, but keep it below the typical GOP duration.

## API Calls

The Restreamer API documentation can be found in the [development section](/docs/red5-pro/development/api/restreamer/).

Starting an endpoint for SRT streaming, requires a call to the API command prior to the start of your stream. By default, a timeout of 2 minutes is enforced while the endpoint listens for an SRT connection; this is the period during which the stream should be started. If the stream is not started within that time, the endpoint will be closed and the stream will need to be re-created.

An SRT stream requires a passphrase for encryption, which is set for each stream via the API call. The default encryption is set to a 16-byte key length (128-bit encryption), but this can be configured to use 24 or 32-length as well.

## Test SRT Streaming with FFmpeg

How to test SRT with an MP4 file via FFmpeg.

1 - Create the SRT stream by running the API call (note: make sure the ports match between the API call and the FFmpeg command)

`POST: https://(server)/live/restream`

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "srt",
        "action": "create",
        "ip": "0.0.0.0",
        "port": 8000,
        "frameType": 0,
        "latency": 100,
        "reorder": 16,
        "overhead": 100,
        "keyLength": 16,
        "passphrase": "Red5ProRules2024"
    }
}
```

2 - Start the stream via FFmpeg:

```sh
ffmpeg -re -stream_loop -1 -i TESTFILE.mp4 -c:v libx264 -b:v 5000k -bsf:v h264_mp4toannexb -profile:v baseline -level:v 3.2 -x264-params keyint=120:scenecut=0 -c:a aac -b:a 128k -ar 44100 -f mpegts "srt://YOUR-SERVER-IP:8000?pkt_size=1316&mode=caller&minversion=0x010300&latency=100000&oheadbw=100&transtype=live&pbkeylen=16&passphrase=Red5ProRules2024"
```

3 - Go to the subscribe page and refresh, the stream will be listed.
