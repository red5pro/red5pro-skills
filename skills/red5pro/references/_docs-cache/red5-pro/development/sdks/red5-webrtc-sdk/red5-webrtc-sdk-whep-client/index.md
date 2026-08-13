---
title: WHEP Client
description: ""
menu_order: 6
---

# WHEPClient

When it comes time to subscribe to a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHEPClient`.

The `WHEPClient` - under the hood - is based on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-ietf-wish-whep-03.html)(WHEP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and playback a live stream using WebRTC.

# Usage

There are two options to initiate a `WHEPClient`:

1. From instantiation with a full WHEP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Contents

- [Providing a WHEP endpoint](providing-a-whep-endpoint.md)
- [Using Init with a Configuration](using-init-with-a-configuration.md)
- [Stats Configuration](stats-configuration.md)
- [Invocation](invocation.md)
- [Additional Information](additional-information.md)
- [Example of Statistics Metadata](example-of-statistics-metadata.md)
- [LiveSeekClient](liveseekclient.md)
- [LiveSeek Configuration](liveseek-configuration.md)
- [WHIP Proxy](whip-proxy.md)
- [WHEP Proxy](whep-proxy.md)
- [Related Repository](related-repository.md)
