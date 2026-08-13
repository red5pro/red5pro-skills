---
title: 1. Get credentials for Stream Manager
description: ""
menu_order: 4
---

>These credentials will be used to access Azure resources (Tenant ID, Client ID, Client Secret and Subscription ID),

## Register Stream Manager application in your Azure active directory

* Go to the [Azure portal](https://portal.azure.com/)
* Navigate to the [Active Directory Menu Blade](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview). You can select the pushpin icon in the top right to pin the menu to your dashboard.
* If you have multiple active directories, make sure to switch to the correct one first (from the top left corner of the portal) .
* With the directory selected click on “App registrations” menu item.
 ![Register Application](/_images/installation/server/autoscaleazure/app-registration.png)
* Click on **New application registration** and fill in the details for identifying the web application.
  * **Name** : streammanager
  * **Application type**: Select Web app/API
  * **Sign-on URL**: Enter the DNS name of the web app if you have it otherwise you can fill in a temporary URL that can be changed later. Usually since Stream Manager uses SSL cert for WebRTC, You should use the domain name associated with the SSL, but you can use any placeholder. This is not used for Red5 Pro Autoscaling.

![Enter Application Info](/_images/installation/server/autoscaleazure/app-registration-1.png)

* When you are ready, click on **Create**
* Once the application registered in the AD it appears in the clients list.![Application Registered](/_images/installation/server/autoscaleazure/app-registration-complete.png)
* Now click on the application and you will see the **Application-ID** of the web app listed under *Essentials*. This is the `az.clientId` value. You should copy this to a safe place for future reference.

![Get Client ID](/_images/installation/server/autoscaleazure/streammanager-appid.png)

* With the application selected, select the **Keys** menu item from the right side panel. Use this to generate a secret key for the Stream Manager web app. After clicking on **Keys**, enter a key description and select **Never Expires** for the key.

![Generate Client Secret](/_images/installation/server/autoscaleazure/streammanager-create-key-generated.png)

* Click the **Save** button and the key will be generated automatically. Make sure to copy the key value to a safe location for future reference. This is our client key/secret which is required as a part of authentication info.
* Now select **Azure Active Directory** from the left pane once again and select the **Properties** menu item. Here you will find the active directory ID. Copy this to a safe location for future reference. This is the `az.tenantId` value which is a essential part of the authentication info.

![Get Tenant ID](/_images/installation/server/autoscaleazure/streammanager-tenantid.png)

Now we must assign a access role to the application so that it has the right permissions to carry out the operations that it is intended for. With the “Azure Active Directory” selected:

* Navigate to [Subscriptions](https://portal.azure.com/#blade/Microsoft_Azure_Billing/SubscriptionsBlade).
* Click and select the subscription account that the autoscaling setup will be using
* Click on **Access Control (IAM)**
* Click the **Add** button to add a new role and ensure the following values for the form.
  * **Role**: Select an appropriate role with sufficient permissions (ex: contributor)
  * **Assign access to**: Azure AD user, group or application
  * **Select**: Type in the application name (streammanager)
  * Once the application is shown, click to select it
  * Click **Save** to save the IAM settings for the application.

 ![IAM Settings](/_images/installation/server/autoscaleazure/app-iam-role.png)

* With the subscription selected, click on **Properties** to find the Subscription ID. Copy this to your Azure AutoScaling Checklist for future reference. This is part of the authentication info that is required by the Stream Manager web app.

![Subscription Properties](/_images/installation/server/autoscaleazure/subscription-properties.png)