---
title: Autoscale Best Practices and Troubleshooting
description: ""
menu_order: 1
---

There are a lot of moving pieces in autoscaling. The following set of documents will help identify pinch points and help with implementing the best strategies for autoscale deployment and troubleshooting.

As a general rule, if you have an event-based solution then it is recommended to refresh your environment between events. Specifically: take down the nodegroup, cycle your stream manager(s), then launch a new nodegroup.