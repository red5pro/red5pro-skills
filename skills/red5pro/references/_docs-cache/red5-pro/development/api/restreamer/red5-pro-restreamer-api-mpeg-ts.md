---
title: Restreamer API - MPEG-TS
description: ""
menu_order: 3
---

# MPEG-TS

## MPEG-TS List

**Description**

List MPEG-TS ingests

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "mpegts"
    }
}
```

_action_ isn't enforced for `list` since its the default action.

**RESPONSE**

```json
{
    "message": "Endpoints",
    "endpoints": {}
}
```

## MPEG-TS Create - Multicast

Note - multicast streaming will only work over the same LAN. To test Multicast streaming, run the following from the same LAN as your Red5 Pro server (or on the server itself)

```sh
ffmpeg -re -stream_loop -1 -i [media file] -c:v h264 -bsf:v h264_mp4toannexb -profile:v baseline -c:a aac -b:a 128k -ar 44100 -f mpegts udp://239.5.5.5:5555?pkt_size=188
```

**Description**

MPEG-TS end-point creation.

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "mpegts",
        "action": "create",
        "cast": "multicast",
        "ip": "239.5.5.5",
        "port": 5555
    }
}
```

**RESPONSE**

```json
{
    "message": "Stream created",
    "path": "/live/stream1"
}
```

## MPEG-TS Create - Unicast

To test Unicast streaming, run the following from your desktop:

```sh
ffmpeg -re -i [media file] -c:v h264 -bsf:v h264_mp4toannexb -profile:v baseline -c:a aac -b:a 128k -ar 44100 -f mpegts udp://<server ip address>:1234?pkt_size=1316
```

**Description**

MPEG-TS end-point creation.

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "mpegts",
        "action": "create",
        "cast": "unicast",
        "ip": "0.0.0.0",
        "port": 1234
    }
}
```

**RESPONSE**

```json
{
    "message": "Stream created",
    "path": "/live/stream1"
}
```

## MPEG-TS Kill

**Description**

Kill only needs the stream name and the required Provision entries

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "mpegts",
        "action": "kill"
    }
}
```

**RESPONSE**

Success:

```json
{
    "message": "Stream killed"
}
```

Failure:

```json
{
    "message": "Stream kill failed"
}
```

