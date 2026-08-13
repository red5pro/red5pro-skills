---
title: Clustering
description: ""
menu_order: 20
---

With a typical high capacity web site which serves static files and scripts, load balancing is used and every client facing server is a mirror image of a master with a shared database.

Live streams are almost always unicast over UDP or TCP to a distribution server. The subscribers are also TCP or UDP unicast receivers. When it is time to add more capacity for live content, it is not practical to have the broadcaster publish to additional servers. As such, other servers must be able to acquire and repeat the streams in real time.

The Clustering Plugin available from Red5 Pro allows for:

* Basic Clustering that provides more than one endpoint of a broadcast stream to subscribers
* Advanced Clustering that provides more than one endpoint for publishers to broadcast to as well as multiple endpoints for subscribers


> For larger cluster environments, consider using [Red5 Pro Autoscaling](/docs/red5-pro/users-guide/clustering/), which allows for cluster scaling based on load.
