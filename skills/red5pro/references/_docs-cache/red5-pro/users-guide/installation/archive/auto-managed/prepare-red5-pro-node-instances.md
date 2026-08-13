---
title: 2. Prepare Red5 Pro Node Instances
description: ""
menu_order: 3
---

>NOTE: The following steps need to be done for each server instance to be used as Red5 Pro nodes (origins and edges).
>NOTE #2: We recommend a minimum of 2 CPUs and 4GB RAM for Red5 Pro node servers.

## Install Red5Pro on the Instance

* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/)
* Make sure that Red5 Pro service is set to auto-start on launch
* Connect to your instance using the private key from the key pair that you created
* `ssh -i ~/.ssh/keys/red5prokey ubuntu@<server_ip_address>`
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [https://account.red5.net/login](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`)

If you haven't already, <u>**Install NTP (network time protocol)**</u>. NTP is necessary to ensure that the Stream Manager and all nodes are in sync. `sudo apt-get install ntp` The service should start automatically once installed.

## Configure Autoscaling on the Instance

Navigate to the location where you extracted the red5pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

* Change the active value from “false” to “*true*”
* Replace `http://0.0.0.0:5080` with `https://your-streammanager-url`
* Save and close the file

example:

```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="true"/>

        <!--Stream manager hosted uri. use the host of your stream manager.  -->
                <property name="cloudWatchHost" value="https://red5autoscale.red5pro.com/streammanager/cloudwatch"/>
```

## Set a Unique Cluster Password

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to a unique value. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

## Enable Red5 Pro Server API and Set Management Password

Configure the Server API [per this document.](/docs/development/api/overview/) Modify the `security.accessToken` value in `{red5pro}/webapps/api/WEB-INF/red5-web.properties`, and make a note of it. You will need this value for your Stream Manager.

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

## Remove Unnecessary Webapps

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5pro}/webapps` directory (for example: template, streammanager; **do not remove root**). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server.

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) which you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming

## The following incoming ports need to be open on the Red5 Pro node servers

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

## Verifying Red5 Pro on Instance

Start Red5 Pro service

`sudo systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.

The Red5 Pro service must be running on the nodes in order for the Stream Manager to provision them/