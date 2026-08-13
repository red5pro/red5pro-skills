---
title: ABR - Publishing to Transcoder (WebRTC)
description: ""
menu_order: 50
---

You can utilize either the `WHIPClient` or `RTCPublisher` from the SDK to start a broadcast for ABR:

# WHEPClient

With the `WHEPClient`, the negotiation sequence with a Stream Manager is handled server side. As such, it is very similar to how you would normally publish to the server:

```js
import { WHIPClient } from "red5pro-webrtc-sdk";

const publish = async () => {
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
        width: 1280,
        height: 780,
        frameRate: 60,
      },
    },
    bandwidth: {
      audio: 128,
      video: 2000,
    },
  });
  await publisher.publish();
};
```

> The above is a _very_ basic configuration. Your webapp may need additional configurations depending on requirements and deployment.

Note the `mediaContraints` object on the initialization configuration and that it defines the video contraint with the corresponding variant qualities for `mystream` from the above examples. This will be used in accessing the `getUserMedia` of the browser client.
