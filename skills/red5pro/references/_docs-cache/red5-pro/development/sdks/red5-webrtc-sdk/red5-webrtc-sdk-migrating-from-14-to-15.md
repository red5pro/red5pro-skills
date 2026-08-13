---
title: Migrating from `14.x` to `15.0.0`
description: ""
menu_order: 54
---

# Migrating from `14.x` to `15.0.0`

**ALERT: Breaking Changes**

The `15.0.0` release of the Red5 Pro WebRTC SDK is a complete rewrite of the SDK! Developed in TypeScript from the ground-up, we eliminated a lot of cruft and APIs that had become obsolete and deprecated over the years.

With the slimming-down approach to the SDK also came the major breaking change of removing the WebSocket based clients: `RTCPublisher` and `RTCSubscriber`. As such, the clients introduced in the `11.0.0` release of the SDK are now the main actors and should be exclusively used: `WHIPClient` and `WHEPClient`.

The [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) and [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html)(WHEP) protocols provide the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

> Not only that, but their connection times are blazingly fast!

If you have already been using the `WHIPClient` and `WHEPClient` from the Red5 Pro WebRTC SDK, you shouldn't find any hiccups and will not need to update anything - simply enjoy the benefits of a slimmer SDK and the inclusion of types!

If you have been using the WebSocket-based `RTCPublisher` and `RTCSubscriber` clients, we have hopefully made it painless enough to simply swap out that instantiation with their corresponding WHIP/WHEP client - the initialization and API is all the same.

For example, if you were previously establishing a publisher as such:

```js
const config = {
  host: "myred5.cloud",
  streamName: "mystream",
};
const publisher = new RTCPublisher();
publisher.on("*", (event) => console.log(event));
await publisher.init(config);
await publisher.publish();
```

You can simply swap over to using the `WHEPClient` like so:

```js
const config = {
  host: "myred5.cloud",
  streamName: "mystream",
};
const publisher = new WHIPClient();
publisher.on("*", (event) => console.log(event));
await publisher.init(config);
await publisher.publish();
```

> The same is true for moving from `RTCSubscriber` to `WHEPClient`!
