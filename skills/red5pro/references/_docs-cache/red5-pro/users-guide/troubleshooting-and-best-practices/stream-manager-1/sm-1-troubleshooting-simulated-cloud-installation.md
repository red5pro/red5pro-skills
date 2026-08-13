---
title: Troubleshooting Simulated Cloud Autoscale Deployment
description: ""
menu_order: 17
---

1. Simulated cloud uses a local `sqlite` database to store and manage instance provisions. This file is generated in the WEB-INF folder under a directory named by the controller, ie: `RED5_HOME/webapps/streammanager/WEB-INF/Simulated-Cloud-Platform/hostednodes.sqlite`. If needed, this file can be edited with any sqllite editor such as the [SQLite Manager - Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager-webext/).
2. Instances need to have the Red5 Pro service running before they can be added to the simulated cloud environment via the Provisioning API.
3. By default when a node is added it is considered to be in an `available` state in the provision pool. When Stream Manager requests a new instance, the controller will provide a node from this list.
4. When Stream Manager scales down an instance, it is automatically `reset` and added back to the provision list for reuse.
5. When Stream Manager requests the deletion of a node, the controller checks the `managed.recycleDeadNode` flag setting. If it is set to `true` the controller tries to reprovision the instance if it can (if the node service is reachable). If the node cannot be reprovisioned, it is set to a `TERMINATED` state.
6. To reuse a `TERMINATED` instance, you must manually reboot the remote node server and then use the `RESET` API call to set the `TERMINATED` node into an available `RUNNING` node for use.
7. Stream Manager logs a warning message when a node is trying to ping it but does not exist in the system yet. With the Simulated Cloud Environment, you may see a lot of this because the instances are already running but may not be in use by Stream Manager.
8. **VERY IMPORTANT:** If you have more than one autoscaling environment running, it is essential that the `instancecontroller.instanceNamePrefix=` property *is set to a completely unique value for each environment*, or the first stream manager may terminate the nodes belonging to the second group.  For example, if you have one environment with `instancecontroller.instanceNamePrefix=node` and another one with `instancecontroller.instanceNamePrefix=node123`, the `node123` instances will be terminated by the first stream manager. This occurs because it identifies them as starting with `node` and therefore as instances it should be managing, and which are not present in its database. Find the `instancecontroller.instanceNamePrefix=` in the `{red5pro}/webapps/streammanager/WEB-INF/red5-web.properties`, and edit it accordingly.
9. If you have created a new nodegroup, but adding an Origin server doesn't automatically initiate an accompanying Edge server, check the following on your server instance:


## Order of Operations - Simulated Cloud

If you have any issues with or are updating anything in your environment, you should restart your instances in the following order:

1. Restart the ORIGIN server(s) first
2. Then, restart the EDGE server(s)
3. Finally, restart the STREAM MANAGER last.
