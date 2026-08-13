---
title: close - Closing a Shared Object
description: ""
---

Closing a remote Shared Object instance is as easy as invoking `close`.

```js
so.off('*', handleSharedObjectEvents)
so.close()
```

> The event delegate is also removed using the `off` method, since `SharedObject` is an instance of `EventEmitter`.
