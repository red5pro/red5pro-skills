---
title: Red5 WebRTC SDK
menu_order: 1
---

## Add WebRTC SDK to your project

There are several ways to include the Red5 Pro WebRTC SDK in your project:

### As Script Dependency in HTML page

```html
<script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
```

... Or if you know the version:

```html
<script src=https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@15.0.0/red5pro-sdk.min.js"></script>
```

### Using `npm` or `yarn` for you browser-based projects

```sh
npm install --save-dev red5pro-webrtc-sdk
```

```sh
yarn install --dev red5pro-webrtc-sdk
```

## Usage - Standalone Server

### Module

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
  try {
    await subscriber.init(config);
    await subscriber.subscribe();
  } catch (err) {
    console.error("Could not play: " + err);
  }
};

const publish = async () => {
  try {
    // Once publishing, call subscribe!
    publisher.on(PublisherEventTypes.PUBLISH_AVAILABLE, subscribe);
    await publisher.init(config);
    await publisher.publish();
  } catch (err) {
    console.error("Could not publish: " + err);
  }
};

// Start Publisher first ->
publish();
```

> Note: The above assumes you will have 2 elements with ids of `red5pro-publisher` and `red5pro-subscriber` on your associated DOM. See below.

### In a Browser

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- *Recommended WebRTC Shim -->
    <script src="https://webrtchacks.github.io/adapter/adapter-latest.js"></script>
  </head>
  <body>
    <!-- video containers -->
    <!-- publisher -->
    <div>
      <video
        id="red5pro-publisher"
        width="640"
        height="480"
        muted
        autoplay
      ></video>
    </div>
    <!-- subscriber -->
    <div>
      <video
        id="red5pro-subscriber"
        width="640"
        height="480"
        controls
        autoplay
      ></video>
    </div>
    <!-- Red5 Pro SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk"></script>
    <!-- Create Pub/Sub -->
    <script>
      (function (red5prosdk) {
        "use strict";

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
          try {
            await subscriber.init(config);
            await subscriber.subscribe();
          } catch (err) {
            console.error("Could not play: " + err);
          }
        };

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            publisher.on(PublisherEventTypes.PUBLISH_AVAILABLE, subscribe);
            await publisher.init(config);
            await publisher.publish();
          } catch (err) {
            console.error("Could not publish: " + err);
          }
        };

        // Start Publisher first ->
        publish();
      })(window.red5prosdk);
    </script>
  </body>
</html>
```

## Usage - Red5 Cloud / Stream Manager 2.0

You can sign up for a Pay-As-You-Grow Cloud deployment of the Red5 Cloud infrastructure with autoscaling at [https://cloud.red5.net](https://cloud.red5.net)!

The Red5 Cloud deployment utilizes a Stream Manager for autoscaling. With the Stream Manager 2.0 Release, the `endpoint` init configuration property was introduced in the SDK to allow developers to specify the specific endpoint to proxy through on the Stream Manager.

> Note: You will need to know which Node Group you intend to target for publishing and subscribing.

```js
const host = "my-deployment.cloud.red5.net";
const nodeGroup = "my-node-group";
const streamName = "mystream";

const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk;
const publisher = new WHIPClient();
const subscriber = new WHEPClient();

const config = {
  streamName,
  connectionParams: {
    nodeGroup,
  },
};

const subscribe = async () => {
  try {
    await subscriber.init({
      ...config,
      endpoint: `https://${host}/as/v1/proxy/whep/live/${streamName}`,
    });
    await subscriber.subscribe();
  } catch (err) {
    console.error("Could not play: " + err);
  }
};

const publish = async () => {
  try {
    // Once publishing, call subscribe!
    publisher.on(PublisherEventTypes.PUBLISH_START, subscribe);
    await publisher.init({
      ...config,
      endpoint: `https://${host}/as/v1/proxy/whip/live/${streamName}`,
    });
    await publisher.publish();
  } catch (err) {
    console.error("Could not publish: " + err);
  }
};

// Start Publisher first ->
publish();
```

# Notes on `15.0.0` Release

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

## Notes on 11.0.0 Release

With the `11.0.0` release of the SDK, the Red5 Pro Server and SDK now support [WHIP](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) and [WHEP](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) for broadcasting and playback, respectively.

The interface for these are `WHIPClient` and `WHEPClient`. If you are familiar with the Red5 Pro WebRTC SDK, you can still use `RTCPublisher` and `RTCSubscriber` just as you had done previously.

In fact, `WHIPClient` is just an extension of `RTCPublisher` that replaces the WebSocket usage of negotiation with HTTP/S requests. Likewise, `WHEPClient` is an extension of `RTCSubscriber`. As such, you can provide all the customization per your requirements in the init configuration object interchangably.

> To find out more about the `WHIP/WHEP` integration, please visit [that documentation](https://www.ietf.org/archive/id/draft-murillo-whep-00.html)!
