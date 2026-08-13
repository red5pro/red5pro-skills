---
title: Defining Red5 Pro as a Service on Linux
description: For Server Version >= 9.0.0, with JDK 11 Support
menu_order: 2
---

To allow for ease of startup and shutdown of Red5 Pro, and ensure it starts automatically on server reboot, Configure a `systemd` unit file for Red5 Pro. The [Apache jsvc](https://commons.apache.org/proper/commons-daemon/jsvc.html) application is required to run Red5 Pro as a service on Linux.

>**IMPORTANT**: If Red5pro previously configured using the `/etc/init.d/red5pro` service, you will need to remove that before configuring the `systemd` service.  Run: `sudo systemctl disable red5pro.service`.

- Ensure Apache jsvc is installed:
On Ubuntu or Debian run:

`$ sudo apt-get install -y jsvc`

- CentOS/Fedora/Redhat:

`$ sudo yum -y install jsvc`

## Contents

- [Copy the Service File](copy-the-service-file.md)
- [Enable and Start Red5 Pro Service](enable-and-start-red5-pro-service.md)
- [Service Removal](service-removal.md)
- [Checking Service Status](checking-service-status.md)
- [Change FileAppender output filename](change-fileappender-output-filename.md)
- [Size-based rolling policy](size-based-rolling-policy.md)
- [Time-based rolling policy](time-based-rolling-policy.md)
- [Modify root level Definition](modify-root-level-definition.md)
- [red5.properties file : RTMP, HTTP](red5-properties-file-rtmp-http.md)
- [red5pro-activation.xml file: RTSP](red5pro-activation-xml-file-rtsp.md)
