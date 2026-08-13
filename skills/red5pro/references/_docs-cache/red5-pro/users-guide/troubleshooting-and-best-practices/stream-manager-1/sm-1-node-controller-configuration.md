---
title: NODE CONTROLLER CONFIGURATION SECTION
description: ""
menu_order: 3
---

To enable HTTP node monitoring, modify the following lines in the `NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS` section:

```xml
instancecontroller.checkCorruptedNodes=false
instancecontroller.corruptedNodeCheckInterval=300000
instancecontroller.corruptedNodesEndPoint=live
instancecontroller.httptimeout=30000
```

* Change `instancecontroller.checkCorruptedNodes=false` to `instancecontroller.checkCorruptedNodes=true`
* The default check interval (`instancecontroller.corruptedNodeCheckInterval`) is set to 300,000 milliseconds (5 minutes). You can make this more or less aggressive, keeping in mind that the more nodes you have active, the more load this will place on your stream manager.
* `instancecontroller.corruptedNodesEndPoint` is the webapp to target checking. The default webapp is the `live` webapp, but if you have a custom webapp and/or are not using the default `live` webapp, you can change this to target a different webapp
* `instancecontroller.httptimeout` is set to 30,000 (30 seconds) by default. This means that when it is checked, the node has 30 seconds to respond to the http request. If the stream manager doesn't get any response, or gets an error response, then the node will be terminated and replaced. As with the `checkInterval`, you can make this more or less aggressive as you wish.
