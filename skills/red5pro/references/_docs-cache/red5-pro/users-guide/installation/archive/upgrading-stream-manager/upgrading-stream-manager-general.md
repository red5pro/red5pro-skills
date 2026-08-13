---
title: Upgrading Stream Manager (general)
description: ""
menu_order: 1
---

This document assumes that you have already set up an autoscaling environment on a cloud platform.

> We generally recommend updating the database per the[instructions](/docs/red5-pro/users-guide/installation/archive/upgrading-stream-manager/upgrading-stream-manager-with-database-changes/) if at all possible. This is absolutely required if there are any changes to the database structure or data values.

# Update Stream Manager

Per "[How to Upgrade Red5 Pro Server](/docs/red5-pro/users-guide/installation/archive/upgrading-stream-manager/upgrading-stream-manager-general/)," the cleanest way to upgrade the Stream Manager will be to:

1. Download the latest Red5 Pro *Server* distribution **and** the latest *Red5 Pro Autoscaling Library Extensions* for your cloud platform from [https://account.red5.net/login](https://account.red5.net/login) to your local machine.
2. Copy both files up to the Stream Manager.
3. Copy and unzip the new distribution into `/usr/local/`, but NOT into the existing `red5pro` directory.
4. Copy the **new** cloud controller jar file to the `webapps/streammanager/WEB-INF/lib/` directory of the new server distribution.
5. Remove `/conf/autoscale.xml`, `/plugins/red5pro-autoscale-plugin-###.jar`, and `/plugins/red5pro-webrtc-plugin-###.jar` from the new server distribution.
6. Note the values in the previous `{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties` file and edit the new `webapps/streammanager/WEB-INF/red5-web.properties` per those values.

## When you are ready to upgrade the server version

1. Rename your existing red5pro folder to bak.red5pro (`sudo mv red5pro bak.red5pro`).
2. Rename the new server distribution directory to red5pro (`sudo mv red5pro-server-* red5pro`).
3. Kill the Red5 Pro Service (`ps aux | grep java` to get the Red5 Pro PID, then `sudo kill -9 <PID>`).
4. Start the Red5 Pro Service `sudo systemctl start red5pro`.
5. Following the [API Basics below](/docs/red5-pro/development/api/archive/rest-api-v-400/overview/), **create a new nodegroup** and **add an origin server**.
6. Once the new nodegroup is up, [**terminate the old nodegroup**](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-nodes/).
