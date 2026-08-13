_From: Linux Install - JDK 8_

## Ubuntu 16.04

We suggest running your server on **Ubuntu v16.04**, especially if your solution includes RTSP (Red5 Pro mobile SDK). Ubuntu 18.04 is **required** for SRT restreaming.

You will need to install Java 8 and `unzip` to run and deploy Red5 Pro server. In addition, there are several native libraries required for WebRTC support, and `jsvc` is necessary for running Red5 Pro as a service. NTP service is necessary for autoscaling and communication with any other Red5 Pro servers if you are running a cluster.

Depending on your permissions, you may need to pre-pend the following commands with sudo:

```sh
apt-get update
apt-get install -y default-jre unzip libva1 libva-drm1 libva-x11-1 libvdpau1 jsvc ntp
```

### Ubuntu 18.04

To run Red5 Pro on Ubuntu 18, run the following:

```sh
apt-get install -y openjdk-8-jre-headless unzip libva2 libva-drm2 libva-x11-2 libvdpau1 jsvc ntp
```

*As of June 2020, Red5 Pro only supports Java 8. Java 11 support will be coming with a future release.*
