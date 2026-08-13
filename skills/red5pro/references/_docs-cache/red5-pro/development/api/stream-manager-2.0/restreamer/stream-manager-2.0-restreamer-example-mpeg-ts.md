---
title: Stream Manager 2.0 Restreamer Example - MPEG-TS Listener
menu_order: 88
---

When an SRT restreamer is created it will open a socket and listen for a period of time controlled by the `socket.idle.timeout` property in  `conf/srt-ingest-plugin.properties` (default two minutes).

During this time, an SRT publisher connects and provides SRT stream data, which is then restreamed by Red5 Pro.

The `persist` flag will cause Stream Manager to keep redistributing the provision, opening the socket and listening over and over indefinitely. 

This example assumes there is a stream manager at `as-test1.example.org` and that a NodeGroup exists, named `nodegroup1`. The NodeGroup is assumed to have nodes capable of PUBLISH and SUBSCRIBE (whether all-in-one or arranged into origins/edges).

Both unicast and multicast are supported. Multicast UDP may be blocked by firewalls, NAT, or network policies. Clients must join groups, select interfaces, and ensure routing supports multicast.


### MPEG-TS listener example

**restreamer-mpeg-ts-sm.json**

```json
[
    {
        "provisionGuid": "mpegts1",
        "streams": [
            {
                "streamGuid": "live/stream1",
                "abrLevel": 0,
                "camParams": {
                    "properties": {
                        "type": "mpegts",
                        "action": "create",
                        "cast": "multicast",
                        "ip": "239.5.5.5",
                        "port": 5555,
                        "audio": true,
                        "video": true
                    }
                }
            }
        ],
        "timestamp": 1731437841013
    }
]
```

Here we listen to multicast traffic to the multicast address `239.5.5.5` on port `5555`. 

**Create Provision** API call:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-mpeg-ts-sm.jsonhttps://as-test1.example.org/as/v1/streams/provision/nodegroup1
```

At this point we can **List Provisions** to find our new provision:

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1 | json_pp
```

Now that the Restreamer provision exists, any call to **Get Server for Publish** must include the `restream=true` flag to indicate intent to distribute this provision.

So let's distribute our provision:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/publish/live/stream1?restream=true
```

Now the socket is listening. If `persist` was omitted or is `false`, the restreamer will listen one time. Or if `persist` was true the cycle will repeat, opening the socket and listening indefinitely.

It may be useful to query Get Provision Status -- this returns the status of the provision's streams (while listening but not yet connected, the stream state will be `WAIT`):

```
curl -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1/mpegts1?status=true | json_pp
```

Now publish the SRT stream to the chosen port. For example, publish a test pattern with ffmpeg:

```
ffmpeg -f lavfi -re -i smptebars=duration=60:size=1280x720:rate=30 -f lavfi -re -i sine=frequency=1000:duration=60:sample_rate=44100 -pix_fmt yuv420p -c:v libx264 -b:v 1000k -g 30 -keyint_min 120 -profile:v baseline -preset veryfast -c:a aac -b:a 128k -ar 44100 -f mpegts "srt://10.0.0.36:8000?pkt_size=1316"
```

Now the SRT data should be restreaming, so we should find a new stream `live/stream1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

Later, when you wish to disable forwarding (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/mpegts1
```
