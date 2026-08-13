---
title: Social Media Rest API
description: ""
menu_order: 90
---

The Social Pusher plugin uses the Cluster Plugin's authentication framework. Therefore the cluster plugin must be enabled (even for a standalone instance).

## Stream Manager

The Stream Manager URI consists of the access token and the action to perform. The action is always either `provision.create` when starting a new forward, or `provision.delete` when ending one that is currently streaming. Note that ending the forward with `provision.delete` does not end the original stream, which continues uninterrupted.

Example URI `https://example.com/streammanager/api/4.0/socialpusher?accessToken=xyz123&action=provision.create`

## Standalone Server

In a standalone environment, forwarding requests are POSTed directly to the SocialPusher plugin. The standalone URI consists of a `signature`, `timestamp`, and the `action` to perform.

* `timestamp` - The timestamp is always the client timestamp, in milliseconds since the epoch. It must match the timestamp used on the client to calculate the signature. [Here](https://codechi.com/dev-tools/date-to-millisecond-calculators/#.W0OprNhKjqY) is a date to millisecond calculator you can use to get the current timestamp (or, in javascript `new Date().getTime()`).
* `action` - The action is always either `provision.create` when starting a new forward, or `provision.delete` when ending one that is currently streaming. Note that ending the forward with provision.delete does not end the original stream published by the Origin, which continues uninterrupted.
* `signature` - The signature is the SHA-256 hash of the concatenation of action, timestamp, and the cluster password. The cluster password is configured in `red5pro/conf/cluster.xml` (`property name="password"`). Concatenate the three fields, and calculate the SHA-256 hash of the resulting UTF-8 string. Then, concatenate the bytes of the hash into a string of hexadecimal digits, with leading zeros (each byte is always two digits). You can use this [SHA256 Hash Generator](https://emn178.github.io/online-tools/sha256.html) to create the signature.

>Signature Example: The SHA256 hash of the string `provision.create1627312266556changeme` (action+Timestamp+Clusterpassword) is `fb5d99b58cf7b8dca4d5c381338e57352ed10204a1b16e3cb663036abcae5df7`

Example URI, using the signature above, would be `http://localhost:5080/socialpusher/api?signature=fb5d99b58cf7b8dca4d5c381338e57352ed10204a1b16e3cb663036abcae5df7&timestamp=1627312266556&action=provision.create`

## Request Body: Provision

In both the Stream Manager and Standalone cases, the body of the request is the same. It contains JSON data describing one or more Provisions, each of which specifies a published stream and a forwarding destination.

```json
{ "provisions":[
       {
          "guid":"streamname",
          "level":1,
          "context":"live",
          "name":"streamname",
          "parameters":{
             "destURI":"rtmp://localhost/live/stream2"
          }
       }
    ]
}
```

The above example defines an array with a single Provision. These are its fields:

* `guid` This string is required but unused by the Social Pusher plugin. Recommended, use the name of the live stream for easier tracking.
* `level` This int is required but unused by the Social Pusher plugin.
* `context` This string is the context of the published stream to forward.
* `name` This string is the name of the published stream to forward.
* `parameters` This is a collection that must always contain a destURI entry.
* `destURI` This is the destination URI. It is a concatenation of the social media URI, plus “/”, plus the “stream key” which is the stream name. In this example, the base URI is `rtmp://localhost/live` plus the stream key which is `stream2`.

A more realistic example is `rtmps://live-api-s.facebook.com:443/rtmp/1234exampleStreamKey`, where the Facebook URI is `rtmps://live-api-s.facebook.com:443/rtmp` and the stream key is `1234exampleStreamKey`.

## Example 1

Forward a live stream POST with action `provision.create`.

```json
{
	"provisions":[
		{
			"guid":"streamname",
			"level":1,
			"context":"live",
			"name":"streamname",
			"parameters":{
				"destURI":"rtmp://localhost/live/stream2"
			}
		}
	]
}
```

The `context` and `name` parameters identify the local stream to forward, while destURI specifies the forwarding destination. Here, the destination stream name is `stream2` while the URI is `rtmp://localhost/live`.

## Example 2

Create multiple forwards POST with action `provision.create`.

```json
{
	"provisions":[
		{
			"guid":"streamname",
			"level":1,
			"context":"live",
			"name":"streamname",
			"parameters":{
				"destURI":"rtmp://localhost/live/stream2"
			}
		},
		{
			"guid":"streamname",
			"level":1,
			"context":"live",
			"name":"streamname",
			"parameters":{
				"destURI":"rtmps://live-api-s.facebook.com:443/rtmp/1234exampleStreamKey"
			}
		}
	]
}
```

Each Provision in the array will be processed in turn. Here both target streams are the same, but each Provision is independent and could identify a different target stream.

## Example 3

Stop forwarding POST with action `provision.delete`.

```json
{
	"provisions":[
		{
			"guid":"streamname",
			"level":1,
			"context":"live",
			"name":"streamname",
			"parameters":{
				"destURI":"rtmp://localhost/live/stream2"
			}
		}
	]
}
```

A forwarded stream stops automatically when the target stream ends, but it is also possible to use a REST request to stop forwarding without stopping the target stream.

The `context` and `name` parameters identify the local stream being forwarded, while the `destURI` parameter is used to identify and remove the StreamForwarder listening to the target stream, which ends fowarding to that destination.
