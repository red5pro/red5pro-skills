---
title: Create PostgreSQL Database
description: ""
menu_order: 7
---

1. From the left-hand navigation of the Digital Ocean dashboard, under the Manage section, choose [Databases](https://cloud.digitalocean.com/databases)
2. Click on Create in top left, then in pull-down choose *Databases*
3. Under *Create a database cluster*, choose PostgreSQL 11; choose a node plan - if you are going to have high-volume traffic, you will want more memory/CPU/disk space. For testing, you can choose the *1G/1CPU/10GB Disk* plan.
4. Choose the datacenter where your Stream Manager droplet resides.
5. Under *Finalize and create* choose a unique database cluster name (or accept the assigned name) and select your project, then click on *Create a Database Cluster*. ![db02](/_images/installation/server/autoscaledigitalocean/db02.png)
6. After the database is provisioned, you can secure and configure the database cluster. **NOTE:** this can take 10-15 minutes, so now is a good time to get up and stretch your legs.
7. Add trusted sources - from the **Overview** tab, cilck on *Secure this database cluster by restricting access.* in the `TRUSTED SOURCES` section. Click on the *Edit* button next to **Trusted Sources**. Find your **stream manager** and your **terraform server** in the Add Trusted Sources pull-down; you can also add your IP address if you wish. Then click on *Allow these inbound sources only.*
8. Make a note of the time for scheduled updates; if you want to change that time you can modify that in *settings*.
9. Click on the *Users & Databases* tab. Add a new database called `cluster`. **Note:** this database will be populated by the Stream Manager at startup. ![db05](/_images/installation/server/autoscaledigitalocean/db05.png)
10. Add an autoscaling admin User account to the database. A secure password will be generated - make a note of that password (or you can reset it if you like).

## Database Connections

You will need 3 database connections for each node (origin, edge, etc). In addition, each incoming publish and subscribe request queries the database, so for production traffic you will likely want to choose the highest available database node type.

> NOTE: For production it is suggested that you also enable a standby database node.

## Optional - Run MySQL on a Droplet

If you anticipate a lot of streams and/or a lot of nodes in your nodegroup, then you may want to run MySQL (instead of PostGreSQL) on a Digital Ocean droplet. Mysql can support more connections than PostGreSQL can.

1. Create a new droplet from the optimized image that you created. It is recommended that you use a c-4 or c-8 instance, depending on your anticipated user load.
2. Install NTP and unzip: `apt-get install unzip ntp`
3. Install MySQL [(reference)](https://www.fullstackpython.com/blog/install-mysql-ubuntu-1604.html): `apt-get install mysql-server` - during the MySQL installation, you will be prompted to set the root password - make a note of what you set this to.
4. **IMPORTANT:** Modify `/etc/mysql/mysql.conf.d/mysqld.cnf` commenting out the line: `bind-address = 127.0.0.1` by pre-pending with a `#`; Also, uncomment the `max_connections` line and set that to `100000` (`max_connections = 100000`)
5. Restart MySQL service `systemctl restart mysql` to apply the above settings
6. Add non-root user:
  * Connect to database as root `mysql -u root -p` (enter root password).
  * Create new user: at `mysql>` prompt: `CREATE USER 'mynewuser'@'%' IDENTIFIED BY 'goodPassword';` where `mynewuser` is your dbadmin and `goodPassword` is your secure password.
  * If you are successful, you will see `Query OK, 0 rows affected (0.00 sec)`
  * Apply privileges to the new user: `GRANT ALL PRIVILEGES ON * . * TO 'mynewuser'@'%';`
  * Reload the privileges to make sure the new ones are in place: `FLUSH PRIVILEGES;`
7. Create `cluster` database:
  * Connect with the new user: type `quit` to logout root user, then `mysql -u mynewuser -p`
  * Create database: `CREATE DATABASE cluster;`
8. Add Cluster schema:
  * Download the Red5 Pro Server Distribution, and unzip on your server.
  * Navigate to `{red5prohome}/webapps/streammanager/WEB-INF/sql/` to find the `cluster.sql` file.
  * Run the sql script: `mysql -u mynewuser -p cluster < cluster.sql` (you will be prompted to enter the password that you set above).