---
title: setProperty - Shared Object Property Updates
description: ""
---

Remote Shared Objects use JSON for transmission, meaning that its structure is primarily up to your discretion. The base object will always be a dictionary with string keys, while values can be strings, numbers, booleans, arrays, or other dictionaries - with the same restriction on sub-objects.

This example simply uses a number to keep a count of how many people are connected to the object. As seen in the `PROPERTY_UPDATE` handler, value can be accessed from the object by name, and set using `setProperty`:

```js
so.on(red5prosdk.SharedObjectEventTypes.PROPERTY_UPDATE, event => {

  if (event.data.hasOwnProperty('count')) {
    appendMessage('User count is: ' + event.data.count + '.')
    if (!hasRegistered) {
      hasRegistered = true

    }
  }
  else if (!hasRegistered) {
    hasRegistered = true
    so.setProperty('count', 1)
  }

})
```
