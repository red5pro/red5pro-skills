---
title: ABR - Publishing via Transcoder
description: ""
menu_order: 49
---

If you do not wish send multiple streams via a Media Encoder, you can publish a single high-quality stream to the an autoscale **Transcoder node** which will handle transcoding the stream into the additional variants.

Once the [Provision](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-provision-api/) is posted and stored on the Stream Manager, you will need to start a publisher using the details of the highest variant.

As an example, if you provision ladder specified 720p as the highest variant, you would setup your `WHIPClient` to start publishing on the proxy to be transcoded as such:

```js
const publisher = new WHIPClient();
await publisher.init({
  endpoint: `https://myred5.cloud.red5.net/as/v1/proxy/whip/live/mystream`,
  connectionParams: {
    nodeGroup: "my-node-group",
    transcode: true,
  },
  streamName: "mystream",
  mediaConstraints: {
    audio: true,
    video: {
      width: {
        exact: 1280,
      },
      height: {
        exact: 720,
      },
      frameRate: {
        ideal: 60,
      },
    },
  },
  bandwidth: {
    audio: 128,
    video: 2000,
  },
});
await publisher.publish();
```
