---
title: Send - Shared Object Method Updates
description: ""
---

The Shared Object interface also allows sending messages to other people watching the object. By sending a Object through the `send` method, that object will be passed to all the listening clients that implement the specified call.

```js
function sendMessageOnSharedObject (message) {

  so.send('messageTransmit', {
    user: configuration.stream1,
    message: message
  })

}
```

Like with the parameters of the object, as long as the Object sent parses into JSON, the structure of the object is up to you, and it will reach the other clients in whole as it was sent.

In this example, we are marking the message object as type `messageTransmit` with data related ot the user sending the message and a message String.

In the event handler for messages, this example then invokes that method name of `messageTransmit` on the callback client:

```js
// Invoked from METHOD_UPDATE event on Shared Object instance.
function messageTransmit (message) { // eslint-disable-line no-unused-vars
  soField.value = ['User "' + message.user + '": ' + message.message, soField.value].join('\n')
}

so.on(red5pro.SharedObjectEventTypes.METHOD_UPDATE, function (event) {
  soCallback[event.data.methodName].call(null, event.data.message)
});
```
