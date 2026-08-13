---
title: Google Cloud Platform (GCP) Storage
description: ""
menu_order: 4
---

# Create Security Account

GCP allows using credentials specifically in the `Interoperability` mode. To be able to use this feature you need to first `enable` **Interoperability Access** for your Google cloud storage.

<u>**Obtain interoperable keys for GCP storage authentication**</u>

* Go to [https://console.cloud.google.com/storage/settings](https://console.cloud.google.com/storage/settings)
* Select the "Interoperability" tab

![GCP Storage Settings](/_images/special/cloudstoragevod/gcp_storage_settings.png)

* If you haven't enabled it already, click on "Interoperable Access"

Create a new service account:

Under **Access keys for service accounts**, click on *+Create a key for another service account*, then **CREATE NEW ACCOUNT**.

* Give the account a name (for example "Red5Prostorage") and description; click on CREATE. ![createserviceaccount](/_images/special/cloudstoragevod/createserviceaccount.png)
* Give the service account `Storage Admin` permissions, then click on CONTINUE. ![serviceaccountpermissions](/_images/special/cloudstoragevod/serviceaccountpermissions.png)
* You can skip the *optional* steps, and click on **DONE**
* Copy the `Access key` and `Secret` values that are displayed with the "New service account HMAC key" popup on account creation. **IMPORTANT: copy these values; you will need these for the cloudstorage configuration, and you can't retrieve them after you've closed this window**. ![servicehmackey](/_images/special/cloudstoragevod/servicehmackey.png)

## Set up a GCP Storage Bucket to be Used for VOD

Select your project & navigate to [Storage in GCP console](https://console.cloud.google.com/storage).

* Select **Browser** from the left-hand pane
* Click on **Create Bucket** to bring up the bucket creation UI
  * Enter a bucket name for your bucket (click CONTINUE)
  * Set storage class to **Multi-Regional** or **Regional** (Other storage classes are not currently supported)
  * If you choose **Multi-Regional**, select appropriate location from the dropdown list and if choosing **Regional**, select an appropriate `region` (click CONTINUE)
  * Choose `Standard` as the default storage class for your data (click CONTINUE)
  * Choose `Fine-grained` access to objects (click CONTINUE)
  * You can leave the Advanced settings as default. Click on **CREATE**.
  * After the bucket is created, click on the *Permissions* tab to verify that the account you created above is listed.

![createbucket](/_images/special/cloudstoragevod/gcp-storage-create-bucket.png)

## GCP Crossdomain access (for HLS storage)

If you are going to be using HLS recordings, then you must add a crossdomain.xml file to the root of your storage bucket. Create the following crossdomain.xml file locally and then copy it up to the bucket:

```xml
<cross-domain-policy>
<allow-access-from domain="*"/>
</cross-domain-policy>
```