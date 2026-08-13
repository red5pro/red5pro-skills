---
title: Video On Demand via Cloudstorage
description: ""
menu_order: 1
---

The use of the Cloud Storage Plugin requires configuration in both the server and in each application utilizing the plugin features. The plugin configuration consolidates the majority of properties required to access cloud storage on Amazon S3 (AWS), Google Cloud Platform (GCP), or Digital Ocean (DO). The server configuration must identify the post-processor implementations to use in conjunction with the FLVWriter. An application which will utilize cloud storage for recording and playback has to contain the bean entry for custom file name generator or it will use the Red5 Pro default location.

In order to use AWS, GCP, or DO storage you will need to:

1. Create user credentials on the cloud platform
2. Create a storage bucket on the cloud platform
3. Modify the `{red5pro}/conf/cloudstorage-plugin.properties` file with the credentials and bucket information
4. Modify the `{red5pro}/conf/red5-common.xml` file to include the cloud storage post-processor
5. Modify your webapp's `red5-web.xml` file to include the cloudstorage post-processor information
