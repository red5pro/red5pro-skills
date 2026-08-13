---
title: Stream Manager 2.0 Restreamer Example - RTMP Pull
menu_order: 88
---

An RTMP Pull restreamer remains active once its provision has been distributed, and it will try repeatedly, indefinitely, to subscribe to the remote stream until the provision is deleted. 

The `persist` flag will cause Stream Manager to keep the provision distributed in the event that its origin fails (the SM will find a new node).

Note that for simplicity when testing, in this example we pull the stream from the same origin (restreaming with a new name). This way the example does not depend on external resources. However in any real use case you would specify some external `rtmpUri` and would probably not loop back to `localhost`.


## RTMP puller example

**restreamer-rtmp-pull-sm.json**
```
[
    {
        "provisionGuid": "rtmppull1",
        "streams": [
            {
                "streamGuid": "live/pull1",
                "abrLevel": 0,
                "camParams": {
                    "properties": {
                        "action": "create",
                        "type": "rtmp",
                        "rtmpUri": "rtmp://localhost/live/stream1",
                        "persist": "false"
                    }
                }
            }
        ]
    }
]
```

Here we will pull `live/stream1` from `localhost` to create a new stream `live/pull1`.

**Create Provision** API call:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-rtmp-pull-sm.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
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

Now the stream should be pulling, so we should find a new stream `live/pull1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

It may also be useful to query Get Provision Status -- this returns the status of the provision's streams:

```
curl -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1/zixi1?status=true | json_pp
```

Later, when you wish to disable pulling (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/rtmppull1
```