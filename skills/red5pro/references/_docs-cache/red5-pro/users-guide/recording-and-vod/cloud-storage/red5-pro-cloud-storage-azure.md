---
title: Microsoft Azure Cloud Storage
description: ""
menu_order: 6
---

# Azure Storage Account Creation

* Log into [Azure Portal](https://portal.azure.com/), and select **Storage accounts** from Azure Services
* Click on Create, to Create a storage account
* Basics tab:
  * **Project details**: Provide Subscription and Resource group
  * **Instance details**: provide a Storage account name (`azure.account.name`) (note: the field can only contain lower case letters and numbers), and select the region where your storage container will be created. Keep other values as default. We will be keeping the Advanced, Networking, Data protection, and Tags default values, so we can just click **Review + Create** 
  * Click on **Create** button to finish.

![account](/_images/special/cloudstoragevod/azure-create-storage-account.png)

When the storage account has been created, click on **go to resource**, and from the left navigation panel, under **Security + networking** section, select **Access Keys**. There are two default access keys (key1 and key2), which can be manually "rotated" to update credentials.

Click on the *Show Keys* option at the top. Pick **key1** and copy the **Key** value (`azure.account.key`).

![account-keys](/_images/special/cloudstoragevod/azure-account-keys.png)

## Configure Resource sharing (CORS)

Under the **Settings** section, click on  **Resource sharing (CORS)**

Provide `*` under Allowed origins and create a rule with Allowed Methods `GET, HEAD`, then save the rule.

![cors](/_images/special/cloudstoragevod/azure-cors.png)

# Azure Blob Containers Creation

From the storage account overview page, under the **Data storage** section in left navigation panel, click on **Containers**, and **+Container** to add a new one.

Add new container, provide a Name (`azure.container.name`) (for this example, we are using `red5container01`), otherwise leave the default settings, and click on the **Create** button.

![create-container](/_images/special/cloudstoragevod/azure-create-new-container.png)

![created-container](/_images/special/cloudstoragevod/azure-container-created.png)

Now click on the container you just created, an click on **Shared access tokens** in the **Settings** section on the left.

* Make sure that the key from which you copied the credentials is selected (e.g, Key1). 
* Under the **Permissions** pull-down menu, select **Read, Create, Write and List**. 
* Under **Allowed protocols**, select **HTTPS and HTTP**. 

Now, click on **Generate SAS token and URL** (at the bottom of the page).

![sas](/_images/special/cloudstoragevod/azure-shared-access-tokens.png)

