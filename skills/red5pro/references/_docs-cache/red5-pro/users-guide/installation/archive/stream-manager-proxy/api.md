---
title: Headers - Client API
description: ""
menu_order: 5
---

## Client API for Usage

Broadcasters and subscribers need to use the Red5 Pro Stream Manager [REST API](/docs/red5-pro/development/api/archive/rest-api-v-400/) to request an origin/edge for publish/subscribe operations. Once a server IP has been obtained, it can be used in conjunction with additional parameters to establish a connection with the remote Red5 Pro server node and begin stream operations. This is a two-step process, and the proxy operation is decoupled from Stream Manager internals.  The publishing and subscribing are done using the Red5 Pro HTML5 Streaming SDK.

See [proxy client API document](/docs/red5-pro/development/api/archive/autoscale-client-api/proxy-api/) for details on the base configuration and stream manager API calls.