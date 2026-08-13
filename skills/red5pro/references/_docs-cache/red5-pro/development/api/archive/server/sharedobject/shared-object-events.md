---
title: Shared Object Events
description: ""
---



# Shared Object Events

The `SharedObject` included in the SDK is an event emitter that has a basic API to subscribing and unsubscribing to events either by name or by wildcard.

To subscribe to all events from a shared object:

```js
function handleSharedObjectEvent (event) {
  // The name of the event:
  const { type } = event
  // The name associated with the shared object instance:
  const { name } = event
  // Optional data releated to the event (not available on all events):
  const { data } = event
}

const so = new Red5ProSharedObject()
so.on('*', handleSharedObjectEvent)
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the shared object instance will invoke the assign event handler.

To unsubscribe to all events from a shared object after assinging an event handler:

```js
so.off('*', handleSharedObjectEvent)
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.
