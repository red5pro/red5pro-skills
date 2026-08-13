---
title: Server Upgrade Instructions
description: ""
menu_order: 5
---

# How to Upgrade Red5 Pro Server

The process for upgrading your Red5 Pro server is pretty straightforward.

**IMPORTANT:** For major version upgrades, please use the specific upgrade guides:
- [Upgrading from v13 to v15](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-upgrade-v13-to-v15/) - Major upgrade with Java 11→21 and Tomcat 8.5→11
- [Upgrading from v14 to v15](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-upgrade-v14-to-v15/) - Minor upgrade, same infrastructure

Assuming that you set up your server per [installing Red5 Pro server on linux](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/), there are just a few basic steps needed to update your server.

* Copy the new Red5 Pro Server Distribution to your server. If you are using FTP, you will probably need to copy this up to the `/tmp/` directory.
* Move the zip file to the same directory as your current installation (for example, `/usr/local/`), and unzip it. **Important: DO NOT unzip the new distribution into the same directory that the original server is running in.**
* If you have your own web applications in the folder `red5pro/webapps/` you can copy it from your current Red5 Pro directory to the new one.
* If you have modified any configuration files, then make the same edits in the new distribution's configuration files. **Important: DO NOT copy configuration files from old build to the new one.**
* The following files are the most likely candidates to have been modified:

  * for SSL, `{red5pro}/conf/red5.properties` (and `{red5pro}/conf/jee-container.xml` for versions prior to 14.0.0)
  * for FLV conversion to MP4 and S3 file storage, `{red5pro}/conf/red5-common.xml`, `{red5pro}/webapps/live/WEB-INF/red5-web.xml`, and `{red5pro}/conf/cloudstorage-plugin.properties`
  * for server API, `{red5pro}/webapps/api/WEB-INF/red5-web.properties`, `{red5pro}/webapps/api/WEB-INF/security/hosts.txt`
  * for Simple Auth Plugin, `{red5pro}/conf/simple-auth-plugin.properties` and `{red5pro}/conf/simple-auth-plugin.credentials`
  * for Clustering, `{red5pro}/conf/cluster.xml`
  * for HLS modification, `{red5pro}/conf/hlsconfig.xml`
  * for WebRTC modification, `{red5pro}/conf/webrtc-plugin.properties`
  * for Restreamer, `{red5pro}/webapps/live/WEB-INF/web.xml`
  * for SRT, `{red5pro}/conf/restreamer-plugin.properties`

* Stop the red5pro service (`sudo systemctl stop red5pro` - or `sudo ./red5-shutdown.sh` if you are not running Red5 Pro as a service). Note: it can take up to 30 seconds for the server to fully shut down.
* Rename (or delete) the old server directory.
* Rename the new server directory to the original folder name (e.g., *red5pro*).
* **If upgrading to v14 or later:** Update `JAVA_HOME` in the service file to point to Java 21 (not Java 11)
* Copy the new red5pro.service file: `sudo cp /usr/local/red5pro/red5pro.service /lib/systemd/system/`
* Reload the daemon: `sudo systemctl daemon-reload`
* Start the red5pro service (`sudo systemctl start red5pro` or `sudo ./red5.sh &` if you are not running Red5 Pro as a service).
* Verify your server is running by navigating to `http://<your-server-ip>:5080`.  You can verify you are running the new release by the version number listed in the top-left corner of the screen.

## Important Notes

**Java Version Requirements:**
- Red5 Pro v14.0.0 and later require Java 21
- Red5 Pro v9.0.0 through v13.x require Java 11
- Red5 Pro v8.x and earlier require Java 8

If you are upgrading across major versions (e.g., v13 to v15), you must install the correct Java version before starting the upgrade.

**SSL Configuration Changes:**
- v14.0.0 and later: SSL is configured only in `red5.properties` with `secure.enabled=true` and `websocket.enabled=true`
- v13.x and earlier: SSL requires editing both `red5.properties` and `jee-container.xml`

Do not copy SSL configuration files directly when upgrading from v13 or earlier to v14 or later.

## Upgrade Red5 Pro on Windows

If you are running Red5 Pro on Windows, it's essentially the same process as above. Move the zip file to the same directory as your current installation (for example, `C:\\Program Files`), and unzip it. Copy any custom web applications, and modify any configuration files in the new server distribution that you modified in the original one. **Important: DO NOT unzip the new distribution into the same directory that the original server is running in.**
