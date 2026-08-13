---
title: Stream Manager 2.0 Proxy API
menu_order: 4
---

The Proxy service serves as a secure relay in to the cluster nodes, which do not have their own certificates.

## WebRTC
### WHIP
WebRTC HTTP Ingest Protocol -- publishing.

The WHIP proxy receives traffic at the `as/v1/proxy/whip` endpoint:
```
https://as-test1.example.org:443/as/v1/proxy/whip/<streamGuid>
```

#### OPTIONS

`streamGuid`: String. Path param. Required. The context path and name of the stream, eg. `live/stream1` or `live/room2/stream12`

`host`: String. Optional. The IP address of the Red5Pro server node to use. If omitted, the proxy will call the AS-Streams service "Get Server For Publish" using the specified `nodeGroup`.

`nodeGroup`: String. Optional. If `host` is omitted, `nodeGroup` is required.

`transcode`: Boolean. Optional (default `false`).

`subgroup`: Optional, default `null` meaning “all”. The name of the subgroup (the immediate parent) of candidate nodes. May be a comma-separated list, in order of preference.

`region`: Optional, synonym for `subgroup`. note that if both `subgroup` AND `region` are supplied, only `region` takes effect.

`strict`: Optional, default `false`. Return only one endpoint from the specified subgroup (or fail). If not strict, other regions may be returned.

#### POST

`host`: String. Required. The IP address of the Red5Pro server node to use.

`signal`: Boolean. Optional (default `true`). Tell server to add the datachannel to SDP if `true`.

`mode`: String. Required.  Publisher mode: `live`, `record`, `append`.

`keyFramerate`: Integer. Required. Key frame rate, in milliseconds.

#### PATCH
`host`: String. Required. The IP address of the Red5Pro server node to use.

#### DELETE
`host`: String. Required. The IP address of the Red5Pro server node to use.

### WHEP
WebRTC HTTP Egress Protocol -- subscribing.

The WHEP proxy receives traffic at the `as/v1/proxy/whep` endpoint:
```
https://as-test1.example.org:443/as/v1/proxy/whep/<streamGuid>
```

#### OPTIONS

`streamGuid`: String. Path param. Required. The context path and name of the stream, eg. `live/stream1` or `live/room2/stream12`

`host`: String. Optional. The IP address of the Red5Pro server node to use. If ommitted, the proxy will call the AS-Streams service "Get Server For Publish" using the specified `nodeGroup`.

`nodeGroup`: String. Optional. If `host` is omitted, `nodeGroup` is required.

`signal`: Boolean. Optional (default `false`).

`requestId`: String. Required. Unique subscriber ID.

`subgroup`: Optional, default `null` meaning “all”. The name of the subgroup (the immediate parent) of candidate nodes. May be a comma-separated list, in order of preference.

`region`: Optional, synonym for `subgroup`. note that if both `subgroup` AND `region` are supplied, only `region` takes effect.

`strict`: Optional, default `false`. Return only one endpoint from the specified subgroup (or fail). If not strict, other regions may be returned.

#### POST

`streamGuid`: String. Path param. Required. The context path and name of the stream, eg. `live/stream1` or `live/room2/stream12`

`host`: String. Required. The IP address of the Red5Pro server node to use.

`signal`: Boolean. Optional (default `true`). Tell server to add the datachannel to SDP if `true`.

`doNotSwitch`: Booolean. Optional (default false). Subscriber flag to tell server not to switch streams based on bandwidth when viewing ABR.

`requestId`: String. Required. Unique subscriber ID.

#### PATCH

`streamGuid`: String. Path param. Required. The context path and name of the stream, eg. `live/stream1` or `live/room2/stream12`

`host`: String. Required. The IP address of the Red5Pro server node to use.

`requestId`: String. Required. Unique subscriber ID.

#### DELETE

`streamGuid`: String. Path param. Required. The context path and name of the stream, eg. `live/stream1` or `live/room2/stream12`

`host`: String. Required. The IP address of the Red5Pro server node to use.

`requestId`: String. Required. Unique subscriber ID.

### WebSockets
WebRTC over WebSockets (both publish and subscribe).

The WebSockets proxy receives traffic at the `as/v1/proxy/whep` endpoint:
```
wss://as-test1.example.org/as/v1/proxy/ws/subscribe/live/stream1?id=subscriber-1b31&nodeGroup=allinone-oci-1
```

`id` is a unique client ID, passed along but not used by the Proxy.

`host`: String. Optional. The IP address of the Red5Pro server node to use. If ommitted, the proxy will call the AS-Streams service "Get Server For Publish" using the specified `nodeGroup`.

`nodeGroup`: String. Optional. If `host` is omitted, `nodeGroup` is required.

## Plain HTTP
The plain HTTP proxy is used to access servlets and APIs hosted on the cluster nodes. It passes the body and all headers to `target`, returning all headers and body. It supports the HTTP methods `GET`, `POST`, `PUT`, and `DELETE`.

**Query Parameters**
`target` : the target cluster node URL (in URL-encoded form)

**Example**
```bash
curl -v https://as-test1.example.org/as/v1/proxy/forward/?target=http%3A%2F%2F10.0.0.7%3A5080%2Flive%2Fsubscribe.jsp%3Fhost%3D10.0.0.7
```

In this example, we request the proxy to GET `http://10.0.0.7:5080/live/subscribe.jsp?host=10.0.0.7` (the subscribe page, HTML content).

### Plain HTTP to Red5 Pro Server API

We can use the Proxy Service to make calls to the Red5 Pro Server API on individual nodes.

If your firewall allows direct access to port `5080` you can try these requests directly. But in a webapp that would cause a mixed use security exception, which is not a problem when calling the Proxy.

**1. Set `accessToken` when creating NodeGroup**
First, in the NodeGroupConfig when you create your NodeGroup, define property overrides to assign the API token:

```json
	"propertyOverrides": [
		{
			"fileName": "webapps/api/WEB-INF/red5-web.properties",
			"properties": {
				"security.accessToken": "qwertyuiop"
			}
	    }
	],
```

You can do this globally or per node role.

**2. Create and convert Origin API URL**
Now we can make Red5 Pro Server API requests. For example, assume that we know we have an origin at `` and that at least one stream is being published there.

First we want to query [**getLiveStreams**](docs/red5-pro/development/api/server/red5-pro-server-streams-api/#getLiveStreams)

The URL is:
```
http://129.213.146.107:5080/api/v1/applications/live/streams?accessToken=qwertyuiop
```

In order to call the Proxy Service passing this URL in the value of a query parameter, we must **URL-encode** it:
```
http%3A%2F%2F129.213.146.107%3A5080%2Fapi%2Fv1%2Fapplications%2Flive%2Fstreams%3FaccessToken%3Dqwertyuiop
```

And then we want to call [**recordLiveStream**](docs/red5-pro/development/api/server/red5-pro-server-streams-api/#recordLiveStream)

The URL is:
```
http://129.213.146.107:5080/api/v1/applications/live/streams/stream1/action/startrecord?accessToken=qwertyuiop
```

URL-encoded:
```
http%3A%2F%2F129.213.146.107%3A5080%2Fapi%2Fv1%2Fapplications%2Flive%2Fstreams%2Fstream1%2Faction%2Fstartrecord%3FaccessToken%3Dqwertyuiop
```

**3. Call Proxy Service**

Now we can call the proxy service using TLS which will relay the request to the Red5 Server.

First, **getLiveStreams**:
```
https://as-test1.example.org/as/v1/proxy/forward/?target=http://129.213.146.107:5080/api/v1/applications/live/streams/stream1/action/startrecord?accessToken=qwertyuiop
```

And then **recordLiveStream**:
```
https://as-test1.example.org/as/v1/proxy/forward/?target=http%3A%2F%2F129.213.146.107%3A5080%2Fapi%2Fv1%2Fapplications%2Flive%2Fstreams%2Fstream1%2Faction%2Fstartrecord%3FaccessToken%3Dqwertyuiop
```


### Plain HTTP with Cluster Authentication (Social Pusher example)

Given a valid Proxy JWT, the AS-Proxy service can automatically create cluster digest parameters required for cluster auth.

A Proxy JWT is created by calling AS-Auth service with `proxy` credentials, as in:

```
export PROXY_JWT=$(curl -s -H "Content-Type: application/json" -X PUT https://proxy:123abc@as-test1.example.org/as/v1/auth/login  | jq -r .token)
```

Note that you can use the AS-Streams request Get Stream Stats with `aggregate=true` (default) to learn the origin IP. For example:
```
curl -v -H "Content-Type: application/json" https://as-test1.example.org/as/v1/streams/stream/nodegroup1/stream/live/stream1  | jq '.[0].serverAddress'
```

Assuming a nodegroup named `nodegroup1` is currently deployed, and there is a live stream `live/stream1` published on origin `203.0.113.42`, as well as a local file `social.json` containing the Social Pusher provision:

**social.json**
```json
{
	"provisions":[
		{
			"guid":"any",
			"level":1,
			"context":"live",
			"name":"stream1",
			"parameters":{
				"destURI":"rtmp://localhost/live/social1"
			}
		}
	]
}
```

We can proxy this request to the origin, creating the cluster digest along the way. For simplicity of testing, this does not actually forward to any social media service but instead just loops back to the origin to create an additional stream, `live/social1`.

```
curl -v -H "Content-Type: application/json" -H "Authorization: Bearer ${PROXY_JWT}" -X POST --data @social.json "https://as-test1.example.org/as/v1/proxy/forward/?digestAction=provision.create&nodegroup=nodegroup1&target=http%3A%2F%2F203.0.113.42%3A5080%2Fsocialpusher%2Fapi"
```

Let's break this down.

`-v` for verbose. Otherwise curl hides the HTTP status code.

`-H "Content-Type: application/json"` because our request body contains JSON.

`-H "Authorization: Bearer ${PROXY_JWT}"` because we are sending our valid proxy JWT.

`-X POST` this is our HTTP method

`--data @social.json` this specifies that the body of our request comes from the given file (see Social Pusher documentation for details)

and then the URL. Note that the URL is quoted -- this URL has an `&` character in it and so we need the quotes so that Bash doesn't misinterpret this ampersand.

`https://as-test1.example.org/as/v1/proxy/forward/` this is the forwarding web proxy URL for the given host

In the URL are three query params:

`digestAction=provision.create` this `digestAction` field becomes the `action` in the proxied request. the other two fields, the `signature` and `timestamp` are created automatically by AS-Proxy and do not appear in this URL (although they will be present on the URL that AS-Proxy uses to call the origin.)

`nodegroup=nodegroup1` the nodegroup must be specified. AS-Proxy uses information from the nodegroup to create the cluster `signature`

`target=http%3A%2F%2F203.0.113.42%3A5080%2Fsocialpusher%2Fapi` the URL-encoded target URL.


### Plain HTTP with Cluster Authentication (Restreamer example)

Using the Cluster Authentication mechanism you can call to a specific node's Restreamer Servlet, which can be useful in diagnostic scenarios. For almost all Restreamer use cases it is better to use the Stream Manager API than to call directly to a node. It is best not to make changes behind the Stream Manager's back, but useful for `list` which is always safe.

Given a valid Proxy JWT, the AS-Proxy service can automatically create cluster digest parameters required for cluster auth.

A Proxy JWT is created by calling AS-Auth service with `proxy` credentials, as in:

```
export PROXY_JWT=$(curl -s -H "Content-Type: application/json" -X PUT https://proxy:123abc@as-test1.example.org/as/v1/auth/login  | jq -r .token)
```

Assuming a nodegroup named `nodegroup1` is currently deployed, and there is an origin `203.0.113.42`, you can call the standalone Restreamer API (which when clustered requires cluster authentication):

**restreamer-rtmp-push-standalone-list.json**
```json
{
    "guid": "",
    "context": "",
    "name": "",
    "level": 0,
    "parameters": {
        "action": "list",
        "type": "rtmp-push"
    }
}
```

We can proxy this request to the origin, creating the cluster digest along the way.
```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${PROXY_JWT}" -X POST --data @restreamer-rtmp-push-standalone-list.json "https://as-test1.example.org/as/v1/proxy/forward/?digestAction=list&nodegroup=nate365&target=http%3A%2F%2F203.0.113.42%3A5080%2Flive%2Frestream"
```

Note that when interacting with the Restreamer Servlet in this way, the `digestAction` query param MUST match the provision's `action` parameter value (both `list` here).
