---
title: Red5 Pro FLV Convert To MP4
description: Converting FLV files to MP4 via Post Processing (Orientation Post Processor)
---

Red5 Pro records files as FLV, but many people have asked about how to convert those files easily to MP4 so that more media players can be used to view them. The Red5 Pro `OrientationPostProcessor` uses FFMpeg to transcode a supplied FLV into an MP4 with all the recorded orientation events applied to the final video output. This allows the media to be played back without needing to handle orientation metadata. The processor may be used in combination with the [S3UploaderPostProcessor](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/) to upload converted media once completed; the MP4 will be uploaded to the cloud alongside the FLV. Note that it does take time to convert to MP4, depending on the length of your recording, so the MP4 version will not be immediately available.

## FFMpeg

The Transcoder uses two native applications: [FFMpeg](https://www.ffmpeg.org/) and an h.264 encoder, either [x264](http://www.videolan.org/developers/x264.html) or [OpenH264](http://www.openh264.org/).

Having FFmpeg with h.264 support as a dependency carries licensing information along with its use / deployment. There are two primary licenses we are concerned with herein, [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.html) and [GNU Lesser General Public License](https://www.gnu.org/licenses/lgpl-3.0.html). GPL being the most restrictive of the two and requiring the implementer to meet their specific requirements (see the license and/or consult your lawyer).

### Installing FFMpeg via apt-get

From [How to Install FFmpeg 3.3. in Ubuntu 16.04, 14.04](https://ubuntuhandbook.org/index.php/2017/05/install-ffmpeg-3-3-in-ubuntu-16-04-14-04/).

In order to use the new OrientationPostProcessor method, you must have at least version 3.3 of FFMpeg.  If you have an older version of FFmpeg installed, remove that first:

```sh
sudo apt-get remove ffmpeg
```

Then, add the `jonathonf` ppa:

```sh
sudo add-apt-repository ppa:jonathonf/ffmpeg-3
```

And confirm the resulting message by pressing [enter].

If you are on Ubuntu 14.04, you will also need to run:

```sh
sudo add-apt-repository ppa:jonathonf/tesseract
```

Next:

```sh
sudo apt update && sudo apt upgrade
```

Now FFmpeg is available to be installed with apt:

```sh
sudo apt-get install ffmpeg
```

# Server Configuration

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

## HLS Append Recording and Rotation Metadata

(feature available with Red5 Pro server release 5.6.0)

Append recording for HLS is achieved with post-processing, using the `OrientationPostprocessor` and `ffmpeg`. If you wish to use the `append` record type with HLS recordings, you will need to configure the following:

1. In `hlsconfig.xml`, set the post processor mode to `1` `<property name="postProcessMode" value="1"/>`
2. Configure the `OrientationPostProcessor` per the [Converting FLV files to MP4 via Post Processing](/docs/red5-pro/users-guide/protocols/converting/) document. **NOTE**: this requires that you install `ffmpeg`, minimum version 3.x. You will also need to modify the `conf/red5-common.xml` and `conf/cloudstorage-plugin.properties` files.

> The above configurations and post-processing are also necessary if you want HLS recordings of a mobile application (with Red5 Pro Mobile SDK) using rotation during the broadcast.

## Compiling FFMpeg with OpenH264

Alternatively to installing via apt-get, you can compile FFMpeg with OpenH264.

* Get the FFMpeg source via git: `git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg`
* Change directory to ffmpeg: `cd ffmpeg`
* Make a build directory inside the ffmpeg directory: `mk ffmpeg_build`
* Go back to the top-level: `cd ..`
* Get the OpenH264 ([Version 1.5](https://github.com/cisco/openh264/tree/openh264v1.5)) source code (download as zip)
* Unzip openh264v1.5.zip into openh264 directory
* Enter the openh264 directory: `cd openh264`
* Modify the openh264/Makefile changing PREFIX to point at the full path to your ffmpeg/ffmpeg_build directory; Example: `PREFIX=/workspace/infrared5/booma/pov-booma-server-side/ffmpeg/ffmpeg_build`
* Save the Makefile
* Execute `make install`
* Enter the ffmpeg directory, execute the build script below

```sh
#!/bin/bash
# Red5 Pro FFMpeg build script for Transcoding

PKG_CONFIG_PATH="$(pwd)/ffmpeg_build/lib/pkgconfig"
export PKG_CONFIG_PATH

function build_ff
{
./configure \\
    --disable-everything \\
    --disable-doc --disable-ffplay --disable-ffprobe --disable-ffserver \\
    --enable-libopenh264 \\
    --disable-avdevice \\
    --disable-programs \\
    --enable-ffmpeg \\
    --disable-indevs --disable-outdevs \\
    --disable-swscale-alpha \\
    --disable-symver --disable-iconv \\
    --disable-bsfs --disable-videotoolbox \\
    --disable-protocols \\
    --enable-protocol=file \\
    --enable-protocol=rtmp \\
    --disable-decoders \\
    --enable-decoder=aac \\
    --enable-decoder=h264 \\
    --enable-decoder=h263 \\
    --enable-decoder=flv \\
    --enable-decoder=nellymoser \\
    --disable-encoders \\
    --enable-encoder=aac \\
    --enable-encoder=libopenh264 \\
    --disable-filters \\
    --enable-filter=aresample \\
    --disable-parsers \\
    --enable-parser=aac \\
    --enable-parser=h264 \\
    --disable-demuxers \\
    --enable-demuxer=flv \\
    --disable-muxers \\
    --enable-muxer=flv \\
    --enable-muxer=mp4 \\
    --disable-shared \\
    --enable-static \\
    --enable-small \\
    --extra-cflags="-Os -fpic $ADDI_CFLAGS -I$(pwd)/ffmpeg_build/include" \\
    --extra-ldflags="$ADDI_LDFLAGS -L$(pwd)/ffmpeg_build/lib" \\
    --pkg-config-flags="--static" \\
    --disable-debug --prefix=$(pwd)/ffmpeg_build \\
make && make install
}
build_ff
```

Lastly, copy the ffmpeg executable from ffmpeg_build to a known location which will be used in your `conf/cloudstorage-plugin.properties` file as the value for the ffmpeg.path entry.  Note: the cloudstorage-plugin.properties file has GPL (x264) uncommented by default. If you are using OpenH264, then you need to uncomment the LGPL command template:

```sh
#ffmpeg.template=%s -y -report -async 1 -i %s -acodec aac -b:a 128k -ar 44100 -vcodec libopenh264 -pix_fmt yuv420p -profile:v baseline -level 3.0 %s
```

## Server Optimization

By default, ffmpeg will use as much CPU and memory as it can get in order to process the conversion as quickly as possible. You can slow ffmpeg down to use fewer resources by adding the `re` flag. **Note that this will basically convert the file in "real time" - so that a five minute clip will take five minutes (instead of 30 seconds).**

To implement this for the `OrientationPostProcessor`, modify the `{red5pro}/conf/cloudstorage-plugin.properties` file.

If you're using LGPL:

`ffmpeg.template=%s -y -i -re %s -acodec aac -b:a 128k -ar 44100 -strict -2 -vcodec libopenh264 -pix_fmt yuv420p -profile:v baseline -level 3.0 %s`

If you're using GPL:

`ffmpeg.template=%s -y -i -re %s -acodec aac -b:a 128k -ar 44100 -strict -2 -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 %s`