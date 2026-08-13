---
title: WebRTC Example
description: ""
menu_order: 8
---

# As a Module - Standalone Red5 Deployment

Installation:

```bash
npm install red5pro-webrtc-sdk
```

```js
import {
  WHIPClient,
  WHEPClient,
  PublisherEventTypes,
} from "red5pro-webrtc-sdk";

const publisher = new WHIPClient();
const subscriber = new WHEPClient();

const config = {
  protocol: "https",
  host: "mydeploy.red5.net",
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

> Assumes you have two `video` elements on the associated page with the ids of: `red5pro-publisher` and `red5pro-subscriber`.

# In a Browser - Standalone Red5 Deployment

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
        playsinline
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
        playsinline
      ></video>
    </div>
    <!-- Red5 Pro SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      ((red5prosdk) => {
        'use strict'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk

        const publisher = new WHIPClient()
        const subscriber = new WHEPClient()

        const config = {
          host: 'mydeploy.red5.net',
          streamName: 'mystream'
        }

        const subscribe = async () => {
          try {
            await subscriber.init(config)
            await subscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            publisher.on(PublisherEventTypes.PUBLISH_AVAILABLE, subscribe)
            await publisher.init(config)
            await publisher.publish()
          } catch(err) {
            console.error('Could not publish: ' + err)
          }
        }

        // Start Publisher first ->
        publish()

      }(window.red5prosdk))
    </script>
  </body>
</html>
```

The `video` or `audio` element has the `autoplay` and `muted` attributes defined. This will ensure:

- `autoplay`: Once access to your Camera and Microphone are available, it will show a preview of your broadcast to yourself.
- `muted`: You don't get noise feedback when you start publishing, since it will mute your _playback_ volume. Your publishing session will still have audio.

# Red5 Cloud / StreamManager 2.0 Deployment

You can sign up for a Pay-As-You-Grow Cloud deployment of the Red5 Cloud infrastructure with autoscaling at [https://cloud.red5.net](https://cloud.red5.net)!

The Red5 Cloud deployment utilizes a Stream Manager for autoscaling. With the Stream Manager 2.0 Release, the `endpoint` init configuration property was introduced in the SDK to allow developers to specify the specific endpoint to proxy through on the Stream Manager.

> Note: You will need to know which Node Group you intend to target for publishing and subscribing.

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
        playsinline
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
        playsinline
      ></video>
    </div>
    <!-- Red5 Pro SDK -->
    <script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
    <!-- Create Pub/Sub -->
    <script>
      <script>
      ((red5prosdk) => {
        'use strict'

        const host = 'my-deployment.cloud.red5.net'
        const nodeGroup = 'my-node-group'
        const streamName = 'my-stream-name'

        const { WHIPClient, WHEPClient, PublisherEventTypes } = red5prosdk
        const publisher = new WHIPClient()
        const subscriber = new WHEPClient()

        const config = {
          streamName,
          connectionParams: {
            nodeGroup
          }
        }

        const subscribe = async () => {
          try {
            await subscriber.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whep/live/${streamName}`
            })
            await subscriber.subscribe()
          } catch (err) {
              console.error('Could not play: ' + err)
          }
        }

        const publish = async () => {
          try {
            // Once publishing, call subscribe!
            publisher.on(PublisherEventTypes.PUBLISH_START, subscribe)
            await publisher.init({
              ...config,
              endpoint: `https://${host}/as/v1/proxy/whip/live/${streamName}`
            })
            await publisher.publish()
          } catch(err) {
            console.error('Could not publish: ' + err)
          }
        }

        // Start Publisher first ->
        publish()

      }(window.red5prosdk))
    </script>
  </body>
</html>
```
