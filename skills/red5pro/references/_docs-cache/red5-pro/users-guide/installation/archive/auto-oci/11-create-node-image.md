---
title: Create Node Image
description: ""
menu_order: 12
---

1. After you've configured your node instance, go back to the *Instance details* page on the OCI dashboard.
2. Click *Stop* to stop the instance.
3. Click on the *More Actions* drop-down menu and select **Create Custom Image**
4. Give the image an easily identifiable name, and add the *Node Image Name* to your checklist, then click on **Create custom image**.
5. **NOTE**: you can use different images for different node types. This can be especially handy if, for example, you want to support HLS recording but not live streams. In this case, you could remove the `mpegts` plugin on the `EDGE` or `RELAY` server image. You could also, for example, create an image on a larger instance type and allocate more memory.