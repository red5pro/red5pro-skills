---
title: ABR - Subscribing with HLS
description: ""
menu_order: 52
---

Because ABR relies on having a cloud distribution of Red5 using the Stream Manager, it is recommended to also configure the Stream Manager to use a Cloud Storage provider for HLS files or an NFS mount.

Either solution would allow for specifying a full URL path to the high-level GUID `m3u8` manifest file. Upon load of the manifest, it is then up to the logic of the player/browser which variant to load during playback based on network conditions.

> Please refer to further documentation on [NFS Set Up](/docs/red5-pro/users-guide/installation/archive/auto-oci/14-nfs-on-oci/)

---

For HLS adaptive bitrate subscribing, connect your subscriber to the `m3u8` stream GUID. Within the `m3u8` manifest, the variants are defined and the HLS playback element has the ability to switch between variants based on network conditions.

The Red5 Pro WebRTC SDK provides an `HLSSubscriber` which allows for ease integrating streaming with browsers that natively support HLS playback (Mobile and Desktop Safari, at the time of this writing).

As an example of subscribing to a stream with adaptive bitrate using native HLS using the GUID (`mystream`) and knowledge of your cloud storage endpoint (`https://mynfs.red5.cloud`):

```js
import { HLSSubscriber } from "red5pro-webrtc-sdk";

const subscriber = new HLSSubscriber();
await subscriber.init({
  endpoint: "https://mynfs.red5.cloud/live/mystream",
  streamName: "mystream",
});
await subscriber.subscribe();
```

## Possible Native Failover

If your browser does not support HLS playback natively, it is recommended to use a 3rd-party library - such as [HLS.JS](https://github.com/video-dev/hls.js/):

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/red5pro-webrtc-sdk@latest/red5pro-sdk.min.js"></script>
<video id="red5pro-subscriber"></video>
<script>
  const { HLSSubscriber } = red5prosdk;
  const url = "https://mynfs.red5.cloud/live/mystream";

  const subscribeNative = async () => {
    const subscriber = new HLSubscriber();
    await subscriber.init({
      endpoint: url,
      streamName: "mystream",
    });
    await subscriber.subscribe();
  };

  const subscriberHLS = async () => {
    const hls = new Hls();
    hls.attachMedia(document.getElementById("red5pro-subscriber"));
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(url);
    });
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  };

  const subscribeWithFailover = async () => {
    try {
      subscribeNative();
    } catch (e) {
      subscribeHLS();
    }
  };
  subscribeWithFailover();
</script>
```
