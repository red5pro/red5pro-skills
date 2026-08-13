---
title: Red5 Core SDK Examples - Devices
description: ""
menu_order: 5
---

The Devices example shows how to use `r5::device` for enumerating different device types (ie, audio/video in or out).

`r5::device` provides the methods `GetAvailableCameras`, `GetAvailableMicrophones`, and `GetAvailableSpeakers` that will create sets of device objects. Each device object can be used as a parameter in `IClient::AddStream` to set up the stream for publishing or subscribing (depending on device type).

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.