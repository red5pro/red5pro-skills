---
title: Stream Manager Sunset API
description: ""
menu_order: 9
---

The [Sunset Node API](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-nodes/#SunsetNode) allows the Node Checker, *or a user*, to report an Edge server that is not propery working. When the edge is reported, the Stream Manager will stop forwarding new subscribers to it and it will create a new edge to compensate for the capacity loss. At the same time, the Stream Manager will monitor the existing clients of a reported edge and once all of them disconect, it will remove the edge.