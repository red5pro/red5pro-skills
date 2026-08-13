---
title: Red5 Core SDK Examples - Publishing via Stream Manager
description: ""
menu_order: 14
---

The Publishing via Stream Manager example shows how to send the [broadcast API](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-streams/#broadcast---simple-request) request to a Red5 Pro Stream Manager for an available node to publish your video stream. The `Red5ProStreamManager` interface can be used to integrate interactions with the Stream Manager into a client application. Its result can be used to set up the `ServerDescription` structure, which can be used to establish a connection with the server node.

Note that this example requires a Red5 Pro autoscale setup with an **active** nodegroup.

---

>See the [Basic Integration](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) example for project setup.