---
title: Red5 Pro Default Clustering Functions
description: ""
menu_order: 5
---

The main purpose of clustering is content distribution.

## Usage

The following capabilities provided by the Red5 Pro Server can benefit from clustering:

### &bull; Streaming

Every live stream published at the Origin is repeated by the Edges. There are no configurations to specify specific stream names eligible for repeating.

### &bull; Applications

The __ApplicationAdapter__ events - other than those mentioned above - are not broadcast between edges and origins. App joins, room starts, and other often used server events are not distributed.
