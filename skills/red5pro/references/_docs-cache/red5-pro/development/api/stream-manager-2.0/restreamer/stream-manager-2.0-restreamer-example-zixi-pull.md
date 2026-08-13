---
title: Stream Manager 2.0 Restreamer Example - Zixi Pull
menu_order: 88
---


Two scenarios are supported:

* No persist: Create an order to pull a given stream 
* Persist: Create a standing order to pull a given stream any time it may exist

These examples assume there is a stream manager at `as-test1.example.org` and that a NodeGroup exists, named `nodegroup1`. The NodeGroup is assumed to have nodes capable of PUBLISH and SUBSCRIBE (whether all-in-one or arranged into origins/edges).


## No Persist

In the "no persist" case, the provision will either not specify `persist` at all or set its value to `false`. This signals to the Stream Manager that the provision will be distributed to nodes only in response to **Get Server for Publish** requests.

First, in Zixi Broadcaster, define an Output (defining a Zixi input is beyond the scope of this document, but see **Note about zixiUri** below).

Second, create a restreamer provision:

**restreamer-zixi-pull-sm-nopersist.json**

```json
[
  {
    "provisionGuid": "zixi1",
    "streams": [
      {
        "streamGuid": "live/stream1",
        "abrLevel": 0,
        "camParams": {
          "properties": {
            "type": "zixi",
            "action": "create",
            "zixiUri": "zixi://beans@203.0.113.42:2077/live/zixi1",
            "latency": 300,
            "sessionId": "",
            "ignoreDTLSErrors": "true",
            "dtlsOnly": "false",
            "ciphers": "",
            "aesType": -1
          }
        }
      }
    ]
  }
]
```

**Note about type**
Note that `"type": "zixi"` implies "pull". 

**Note about zixiUri**
Assuming Zixi Broadcaster is running on port `2077` at `203.0.113.42`, and where in Zixi Broadcaster, the Output is defined as

`Stream ID`: `live/cam1`

`Remote ID`: `remoteId`

**Create Provision** API call (note that Provision related functions require an [authorized JWT](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-auth-api/)):

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-zixi-pull-sm-nopersist.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
```

Now that the Restreamer provision exists, any call to **Get Server for Publish** must include the `restream=true` flag to indicate intent to distribute this provision.

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/publish/live/stream1?restream=true
```

Now the stream should begin pulling, so we should find a new stream `live/social1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

It may also be useful to query Get Provision Status -- this returns the status of the provision's streams:

```
curl -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1/zixi1?status=true | json_pp
```

Later, when you wish to end pulling (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/zixi1
```

## Persist

The persist case is essentially the same.

When a restreamer provision is flagged `"persist": "true"`, once the provision has been distributed, the Stream Manager will endeavor to keep the provision distributed (in the event that nodes are replaced, etc). The effect is that any time the stream is actually availabe on the remote Zixi system, it will also be pulled to Red5 Pro.

**restreamer-zixi-pull-sm-persist.json**

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
            "type": "zixi",
            "action": "create",
            "zixiUri": "zixi://beans@24.21.225.167:2077/live/natezixi1",
            "latency": 300,
            "sessionId": "",
            "ignoreDTLSErrors": "true",
            "dtlsOnly": "false",
            "ciphers": "",
            "aesType": -1,
			"persist": "true"
          }
        }
      }
    ]
  }
]
```
