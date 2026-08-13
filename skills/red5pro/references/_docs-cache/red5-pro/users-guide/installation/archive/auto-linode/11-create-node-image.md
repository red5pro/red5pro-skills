---
title: Create Node Image
description: ""
menu_order: 11
---

* From the left-hand navigation of the Linode dashboard, click on the image in the left panel on Linode Cloud and select the **Create Image** option from the top right.
* Select the Linode instance created for Node Image instances and add image label
* Make a note of the Node Image name.

**Note:** The Terraform script for Linode requires the `image id`. The Linode Private Images have IDs which begin with `private/12xxxx`. These images are account-specific and only accessible to users with `images:read_only` authorization. To view private Images you have access to in addition to public images, call the [Private Images API](https://techdocs.akamai.com/linode-api/reference/post-image) endpoint with authentication.


