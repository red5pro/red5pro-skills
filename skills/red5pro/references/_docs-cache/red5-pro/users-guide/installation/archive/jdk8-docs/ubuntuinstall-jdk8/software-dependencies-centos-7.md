_From: Linux Install - JDK 8_

## Software Dependencies - CentOS 7

Note: Red5 Pro with WebRTC **does not run on CentOS 6** due to an older and less secure version of `glibc` that has been updated with **CentOS 7**. If you want to run Red5 Pro on CentOS, **you must use build 7** (note that we have not tested with CentOS 8).

### Open SSL Configuration for CentOS

**IMPORTANT**: Because of different `libcrypto` library versions supported between CentOS and Ubuntu, with release 5.2.2 it is necessary to modify `{red5pro}/conf/webrtc-plugin.properties`, and change `openssl.enabled=true` to `openssl.enabled=false`.

Depending on your permissions, you may need to pre-pend the following commands with sudo:

```sh
yum -y update
yum -y install java unzip jsvc ntp libva libvdpau
```
