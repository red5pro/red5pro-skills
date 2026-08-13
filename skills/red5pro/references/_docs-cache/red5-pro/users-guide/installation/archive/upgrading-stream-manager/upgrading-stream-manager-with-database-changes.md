---
title: Upgrading Stream Manager with Database Changes
description: ""
menu_order: 2
---

If there are any changes to the stream manager cluster database structure, you will need to follow a more complicated upgrade path. Note that this may require downtime.

# Update Database

Due to occasional changes in the autoscaling database schema and logic, it is not always possible to simply upgrade the database in place. The best solution is to setup a separate database instance, parallel to the one which is live.

Follow your cloud database setup instructions to setup a new database for autoscaling. Use the same instance configuration and credentials as your live database instance.


* [DATABASE SETUP ON AWS](/docs/red5-pro/users-guide/installation/archive/auto-aws/connect-to-mysql-and-add-cluster-schema/)
* [DATABASE SETUP ON DIGITAL OCEAN](/docs/red5-pro/users-guide/installation/archive/auto-digital-ocean/06-create-sql-database/)
* [DATABASE SETUP ON GOOGLE](/docs/red5-pro/users-guide/installation/archive/auto-google-cloud/create-google-cloud-sql-instance/)
* [DATABASE SETUP ON MICROSOFT AZURE](/docs/red5-pro/users-guide/installation/archive/auto-microsoft-azure/08-prepare-mysql-database/)
* [DATABASE SETUP ON LINODE](/docs/red5-pro/users-guide/installation/archive/auto-digital-ocean/06-create-sql-database/)
* [DATABASE SETUP ON SIMULATED CLOUD](/docs/red5-pro/users-guide/installation/archive/auto-managed/create-mysql-database/)

**IMPORTANT:** Make a note of this new database IP address or Endpoint url. This will be used in red5-web.properties - **config.dbHost** property when configuring stream manager.

* Configure the the new SQL instance to allow access from the stream manager IP.

# Upgrade Stream Manager

Per "[How to Upgrade Red5 Pro Server](/docs/red5-pro/users-guide/installation/archive/upgrading-stream-manager/upgrading-stream-manager-general/)," the cleanest way to upgrade the Stream Manager will be to:

1. Download the latest Red5 Pro Server distribution **and** the latest Red5 Pro Autoscaling Library Extensions * for your cloud platform from [https://account.red5.net/login](https://account.red5.net/login) to your local machine.
2. Copy both files up to the Stream Manager.
3. Copy and unzip the new distribution into the same directory where the original red5pro folder was (e.g. `/usr/local/`).
4. Copy the cloud controller jar file to the `webapps/streammanager/WEB-INF/lib/` directory of the new server distribution.
5. Remove `/conf/autoscale.xml` and `/plugins/red5pro-autoscale-plugin-*.jar` from the new server distribution.
6. Note the values in the previous `{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties` file and edit the new `webapps/streammanager/WEB-INF/red5-web.properties` per those values - with the exception of using the **new database IP or Endpoint URL** for the **config.dbHost** property. There are several new values in the latest `red5-web.properties` file, so you can't just copy this from the old build.
7. Starting with Stream Manager API v3.0, there are no longer launchconfig and scaleconfig policy files. Instead, these policies are created and managed via the API.

## When you are ready to upgrade the environment

> **If you take care of all of the above steps first, you will need about 15-60 minutes of downtime, depending on how many nodegroups and nodes you have, to switch over.**

1. **Delete any existing nodegroups**; you will create new ones once the Stream Manager is upgraded. If you skip this step, then when you restart the Stream Manager, it will tear down the existing nodes because they are not in the new database.
2. Rename your existing red5pro folder to bak.red5pro (`sudo mv red5pro bak.red5pro`).
3. Rename the new server distribution directory to red5pro (`sudo mv red5pro-server-* red5pro`).
4. Kill the Red5 Pro Service (`ps aux | grep java` to get the Red5 Pro PID, then `sudo kill -9 <PID>`).
5. Start the Red5 Pro Service `sudo systemctl start red5pro`.
6. Following the [API Basics](/docs/red5-pro/development/api/archive/rest-api-v-400/), create a nodegroup to match the previous setup and add an origin server. Note that in the new version of autoscaling, a nodegroup can have multiple origin servers. In addition, you can specify different server types for origin and edge servers.

> Note: for production environments, it is recommended to run the stream manager(s) behind a load balancer. With a load balancer in place, you can swap out the old stream manager(s) with the with new ones, further minimizing downtime.

