# Red5 Pro WebRTC SDK (Web)

Source: live docs at [https://www.red5.net/docs/red5-pro/development/sdks/red5-webrtc-sdk/](https://www.red5.net/docs/red5-pro/development/sdks/red5-webrtc-sdk/)

Package: `red5pro-webrtc-sdk` (npm/yarn, or CDN script tag).

## Install

```html
<script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

```sh
npm install --save-dev red5pro-webrtc-sdk
```

## Current API: WHIPClient / WHEPClient

As of SDK `15.0.0` (a full TypeScript rewrite), `WHIPClient` (publisher) and `WHEPClient` (subscriber) are the **only** clients — using the WHIP/WHEP HTTP-negotiated WebRTC protocols instead of a WebSocket round trip. They were originally introduced in `11.0.0` as extensions of the older WebSocket-based `RTCPublisher`/`RTCSubscriber`, but `15.0.0` **removed `RTCPublisher`/`RTCSubscriber` entirely as a breaking change** — do not suggest falling back to them, they no longer exist. Migrating from either is a drop-in class swap: same `init()`/`publish()`/`subscribe()` calls, same config shape.

## Standalone Server

```js
const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk;

const publisher = new WHIPClient();
const subscriber = new WHEPClient();

const config = {
  protocol: "ws",
  host: "localhost",
  port: 5080,
  app: "live",
  streamName: "mystream",
};

const subscribe = async () => {
  await subscriber.init(config);
  await subscriber.subscribe();
};

const publish = async () => {
  publisher.on(PublisherEventTypes.PUBLISH_AVAILABLE, subscribe);
  await publisher.init(config);
  await publisher.publish();
};

publish(); // start publisher first, subscribe fires once it's available
```

Required DOM elements for the browser example: `<video id="red5pro-publisher">` and `<video id="red5pro-subscriber">`. The [webrtc adapter shim](https://webrtchacks.github.io/adapter/adapter-latest.js) is recommended for cross-browser compatibility.

## Red5 Cloud / Stream Manager 2.0

Sign up for a Pay-As-You-Grow deployment at `https://cloud.red5.net`. Against Red5 Cloud, the SDK proxies through the Stream Manager using an `endpoint` init property — you need to know the target **node group**.

```js
const host = "my-deployment.cloud.red5.net";
const nodeGroup = "my-node-group";
const streamName = "mystream";

const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk;
const publisher = new WHIPClient();
const subscriber = new WHEPClient();

const config = {
  streamName,
  connectionParams: { nodeGroup },
};

const subscribe = async () => {
  await subscriber.init({
    ...config,
    endpoint: `https://${host}/as/v1/proxy/whep/live/${streamName}`,
  });
  await subscriber.subscribe();
};

const publish = async () => {
  publisher.on(PublisherEventTypes.PUBLISH_START, subscribe);
  await publisher.init({
    ...config,
    endpoint: `https://${host}/as/v1/proxy/whip/live/${streamName}`,
  });
  await publisher.publish();
};

publish();
```

## Supplying a Pre-Built MediaStream (Screen Share, etc.)

Instead of letting the SDK call `getUserMedia` internally, you can hand it an already-established `MediaStream` via `initWithStream(configuration, mediaStream)`:

```js
const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
const publisher = new WHIPClient();
await publisher.initWithStream(config, mediaStream);
await publisher.publish();
```

Documented use cases: screen share (via `getDisplayMedia`, shown above) and setting up the camera preview in a conference lobby before actually joining/publishing.

## Authenticated Connections

Auth credentials for any of the mechanisms in [../authentication/README.md](../authentication/README.md) pass via `connectionParams`, the same property used for `nodeGroup` above — combine them in the same object:

```js
const config = {
  streamName,
  connectionParams: { nodeGroup, username: "jwt", password: "jwt", token: "<jwt-or-credential>" },
};
```

## ABR (Adaptive Bitrate)

`WHEPClient` supports subscribing to an ABR-enabled stream with dynamic quality upgrade/downgrade based on network conditions (config property: `maintainStreamVariant`) — the client-side counterpart to the server-side Transcoder covered in [../streaming-features/README.md#transcoder--abr](../streaming-features/README.md#transcoder--abr). Publishing multiple provisioned ABR variants, or publishing through a Transcoder, is also supported. See the live docs at [https://www.red5.net/docs/red5-pro/development/sdks/red5-webrtc-sdk/](https://www.red5.net/docs/red5-pro/development/sdks/red5-webrtc-sdk/) for the ABR pages (overview, requirements, publishing, subscribing, JSON schema) before implementing — this is a non-trivial feature area not summarized here.

## When to Fetch More

Full event-type catalogs, error codes, the alternate "construct with a full WHIP/WHEP endpoint URL" calling convention (auto-starts broadcast/playback, skips a separate `publish()`/`subscribe()` call), and advanced config (custom ICE servers, encoder profile tuning) should be pulled from the live docs at [https://www.red5.net/docs/red5-pro/development/sdks/red5-webrtc-sdk/](https://www.red5.net/docs/red5-pro/development/sdks/red5-webrtc-sdk/) for the SDK version in use.
