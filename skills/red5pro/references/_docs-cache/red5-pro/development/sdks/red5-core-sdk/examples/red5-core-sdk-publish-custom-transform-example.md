---
title: Red5 Core SDK Examples - Custom Transform
description: ""
menu_order: 9
---

The Custom transform example shows how an application will get the first camera from a set provided by `r5::device` and use it to initialize a stream in the client object. It then adds a custom transform that renders a provided logo into a raw frame before streaming.

NOTE: The application will fail if there is no camera available for publishing

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.