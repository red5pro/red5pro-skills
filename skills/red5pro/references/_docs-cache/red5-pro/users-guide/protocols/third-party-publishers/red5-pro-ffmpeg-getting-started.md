---
title: Getting Started
description: ""
menu_order: 6
---

FFmpeg is available for different platforms with different distribution channels.

* FFmpeg for Windows is available from [ffmpeg.zeranoe.com](https://ffmpeg.org/download.html). The distribution is an archive file which contains the FFmpeg windows executable (exe).
* FFmpeg for Linux should be compiled and built from source (to include all the latest codecs & libraries)) based on your operating system flavor. It is recommended that you use either [Ubuntu](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu) or [CentOs](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos) operating system for running Red5 Pro friendly FFmpeg build.

Once you have acquired the FFmpeg software, you can run the following test command at your shell prompt to see what codecs your FFmpeg build supports:

__Command__

```bash
ffmpeg -i
```

__Sample output__

```bash
ffmpeg version N-82597-gd316b21 Copyright (c) 2000-2016 the FFmpeg developers
  built with gcc 5.4.0 (GCC)
  configuration: --enable-gpl --enable-version3 --disable-w32threads --enable-dxva2 --enable-libmfx --enable-nvenc --enable-avisynth --enable-bzlib --enable-fontconfig --enable-frei0r --enable-gnutls --enable-iconv --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libfreetype --enable-libgme --enable-libgsm --enable-libilbc --enable-libmodplug --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenh264 --enable-libopenjpeg --enable-libopus --enable-librtmp --enable-libschroedinger --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs --enable-libxvid --enable-libzimg --enable-lzma --enable-decklink --enable-zlib
  libavutil      55. 40.100 / 55. 40.100
  libavcodec     57. 66.106 / 57. 66.106
  libavformat    57. 58.100 / 57. 58.100
  libavdevice    57.  2.100 / 57.  2.100
  libavfilter     6. 67.100 /  6. 67.100
  libswscale      4.  3.101 /  4.  3.101
  libswresample   2.  4.100 /  2.  4.100
  libpostproc    54.  2.100 / 54.  2.100
```

__References:__

* [FFmpeg compilation guide](https://trac.ffmpeg.org/wiki/CompilationGuide)
