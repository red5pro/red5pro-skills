---
title: Subscribing to a Transcoded Stream with WebRTC
description: ""
menu_order: 12
---

When subscribing to an ABR-Provisioned stream on the Stream Manager using the Red5 Pro WebRTC SDK, you will request to subscribe to a variant - instead of the high-level GUID. Once the subscriber stream has started playback the stream will be dynamically upgraded or downgraded based on network conditions.

> It is dependent on your project requirements, but if running an ABR with different broadcast quality settings, we recommend first subscribing to the lowest variant, to ensure that your client can connect.

## WHEPClient

With the `WHEPClient`, the negotiation sequence with a Stream Manager is handled server side. As such, it is very similar to how you would normally subscribe to the server:

```js
import { WHEPClient } from "red5pro-webrtc-sdk";

const subscribe = async () => {
  const subscriber = new WHEPClient();
  await subscriber.init({
    endpoint: "https://myred5.cloud.red5.net/as/v1/proxy/whep/live/mystream_2",
    streamName: "mystream_2",
    connectionParams: {
      nodeGroup: "my-node-group",
    },
  });
  await subscriber.subscribe();
};
```

> The above is a _very_ basic configuration. Your webapp may need additional configurations depending on requirements and deployment.

In this example, the `mystream_2` stream is requested. In doing so, the subscriber is started with a mid-level variant. As conditions improve or worsen the stream variant will be dynamically switched to higher or lower quality, respectively.
