# Red5 Web SDK (WebRTC + MOQ)

Source: live docs at [https://www.red5.net/docs/red5-pro/development/sdks/red5-streaming-sdk/](https://www.red5.net/docs/red5-pro/development/sdks/red5-streaming-sdk/)

The browser SDK package is `red5-web-sdk`. It supports both:

- WebRTC via WHIP/WHEP (`WHIPClient`, `WHEPClient`)
- Media over QUIC (MOQ) (`MOQPublisher`, `MOQSubscriber`)

This file is the current route for web-client SDK guidance. The older `web-webrtc-sdk.md` naming is legacy.

## Install

Monolith package (WebRTC + MOQ):

```html
<script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk.min.js"></script>
```

WebRTC-only bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk-webrtc.min.js"></script>
```

MOQ-only bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/red5-web-sdk@latest/red5-web-sdk-moq.min.js"></script>
```

```sh
npm install --save-dev red5-web-sdk
```

## Current Client Surface

WebRTC clients:

- `WHIPClient` (publish)
- `WHEPClient` (subscribe)

MOQ clients and utilities:

- `MOQPublisher` / `MOQSubscriber`
- `MOQCatalog` / `MOQMessageChannel`

## WebRTC Baseline (WHIP/WHEP)

Since the TypeScript rewrite (`15.0.0`), `WHIPClient` and `WHEPClient` are the current publish/subscribe clients. Legacy `RTCPublisher` and `RTCSubscriber` were removed in that release.

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

publish();
```

Required DOM elements for browser examples: `<video id="red5pro-publisher">` and `<video id="red5pro-subscriber">`. The [adapter shim](https://webrtchacks.github.io/adapter/adapter-latest.js) is recommended for cross-browser compatibility.

## MOQ Baseline

Use `MOQPublisher` and `MOQSubscriber` for Media over QUIC workflows:

```js
const { MOQPublisher, MOQSubscriber } = red5websdk;

const publisher = new MOQPublisher();
const subscriber = new MOQSubscriber();

const endpoint = "https://relay.example.com:4433";
const namespace = "live/mystream";

const publisherConfig = {
  endpoint,
  namespace,
  mediaElementId: "red5pro-publisher",
  mediaConstraints: {
    audio: true,
    video: true,
  },
  bandwidth: {
    audio: 56,
    video: 3000,
  },
};

const subscriberConfig = {
  endpoint,
  namespace,
  mediaElementId: "red5pro-subscriber",
  prefetchCatalog: false,
};

const subscribe = async () => {
  await subscriber.init(subscriberConfig);
  await subscriber.subscribe();
};

const publish = async () => {
  await publisher.init(publisherConfig);
  await publisher.publish();
};

await publish();
await subscribe();
```

This baseline follows the SDK docs' MOQ examples: `init()` with `endpoint` and `namespace`, then `publish()`/`subscribe()`. For alternate construction and advanced options (authorization, messageChannel, simulcast), use the SDK's `moq-publisher.md` and `moq-subscriber.md` references for the exact release you are using.

## Red5 Cloud / Stream Manager 2.0 Pattern for WebRTC

With Red5 Cloud, use Stream Manager proxy endpoints and pass `nodeGroup` through `connectionParams`:

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

## Supplying a Pre-Built MediaStream to WHIP

Use `initWithStream(configuration, mediaStream)` when you already have a stream (for example, screen share from `getDisplayMedia`):

```js
const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
const publisher = new WHIPClient();
await publisher.initWithStream(config, mediaStream);
await publisher.publish();
```

## Authentication Pattern

Pass auth credentials in `connectionParams` (same place as `nodeGroup` when applicable):

```js
const config = {
  streamName,
  connectionParams: {
    nodeGroup,
    username: "jwt",
    password: "jwt",
    token: "<jwt-or-credential>",
  },
};
```

## ABR Note

`WHEPClient` supports ABR subscription behavior via `maintainStreamVariant`. Because ABR setup spans server-side transcoder provisioning plus client behavior, confirm implementation details in the live docs before coding.

## When to Fetch More

Pull details from live docs before implementation when you need:

- the complete event-type and error catalog
- full MOQ client initialization and message-channel examples
- advanced ICE/encoder/network configuration
- alternate WHIP/WHEP endpoint-only calling patterns

Primary page: [https://www.red5.net/docs/red5-pro/development/sdks/red5-streaming-sdk/](https://www.red5.net/docs/red5-pro/development/sdks/red5-streaming-sdk/)
