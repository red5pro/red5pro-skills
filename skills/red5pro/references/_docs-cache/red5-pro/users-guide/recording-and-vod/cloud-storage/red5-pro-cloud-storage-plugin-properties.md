---
title: Modify Cloudstorage Plugin Properties File
description: ""
menu_order: 7
---

# Cloudstorage Plugin Properties File

Unmodified `{red5pro}/conf/cloudstorage-plugin.properties` file:

```aconf
# Cloudstorage Plugin Properties

# Plugin Services
# for Orientation Postprocessor without cloudstorage
services=
# for AWS S3 cloudstorage
#services=com.red5pro.media.storage.s3.S3Uploader,com.red5pro.media.storage.s3.S3BucketLister
# for Google Cloud storage
#services=com.red5pro.media.storage.gstorage.GStorageUploader,com.red5pro.media.storage.gstorage.GStorageBucketLister
# for DO S3 cloudstorage
#services=com.red5pro.media.storage.digitalocean.DOUploader,com.red5pro.media.storage.digitalocean.DOBucketLister
# for Azure cloudstorage
#services=com.red5pro.media.storage.azure.AzureUploader,com.red5pro.media.storage.azure.AzureContainerLister

# Path
streams.dir=/tmp/
# Linux shell path (paths: /bin/sh, /bin/bash, /usr/bin/sh, /usr/bin/bash)
#shell.path=/usr/bin/sh
# Placeholder shell path to prevent shell use with newer FFMpeg versions which don't work well with exec watchdog kill
shell.path=/bin/notarealshell
# Full path to the ffmpeg executable (default linux path: /usr/bin/ffmpeg)
ffmpeg.path=/usr/local/red5pro/ffmpeg

# Time (increase if multiple appends are used or profile is slower than medium)
max.transcode.minutes=13

# Validate URL resource (not validating saves an HTTP connection per resource)
validate.url=false

# Automatically delete recordings upon upload success (true|false)
delete.recordings=false

# HTTP(S) endpoint to POST upload success/failure events to. Leave empty to disable.
# The mock round trip authentication server includes a test endpoint at http(s)://<host>:<port>/webhook
# If not set then value of `webhooks.endpoint` in Red5ProLive app will be used.
events.webhook.endpoint=

# Prefix of url at which saved object will be available publicly.
# If set, webhook report object will contain key
# publicUrl: ${storage.public.prefix}/${objectKey}
storage.public.prefix=

# FFMpeg command line for transcoding flv to mp4
# add the '-report' parameter after '-y' to get a log for debugging if problems occur

## TranscodePostProcessor
## Variables: 0=replaced with ffmpeg path, 1=input file path, 2=output file path

# LGPL command template
#ffmpeg.template=%s -y -i %s -acodec aac -b:a 128k -ar 48000 -strict -2 -vcodec libopenh264 -pix_fmt yuv420p -profile:v baseline -level 3.0 %s

# GPL command template (default is medium, for better quality decrease to slow or veryslow)
ffmpeg.template=%s -y -i %s -acodec aac -b:a 128k -ar 48000 -async 1 -strict -2 -vcodec libx264 -x264-params threads=0:lookahead_threads=0:sliced_threads=0 -vsync 1 -pix_fmt yuv420p -movflags faststart -preset medium -vf scale=%s:%s %s

## OrientationPostProcessor
## Variables: 0=input file path, 1=output file path

# LGPL command template for orientation filtering
#ffmpeg.filtercomplex.template=-y %s -filter_complex '%s' -map '%s' -c:a aac -c:v libopenh264 %s

# GPL command template for orientation filtering
ffmpeg.filtercomplex.template=-y %s -filter_complex '%s' -map '%s' -c:a aac -b:a 128k -ar 48000 -async 1 -c:v libx264 -x264-params threads=0:lookahead_threads=0:sliced_threads=0 -vsync 1 -pix_fmt yuv420p -movflags faststart -preset medium %s

# Flag to force libopenh264 usage in OrientationProcessor
#libopenh264=true

# Flag to enable or disable access to the cloud providers ACL settings
acl.access=false

# Flag to enable or disable CORS modification; if enabled the plugin will add CORS headers to the bucket
cors.enabled=true

# Bucket name strategy to use when adding to a bucket.
# Valid values are: none, timestamp, datetime, random
# none: bucket name will be used as is, no changes will be made
# timestamp: bucket name will be appended with an epoch time in milliseconds
# datetime: bucket name will be appended with a date and time in the format: yyyy-MM-dd / epoch time in milliseconds
# random: bucket name will be appended with a random UUID
bucket.name.strategy=none

# NOTE ON BUCKET NAMING
# AWS S3, GOOGLE STORAGE, and DIGITALOCEAN use the S3 API and must conform with DNS requirements, these constraints apply:
# Bucket names should not contain underscores
# Bucket names should be between 3 and 63 characters long
# Bucket names should not end with a dash
# Bucket names cannot contain adjacent periods
# Bucket names cannot contain dashes next to periods (e.g. "my-.bucket.com" and "my.-bucket" are invalid)</li>
# Bucket names cannot contain uppercase characters

# AWS Configuration
#aws.endpoint= <-for custom S3
aws.access.key=YOUR_AWS_ACCESS_KEY
aws.secret.access.key=YOUR_AWS_SECRET_ACCESS_KEY
# Bucket name
aws.bucket.name=YOUR_BUCKET_NAME
# Full region name of bucket, like: us-east-1, eu-west-2, ap-southeast-1
aws.bucket.location=us-east-1
# Valid access control list policies are: none, public-read, authenticated-read, private, public-read-write
aws.acl.policy=public-read

# AWS Secret Manager Configuration
aws.secret.manager.access.key=YOUR_AWS_SECRET_MANAGER_ACCESS_KEY
aws.secret.manager.secret.access.key=YOUR_AWS_SECRET_MANAGER_SECRET_ACCESS_KEY
# Default secret id
aws.secret.manager.default.secret.id=THE_SECRET_MANAGER_KEY_CONTAINING_THE_BUCKET_CREDENTIALS
# Full region name, like: us-east-1, eu-west-2, ap-southeast-1
aws.secret.manager.region=us-east-1
# Maximum number of keys to cache. Cache uses LRU (Least Recently Used) eviction policy
aws.secret.manager.cache.size=1000
# Cache entry expiration time in minutes. 0 disables the cache, while -1 never expires keys
aws.secret.manager.cache.expiration.time=60

# Google Storage Configuration
gs.access.key=YOUR_GOOGLE_STORAGE_ACCESS_KEY
gs.secret.access.key=YOUR_GOOGLE_STORAGE_SECRET_ACCESS_KEY
# project id used to ensure the bucket is unique
gs.project.id=YOUR_PROJECT_ID
# Bucket name
gs.bucket.name=YOUR_BUCKET_NAME

# DigitalOcean Space Configuration
do.access.key=YOUR_DO_ACCESS_KEY
do.secret.access.key=YOUR_DO_SECRET_ACCESS_KEY
# do not modify endpoint value
do.endpoint=digitaloceanspaces.com
# Bucket name
do.bucket.name=YOUR_BUCKET_NAME
# Valid locations are: sfo3, fra1, ams3, nyc3, sgp1
do.bucket.location=YOUR_DO_DROPLETS_REGION
# Uploaded files access; uncomment for public access
# do.files.private=false

# Azure Blob Configuration
azure.account.name=YOUR_ACCOUNT_NAME
azure.account.key=YOUR_ACCOUNT_KEY
# Container name
azure.container.name=YOUR_BUCKET_NAME
# do not modify endpoint value
azure.endpoint=blob.core.windows.net
```

## Cloudstorage Plugin Properties - General

For all cloud platforms, the following properties can be modified in the `conf/cloudstorage-plugin.properties` file:

* `ffmpeg.path` = Full path to the FFMpeg executable (for orientation post-processor only). The default for server versions 9.0 and higher, customers need to get the FFmpeg distribution from Red5 Pro support, and the default path should be `/usr/local/red5pro/ffmpeg`. The path may vary based on your installation and operating system, so adjust accordingly. If your Linux install has the `which` app installed, you can run `which ffmpeg` to find the path.
* `max.transcode.minutes` = Maximum time in minutes allotted for transcoding to run per file. *It is recommended to set this to the approximate maximum length of expected recordings.*

### Enable or disable access to the cloud providers ACL settings

This flag allows access to the cloudstorage plugin for manipulation of the ACL, if enabled `acl.access=true`; otherwise the plugin will not be allowed access to the ACL settings. The ACL settings are used to set the access control list for the uploaded files. When disabled `acl.access=false` (default) the bucket owner will be responsible for setting the ACL on the bucket and files.

### Flag to enable or disable CORS modification; if enabled the plugin will add CORS headers to the bucket

This flag allows the plugin to modify the CORS settings of the bucket, if enabled `cors.enabled=true` (default); otherwise the plugin will not be allowed to modify the CORS settings. The CORS settings are used to set the CORS headers for the uploaded files. When disabled `cors.enabled=false` the bucket owner will be responsible for setting the CORS headers on the bucket and files.

### Bucket name strategy to use when adding to a bucket

This option allows the plugin to modify the bucket name when uploading files to the cloud storage. The bucket name will be modified based on the selected strategy. The strategies are defined in the `bucket.name.strategy` property in the `conf/cloudstorage-plugin.properties` file. Valid strategies are:

* none: bucket name will be used as is, no changes will be made
* timestamp: bucket name will be appended with an epoch time in milliseconds
* datetime: bucket name will be appended with a date and time in the format: yyyy-MM-dd / epoch time in milliseconds
* random: bucket name will be appended with a random UUID

_Note_ The bucket name strategy is only applied when uploading files to the cloud storage. It does not affect the bucket name used for listing files or other operations. Also, please note that the bucket name strategy only applies to the **AWS S3** at this time.

### Cloudstorage Plugin Properties - AWS

For AWS S3, the following properties can be modified in the `conf/cloudstorage-plugin.properties` file:

* `services` comment out `services=` and uncomment `com.red5pro.media.storage.s3.S3Uploader,com.red5pro.media.storage.s3.S3BucketLister`
* `aws.access.key` = Your AWS access key.
* `aws.secret.access.key` = Your AWS secret access key.
* `aws.bucket.name` = The S3 bucket in which files will be stored.
* `aws.bucket.location` = Full region name (like: us-east-1, eu-west-2, ap-southeast-1) of the S3 bucket.

### Cloudstorage Plugin Properties - GCP

For Google Cloud Platform (GCP) Storage, the following properties can be modified in the `conf/cloudstorage-plugin.properties` file:

* `services` comment out `services=` and uncomment `com.red5pro.media.storage.gstorage.GStorageUploader,com.red5pro.media.storage.gstorage.GStorageBucketLister`
* `gs.access.key` = Your Google storage access key
* `gs.secret.access.key` = Your Google storage secret access key
* `gs.bucket.name` = The GCP storage bucket in which files will be stored.

### Cloudstorage Plugin Properties - Digital Ocean

For Digital Ocean Spaces, the following properties can be modified in the `conf/cloudstorage-plugin.properties` file:

* `services` comment out `services=` and uncomment `services=com.red5pro.media.storage.digitalocean.DOUploader,com.red5pro.media.storage.digitalocean.DOBucketLister`
* `do.access.key`= Your Digital Ocean key from above
* `do.secret.access.key`= The secret key associated with the key
* `do.endpoint` leave as the default digitaloceanspaces.com
* `do.bucket.name`= your space name
* `do.bucket.location`= the region where your space was created (Valid locations are: ams3, fra1, nyc3, sfo3, sgp1)
* `# do.files.private=false` = if you wish to make the recorded files public, then uncomment

### Cloudstorage Plugin Properties - Microsoft Azure

For Microsoft Azure Blob Storage, the following properties can be modified in the `conf/cloudstorage-plugin.properties` file:

* `services` comment out `services=` and uncomment `services=com.red5pro.media.storage.azure.AzureUploader,com.red5pro.media.storage.azure.AzureContainerLister`
* `azure.account.name=` = Your Azure storage account.
* `azure.account.key=` = Your Azure storage account key.
* `azure.container.name` = The blob container in which files will be stored.
* `azure.endpoint = blob.core.windows.net` (leave this default)