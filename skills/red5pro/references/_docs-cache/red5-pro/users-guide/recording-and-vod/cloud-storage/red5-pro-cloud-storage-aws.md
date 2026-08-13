---
title: AWS S3 Cloud Storage
description: ""
menu_order: 3
---

# AWS - Create Security Account

<u>**Obtain security credentials for storage account S3 access:**</u>

* Go to the [Amazon Identity and Access Management Dashboard](https://console.aws.amazon.com/iam/home#home)
* From the left-hand navigation, choose Users
* Click on Add user
* Enter a User name: (for example, "s3accessuser"); Select AWS Access type **Programmatic access**; click on Next: Permissions
* Choose _Attach existing policies directly_; Search for and choose **AmazonS3FullAccess**; click on Next: Review
* Click Create user
* Click **Show** under *Secret access key* to reveal the key generated. **It is critical that you make a note of this, as you will not be able to retrieve it from the AWS console after you close the creation screen.**
* Click “download Credentials” button to download a csv file with the credentials to your computer. You will not have this option again, so keep this file in a safe place!
* Click “close” to close the window and return to IAM Users screen.
* You should be able to see the user you recently created - “s3accessuser” in the list on the page.

## Set up an S3 Storage Bucket to be Used for VOD

Navigate to [S3 Storage on AWS](https://console.aws.amazon.com/s3/).

Click on the **Create Bucket** button.

Enter a bucket name and choose the region you wish it to be hosted in. (Note: bucket names must contain only lowercase characters. Also the bucket name cannot include any periods (.) or spaces, otherwise the playback feature will fail).

De-select "Block *all* public access" to allow access through ACLs.

Click on **Create**.
![createbucket](/_images/special/cloudstoragevod/creates3bucket2.png)

## Securing your S3 Bucket

**Note: By default AWS encrypts the S3 buckets using Amazon S3-managed keys which encrypt the data at rest. Depending on your security policy, other settings can be selected.  Refer to your internal security policy for guidance on this setting. The S3 bucket used to store videos can potentially contain sensitive data, please ensure to use the appropriate settings to secure this bucket.**

The following are ACL settings that can be used depending on your use case:
* public-read: Allow public viewing of the videos stored in the S3 bucket
* authenticated-read: Allow authenticated viewing of the videos stored in the S3 bucket
* private: Allow private viewing of the videos stored in the s3 bucket

After the bucket has been created, click on the Permissions tab, and make sure that the following CORS rule is set (this is necessary for HLS metadata records):

```json
[
    {
        "AllowedHeaders": [],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3600
    }
]
```