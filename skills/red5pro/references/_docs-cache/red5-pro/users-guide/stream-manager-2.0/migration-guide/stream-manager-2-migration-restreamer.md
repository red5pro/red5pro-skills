---
title: Stream Manager 2.0 Migration Guide - Restreamer
menu_order: 8
---

## Stream Manager 2.0 Restreamer

Stream Manager 2.0 has direct support for Restreamer features.

### Provisions

In SM 2.0, Restreamer provisions are manipulated like any other provision, using the [Streams service's Provision API.](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-provision-api/).

The provision format differs.

SM2.0 Restreamer Provision:
```
{
    "provisionGuid": "social1",
    "streams": [
        {
            "streamGuid": "live/stream1",
            "abrLevel": 0,
            "camParams": {
                "properties": {
                    "action": "create",
                    "type": "rtmp-push",
                    "rtmpUri": "rtmp://localhost/live/social1",
                    "immediate": "true",
                    "persist": "false"
                }
            }
        }
    ]
}
```

Equivalent Standalone Restreamer Provision:
```
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

### Provision distribution

After a provision has been created with the Streams Provision API, the provision must be **distributed** to some node in the network. This is done with the Streams Stream API's Get Server for Publish request. You will flag `restream=true` to cause the Stream Manager to distribute your restreamer provision. Get Server for Publish will keep choosing the same server node as long as it remains INSERVICE and under capacity, if you make repeated calls.

### Persist

A persistent provision is one that declares `"persist": "true"`.

It is important to understand that in a Stream Manager-controlled cluster, Restreamer provision persistence is managed within the Stream Manager. This way the entire cluster can be considered, and if a given restreaming node fails for some reason or is simply overloaded, the Stream Manager can choose a different node to service the request.

Because the Stream Manager manages this persistence internally, the restreamer provisions that are distributed to the nodes are usually transient. For example an SRT listener is created and listens for a period of time (usually 1-2 minutes, depending on configuration) then ends, and then the Stream Manager sends the provision to the node again (automatically because it was marked `persist=true`). This cycle will continue indefinitely until the stream is actually published to the Restreamer's listener and thus relayed into the cluster and reported as a live stream by that server node, or else until the provision is deleted.

### Restreamer Use Cases by Mode

The correct order of operations depends on the restreamer mode.

#### Pull (File, IP Cam, RTMP Pull, Zixi Pull)

1. Create Provision with Streams Service
2. (Prereq) The remote server or device must be publishing the stream, or the file must exist
3. Get Server for Publish for the Provision's only `streamGuid`, with query param `restream=true`

The SM will choose the best server according to Get Server for Publish, and will distribute the provision to the server before returning the server's address and other information in response.

#### Push (RTMP Push, WHIP Push, Zixi Push)

1. Create Provision with Streams Service
2. Get Server for Publish for the Provision's only `streamGuid`, with query param `restream=true`
3. Begin publishing the stream to the given `serverAddress`

or, for streams in progress:

1. Get Server for Publish for the stream (without `restream`)
2. Publish the stream
3. Create Provision with Streams Service (where `streamGuid` matches the live stream)
4. Get Server for Publish for the Provision's only `streamGuid`, with query param `restream=true`

Whether or not the stream is currently live, calling Get Server for Publish causes the Stream Manager to distribute the provision to the chosen node's Restreamer plugin.

#### Listen (MPEG-TS Uni-/Multicast, SRT)

1. Create Provision with Streams Service
2. Get Server for Publish for the Provision's only `streamGuid`, with query param `restream=true`
3. Begin publishing the stream

