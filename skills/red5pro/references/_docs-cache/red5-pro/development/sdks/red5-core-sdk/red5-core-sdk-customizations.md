---
title: Red5 Core SDK Customizations
description: ""
menu_order: 3
---

The Red5 Pro Core SDK was created to allow developers the flexibility to target specific hardware by creating their own FFmpeg builds.

# Hardware Acceleration

## CUDA Toolkit

(v11.7 or later)

<!-- reference: https://github.com/infrared5/core-sdk#cuda-toolkit-v117-or-later https://docs.nvidia.com/video-technologies/video-codec-sdk/ffmpeg-with-nvidia-gpu/-->

To build FFmpeg with CUDA support, for Windows:

1. Download and install CUDA from [this site](https://developer.nvidia.com/cuda-downloads). (Note: make sure that your installation path does not include any spaces)
2. Add the folders to your SYSTEM PATH (for example: `D:\\sdks\\cuda\\v11.7\\libnvvp;D:\\sdks\\cuda\\v11.7\\bin;D:\\sdks\\cuda\\v11.7\\lib\\x64)
`)
3. Now, you have to install some headers required by FFmpeg.

Open the MSYS2 shell from its installation folder, and run the following:

```shell
msys2_shell.cmd -mingw64 -use-full-path
git clone https://git.videolan.org/git/ffmpeg/nv-codec-headers.git
cd nv-codec-headers
make
make install
```

For FFmpeg v4.4.1 (recommended at the time of this documentation)

```shell
git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg_4.1.1 && cd ffmpeg_4.4.1 && git checkout tags/n4.4.1 -b v4.4.1

export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/d/<you_path_where_installed>/openh264/v2.3.0/lib/pkgconfig:/usr/local/lib/pkgconfig

./configure --prefix=/d/<your_path>/sdks/ffmpeg/v4.4.1 --enable-shared --disable-debug --disable-lzma --disable-iconv --disable-bzlib --disable-sdl2 --enable-libopenh264 --enable-dxva2 --enable-d3d11va --enable-libmfx --enable-cuda --enable-cuda-llvm --enable-cuvid --enable-libnpp --enable-nonfree --extra-cflags=-I/d/<your_path>/sdks/cuda/v11.7/include --extra-ldflags=-L/d/sdks/cuda/v11.7/lib/x64 > ffmpeg_v4.4.1.config
```

Make sure there are no errors in ffmpeg_v4.4.1.config.

```shell
make && make install && cp ffmpeg_v4.4.1.config /d/<your_path>/sdks/ffmpeg/v4.4.1/
```

Copy the following files from the appropriate locations, built and installed before, to `/d/<your_path>/sdks/ffmpeg/v4.4.1/`:

```shell
zlib1.dll (from mingw)
libwinpthread-1.dll (from mingw)
libopenh264-6.dll
libmfx-1.dll
```

