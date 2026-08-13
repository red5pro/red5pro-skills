---
title: Stream Manager 2.0 Restreamer Example - File Restreamer
menu_order: 88
---

A File restreamer creates live streams from local files. In a Stream Manager cluster, it makes sense to store video files in shared network storage, mounting the network store in the node image. This way all automatically created nodes have access to the files.

The `persist` flag will cause Stream Manager to keep the provision distributed in the event that its origin fails (the SM will find a new node).


## File restreamer example

**restreamer-file-sm.json**
```
[
    {
        "provisionGuid": "file1",
        "streams": [
            {
                "streamGuid": "live/stream11",
                "abrLevel": 0,
                "camParams": {
                    "properties": {
                        "action": "create",
                        "type": "file",
                        "files": "stream1.flv,stream2.mp4",
                        "loop": true,
                        "index": 0
                    }
                }
            }
        ]
    }
]
```

Here we will create a new stream `live/strean1` playing back the files `stream1.flv` and then `stream2.mp4` in a loop.

**Create Provision** API call:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-file-sm.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
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

Now the stream should be live, so we should find a new stream `live/stream1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

It may also be useful to query Get Provision Status -- this returns the status of the provision's streams:

```
curl -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1/file1?status=true | json_pp
```

Later, when you wish to disable pulling (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/file1
```