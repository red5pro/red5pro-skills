---
title: Create New Launchconfig and New Nodegroup
description: ""
menu_order: 3
---

It is recommended to [create a new launch configuration](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-launchconfig/#create-launch-configuration) which references the new disk image(s). Retaining your old launch configuration will allow you to roll back in the unlikely event that you encounter any issues with the new build.

After you create the new launch configuration, [create a new nodegroup](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-groups/#create-group) and [add an origin](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-groups/#launch-new-origin) to initiate that nodegroup.

Once the new nodegroup is live, you can delete the existing nodegroup.

> Note: currently there is no way to "sunset" a nodegroup, so you will require a small amount of downtime to fal 



