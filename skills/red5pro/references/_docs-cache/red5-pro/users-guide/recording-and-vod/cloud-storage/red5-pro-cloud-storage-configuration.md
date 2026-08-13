---
title: Custom Cloudstorage Options
description: ""
menu_order: 2
---

## Cloudstorage-plugin.properties Options

In addition to cloud-specific settings, the `red5pro/conf/cloudstorage-plugin.properties` includes custom post-processing options.

## Cloudstorage Parameters

As of release 10.3.0, the cloudstorage plugin supports receiving a set of parameters from a publishing client that specify the **bucket name**, **bucket location**, **storage path** and **storage name** to use for stream recordings on cloud storage.

This feature is automatically enabled and does not require any additional configuration. For example, to use it with S3 one would need to configure the server for cloud storage to S3. As long as the cloud storage parameters are provided in the publish request, the plugin will automatically use this feature during the upload. On the other hand, if they are not provided the plugin will use the default storage path and names for backward compatibility.

### Uploading Recordings

The cloudstorage parameters are to be passed as part of the connection parameters. For example, a WebRTC publisher would pass the the following:

```xml
config.connectionParams = {
    cloudstorageParameters: JSON.stringify({
        bucketName,
        bucketLocation,
        storagePath,
        storageName
    })
```

For an RTMP/E publisher, they are passed as part of the request:

`rtmp://<node-IP>:1935/live/<stream-name>?cloudstorageParameters=Base64({"bucketName":"<bucket>","bucketLocation":"<region>","storagePath":"<path>","storageName":"<name>"})`

Where:

* `bucketName` - Is the name of the bucket where to store the recordings
* `bucketLocation` - Is the full name of the region where the bucket is deployed. For example, `sfo3`, `us-east-1`, `us-east1`
* `storagePath` - Is the path in the bucket where to store the recordings
* `storageName` - Is the filename to use for the recordings


The plugin parses and stores these parameters. When processing a recording, it attempts to find the associated parameters based on the GUID of the recording's stream. If found, those are used for the upload. If not found, the default configuration in `cloudstorage-plugin.properties` and storage names are used.

Note: For security reasons, the cloud storage access keys will always be retrieved from `cloudstorage-plugin.properties`. Therefore, those credentials will need to have access to all the bucket names that may be specified in the `bucketName` property.

***Example***

The server is configured to generate and upload HLS, FLV and MP4 recordings, and a stream `live/stream1` is published with `cloudstorageParameters`:

```xml
config.connectionParams = {
    cloudstorageParameters: JSON.stringify({
        bucketName: 'my-bucket',
        bucketLocation: 'sfo3',
        storagePath: 'my/path,
        storageName: 'my-stream-name'
    })
```

Then, the following files will be uploaded to the bucket `my-bucket` in `sfo3`:

```shell
my/path/my-stream-name.flv
my/path/my-stream-name.mp4
my/path/my-stream-name.m3u8
my/path/my-stream-name_1.ts
my/path/my-stream-name_2.ts
...
my/path/my-stream-name_n.ts
```
