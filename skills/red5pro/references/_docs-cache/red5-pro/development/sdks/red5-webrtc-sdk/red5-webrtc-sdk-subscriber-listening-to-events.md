---
title: Listening to Subscriber Events
description: ""
menu_order: 14
---

The `WHEPClient` included in the SDK is an event emitter that provides a basic API to subscribe and unsubscribe to events either by name or by wildcard.

To subscribe to all events from a subscriber:

```js
const handleSubscriberEvent = (event) => {
  // The name of the event:
  const { type } = event;
  // The dispatching subscriber instance:
  const { subscriber } = event;
  // Optional data releated to the event (not available on all events):
  const { data } = event;
};

const subscriber = new WHEPClient();
subscriber.on("*", handleSubscriberEvent);
```

> The `*` type assignment is considered a "Wildcard" subscription - all events being issued by the subscriber instance will invoke the assign event handler.

To unsubscribe to all events from a subscriber after assinging an event handler:

```js
subscriber.off("*", handleSubscriberEvent);
```

The following sections of this document describe the event types that can also be listened to directly, instead of using the `*` wildcard.
