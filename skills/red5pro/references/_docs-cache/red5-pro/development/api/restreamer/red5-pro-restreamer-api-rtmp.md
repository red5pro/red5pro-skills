---
title: Restreamer API - RTMP Push/Pull
menu_order: 5
---

## RTMP Puller

RTMP puller will connect to a remote RTMP server (subscribe) and restream into Red5Pro.

### Creating an RTMP puller

Post a provision to the restreamer servlet.

Parameters:

`guid`: Unique local identifier.

`context`: Red5pro application path.

`name`: Red5pro stream name.

`level`, `isRestricted`, `restrictions` : reserved parameters.

`action`: `create`

`type`: `rtmp` (required)

`rtmpUri`: remote address of rtmp stream. (required)

`persist`: Retry on 'remote stream not found', 'host not found', or 'remote stream unpublished'. (optional)

Note that `persist=true` will also restart the RTMP puller if the server is rebooted.  To remove reboot persistence, kill the restreamer with `persist` property `true`. 

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "action": "create",
        "type": "rtmp",
        "rtmpUri": "rtmp://192.168.0.152/live/stream2?eggs=yolks&t=1",
        "persist": true
    }
}
```

### Updating RTMP puller

To change parameters of an RTMP puller, change action to update.

If remote URI is changed, or either red5pro application path or stream name is changed, the RTMP puller will restart immediately. 
(This does not currently allow connecting to a new source without interrupting the ongoing red5pro broadcast)

If persist property is changed, the RTMP puller will continue as-is until remote stream is interrupted. 
This allows the administrator to discontinue reconnection at the end of a program. 

Change action to "update".

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "action": "update",
        "type": "rtmp",
        "rtmpUri": "rtmp://192.168.0.152/live/stream2",
        "persist": false
    }
}
```

### Killing an RTMP puller 

Change `action` parameter to `kill`

To remove reboot persistence, kill the restreamer with `persist=true` property. 


### Listing RTMP pullers

With parameter `type` parameter `rtmp`, and `action` parameter `list`, all RTMP puller end-points will be listed.  

All other properties in the json are ignored.

```json
{
    "guid":"",
    "context":"",
    "name":"",
    "level":0,
    "isRestricted":false,
    "parameters":
    {
        "action":"list",
        "type":"rtmp"    
    }
}
```


List results:

Note: If there is an error within an rtmp puller, the listing will contain an 'error' property. 

```json
{
    "message": "Endpoints",
    "endpoints": [
        {
            "guid": "live/stream1",
            "context": "live",
            "name": "stream1",
            "rtmpUri": "rtmp://192.168.0.152/live/stream2?eggs=yolks&t=1",
            "persist": false
        }
    ]
}
```


## RTMP Push Restreamer

Push a stream via RTMP to a remote host (publish), such as to another Red5Pro server or to a social media platform.


### RTMP Push Create

Creates intent to push a stream to remote host. The create action can be called before or after the publish stream is created. The create intent ends when the stream is stopped.

```json
{
    "guid": "restream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "action": "create",
        "type": "rtmp-push",
        "rtmpUri": "rtmp://localhost/live/social1",
        "immediate": "false",
        "attempts": "3",
        "delayS": "10",
        "persist": "true"
    }
}
```

`guid`: A unique identifier within the server node. Must be unique among other provisions.

`context`: Stream context/scope.

`name`: Red5Pro stream name.

`action`: one of `create` | `kill` | `list` | `update`

`type`: `rtmp-push`

`rtmpUri`: the remote server to push to. note that in the example, the "remote" server is this server itself.

`immediate`: Boolean flag, if `true` the Restreamer will synchronously attempt to forward the stream and return errors on failure. If false, it will make up to `attempts` attempts waiting `delayS` between attempts.

`attempts`: if not `immediate` and not `persist`, then this is the number of allowed retries.

`delayS`: the time to delay, in seconds, between retry attempts (if not `immediate`, or if `persist`)

`persist`: Retry indefinitely. (optional, default `false`) `persist=true` will also restart the RTMP pusher if the server is rebooted. 


Reserved parameters.

`level`: required but ignored


Three main cases are supported:

#### Create Case 1. Immediate execution, synchronous error

In this case, the source stream is currently streaming. We want the forwarder to run synchronously, to return success or failure directly to the caller.

To configure this intent, set:
```json
        "immediate": "true",
        "persist": "false"
```

Note that both `attempts` and `delayS` are ignored in this configuration (there is only one attempt and no retries when `immediate`).

#### Create Case 2. Delayed execution, finite retries

In  this case the source stream may or may not be currently streamimg. We want the forwarder to attempt to retry several times, beginning now. It will return success immediately as long as the provision contains valid data.

The results can be found by `list` see **RTMP Push List** below.

To configure this intent, set:
```json
        "immediate": "false",
        "persist": "false"
        "attempts": "3",
        "delayS": "10",
```

Where `attempts` and `delayS` govern the retry attempts. Because `immediate` is `false`, execution is deferred to a looping worker thread. Because `persist` is `false`, the looping thread limits itself to `attempts` retries.

#### Create Case 3. Persistent execution

In this case we want the server to keep trying to forward the stream at all times. A persistent provision is also saved to `conf/restreamers.json` and restored on server restart.

To configure this intent, set:
```json
        "persist": "true"
        "delayS": "10",
```

Note that if `persist` is `true`, the value of the `immediate` flag is ignored. Thus also the `attempts` property is not used or required.

To remove reboot persistence, kill the restreamer with `persist` property `true`. 

### RTMP Push Kill

Note that to kill a persistent stream, the kill provision must also set `persist`.

```json
{
    "guid": "restream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "action": "kill",
        "type": "rtmp-push",
        "persist": "true"
    }
}
```

### RTMP Push List

```json
{
    "guid": "",
    "context": "",
    "name": "",
    "level": 0,
    "parameters": {
        "action": "list",
        "type": "rtmp-push"
    }
}
```

#### Example List Error Response

```
{"message":"Endpoints","endpoints":[{"guid":"restream1","context":"live","name":"stream1","rtmpUri":"rtmp://localhost/live/social1","error":"(HTTP 404 NOT_FOUND) com.red5pro.restreamer.rtmp.RestreamerFailedException: Stream forwarding was NOT STARTED for provision restream1 stream stream1 -- source stream not found","persist":"false","isActive":false}]}
```

#### Example List Response with Active Restreamer

```
{"message":"Endpoints","endpoints":[{"guid":"restream1","context":"live","name":"stream1","rtmpUri":"rtmp://localhost/live/social1","persist":"false","isActive":true}]}
```