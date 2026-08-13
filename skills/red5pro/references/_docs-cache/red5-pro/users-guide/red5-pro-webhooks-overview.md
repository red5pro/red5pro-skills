---
title: Webhooks Overview
description: ""
menu_order: 190
---

Included with the Red5 Pro `live` webapp is a webhook functionality that can call a custom REST endpoint to push various events. Additionally, user defined webhooks can be implemented in custom webapps.

---

## Webhooks

Webhook events are available in the following categories: `CONNECT`, `PUBLISH`, `SUBSCRIBE`, `WEBSOCKET` and `USER`.  The following sections describe the available webhook events in each category.

### CONNECT

Webhooks in the `CONNECT` category are called when a client connects or disconnects.

- `connection-connect` is called on connection
- `connection-disconnect` is called on disconnection

### PUBLISH

Webhooks in the `PUBLISH` category are called when a stream is published or unpublished.

- `stream-published` is called on publish
- `stream-unpublished` is called on unpublish

### SUBSCRIBE
Webhooks in the `SUBSCRIBE` category are called when a subscriber stream begins and ends.

- `stream-subscribed` is called when a new subscriber joins
- `stream-unsubscribed` is called when a subscriber leaves

### WEBSOCKET

Webhooks in the `WEBSOCKET` category are called when a websocket connects or disconnects.

- `websocket-connect` is called on websocket connection
- `websocket-disconnect` is called on websocket disconnection

### MEDIA
The following Webhooks Fall under `MEDIA` category and are triggered during specific video-related events

- `video-started`: Fired when the first video packet is transmitted.
- `video-saved`: Fired when the CloudStoragePlugin completes an upload and reports back.
- `thumb-created`: Fired when thumbnails are enabled and webhooks are configured, and a new thumbnail is created.

### USER

Custom webhooks can be placed in any of the above categories or in the `USER` category.  When implementing a custom webhook in a custom webapp, use the `WebhookEvent.USER` category to place the webhook in the `USER` category.

## Webhook Data

The payload of a webhook event contains five fields:

```json
{
    "event": "connection-connect",
    "guid": "6NEETIQ1YJIFL",
    "username": "foo",
    "userAgent": "Mozilla/5.0 ... Chrome/117.0.0.0 ...",
    "clusterNodeType": "TYPE_AUTO"
}
```

`event`: The name of the webhook event (as defined above).<br/>
`guid`: The GUID for the event. The meaning of this field varies depending on the category:<br/>
* CONNECT events use the connection session ID.
* PUBLISH and SUBSCRIBE events use the stream's unique path and name (e.g., `live/stream1`).
* WEBSOCKET events use the websocket session ID.

`username`: The `username` (if any) supplied for [Simple Authentication](/docs/red5-pro-quickstarts/simple-auth/).<br/>
`useragent`: The client-supplied [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent) string.<br/>
`clusterNodeType`: The type of cluster node where the webhook originated: `TYPE_ORIGIN`, `TYPE_EDGE`, `TYPE_MIXER`, `TYPE_RELAY`, `TYPE_TRANSCODER`, or -- for standalone nodes -- `TYPE_OFF` or `TYPE_AUTO`.

## When are Webhook Events fired?

Any given type of connection will only fire certain webhook events. It is important to know when to expect which events.

|               | websocket-connect | connection-connect | websocket-disconnect | stream-published | stream-subscribed | video-started | thumb-created | stream-unpublished | stream-unsubscribed | connection-disconnect | video-saved |
|---------------|-------------------|--------------------|----------------------|------------------|-------------------|---------------|---------------|--------------------|---------------------|-----------------------|-------------|
| Pub (WHIP)    | n/a               | yes                | n/a                  | yes              | n/a               | yes           | yes           | yes                | n/a                 | yes                   | yes         |
| Sub (WHEP)    | n/a               | yes                | n/a                  | n/a              | yes               | yes           | n/a           | n/a                | n/a                 | yes                   | n/a         |
| Pub (RTC)     | yes               | yes                | yes                  | yes              | n/a               | yes           | yes           | yes                | n/a                 | yes                   | yes         |
| Sub (RTC)     | yes               | yes                | yes                  | n/a              | yes               | yes           | n/a           | n/a                | yes                 | yes                   | n/a         |
| Pub (RTMP)    | n/a               | no                 | n/a                  | no               | n/a               | no            | yes           | no                 | n/a                 | no                    | yes         |
| Sub (RTMP)    | n/a               | no                 | n/a                  | n/a              | no                | no            | no            | n/a                | no                  | no                    | n/a         |



## CONFIGURATION

This feature is configured in the server side `live` webapp and must be applied to all streaming nodes (Origins, Edges, Mixers, Relays, and Transcoders) that are expected to provide events.

Configure the webapp by editing `{Red5Pro}/webapps/live/WEB-INF/red5-web.properties` and updating the `webhooks.endpoint` configuration with the URI for the webhook to call:

```xml
webapp.contextPath=/live
webapp.virtualHosts=*

# Optional endpoint like http://localhost:8001/webhook for webhook events
# Leave empty if not used
webhooks.endpoint=https://localhost:8001/webhook
```

**Note:** If the feature is not used, `webhooks.endpoint` must be left empty. It is important not to comment or remove this configuration line as that would prevent the `live` application from working correctly.

### Muting Webhooks

By default the webhook system will call the configured endpoint for every category of webhooks.  To only receive a subset of the webhooks, the muting function can be used. To mute a webhook, add the category to the `webhooks.muteCategories` configuration.  For example, to mute the all webhooks except `CONNECT`, add the following configuration:

```xml
webhooks.muteCategories=PUBLISH, WEBSOCKET, USER
```

## Webhook Example Calls

This example shows the series of webhook events about a publisher and subscriber throughout their connections' lifecycles. In  reality these webhook events are interleaved but here they are separated to show each series of events individually.

These examples used RTC (rather than WHIP/WHEP), and thus you will see WebSocket events.

#### Publisher

```
{"event":"websocket-connect","guid":"0","username":"foo","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36","clusterNodeType":"undefined"}
{"event":"connection-connect","guid":"6NEETIQ1YJIFL","username":"foo","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36","clusterNodeType":"TYPE_AUTO"}
{"event":"stream-published","guid":"live/stream1","username":"foo","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36","clusterNodeType":"TYPE_AUTO"}
{"event":"websocket-disconnect","guid":"6NEETIQ1YJIFL","username":"foo","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36","clusterNodeType":"TYPE_AUTO"}
{"event":"video-started","guid":"live/stream4","username":null,"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36","clusterNodeType":"TYPE_AUTO","timestamp":1735042722764,"nodePublicIp":"150.136.221.83"}
{"event":"thumb-created","guid":"stream5","username":"","userAgent":"","clusterNodeType":"TYPE_AUTO","timestamp":1732537627218,"nodePublicIp":"159.13.50.71","value":{"image":"stream5_1732537627191.jpeg"}}
{"event":"connection-disconnect","guid":"6NEETIQ1YJIFL","username":"foo","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36","clusterNodeType":"TYPE_AUTO"}
{"event":"stream-unpublished","guid":"live/stream1","username":"foo","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36","clusterNodeType":"TYPE_AUTO"}
{"event":"video-saved","status":"success","bucket":"my-bucket","objectKey":"my-object-key","recording":"recordings/live/stream1.mp4"}
{"event":"video-saved","status":"failure","bucket":"my-bucket","error":"Upload failure: invalid S3 credentials","recordings":["recordings/live/stream1.mp4"]}
```

#### Subscriber

```
{"event":"websocket-connect","guid":"3","username":"baz","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0","clusterNodeType":"undefined"}
{"event":"connection-connect","guid":"GYFFJTJEVCEBX","username":"baz","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0","clusterNodeType":"TYPE_AUTO"}
{"event":"stream-subscribed","guid":"live/stream1","username":"baz","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0","clusterNodeType":"TYPE_AUTO"}
{"event":"websocket-disconnect","guid":"GYFFJTJEVCEBX","username":"baz","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0","clusterNodeType":"TYPE_AUTO"}
{"event":"video-started","guid":"live/stream4","username":null,"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36","clusterNodeType":"TYPE_AUTO","timestamp":1735042722764,"nodePublicIp":"150.136.221.83"}
{"event":"connection-disconnect","guid":"GYFFJTJEVCEBX","username":"baz","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0","clusterNodeType":"TYPE_AUTO"}
{"event":"stream-unsubscribed","guid":"live/stream1","username":"baz","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0","clusterNodeType":"TYPE_AUTO"}
```
