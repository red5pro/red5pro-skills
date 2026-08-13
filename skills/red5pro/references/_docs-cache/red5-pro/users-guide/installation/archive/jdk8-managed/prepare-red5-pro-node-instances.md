---
title: 2. Prepare Red5 Pro Node Instances
description: ""
menu_order: 3
---

>NOTE: The following steps need to be done for each server instance to be used as Red5 Pro nodes (origins and edges).
>NOTE #2: We recommend a minimum of 2 CPUs and 4GB RAM for Red5 Pro node servers.

<u>**Install Red5 Pro on the Instance:**</u>

* Connect to your instance over ssh.
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [Red5 Pro](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`).

<u>**Install NTP (network time protocol)**</u>

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

Also, make sure that the server time zone is UTC (this should be the default on AWS instances). Type `date` at the prompt. This will return the date, time and zone (*eg:Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

<u>**Configure Autoscaling on the Instance:**</u>

Navigate to the location where you extracted the Red5 Pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

```xml
<bean name="config"class="com.red5pro.clustering.autoscale.Configuration">
   <property name="active" value="false"/>
   <property name="cloudWatchHost" value="http://0.0.0.0:5080/autoscale/cloudwatch"/>
</bean>
```

* Change the active value from “false” to “*true*”
* Replace 0.0.0.0 with the static ip of the Stream Manager
* Save and close the file

<u>**Set a Unique Cluster Password:**</u>

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to sometime unique. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

>**NOTE: The `cluster` password can not contain any CAPITAL LETTERS at this time**

<u>**Enable Red5 Pro Server API and Set Management Password:**</u>

Configure the Server API [per this document.](/docs/red5-pro/development/api/server/red5-pro-server-api-security-and-configuration/) Modify the `security.accessToken` value in `{red5pro/webapps/api/WEB-INF/red5-web.properties`, and make a note of it. You will need this value for your Stream Manager.

```xml
### CORE SECURITY PROVIDER SETTINGS
security.hostSecurity=true
security.tokenSecurity=true
security.accessToken=
```

Add the Stream Manager's public IP address to the `{red5pro}/webapps/api/WEB-INF/security/hosts.txt` file (or add * to make the API accessible from anywhere).

```xml
localhost
*
```

<u>**Remove Unnecessary Webapps:**</u>

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5prohome}/webapps` directory (for example: `secondscreen, template, vod, streammanager`). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server. If you are running a custom webapp, then you would want to include that on your node servers.

**The following incoming ports need to be open on the Red5 Pro node servers:**

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 6262 | websockets for HLS  | TCP |
| *8081* | *websockets for WebRTC (severs earlier than 5.4.0)* | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

**NOTE: As of release 5.4.0, `websockets` automatically use the same ports as http/https as defined in `red5.properties`, so you do not need to open up ports 8081.**

<u>**Verifying Red5 Pro on Instance:**</u>

Start Red5 Pro service
`sudo systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.