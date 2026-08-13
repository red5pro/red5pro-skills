---
title: Stream Manager 2.0 Migration Guide - WebRTC SDK
menu_order: 4
---


## Red5 WebRTC SDK Migration for Stream Manager 2.0 Release

The intent of this document is to provide information for developers using the [Red5 WebRTC SDK](https://www.npmjs.com/package/red5pro-webrtc-sdk) on migrating from Stream Manager 1.0 integration to Stream Manager 2.0 integration for web clients.

## General Overview

Media access from a browser is a requirement for publishers that want to stream their audio and video from micrphone and camera devices, respectively. Due to security constraints, such media access is restricted by browser to pages/sites delivered securely over HTTPS.

The architecture of an autoscale environment under a Stream Manager deployment is such that Origin and Edge nodes are dynamically spun up and torn down in response to publisher and subscriber amounts within respect to their node configuration settings. It is too much for this document to cover such a topic, but is important to note that while the Stream Manager instance - and its API - is served securely over HTTPS, the Origin and Edge nodes it manages are not - meaning they will not individually each have a domain name not be accessible over HTTPS.

Due to the media restrictions, streaming to and consuming streams from a node served over an unsecure IP within a browser environment is not a viable solution. As such, the Stream Manager instance within the deployment scenario acts as a **proxy** for the clients - accepting, forwarding and responding with requests to the respective nodes.

With this in mind, WebRTC clients interact with the Stream Manager instance directly while providing routing and/or additional information that the Stream Manager knows how to direct accordingly.

The following information in this document describes how this was achieved previously in the Stream Manager 1.0 release and how to migrate your code to integration with the Stream Manager 2.0 release.

## Stream Manager 1.0 Integration

Integrating web clients using the Red5 WebRTC SDK and Stream Manager 1.0 involved first making an API request for either the Origin or Edge (for publisher or subscriber, respectively), and then providing that node IP address as an attribute of the `connectionParams` within the init configuration of the client, e.g.:

```js
const host = "streammanager.red5.host";
const app = "live";
const streamName = "stream1";

const startPublisher = async () => {
	try {
		const nodeResponse = await fetch({
			url: `https://${host}/streammanager/api/4.0/event/${app}/${streamName}?action=broadcast`,
			method: "GET",
		});
		const json = await nodeResponse.json();
		const { scope, serverAddress } = json;

		const config = {
			host,
			app: "streammanager",
			streamName,
			connectionParams: {
				host: serverAddress,
				app: scope,
			},
			// additional configurations
		};
		const publisher = new WHIPClient();
		publisher.on("*", (event) => console.log(event));

		await publisher.init(config);
		await publisher.publish();
	} catch (error) {
		console.log(`Something has gone wrong: ${error.message}`);
	}
};
```

By setting the `host` to point to the desired node IP address as part of the `connectionParams`, the Stream Manager acted as a proxy to that node - forwarding and responding to requests appropriately.

## Stream Manager 2.0

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. By communicating an endpoint to the Stream Manager, the client no longer needs to be aware of the node that it is being proxied to.

To allow the Stream Manager 2.0 to proxy along requests, an initialization configuration property named `endpoint` has been added to the Red5 WebRTC SDK.

This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:

### WHIP Proxy

```js
const host = "streammanager.red5.host";
const app = "live";
const streamName = "stream1";

const nodeGroup = "my-node-group";
const endpoint = `https://${host}/as/v1/proxy/whip/${app}/${streamName}`;

const config = {
	endpoint,
	streamName,
	connectionParams: {
		nodeGroup,
	},
	// additional configurations
};
const publisher = new WHIPClient();
publisher.on("*", (event) => console.log(event));

await publisher.init(config);
await publisher.publish();
```

### WHEP Proxy

```js
const host = "streammanager.red5.host";
const app = "live";
const streamName = "stream1";

const nodeGroup = "my-node-group";
const endpoint = `https://${host}/as/v1/proxy/whep/${app}/${streamName}`;

const config = {
	endpoint,
	streamName,
	connectionParams: {
		nodeGroup,
	},
	// additional configurations
};
const subscriber = new WHEPClient();
subscriber.on("*", (event) => console.log(event));

await subscriber.init(config);
await subscriber.subscribe();
```

There are a few things to note here:

- The difference of `/whip` and `/whep` in the URI for the endpoint calls between `WHIPClient` and `WHEPClient`, respectively.
- The requirement of a `nodeGroup` connection parameter that is the target nodegroup within your Stream Manager deployment on which you want to proxy the WHIP/WHEP client(s).

> With only one Node Group configured for Stream Manager 2.0, the value can be left as `default`. Otherwise, you will need to provide the `name` defined for the target Node Group on which to stream.

### Event

While the Red5 WebRTC SDK is negotiating with the Stream Manager 2.0 to proxy a publish or subscribe session, the API returns the Origin or Edge node IP in a header. You can access the value for the target node by listening for the `WebRTC.Endpoint.Changed` event on the client, e.g.,:

```js
const subscriber = new WHEPClient();
subscriber.on("WebRTC.Endpoint.Changed", (event) => {
	const { data } = event;
	const { endpoint } = data;
	console.log(`Client stream is coming from: ${endpoint}`);
});
await subscriber.init(config);
await subscriber.subscribe();
```

## ABR and Provisioning

The Red5 Server supports Adaptive Bitrate (ABR) streaming through the submission of Provisions to the Stream Manager. The provision structure - which will be detailed for both Stream Manager 1.0 and Stream Manager 2.0 in this section - consists of a listing of variants of stream properties, of which the highest variant is expected to be delivered in a stream related to the associated Stream GUID; the server will handle transcoding the lower variants for delivery to subscribing clients based on bandwidth estimation.

With the Stream Manager 2.0 release, the endpoint to submit provision requests has changed as well as the structure of the provision to submit and the return payload.

Additionally, while both versions require authentication credentials, Stream Manager 2.0 authentication is based on JWT and requires a token to perform administrative tasks - such as provisioning.

### ABR & Stream Manager 1.0

Whe submitting provisions to Stream Manager 1.0, an `accessToken` was used for authentication of the request. This `accessToken` was a value pre-defined for your Stream Manager 1.0 deployment and shared with only those that were privy to perform administrative tasks.

The URL structure for provision submission was the following:

```javascript
const getProvisionSubmitURL = () => {
	let host = "streammanager.red5.host";
	let app = "live";
	let streamName = "stream1";
	let accessToken = "abc123";

	let url = `https://${host}/streammanager/api/4.0/admin/event/meta/${app}/${streamName}?accessToken=${accessToken}`;
	return url;
};
```

The provision schema to submit a list of variants for an ABR stream was as follows:

```json
{
    "meta": {
        "authentication": {
            "username": "",
            "password": ""
        },
        "stream": [
            {
                "name": "<stream-name>_<variant-level>",
                "level": <variant-level>,
                "properties": {
                    "videoBR": <variant-bitrate>,
                    "videoWidth": <variant-width>,
                    "videoHeight": <variant-height>
                }
            },
            // ...
        ],
        "georules": {
            "regions": ["US", "UK"],
            "restricted": false
        },
        "qos": 3
    }
}
```

The `stream` listing of the provision details the variant ladder of streams that the server will generate for consumption. In order for the ABR streams to be made available related to the stream name GUID (that is `stream1` in these examples and used to construct the request URL in the previous section), a publish stream is then expected to be started for the top-level variant (`stream1_1`) with the bitrate and resolution defined.

As such, the URL to access a Node address to stream the top-level variant through Stream Manager 1.0 was slightly different than the [basic node request](#streaming--stream-manager-10):

```javascript
const startPublish = async () => {
	let host = "streammanager.red5.host";
	let app = "live";
	let streamName = "stream1";

	let url = `https://${host}/streammanager/api/4.0/event/${app}/${streamName}?action=broadcast&transcode=true`;

	try {
		const nodeResponse = await requestOrigin(url);
		const json = await nodeResponse.json();
		const { scope, serverAddress } = json;

		const config = {
			host,
			app: "streammanager",
			streamName: `${streamName}_1`,
			bandwidth: {
				video: 10000, // videoBR of top variant from provision
			},
			mediaConstraints: {
				audio: true,
				video: {
					width: { exact: 1280 }, // videoWidth of top variant from provision
					height: { exact: 720 }, // videoHeight of top variant from provision
				},
			},
			connectionParams: {
				host: serverAddress,
				app: scope,
			},
			// additional configurations
		};
		const publisher = new WHIPClient();
		publisher.on("*", (event) => console.log(event));

		await publisher.init(config);
		await publisher.publish();
	} catch (error) {}
};
```

Of note in the above example is the addition of `transcode=true` to the query parameters for Node address request, and the subsequent call to pushing with stream name `${streamName}_1`, and `mediaContraint` and `bandwidth` init configuration properties denoting that the client is going to be streaming with the highest variant quality to be transcoded.

### ABR & Stream Manager 2.0

As mentioned at the start of this section, the authentication process for administrative tasks is different between Stream Manager 1.0 and Stream Manager 2.0, mainly in the fact that all requests as such require a JWT token in Stream Manager 2.0. You can access a JWT token by authenticating with a username and password defined in the Stream Manager 2.0 deployment.

With the username and password known, you can access a JWT token in order to submit an ABR provision as follows:

```javascript
const authenticate = async (host, smUser, smPassword) => {
	try {
		const url = `https://${smHost}/as/v1/auth/login`;
		const token = "Basic " + btoa(smUser + ":" + smPassword);
		const response = await fetch(url, {
			method: "PUT",
			withCredentials: true,
			credentials: "include",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		});
		var json = await response.json();
		if (json.errorMessage) {
			throw new Error(json.errorMessage);
		}
		return json.token;
	} catch (e) {
		console.log("authenticate() fail: " + e);
		throw e;
	}
};
```

With the JWT token accessed through authentication, a submission of ABR pvovision can be achieved as such providing the `Bearer` token in an Auth Header:

```javascript
const postProvision = async (host, nodeGroup, token, provision) => {
	const url = `https://${host}/as/v1/streams/provision/${nodeGroup}`;
	const body = JSON.stringify(provision);
	const result = await fetch(url, {
		method: "POST",
		withCredentials: true,
		credentials: "include",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body,
	});
	if (result.status >= 200 && result.status < 300) {
		try {
			const json = await result.json();
			if (json && json.errorMessage) {
				if (json.errorMessage.indexOf("Provision already exists") < 0) {
					throw new Error(json.errorMessage);
				} else {
					console.log("Provision already exists");
				}
				return json;
			}
		} catch (e) {
			console.error("Provision response JSON parse failed: " + e.message);
		}
		return { success: true };
	} else if (result.status === 409) {
		return { errorMessage: "Provision already exists" };
	} else {
		throw new Error(`Provision request failed: ${result.status}`);
	}
};
```

The schema of a Provision to be submitted to Stream Manager 2.0 differs slightly from that delivered to Stream Manager 1.0. Here is an example of the Provision schema for Stream Manager 2.0:

```json
{
    "streamGuid": "<app>/<stream-name>",
    "messageType": "ProvisionCommand",
    "streams": [
        {
            "streamGuid": "<stream-guid>_<variant-level>",
            "abrLevel": <variant-level>,
            "videoParams": {
                "videoBitRate": <variant-bitrate>,
                "videoWidth": <variant-width>,
                "videoHeight": <variant-height>
            }
        },
        // ...
    ]
}
```

To begin a stream with the high-level variant is variant similar to a non-ABR stream, but with the `transcode=true` query parameter appended. This allows the Stream Manager 2.0 to know to direct the stream to a Transcoder Node:

```javascript
const startPublish = async () => {
	let host = "streammanager.red5.host";
	let app = "live";
	let streamName = "stream1";

	let url = `https://${host}/as/v1/streams/stream/${nodeGroup}/publish/${app}/${streamName}?transcode=true`;

	try {
		const nodeResponse = await requestOrigin(url);
		const json = await nodeResponse.json();
		const { scope, serverAddress } = json;

		const config = {
			host,
			app: "streammanager",
			streamName: `${streamName}_1`,
			bandwidth: {
				video: 10000, // videoBR of top variant from provision
			},
			mediaConstraints: {
				audio: true,
				video: {
					width: { exact: 1280 }, // videoWidth of top variant from provision
					height: { exact: 720 }, // videoHeight of top variant from provision
				},
			},
			connectionParams: {
				host: serverAddress,
				app: scope,
			},
			// additional configurations
		};
		const publisher = new WHIPClient();
		publisher.on("*", (event) => console.log(event));

		await publisher.init(config);
		await publisher.publish();
	} catch (error) {}
};
```

#### Subscribing to an ABR Variant

It should be noted that accessing an Edge address for a subscriber client for ABR support is very similar to that of a non-ABR subscriber. The only difference is that the stream name in the request would be the initial desired variant and not the top-level GUID for the stream, i.e.,:

```javascript
const getEdgRequestURL = (variantLevel = 2) => {
	let host = "streammanager.red5.host";
	let app = "live";
	let streamName = "stream1";
	let accessToken = "abc123";

	let url = `https://${host}/as/v1/streams/stream/${nodeGroup}/subscribe/${app}/${streamName}_${variantLevel}`;
	return url;
};
```

The Stream Manager 2.0 will return the Edge node address to be used in configuration of the WebRTC Subscriber client and will initially deliver the variant stream defined. As network conditions change for the subscriber client, so will the variant stream being delivered.
