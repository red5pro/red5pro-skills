---
title: Troubleshooting
description: Troubleshooting ffmpeg build
---

If you encounter an issue running ffmpeg such as this:

```console
./ffmpeg: error while loading shared libraries: libopenh264.so.4: cannot open shared object file: No such file or directory
```

It means that the static code for libopenh264 was not compiled into the ffmpeg binary; to resolve this issue, the libopenh264 shared library must be copied to a location known to the system (perform these steps from the ffmpeg directory):

`cp ffmpeg_build/lib/libopenh264.so.4 /usr/local/lib`

Now that it's copied, run the following to update the system:

`ldconfig`

To verify, run the following from the `ffmpeg_build/bin` directory:

`ldd ffmpeg`

If the response should be similar this:

```console
linux-vdso.so.1 => (0x00007ffe03c5f000)
libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f5a8c9a6000)
libopenh264.so.4 => /usr/local/lib/libopenh264.so.4 (0x00007f5a8c678000)
libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f5a8c45b000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f5a8c091000)
/lib64/ld-linux-x86-64.so.2 (0x00007f5a8ccaf000)
libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007f5a8bd0f000)
libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007f5a8baf9000)
```