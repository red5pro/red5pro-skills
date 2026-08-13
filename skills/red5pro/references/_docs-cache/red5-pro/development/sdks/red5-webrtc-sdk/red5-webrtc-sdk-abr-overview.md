---
title: ABR - Adaptive Bitrate with Red5 Pro WebRTC SDK
description: ""
menu_order: 44
---

The next sections describe the processes required to subscribe to streams published via the Red5 Pro WebRTC SDK with Adaptive Bitrate (ABR) control. The Red5 Pro ABR solutions allows for:

- Publishing multiple provisioned streams
- Publishing to a Transcoder on the server that generates provisioned streams
- Subscribing to an ABR-enabled stream that will allow dynamic upgrading and downgrading of stream based on network conditions

> WebRTC Broadcaster ABR is handled by the browser which determines what resolution and bitrate it can support through the [SDP offer and answer](https://datatracker.ietf.org/doc/draft-ietf-rtcweb-sdp/11/)

- [Requirements](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-abr-requirements/)
- [Provisioning](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-abr-requirements/#StreamProvisioning)
  - [Endpoint](/docs/abr-endpoint/)
  - [JSON Schema](/docs/abr-json-schema/)
  - [Response](/docs/abr-response/)
- [Publishing](/docs/abr-publishing-with-transcoder/)
  - [Publishing with Encoders](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-abr-publishing-with-encoder/)
  - [Publishing to Transcoder with WebRTC](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-abr-publishing-with-trandcoder-webrtc/)
- Subscribing
  - [Subscribing with WebRTC](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-abr-subscribing-with-webrtc/)
  - [Subscribing with HLS](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-abr-subscribing-with-hls/)

## More information

For more information about Red5 Pro transcoding and ABR, see [this document](/docs/red5-pro/users-guide/transcoder/).
