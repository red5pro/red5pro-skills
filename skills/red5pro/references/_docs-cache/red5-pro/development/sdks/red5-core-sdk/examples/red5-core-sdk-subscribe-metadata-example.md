---
title: Core SDK Examples - Subscribe Metadata Messages
description: ""
menu_order: 11
---

The Receiving metadata messages example shows how to receive metadata messages using the `ICallbackHandler` interface. It also shows how to implement a simple video data renderer and use it to set up a subscriber client.

The `DataDumper` class implements two different interfaces:

* The `ISingleRenderer` interface is used in the method `AddStream` of the client object, while
* The `ICallbackHandler` interface allows subscribing for different callback messages from the client using the method `SetCallbackHandler`.

This application is designed to be used together with the [sending metadata example](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-subscribe-metadata-example/), and the stored frames should have the same file names as those embedded into frame data. The `SaveEveryNthFrame` parameter defines how often received frames will be saved.

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup, and the [simple subscribe](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-subscribe-and-play-example/) example for the setup of the subscriber client.
