---
title: FFMpeg
description: ""
menu_order: 2
---

## Contact us for a compatible FFMpeg library

If you need the Orientation post processor feature, contact us at [info@red5.net](mailto:info@red5.net) to help get you a compatible FFmpeg library. When you get the library, copy `ffmpeg` to `/usr/local/red5pro/` and make sure it is executable.

<!--

## Compiling FFMpeg

You can compile FFMpeg with OpenH264. To compile, you will need several tools installed on your system: `make`, `g++`, `nasm`, and `pkg-config`. To install the tools on Ubuntu run:
`apt-get install -y build-essential pkg-config nasm`.

Once the tools are installed, proceed with compilation:

* Get the FFMpeg source via git: `git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg`
* Change directory to ffmpeg: `cd ffmpeg`
* Make a build directory inside the ffmpeg directory: `mkdir ffmpeg_build`
* Go back to the top-level: `cd ..`
* Get the OpenH264 ([Version 1.8](https://github.com/cisco/openh264/tree/openh264v1.8)) source code (download as zip)
* Unzip openh264v1.8.zip into openh264 directory
* Enter the openh264 directory: `cd openh264`
* Modify the openh264/Makefile changing PREFIX to point at the full path to your ffmpeg/ffmpeg_build directory; Example: `PREFIX=/home/ubuntu/ffmpeg/ffmpeg_build`
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
./configure \
    --disable-everything \
    --disable-doc --disable-ffplay --disable-ffprobe \
    --disable-avdevice \
    --disable-programs \
    --enable-ffmpeg \
    --enable-libopenh264 \
    --disable-indevs --disable-outdevs \
    --disable-swscale-alpha \
    --disable-symver --disable-iconv \
    --disable-bsfs --disable-videotoolbox \
    --disable-protocols \
    --enable-protocol=file \
    --enable-protocol=rtmp \
    --disable-decoders \
    --enable-decoder=aac \
    --enable-decoder=h264 \
    --enable-decoder=h263 \
    --enable-decoder=flv \
    --enable-decoder=nellymoser \
    --disable-encoders \
    --enable-encoder=aac \
    --enable-encoder=libopenh264 \
    --disable-filters \
    --enable-filter=aresample \
    --disable-parsers \
    --enable-parser=aac \
    --enable-parser=h264 \
    --disable-demuxers \
    --enable-demuxer=flv \
    --disable-muxers \
    --enable-muxer=flv \
    --enable-muxer=mp4 \
    --enable-pic --enable-asm --enable-x86asm \
    --enable-hardcoded-tables \
    --extra-cflags="-Os -fpic $ADDI_CFLAGS -I$(pwd)/ffmpeg_build/include" \
    --extra-ldflags="$ADDI_LDFLAGS -L$(pwd)/ffmpeg_build/lib -l:libopenh264.a" \
    --pkg-config-flags="--static" \
    --disable-debug --prefix=$(pwd)/ffmpeg_build

make && make install
}
build_ff
```

Lastly, copy the ffmpeg executable from `ffmpeg_build/bin` to a known location which will be used in your `conf/cloudstorage-plugin.properties` file as the value for the ffmpeg.path entry.  Note: the cloudstorage-plugin.properties file has GPL (x264) uncommented by default. If you are using OpenH264, then you need to uncomment the LGPL command template:

```sh
#ffmpeg.template=%s -y -report -async 1 -i %s -acodec aac -b:a 128k -ar 44100 -vcodec libopenh264 -pix_fmt yuv420p -profile:v baseline -level 3.0 %s
```

---

## Build 8.2.0 and earlier

The FLV to MP4 Transcoder uses two native applications: [FFMpeg](https://www.ffmpeg.org/) and an h.264 encoder, either [x264](http://www.videolan.org/developers/x264.html) or [OpenH264](http://www.openh264.org/).

Having FFmpeg with h.264 support as a dependency carries licensing information along with its use / deployment. There are two primary licenses we are concerned with herein, [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.html) and [GNU Lesser General Public License](https://www.gnu.org/licenses/lgpl-3.0.html). GPL being the most restrictive of the two and requiring the implementer to meet their specific requirements (see the license and/or consult your lawyer).

### Installing FFMpeg via apt-get

From [How to Install FFmpeg 4.0.2 in Ubuntu 18.04/16.04 via PPA](https://ubuntuhandbook.org/?s=install+ffmpeg+4+in+ubuntu+16).

In order to use the new OrientationPostProcessor method, you must have at least version 4.0 of FFMpeg.  If you have an older version of FFmpeg installed, remove that first:

```sh
sudo apt-get remove ffmpeg
```

Then, add the `jonathonf` ppa:

```sh
sudo add-apt-repository ppa:jonathonf/ffmpeg-4
```

And confirm the resulting message by pressing [enter].

Next:

```sh
sudo apt update && sudo apt upgrade
```

Now FFmpeg is available to be installed with apt:

```sh
sudo apt-get install ffmpeg
```
-->