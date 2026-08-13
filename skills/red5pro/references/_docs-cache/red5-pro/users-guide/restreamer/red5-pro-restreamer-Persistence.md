---
title: Restreamer Persistence
description: ""
menu_order: 13
---

## Restreamer Persistence 

When opening a restreamer request, you can include a flag that cause the server to maintain the connection. If the end point is restarted or if there is a network issue, the red5pro server will attempt to reestablish the stream connection. 

In addition, if the red5pro server is rebooted, the server will resume attempting to keep the stream alive.

### Example to add persistence

While creating a new restreamer. add parameter "persist" and set as true. 

```json
{
    "guid": "live/camera1",
    "context": "live",
    "name": "camera1",
    "level": 0,
    "parameters": {
        "type": "ipcam",
        "action": "create",
        "persist": true, 
        "scopename": "live",
        "outputname": "camera1out",
        "host": "192.168.1.10",
        "port": 5443
    }
}
```

### Example to stop stream and stop persistence.

Calling the 'kill' API and including persist parameter will stop the restreamer and it will not reconnect after rebooting red5pro server.

```json
{
    "guid": "live/camera1",
    "context": "live",
    "name": "camera1",
    "level": 0,
    "parameters": {
        "type": "ipcam",
        "action": "kill",
        "persist": true, 
        "scopename": "live",
        "outputname": "camera1out",
        "host": "192.168.1.10",
        "port": 5443
    }
}
```

### Stopping the stream and keeping persistence

If the stream was created with persistence and you call 'kill' without the persist parameter, the stream will be stopped but will resume after rebooting the red5pro server.



### Autoscale environment

In the auto-scaled environment, persistence does not resume when the red5pro node which is performing the restream operation is removed or replaced by the stream manager. 


