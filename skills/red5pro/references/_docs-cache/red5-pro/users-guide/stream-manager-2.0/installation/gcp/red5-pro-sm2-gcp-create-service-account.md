---
title: Create a Service Account in GCP
menu_order: 3
---

## Creating a Service Account in GCP

* Go to the [IAM & Admin](https://console.cloud.google.com/iam-admin) page in the Google Cloud Console.

* On the IAM & Admin page, click on **Service accounts** in the left-hand menu, then click the **Create Service Account** button at the top of the page.

* In the **Service account name** field, For Example `red5pro-sa-gcp` and Enter an optional **Service account ID** For Example `red5pro-sm2.0` also Enter any descriptive name for your service account

* After entering the name, click **Create and Continue** button.

* On the next page, Assign roles to the service account. This step is **Optional** and can be customized based on requirements. For example, Select **Quick access** and then **Owner** under roles to Grant Full access permissions to this account.

* Once done, Click on **Continue** &rarr; click **Done** to finish creating the service account.

This service account can now be used for authenticating to Google Cloud services or managing resources via APIs.

