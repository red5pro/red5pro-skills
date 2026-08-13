---
title: Server Configuration
description: ""
menu_order: 8
---

The writer post processors used by FLVWriter are configured in the server's common configuration file: `conf/red5-common.xml`. The example below displays the configuration with the S3 post-processors (note - this bean exists in the file, you just need to modify & add the writer post processors value):

## Post Processor For AWS S3

```xml
<bean id="flv.impl" class="org.red5.io.flv.impl.FLV">
  <property name="cache">
    <ref bean="object.cache"/>

  </property>
  <property name="writerPostProcessors">
    <set>
      <value>com.red5pro.media.processor.S3UploaderPostProcessor</value>
    </set>
  </property>

</bean>
```

The S3UploaderPostProcessor uploads a supplied FLV file to an S3 bucket with a public read ACL and mime type of video/x-flv. For example, a stream named `stream1471289267434` recorded to the application `live` using a bucket named `red5-s3` would be made available at `https://s3.amazonaws.com/red5-s3/live/streams/stream1471289267434.flv` after the upload is completed. The HLS files, one `stream1471289267434.m3u8` and several `stream1471289267434_#.ts` files would be found in `https://s3.amazonaws.com/red5-s3/live/stream1471289267434`

## Post Processor For GCP Storage

```xml
<bean id="flv.impl" class="org.red5.io.flv.impl.FLV">
  <property name="cache">
    <ref bean="object.cache"/>

  </property>
  <property name="writerPostProcessors">
    <set>
      <value>com.red5pro.media.processor.GStorageUploaderPostProcessor</value>
    </set>
  </property>

</bean>
```

The GStorageUploaderPostProcessor uploads a supplied FLV file to a GCP storage bucket with a public read ACL and mime type of video/x-flv. For example, a stream named `stream1471289267434` recorded to the application `live` using a bucket named `red5-gcp` would be made available at `https://storage.cloud.google.com/red5-gcp/live/streams/stream1471289267434.flv` after the upload is completed. The HLS files, one `stream1471289267434.m3u8` and several `stream1471289267434_#.ts` files would be found in `https://storage.cloud.google.com/red5-gcp/live/stream1471289267434`

## Post Processor For Digital Ocean Spaces

```xml
<bean id="flv.impl" class="org.red5.io.flv.impl.FLV">
  <property name="cache">
    <ref bean="object.cache"/>

 <property name="writerPostProcessors">
    <set>
      <value>com.red5pro.media.processor.DOUploaderPostProcessor</value>
    </set>
</property>

</bean>
```

The DOUploaderPostProcessor uploads a supplied FLV file to a DO space with a private read ACL and mime type of video/x-flv. For example, a stream named `stream1471289267434` recorded to the application `live` using a bucket named `red5-space` in the `nyc3` regions would be made available at `https://red5-space.nyc3.digitaloceanspaces.com/live/streams/stream1471289267434.flv` after the upload is completed. The HLS files, one `stream1471289267434.m3u8` and several `stream1471289267434_#.ts` files would be found in `https://red5-space.nyc3.digitaloceanspaces.com/live/stream1471289267434`

## Post Processor For Azure Blobs

```xml
<bean id="flv.impl" class="org.red5.io.flv.impl.FLV">
  <property name="cache">
    <ref bean="object.cache"/>

 <property name="writerPostProcessors">
    <set>
      <value>com.red5pro.media.processor.AzureUploaderPostProcessor</value>
    </set>
</property>

</bean>
```

<!-- FIX ME The AzureUploaderPostProcessor uploads a supplied FLV file to an Azure blob container with a public read ACL and mime type of video/x-flv. For example, a stream named `stream1471289267434` recorded to the application `live` using a bucket named `red5-space` in the `nyc3` regions would be made available at `https://red5-space.nyc3.digitaloceanspaces.com/live/streams/stream1471289267434.flv` after the upload is completed. The HLS files, one `stream1471289267434.m3u8` and several `stream1471289267434_#.ts` files would be found in `https://red5-space.nyc3.digitaloceanspaces.com/live/stream1471289267434` -->

# Application Configuration

Every server application that will utilize cloudstorage for storage must have its configuration file modified to use the FilenameGenerator features. The live webapp  `(red5pro)/webapps/live/WEB-INF/red5-web.xml` includes a line for each cloud platform, which can be un-commented. Red5 Pro server applications use the `streamFilenameGenerator` bean when specified for locating media files for Playback or Recording; if the bean is not specified in an application's **red5-web.xml**, the default generator will be used which plays from and records to the application's streams directory.

## For AWS S3

`<bean id="streamFilenameGenerator" class="com.red5pro.media.storage.s3.S3FilenameGenerator"/>`

## For GCP Storage

`<bean id="streamFilenameGenerator" class="com.red5pro.media.storage.gstorage.GStorageFilenameGenerator"/>`

## For D.O. Spaces

`<bean id="streamFilenameGenerator" class="com.red5pro.media.storage.digitalocean.DOFilenameGenerator"/>`

## For Azure Blobs

`<bean id="streamFilenameGenerator" class="com.red5pro.media.storage.azure.AzureFilenameGenerator"/>`

# Troubleshooting

There is a separate log file for cloud storage operations: `{red5pro}/log/cloudstorage.log`
