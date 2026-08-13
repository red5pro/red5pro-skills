---
title: Installing Red5 Pro on Windows
description: ""
menu_order: 4
---

The following describes the steps in installing Red5 Pro on a Windows desktop or server. (please note, we recommend running Red5 Pro on Linux for optimal performance.)

---

## Software Dependencies

You will need to download and install [Java SE Development Kit 21](https://www.oracle.com/java/technologies/downloads/#jdk21-windows) to run Red5 Pro server on Windows.

After installing java, add a new system variable for JAVA_HOME. Find the installation folder for your Java installation, then go to System Properties, Advanced System Settings, and Environment Variables. Under System variables, click on `New...`.

* Variable name: `JAVA_HOME`
* Variable path: *(will be something like)* `C:\\Program Files\\Java\\jdk-21`

* [Microsoft Visual Studio redistributables](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170) are required to run WebRTC on your Windows desktop. You will receive a startup error if you do not install this package.

### Red5 Pro With WebRTC

For production, we recommend running WebRTC on Linux, due to CPU and memory requirements. Please see [Installing Red5 Pro on a Linux Server](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/).

## Required TCP and UDP Ports

The following __Inbound__ ports need to be open on your server/firewall for Red5 Pro features to work:

| Port | Description |
|---|---|
| 22 | SSH |
| 5080 | default web access of Red5 Pro; Websockets for WebRTC | TCP |
| 443 | modified HTTPS access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |
| *3939* | *Windows Remote Desktop (required for cloud hosted management)* |

**NOTE:** if you are running Windows on a cloud hosting service (such as AWS or Azure) you will need to open these ports both in the cloud security policy and on the Windows firewall on your system.

## Red5 Pro Installation

To install the Red5 Pro Server:

1. Download the server .zip distribution to your local machine. Make sure to login with your account on [https://account.red5.net/login](https://account.red5.net/login) and download the server from [https://account.red5.net/login](https://account.red5.net/login).
2. Copy the server .zip distribution into the directory you wish to run Red5 Pro from
3. Unzip the Red5 Pro distribution in the directory
4. For ease of use, rename the Red5 Pro distribution directory to red5pro

### Your Red5 Pro Server License Key

Red5 Pro server will not function without a valid license key. As of release **3.0.0**, your `LICENSE.KEY` file will be included in your server download in the root of the Red5 Pro server directory (e.g. `C:\\programs\\red5pro`). You can find your license key listed on your [Red5 Pro Professional account overview page](https://account.red5.net/overview).

### Add execute permissions to the following files

* red5.bat
* red5-shutdown.bat

# Modify Maximum Java Heap Size For Red5 Pro Java Process

You can modify the maximum Java heap size by modifying `red5.bat`. Increasing the maximum heap size will allow the server to assign as much memory from what is available to Red5 Pro when necessary.

The default maximum heap size is 2 gigabytes (`-Xmx2g`).

```bat
REM JAVA options
REM You can set JVM additional options here if you want
if NOT DEFINED JVM_OPTS set JVM_OPTS=-Xms2g -Xmx2g -Xverify:none -Djava.net.preferIPv4Stack=true -XX:TieredCompilation -XX:+UseBiasedLocking -XX:InitialCodeCacheSize=8m -XX:ReservedCodeCacheSize=32m -Dorg.terracotta.quartz.skipUpdateCheck=true -XX:MaxMetaspaceSize=128m -XX:+UseParNewGC -XX:+UseConcMarkSweepGC
```

## Running Red5 Pro

To start the Red5 Pro, double-click on **red5.bat**.  A Command Prompt window will launch and you will observe the startup logs.

**Note:** Do not `run as administrator`, just double-click to launch.

To stop Red5 Pro, you can either close the command prompt window or double-click on **red5-shutdown.bat**.

## Verifying Red5 Pro is Running

Once you have started the Red5 Pro Server, you can verify that it is running and available by visiting your instance at port __5080__.

Open a web browser and navigate to `http://<host>:5080` (like [http://localhost:5080](http://localhost:5080))

> Note: currently there is no documented way to configure Red5 Pro as a Windows service.

## How to modify default ports

Some firewalls or even service providers may block some of the Red5 Pro default ports, so you may want to modify those. There are two files that allow you to define the ports that Red5 Pro uses: `{red5pro}/conf/red5.properties`, and `{red5pro}/conf/red5pro-activation.xml`

### red5.properties file: RTMP, HTTP, Websockets

To modify the default RTMP port, edit `{red5pro}/conf/red5.properties` RTMP section:

```properties
# RTMP
rtmp.host=0.0.0.0
rtmp.port=1935
```

To modify the default HTTP (or HTTPS) port, edit the HTTP section:

```properties
# HTTP
http.host=0.0.0.0
http.port=5080
https.port=5443
```

### red5pro-activation.xml file: RTSP

Modify the `configuration` bean if you wish to modify the default port for RSTP.

```xml
<bean name="configuration" id="configuration" class="com.red5pro.activation.Red5ProConfiguration">
<property name="rtsp" value="true"/>
<property name="rtspPort" value="8554"/>
</bean>
```

# Troubleshooting

1. If your command line window is shutting down when you try to run `red5.bat`, open the file with a text editor and add a line that reads `pause` to the end of the file. This will prevent the window from closing, so you can view the output of the batch file.
2. Most Windows clients have firewalls by default. You may need to open the Red5 Pro ports on the local firewall in order to be able to use Red5 Pro features on Windows.
3. Some customers have also reported issues with antivirus interfering with WebRTC operation on Windows.
4. Red5 Pro only runs on 64-bit Windows systems.
