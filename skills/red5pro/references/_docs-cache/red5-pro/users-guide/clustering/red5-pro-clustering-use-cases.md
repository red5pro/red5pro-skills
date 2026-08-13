---
title: Clustering Use cases
description: ""
menu_order: 5
---

The following sections describe several use cases for utilizing clusters.

## Two Servers

A most common use case for small productions and events is to have one Origin and one Edge. The Origin is included in the round robin and because of that, both servers receive subscribers.

Both the Origin and Edge __cluster.xml__ files are edited to show `privateInstance` is `false`.

The Edge is also configured with the Origin IP. The Edge initiates the connection and reconnection if the Origin becomes unavailable.

### Publishers for Two Servers

Stream providers use the Origin IP as the server to connect to. The streams are then repeated at the Edge.

### Subscribers for Two Servers

Subscribing clients use the Origin IP to call the round robin service and receive either the edge or the Origin IP. They then subscribe to the stream at the provided host IP.

![Two Server Clustering](/_images/special/clusters/cluster-docs.png)

---

## One Origin and Three Edges

Another common use case is to have multiple Edges and one Origin where subscribers are given only the Edge IP.

The Origin __cluster.xml__ file is edited to show `privateInstance` is `true`. This removes it from round robin sequencing. Edges are all set so `privateInstance` is `false`.

The Edges are configured with the Origins IP, and they will initiate the connection to the Origin and reconnection if the Origin becomes unavailable.

### Publishers for One Origin and Three Edges

Stream providers use the Origin IP as the server to connect to. The streams are then repeated at the Edges.

### Subscribers for One Origin and Three Edges

Stream consumers use the Origin IP for calling the round robin servlet. They then subscribe to the stream at the provided host IP.

![One Origin and Three Edges](/_images/special/clusters/cluster-docs-3-2e.png)

---

## Multiple Origins

After setting up three Edges and One origin as described, you can add another Origin. All Edges are given two Origin IPs in the __cluster.xml configuration file__.

Restart the Edges and the new Origin.

### Publishers for Multiple Origins

Publishers can use either origin and all streams will be received by all edges.

### Subscribers for Multiple Origins

Subscribers can use the round robin service at either Origin and receive an active Edge IP.

![One Origin and Three Edges](/_images/special/clusters/cluster-docs-4-202e.png)

---

## Daisy Chain

If the broadcasters are in one geographic region and subscribers in another one very far removed, then one might want to set up a server cluster with intermediary servers between the Edge and Origin servers. In this case, the first intermediary server would be set up as an Edge server referencing the Origin server in its __cluster.xml configuration file__. The next intermediary server would reference the previous intermediary as an Origin server in its __cluster.xml configuration file__; and the final link in the chain would reference the previous intermediary server as its Origin in its __cluster.xml configuration file__.

![Daisy Chain](/_images/special/clusters/R5PIntermediaryFlow.png)
