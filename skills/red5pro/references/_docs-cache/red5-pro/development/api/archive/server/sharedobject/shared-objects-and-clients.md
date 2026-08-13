---
title: Shared Objects and Clients
description: ""
---

When using an already established client connection, the content of the stream isn't important to the shared object itself, even a muted audio-only stream will be enough. Additionally, which stream you are connected to isn't important to which shared object you access, meaning that clients across multiple streams can use the same object, or there could be multiple overlapping objects in the same stream.

## Creating a Shared Object with Publisher

```js
import { 
  RTCPublisher,
  Red5ProSharedObject
} from 'red5pro-webrtc-sdk'

const startPublisher = async () => {

  try {

    // Note: Configuration not shown.
    const publisher = await new RTCPublisher().init(configuration)
    await publisher.publish()

    const so = new Red5ProSharedObject('sharedObjectTest', publisher)
    so.on('*', handleSharedObjectEvents)

  } catch (e) {
    console.error(e)
  }

}

startPublisher()
```


## Creating a Shared Object with Subscriber Stream

```js
import { 
  RTCSubscriber,
  Red5ProSharedObject
} from 'red5pro-webrtc-sdk'

const startSubscriber = async () => {

  try {

    // Note: Configuration not shown.
    const subscriber = await new RTCSubscriber().init(configuration)
    await subscriber.subscribe()

    const so = new Red5ProSharedObject('sharedObjectTest', subscriber)
    so.on('*', handleSharedObjectEvents)

  } catch (e) {
    console.error(e)
  }

}

startSubscriber()
```
