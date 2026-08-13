---
title: Migrating from `10.x` to `11.0.0`
description: ""
menu_order: 53
---

# Migrating from `10.x` to `11.0.0`

The SDK release of `11.0.0` provides the capability of utilizing the [WHIP](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html) and [WHEP](https://www.ietf.org/archive/id/draft-murillo-whep-00.html) protocols newly introduced on the `11.0.0` release of the Red5 Pro Server!

The [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) and [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-murillo-whep-00.html)(WHEP) protocols provide the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

> Read more [in the WHIP/WHEP documentation](/docs/red5-pro/development/sdks/archive/webrtc/whipwhep/overview/)!
