---
title: 3. Create the Master Resource Group 
description: Create the Master Resource Group for the Autoscaling Setup
menu_order: 6
---

Create a Resource Group in your region of choice. This will be the default region for the group. A Resource group can hold resources from different regions, so there should not be an issue with cross region resources management.

**To create a master resource group:**

* Navigate to [Resource Groups](https://portal.azure.com/#blade/HubsExtension/Resources/resourceType/Microsoft.Resources%2Fsubscriptions%2FresourceGroups) menu
* Click on **+Add**
* Fill in the form displayed:
  * Enter Resource group name
  * Select a subscription (Use the same subscription that is used for AD access authentication)
  * Select the location of the Resource Group
* Click **Create** to create the resource group

![Autoscaling Resource Group](/_images/installation/server/autoscaleazure/new-resource-group.png)
