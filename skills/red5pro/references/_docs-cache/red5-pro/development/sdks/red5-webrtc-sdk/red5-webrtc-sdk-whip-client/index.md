---
title: WHIP Client
description: ""
menu_order: 5
---

# WHIPClient

When it comes time to broadcast a live stream from your Red5 Server deployment, the SDK provides the WebRTC-based `WHIPClient`.

The `WHIPClient` - under the hood - is based on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.

This provides a standardized - and _blazingly fast_ - way to establish and broadcast a live stream using WebRTC.

# Usage

There are two options to initiate a `WHIPClient`:

1. From instantiation with a full WHIP endpoint URL (if known).
2. From an `init()` call on this instance with an init configuration object.

> If using the second option (most widely used), the SDK will properly construct the endpoints required for negotiation and streaming.

## Contents

- [Providing a WHIP endpoint](providing-a-whip-endpoint.md)
- [Using Init with a Configuration](using-init-with-a-configuration.md)
- [Using MediaConstraints and onGetUserMedia](using-mediaconstraints-and-ongetusermedia.md)
- [Stats Configuration](stats-configuration.md)
- [Invocation](invocation.md)
- [Additional Information](additional-information.md)
- [Example of Statistics Metadata](example-of-statistics-metadata.md)
- [WHIP Proxy](whip-proxy.md)
- [WHEP Proxy](whep-proxy.md)
