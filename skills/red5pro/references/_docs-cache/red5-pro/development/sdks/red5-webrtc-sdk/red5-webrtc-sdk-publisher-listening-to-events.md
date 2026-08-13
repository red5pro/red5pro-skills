---
title: Listening to Publisher Events
description: ""
menu_order: 11
---

# Listening to Publisher Events

The `WHIPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a publisher:

```js
const handlePublisherEvent = (event) => {
  // The name of the event:
  const { type } = event;
  // The dispatching publisher instance:
  const { publisher } = event;
  // Optional data releated to the event (not available on all events):
  const { data } = event;
};

const publisher = new WHIPClient();
publisher.on("*", handlePublisherEvent);
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the publisher instance will invoke the assign event handler.

To unsubscribe to all events from a publisher after assinging an event handler:

```js
publisher.off("*", handlePublisherEvent);
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.
