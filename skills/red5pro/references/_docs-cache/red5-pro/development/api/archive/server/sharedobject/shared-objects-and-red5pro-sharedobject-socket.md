---
title: The Red5 Pro Shared Object Socket
description: ""
---

## The Red5ProSharedObjectSocket

To establish a Shared Object connection when targeting an HTML-based client, a previously establish connection must be made and provided to the Shared Object instance. Though you can easily use a previously established connection from [a streaming client](/docs/red5-pro/development/api/archive/server/sharedobject/shared-objects-and-clients/) you can also use the `Red5ProSharedObjectSocket` class from the WebRTC SDK.

To instantiate and start a socket connection using the `Red5ProSharedObjectSocket` class:

```js
import { Red5ProSharedObjectSocket } from 'red5pro-webrtc-sdk'

const start = async () => {

  try {
    const socket = new Red5ProSharedObjectSocket()
    await socket.init({
      protocol: 'wss',
      port: 443,
      app: 'live'
    })
    // Socket connection is established.
  } catch (e) {
    // An error has occurred in establishing a connection.
  }

}

start()
```

> The `Red5ProSharedObjectSocket` class from the Red5 Pro WebRTC SDK is a proxy to an underlying `WebSocket` that provides convenience in communicating to and from the Red5 Pro Server.

Once the `Red5ProSharedObjectSocket` connection is available, it is provided to a `Red5ProSharedObject` instance - along with a shared object name - to establish a connection to the Remote Shared Object on the server:

```js
import { Red5ProSharedObject } from 'red5pro-webrtc-sdk'

let so

function establishSharedObject (socket) {
  so = new Red5ProSharedObject('sharedObjectTest', socket)
  so.on('*', handleSharedObjectEvents)
}

function handleSharedObjectEvents (event) {
  // Handle events.
}
```

> For more information about the type of events and data provided, refer to the [Shared Object Events](/docs/red5-pro/development/api/archive/server/sharedobject/shared-object-events/) section.
