---
title: Stream Manager Roles Optimization
description: ""
menu_order: 12
---

In the Red5 Pro Autoscaling solution, the stream manager has two main roles:

1. Node/Nodegroup scale management (the `cloudWatchHost` value set in your nodes' `autoscale.xml` file)
2. Publisher/Subscriber proxy

Running your production stream manager(s) behind a load balancer is always recommended. However, there are some cases where you may want to further balance your traffic by bifurcating the two roles.

## Splitting Stream Manager Load

![multi-sm](/_images/troubleshooting/auto/sm-multi-role.drawio.png)

The diagram above shows a model for setting up two separate Stream Manager load balancers: one to manage the incoming client broadcast/subscribe API requests, and a second one to manage the node status requests.

In this model, the client-facing load balancer can manage the HTTP/HTTPS traffic without impacting the node management. Even if your front end were to become unresponsive due to a flood of traffic, the existing nodes and stream connections would not be impacted.

For the **Node Management Stream Managers**, it is recommended to use exactly two(2) behind the load balancer for high availability. More than two is not recommended at this time.

---

![multi-sm-flow](/_images/troubleshooting/auto/sm-roles-animation06.gif)