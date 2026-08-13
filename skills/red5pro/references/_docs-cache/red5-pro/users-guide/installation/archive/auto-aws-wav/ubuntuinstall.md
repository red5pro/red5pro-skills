---
title: Linux Install
description: ""
---

# Installing Red5 Pro on a Linux Server

## Recommended: Ubuntu 20.04 64-bit

The following describes the steps in installing Red5 Pro on an Ubuntu Linux server. We recommend running Red5 Pro on Linux for optimal performance.

NOTES:

* If you are hosting on AWS, be aware that the *Amazon Linux* AMI may not support all of the libraries needed for some Red5 Pro functionality. Please choose the Ubuntu 20.04 AMI.
* As of release version 9.0.0, Red5 Pro requires Java version 11. *Please see [this document](http://tmp.docs.red5pro.com/jdk8-docs/ubuntuinstall-jdk8] if you are installing a version prior to 9.0.0.*
* **Red5 Pro only has library support for 64-bit operating systems**

**INSTALLER:** For quick deployment, please use the [Red5 Pro Installer](https://github.com/red5pro/red5pro-installer).

---

## Software Dependencies - Ubuntu

## Ubuntu 20.04

You will need to install Java 11 and `unzip` to run and deploy Red5 Pro server. In addition, there are several native libraries required for WebRTC support, and `jsvc` is necessary for running Red5 Pro as a service. NTP service is necessary for autoscaling and communication with any other Red5 Pro servers if you are running a cluster.

Depending on your permissions, you may need to pre-pend the following commands with sudo:

```sh
apt-get update
apt-get install -y openjdk-11-jdk unzip libva2 libva-drm2 libva-x11-2 libvdpau1 jsvc ntp
```

## CentOS - no support with Server version greater than 9.0.0

**Release 9.0.0 can not be run on Centos; please refer to [this document](https://www.red5.net/docs/red5-pro/users-guide/installation/archive/jdk8-docs/ubuntuinstall-jdk8/#software-dependencies---centos-7) for installing previous versions of Red5 Pro server on Centos

## Required TCP and UDP Ports

The following __Inbound__ ports need to be open on your server/firewall for Red5 Pro features to work:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 443 | modified HTTPS access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

*if you are going to use Let's Encrypt to install your SSL certificate, you will need to open port 80 for that; you can close the port after you have installed the certificate.*

---

## Red5 Pro Installation

To install the Red5 Pro Server:

1. Download the server .zip distribution to your local machine. Make sure to log in with your account on [https://account.red5.net/login](https://account.red5.net/login) and download the server from [https://account.red5.net/login](https://account.red5.net/login).
2. SFTP the server .zip distribution into the _/tmp_ directory of your server
3. Choose a location to run your instance and navigate to that directory. For this example, we’re running from _/usr/local_
    ```sh
    cd /usr/local
    ```
4. Copy the server distribution to this directory:
    ```sh
    sudo cp /tmp/red5pro-server-xxx.zip .
    ```
5. Unzip the Red5 Pro distribution in the directory:
    ```sh
    sudo unzip red5pro-server-xxx.zip
    ```
6. For ease of use, rename the Red5 Pro distribution directory to red5pro:
    ```sh
    sudo mv red5-server-xxx-release red5pro
    ```

### Your Red5 Pro Server License Key

Red5 Pro server will not function without a valid license key. Your `LICENSE.KEY` file will be included in your server download in the root of the Red5 Pro server directory (i.e., `/usr/local/red5pro`). You can find your license key listed on your [Red5 Pro Professional account overview page](https://account.red5.net/overview).

# Modify Maximum Java Heap Size For Red5 Pro Java Process

You can modify the maximum Java heap size by modifying `red5.sh`. Increasing the maximum heap size will allow the server to assign as much memory from what is available to Red5 Pro when necessary.

The default maximum heap size is 2 gigabytes (`-Xmx2g`).

```sh
# JAVA options
# You can set JVM additional options here if you want
if [ -z "$JVM_OPTS" ]; then
    JVM_OPTS="-Xms2g -Xmx2g -Xverify:none -Djava.net.preferIPv4Stack=true -XX:+TieredCompilation -XX:+UseBiasedLocking -XX:InitialCodeCacheSize=8m -XX:ReservedCodeCacheSize=32m -Dorg.terracotta.quartz.skipUpdateCheck=true -XX:MaxMetaspaceSize=128m -XX:+UseParNewGC -XX:+UseConcMarkSweepGC"
fi
```

> If you want to launch Red5 Pro manually, you can do so now by running `sudo ./red5.sh`. Note that the process will stop when you close your terminal session. If you want to keep it running, then run `sudo ./red5.sh &`. To ensure that Red5 Pro starts if your instance reboots, set it up as a service.

## Defining Red5 Pro as a Service

Refer to [this document](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/red5proservice/) to configure Red5 Pro as a service.