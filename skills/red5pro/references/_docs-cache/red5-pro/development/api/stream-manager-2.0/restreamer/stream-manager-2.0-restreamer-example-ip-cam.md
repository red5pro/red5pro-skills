---
title: Stream Manager 2.0 Restreamer Example - IP Cam Puller
menu_order: 88
---

An IP Camera restreamer attempts to connect to the given camera for 60 seconds. 

The `persist` flag will cause Stream Manager to keep redistributing the provision, trying to connect to the camera indefinitely. 


## IP Camera puller example

**restreamer-ip-cam-sm.json**
```
[
    {
        "provisionGuid": "ipcam1",
        "streams": [
            {
                "streamGuid": "live/cam1",
                "abrLevel": 0,
                "camParams": {
                    "properties": {
                        "type": "ipcam",
                        "action": "create",
                        "remoteContextPath": "axis-media",
                        "remoteStreamName": "media.amp",
                        "host": "192.168.1.10",
                        "port": 5443
                    }
                }
            }
        ]
    }
]
```

Here we will pull `live/cam1` from a connection to an IP Camera at `192.168.1.10:5443`

**Create Provision** API call:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-ip-cam-sm.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
```

At this point we can **List Provisions** to find our new provision:

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1 | json_pp
```

Now that the Restreamer provision exists, any call to **Get Server for Publish** must include the `restream=true` flag to indicate intent to distribute this provision.

So let's distribute our provision:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/publish/live/pull1?restream=true
```

Now the stream should be pulling, so we should find a new stream `live/cam1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

It may also be useful to query Get Provision Status -- this returns the status of the provision's streams:

```
curl -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1/ipcam1?status=true | json_pp
```

Later, when you wish to disable pulling (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/ipcam1
```