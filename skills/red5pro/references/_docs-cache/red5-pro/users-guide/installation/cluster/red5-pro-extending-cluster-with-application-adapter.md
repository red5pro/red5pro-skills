---
title: Extending
description: ""
menu_order: 6
---

There is an API to send service calls through the clustered instances. You can specify handlers at runtime, and call those handlers from your application. This is the same API that the Second Screen SDK uses to operate in the clustered environment.

If you need to broadcast session events for your clients - such as room join - each instance sets the business handler locally and at runtime calls it remotely.

The application adapter can query the instance to find if it is an edge or an origin. The application adapter can optionally broadcast user messages to all other clustered instances, all edges, all origins, a specific instance, or all instances excluding one or more.
