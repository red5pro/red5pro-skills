---
title: Restreamer API - IP Camera
description: ""
menu_order: 2
---

# IP Camera

IP Camera provisions pull RTSP camera sources into Red5 Pro. Use `type: "ipcam"` in the provision parameters. The output stream is identified by the top-level `context` and `name` values.

The ingest supports RTP/RTCP over interleaved TCP. Supported input codecs are H.264 or H.265 video, and AAC, PCMU, or PCMA audio. PCMU and PCMA are transcoded to AAC before publication.

## IP Camera List

**Description**

List IP Camera / RTSP ingests

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/camera1",
    "context": "live",
    "name": "camera1",
    "level": 0,
    "parameters": {
        "type": "ipcam"
    }
}
```

_action_ isn't enforced for `list` since its the default action.

## IP Camera Create

**Description**

Create a stream named `camera1out` from a connection to an IP Camera at `192.168.1.10:5443`
Request

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/camera1out",
    "context": "live",
    "name": "camera1out",
    "level": 0,
    "parameters": {
        "type": "ipcam",
        "action": "create",
        "remoteContextPath": "axis-media",
        "remoteStreamName": "media.amp",
        "host": "192.168.1.10",
        "port": 5443
    }
}
```

### IP Camera Create - With Authentication

**Description**

Create a stream named `camera1out` from a connection to an IP Camera which supports Basic auth, at `192.168.1.10:5443`

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/camera1out",
    "context": "live",
    "name": "camera1out",
    "level": 0,
    "parameters": {
        "type": "ipcam",
        "action": "create",
        "remoteContextPath": "live",
        "remoteStreamName": "camera1out",
        "host": "192.168.1.10",
        "port": 5443,
        "authtype": "Basic",
        "username": "username",
        "password": "password123"
    }
}
```

### IP Camera Create - Complete RTSP URL

Use `rtspUrl` when the remote camera URL includes query parameters, embedded credentials, or a vendor-specific path.

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/camera1out",
    "context": "live",
    "name": "camera1out",
    "level": 0,
    "parameters": {
        "type": "ipcam",
        "action": "create",
        "rtspUrl": "rtsp://admin:password@10.0.0.67:554/cam/realmonitor?channel=1&subtype=0"
    }
}
```

## IP Camera Kill

**Description**

Stop restreaming IP camera

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/camera1out",
    "context": "live",
    "name": "camera1out",
    "level": 0,
    "parameters": {
        "type": "ipcam",
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
