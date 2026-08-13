---
title: Stream Manager 2.0 Restreamer Example - Zixi Push
menu_order: 88
---


Two scenarios are supported:

* No persist: Create an order to push a given stream 
* Persist: Create a standing order to push a given stream any time it may exist

These examples assume there is a stream manager at `as-test1.example.org` and that a NodeGroup exists, named `nodegroup1`. The NodeGroup is assumed to have nodes capable of PUBLISH and SUBSCRIBE (whether all-in-one or arranged into origins/edges).


## No Persist

In the "no persist" case, the provision will either not specify `persist` at all or set its value to `false`. This signals to the Stream Manager that the provision will be distributed to nodes only in response to **Get Server for Publish** requests.

First, in Zixi Broadcaster, define a Push Input for `stream1` (defining a Zixi input is beyond the scope of this document).

You can also begin publishing the source stream to Red5 Pro server. Or optionally this can be done later.

Second, create a restreamer provision:

**restreamer-zixi-push-sm-nopersist.json**

```json
[
  {
    "provisionGuid": "zixi1",
    "streams": [
      {
        "streamGuid": "live/test1",
        "abrLevel": 0,
        "camParams": {
          "properties": {
            "type": "zixi-push",
            "action": "create",
			"host": "zixi.red5.net",
			"streamId": "zixi1",		
            "latency": 300
          }
        }
      }
    ]
  }
]
```

**Create Provision** API call (note that Provision related functions require an [authorized JWT](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-auth-api/)):

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-zixi-push-sm-nopersist.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
```

Now that the Restreamer provision exists, any call to **Get Server for Publish** must include the `restream=true` flag to indicate intent to distribute this provision.

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/publish/live/stream1?restream=true
```

If you have not already begun publishing this stream to Red5 Pro, you can begin now using the given `serverAddress`.

Now the stream should be forwarding, you should find the Input is live in Zixi Broadcaster.

Later, when you wish to disable forwarding (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/zixi1
```

## Persist

The persist case is essentially the same.

When a restreamer provision is flagged `"persist": "true"`, once the provision has been distributed, the Stream Manager will endeavor to keep the provision distributed (in the event that nodes are replaced, etc). The effect is that any time the stream is actually published, it will also be pushed to Zixi.

**restreamer-zixi-push-sm-persist.json**

```
[
  {
    "provisionGuid": "zixi-test1",
    "streams": [
      {
        "streamGuid": "live/test1",
        "abrLevel": 0,
        "camParams": {
          "properties": {
            "type": "zixi-push",
            "action": "create",
			"host": "zixi.red5.net",
			"streamId": "zixi1",		
            "latency": 300,
			"persist": "true"
          }
        }
      }
    ]
  }
]
```
