---
title: Stream Manager 2.0 Restreamer Example - SRT Caller
menu_order: 88
---

When an SRT restreamer is created for egress, it will connect a socket to the `ip` and `port` from the provision, then send media to an SRT listener.

During this time, stream data local to Red5 Pro is restreamed to an SRT listener.

The `persist` flag will cause Stream Manager to keep redistributing the provision, opening the socket and sending over and over indefinitely. 

This example assumes there is a stream manager at `as-test1.example.org` and that a NodeGroup exists, named `nodegroup1`. The NodeGroup is assumed to have nodes capable of PUBLISH and SUBSCRIBE (whether all-in-one or arranged into origins/edges).

### SRT caller example

**restreamer-srt-caller-sm.json**

```json
[
    {
        "provisionGuid": "srtcall1",
        "streams": [
            {
                "streamGuid": "live/stream1",
                "abrLevel": 0,
                "camParams": {
                    "properties": {
                        "action": "create",
                        "type": "srt-caller",
                        "ip": "x.x.x.x",
                        "port": "8000",
                        "frameType": 0,
                        "role": "sender",
                        "mux": true,
                        "latency": 100,
                        "reorder": 16,
                        "overhead": 100,
                        "keyLength": 0,
                        "unlinkClock": false,
                        "audio": true,
                        "video": true
                    }
                }
            }
        ],
        "timestamp": 1758070648
    }
]
```

Here we will call an SRT listener at `x.x.x.x:8000`, and restream the currently broadcasting stream on this node `live/stream1` to it. Replace the `x.x.x.x` with a proper IP address which the node can communicate with; ensure router or firewall on the destination network is appropriately configured or the connection will fail.

**Create Provision** API call:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-srt-caller-sm.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
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

Now the socket is ready to establish a connection to an SRT listener. If `persist` was omitted or is `false`, the restreamer will call one time. Or if `persist` was true the cycle will repeat, opening the socket and calling indefinitely.

It may be useful to query Get Provision Status -- this returns the status of the provision's streams (while calling but not yet connected, the stream state will be `WAIT`):

```
curl -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1/srtcall1?status=true | json_pp
```

Later, when you wish to disable restreaming (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/srtcall1
```

Keep in-mind that an SRT caller expects that an SRT listener is configured and listening for a connection prior to submission of the caller provision. While testing this feature, there are a couple options available to verify the restream.

Using ffmpeg to write an mpeg-ts file:

```
ffmpeg -y -f mpegts -i "srt://:8000?mode=listener" -c copy output.ts
```

The IP address for ffmpeg is not needed, in this case above, it will listen on the local instance for any connection calling-in.

Using OBS to consume and playback via its media source:

* In the `Sources` panel click `+` to add; select `Media Source` and give it a name like `SRT Listener`
* Turn off / un-check the `Local File` checkbox
* In the `Input` box enter `srt://:8000?mode=listener`
* In the `Input Format` box enter `mpegts`
* Lastly click the `Use hardware decoding when available`
* Click `OK` when finisted

This means for visualy verifying the stream will only work if Red5 Pro can connect to your OBS application; this means your network will need to all connection to your computer running OBS, with it listening on port `8000`; you may change this port as needed, but it must match the SRT caller provision submitted to the server for restreaming.
