---
title: Stream Manager 2.0 Restreamer Example - RTMP Push
menu_order: 88
---

Several scenarios are supported:

* Immediate: Begin pushing an existing stream immediately, returning any error 
* With retries: Begin pushing an existing or soon-to-be-created stream, retrying for a limited time
* Persist: Create a standing order to push a given stream any time it may exist

Note that for simplicity when testing, in these examples we push the stream right back to the same origin (with a new name). This way the examples do not depend on external resources. However in any real use case you would specify some external `rtmpUri` and would probably not loop back to `localhost`.

These examples also assume there is a stream manager at `as-test1.example.org` and that a NodeGroup exists, named `nodegroup1`. The NodeGroup is assumed to have nodes capable of PUBLISH and SUBSCRIBE (whether all-in-one or arranged into origins/edges).


### Immediate

In this use case, we want to begin pushing an existing stream immediately, returning any error.

First, you should be publishing `live/stream1`.

Second, create a restreamer provision:

**restreamer-rtmp-push-sm-immediate.json**

```json
[
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
]
```

Of note: `immediate` is `true`, and `persist` is `false` (or not present; default is false).


**Create Provision** API call:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-rtmp-push-sm-immediate.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
```

At this point we can **List Provisions** to find our new provision:

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1 | json_pp
```

Now that the Restreamer provision exists, any call to **Get Server for Publish** must include the `restream=true` flag to indicate intent to distribute this provision.

Further, because the provision specifies `"immediate": "true"`, when the provision is distributed, the Restreamer Plugin will immediately try to forward the stream and return a synchronous response. If it responds 200 OK, we are restreaming. Or we expect an HTTP error status if there is some problem.

So let's distribute our provision by calling **Get Server for Publish**:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/publish/live/stream1?restream=true
```

Now the stream should be forwarding, so we should find a new stream `live/social1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

Later, when you wish to disable forwarding (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/social1
```


### With Retries

In this case, we want to begin pushing an existing or soon-to-be-created stream, retrying for a limited time. We will show the `soon-to-be-created` case.

First, create a provison,

**restreamer-rtmp-push-sm-retries.json**

```json
[
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
			"immediate": "false",
			"attempts": "12",
			"delayS": "10",			
			"persist": "false"
          }
        }
      }
    ]
  }
]
```

Of note: `immediate` is `false`, and `persist` is `false`. We define `12` attempts with `10` second delay between attempts (a total of 120 seconds). Therefore after we call **Get Server for Publish** to distribute the provision to an origin, we then have two minutes to begin publishing to that origin. After that time we would need to call **Get Server for Publish** again to begin a new round of retries.

**Create Provision** API call (note that Provision related functions require an [authorized JWT](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-auth-api/)):

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-rtmp-push-sm-retries.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
```

At this point we can **List Provisions** to find our new provision:

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1 | json_pp
```

Now let's distribute our provision by calling **Get Server for Publish** (also starting our retries):

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/publish/live/stream1?restream=true
```

Then we will quickly publish (within two minutes) to the returned `serverAddress` (here using `ffmpeg` to publish via RTMP):

```
ffmpeg -stream_loop -1 -re -i test_video.mp4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -c:a aac -ar 48000 -b:a 128k -g 10 -ac 2 -b:v 500k -f flv rtmp://203.0.113.42:1935/live/stream1
```

Now the stream should be forwarding, so we should find a new stream `live/social1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

Later, when you wish to disable forwarding (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/social1
```


### Persist

In this case, we want to create a standing order to push a given stream any time it may exist. While the stream could exist before creating the provision, for the sake of example we will assume it does not.

First, create a provison,

**restreamer-rtmp-push-sm-persist.json**

```json
[
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
			"immediate": "false",
			"persist": "true"
          }
        }
      }
    ]
  }
]
```

Of note: `immediate` is `false`, and `persist` is `true`.

**Create Provision** API call:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @restreamer-rtmp-push-sm-persist.json https://as-test1.example.org/as/v1/streams/provision/nodegroup1
```

At this point we can **List Provisions** to find our new provision:

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/nodegroup1 | json_pp
```

Now let's distribute our provision by calling **Get Server for Publish**:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/publish/live/stream1?restream=true
```

At this point -- if the source stream was already live, then forwarding will begin. Otherwise, forwarding will begin when the stream does exist. Also, because of the `persist` flag, once the provision has been distributed (with Get Server for Publish), the Stream Manager will keep it distributed, continually attempting to forwarding the stream. Any time the stream is published, it will begin forwarding until the provision has been deleted.

Next publish to the returned `serverAddress` (here using `ffmpeg` to publish via RTMP):

```
ffmpeg -stream_loop -1 -re -i test_video.mp4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -c:a aac -ar 48000 -b:a 128k -g 10 -ac 2 -b:v 500k -f flv rtmp://203.0.113.42:1935/live/stream1
```

Now the stream should be forwarding, so we should find a new stream `live/social1` when we list all streams:

```
curl -s -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1?aggregate=false | json_pp
```

Now if you stop `ffmpeg` (with Ctrl-C) and after a while start it again, the source stream will begin forwarding again (repeat the previous two steps).

Later, when you wish to disable forwarding (or after the source stream has ended), delete the provision:

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/nodegroup1/social1
```

