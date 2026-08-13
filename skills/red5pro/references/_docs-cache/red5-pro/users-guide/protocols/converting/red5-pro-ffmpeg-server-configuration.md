---
title: Server Configuration and Optimization
description: ""
menu_order: 4
---

## red5-common.xml

The writer post processor used by FLVWriter is configured in the server's common configuration file: `(red5pro)/conf/red5-common.xml`. The example below displays the configuration with the TranscodePostProcessor (note - this bean exists in the file, you just need to modify & add the writer post processor value):

```xml
<bean id="flv.impl" class="org.red5.io.flv.impl.FLV">
  <property name="cache">
    <ref bean="object.cache"/>
  </property>
  <property name="writerPostProcessors">
    <set>
      <value>com.red5pro.media.processor.OrientationPostProcessor</value>
    </set>
  </property>
</bean>
```

This configuration indicates the orientation writerPostProcessor which implements IPostProcessor, and will be executed after a file is finalized by the FLVWriter.

If you choose to use both the S3UploaderPostProcessor and the OrientationPostProcessor methods, then the bean should look like:

```xml
<bean id="flv.impl" class="org.red5.io.flv.impl.FLV">
  <property name="cache">
    <ref bean="object.cache"/>
  </property>
  <property name="writerPostProcessors">
    <set>
      <value>com.red5pro.media.processor.OrientationPostProcessor</value>
      <value>com.red5pro.media.processor.S3UploaderPostProcessor</value>
    </set>
  </property>
</bean>
```

## cloudstorage-plugin.properties

If you are using local (or nfs-mounted) storage for your recordings, then make sure that the `{red5pro}/conf/cloudstorage-plugin.properties` file has nothing specified for Plugin Services.

```xml
# Plugin Services
# for Orientation Postprocessor without cloudstorage
services=
```

If you are using cloudstorage in addition to post-processing, then comment that line out, and uncomment the `AWS S3` or `Google Cloud Storage` services.

Make sure that the `ffmpeg.path` is pointing to your ffmpeg install - type in (it will be `/usr/bin/ffmpeg` if you install ffmpeg per the instructions above).

---

Additional FFMpeg compilation detail may be found here: [Ubuntu FFMpeg Compilation Guide](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu)

## Server optimization for post-processing

By default, ffmpeg will use as much CPU and memory as it can get in order to process the conversion as quickly as possible. You can slow ffmpeg down to use fewer resources by adding the `re` flag. **Note that this will basically convert the file in "real-time" - so that a five-minute clip will take five minutes (instead of 30 seconds).**

To implement this for the `OrientationPostProcessor`, modify the `{red5pro}/conf/cloudstorage-plugin.properties` file.

If you are using LGPL:

change `ffmpeg.template=%s -y -i %s -acodec aac -b:a 128k -ar 44100 -strict -2 -vcodec libopenh264 -pix_fmt yuv420p -profile:v baseline -level 3.0 %s` to `ffmpeg.template=%s -y -re -i %s -acodec aac -b:a 128k -ar 44100 -strict -2 -vcodec libopenh264 -pix_fmt yuv420p -profile:v baseline -level 3.0 %s`

If you are using GPL (default):

change `ffmpeg.template=%s -y -i %s -acodec aac -b:a 128k -ar 44100 -strict -2 -vcodec libx264 -pix_fmt yuv420p -preset medium %s` to `ffmpeg.template=%s -y -re -i %s -acodec aac -b:a 128k -ar 44100 -strict -2 -vcodec libx264 -pix_fmt yuv420p -preset medium %s`