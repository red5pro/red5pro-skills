---
title: Linux Install
description: ""
menu_order: 1
---

# Installing Red5 Pro on a Linux Server

## Recommended: Ubuntu 22.04 64-bit

The following describes the steps in installing Red5 Pro on an Ubuntu Linux server. We recommend running Red5 Pro on Linux for optimal performance.

NOTES:

* If you are hosting on AWS, be aware that the *Amazon Linux* AMI may not support all of the libraries needed for some Red5 Pro functionality. Please choose the Ubuntu 22.04 AMI.
* As of release version 14.0.0, Red5 Pro requires Java version 21.
* As of release version 9.0.0, Red5 Pro requires Java version 11. *Please see [this document](/docs/red5-pro/users-guide/installation/archive/jdk8-docs/ubuntuinstall-jdk8/) if you are installing a version prior to 9.0.0.*
* **Red5 Pro only has library support for 64-bit operating systems**

**INSTALLER:** For quick deployment, please use the [Red5 Pro Installer](https://github.com/red5pro/red5pro-installer).

---

## Software Dependencies - Ubuntu

## Ubuntu 22.04

You will need to install Java 11 or Java 21 depending on the server build. Starting from version 14.0 we use Java 21. Additionally `unzip` is needed to run and deploy the Red5 Pro server. And, there are several native libraries required for WebRTC support, and `jsvc` is necessary for running Red5 Pro as a service. NTP service is necessary for autoscaling and communication with any other Red5 Pro servers if you are running a cluster.

Depending on your permissions, you may need to pre-pend the following commands with sudo:

```shell
apt-get update
apt-get install -y openjdk-21-jdk unzip libva2 libva-drm2 libva-x11-2 libvdpau1 jsvc ntp
```

## CentOS 8 Stream x64

While CentOS is supported, we strongly recommend using **Ubuntu 22.04** for optimal performance and compatibility.
Depending on your permissions, you may need to pre-pend the following commands with `sudo`:

```shell
yum -y update
yum -y install java-21-openjdk unzip libva libvdpau
```

For CentOS, modify the `JAVA_HOME` path in your `red5pro/red5.sh` file to: `JAVA_HOME="/usr/lib/jvm/jre-21"`.

CentOS does not support `jsvc`, so to define Red5 Pro as a service on CentOS you will need to use the [legacy init.d service configuration](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/red5proservice/#legacy---stopstart-red5-pro-service-via-etcinitd).

*Note: the bulk of our testing is done on Ubuntu 22.04 instances, and as such we recommend Ubuntu over CentOS.*

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

**Note:** If you are going to use Let's Encrypt to install your SSL certificate, you will need to temporarily open port 80 during certificate installation; you can close the port after the certificate has been successfully installed.

---

## Red5 Pro Installation

To install the Red5 Pro Server:

1. Download the server .zip distribution to your local machine. Make sure to log in with your account on [Red5 Pro Account](https://account.red5.net/login) and download the server from [Downloads](https://account.red5.net/login).
2. SFTP the server .zip distribution into the _/tmp_ directory of your server
3. Choose a location to run your instance and navigate to that directory. For this example, we’re running from _/usr/local_
    ```sh
    cd /usr/local
    ```
4. Create a new red5pro directory:
    ```sh
    sudo mkdir red5pro
    ```
5. Unzip the Red5 Pro distribution into the new directory:
    ```sh
    sudo unzip red5pro-server-xxx.zip -d /usr/local/red5pro
    ```

### Your Red5 Pro Server License Key

Red5 Pro server will not function without a valid license key. Your `LICENSE.KEY` file will be included in your server download in the root of the Red5 Pro server directory (i.e., `/usr/local/red5pro`). You can find your license key listed on your [Red5 Pro Professional account overview page](https://account.red5.net/overview).

## Java Heap Size Configuration

**Note:** Red5 Pro now automatically sets the Java heap size in the startup script. Manual configuration is no longer required.

If you need to modify memory allocation, refer to the startup script (`red5.sh` or `red5-service.sh` for systemd configurations).

**Note:** Recommended Java Heap Settings can be found on the [Optimization](/docs/red5-pro/users-guide/optimization/red5-pro-server-optimization/) page.

> If you want to launch Red5 Pro manually, you can do so now by running `sudo ./red5.sh`. Note that the process will stop when you close your terminal session. If you want to keep it running, then run `sudo ./red5.sh &`. To ensure that Red5 Pro starts if your instance reboots, [set it up as a service](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux-service/).

## Defining Red5 Pro as a Service

Refer to [service configuration guide](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux-service/) to configure Red5 Pro as a service for Ubuntu.

*Note: CentOS does not support `jsvc`, so to define Red5 Pro as a service on CentOS you will need to use the [legacy init.d service configuration](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux-service/#legacy---stopstart-red5-pro-service-via-etcinitd).*


## Workaround for OpenSSL Issues:

If you encounter problems with OpenSSL or libcrypto compatibility,a workaround is to edit the network configuration file:

Open the network configuration file:
```sh
/usr/local/red5pro/conf/network.properties
```

Locate this line:

``` #crypto.override=SUNJCE ```

Remove the # to uncomment it:

``` crypto.override=SUNJCE ```

Important: After making this change, restart Red5 Pro for it to take effect:

``` sudo systemctl restart red5pro ```

