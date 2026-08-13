---
title: Before you begin
description: ""
menu_order: 2
---

> You will want to **keep a record** of the usernames, passwords, IP addresses, and other information generated during the setup process, as you will need the information for stream manager configuration and future operations via the API.

[Click here to download a handy list for tracking all of your Red5 Pro Autoscaling values](/docs_static/installation/static/AzureAutoScalingChecklist.rtf)

> Optional: download and install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)<br/>

For ease of administration, you may want to customize the **Favorites** menu (left hand navigation bar).

* Click on **More services >** to expand
* Click in the Star (to change from grey to gold) for the following:
  * Azure Active Directory
  * Subscriptions
  * Resource Groups
  * Public IP Addresses
  * Virtual Networks
  * Network Security Groups
  * Azure Database for MySQL servers
  * Virtual Machines
  * Images

 ![Favorites](/_images/installation/server/autoscaleazure/favorites.png)

**For some additional information on Red5 Pro Autoscaling on the Azure platform, check out [Autoscaling on Microsoft Azure - Overview](/docs/red5-pro/users-guide/installation/archive/jdk8-microsoft-azure/overview/)**

**Throughout this setup guide, we shall be using the azure resource prefix (ie: `<prefix>`) value as `red5proautoscaling`**

