---
title: Google Cloud Installation
description: ""
---

# Installing Red5 Pro on a Google Cloud Platform Virtual Machine

The following describes the steps in setting up a new Google Cloud Virtual Machine instance. This document assumes that you have already set up Google Cloud compute and the associated SDK for management ([https://cloud.google.com/sdk/](https://cloud.google.com/sdk/)).
We recommend running Red5 Pro on Linux.

## Virtual Machine Instance Setup

### Create Network Profile for Red5Pro Firewall Rules

Create a network profile that contains a firewall rule to make the following ports accessible from anywhere:

| Port | Description |
|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 443 | modified HTTPS access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

`tcp:22; tcp:5080; tcp:443; tcp:1935; tcp:8554; udp:40000-65535`

![Networking](/_images/installation/server/googlecloudvminstall/networkingvpc.png)

![CreateNetwork](/_images/installation/server/googlecloudvminstall/firewallrule.png)

### Create Virtual Machine Instance

* From Compute Engine, VM Instances, click on Create Instance. Choose the region and instance type. The e2-medium VM type will be able to support minimal testing - however, because they do not have dedicated CPUs you may see issues. The c2-standard-4 (suggested both for the number of CPUs and network performance) will support most live production streaming implementations.
  * In choosing the instance type, note that `WebRTC` uses more memory and CPU than `RTSP` and `RTMP` streaming and that the higher the resolution, bitrate, and framerate of your streams, the more load they will incur on your server.
* For the `Boot disk` click on "Change" and select **Operating System: Ubuntu**, **Version: Ubuntu 20.04 LTS** instance.

![gcpVM](/_images/installation/server/googlecloudvminstall/gcpvm.png)

### 3. Copy Red5 Pro Server to the Instance

Once the instance has spun up, use the Google Cloud SDK to copy the latest version of Red5 Pro server to the instance:

```sh
gcloud compute scp red5pro-server*.zip red5pro-image-01:/tmp/
```

SSH into the server and install java and unzip so that you can set up the server:

```sh
gcloud compute ssh red5pro-image-01
```

## Red5 Pro Installation

### 4. Install Red5 Pro Server and Dependencies

Follow directions for [installing Red5 Pro server on linux](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/)
