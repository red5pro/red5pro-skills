---
title: Subscriber Types
description: ""
menu_order: 17
---

The following subscriber types / protocols are supported:

- [WHEPClient][WHEPClient](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-whep-client) (using HTTP/S requests, [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API), and an HTML5 [video Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), or HTML5 [audio Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio)).
- [HLSSubscriber](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-hls-subscriber/) (using the HTML5 Video/Audio Element)

> RTMP is supported as well, but with the sunsetting of Flash player, there is no current RTMP option for browser-based playback.

In addition to the `WHEPClient` and `HLSSubscriber` of the SDK for live streaming playback, included in the SDK is the `LiveSeekClient`, which is an extension of `WHEPClient` with the ability for live seeking.

- [LiveSeekClient](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-live-seek/)
