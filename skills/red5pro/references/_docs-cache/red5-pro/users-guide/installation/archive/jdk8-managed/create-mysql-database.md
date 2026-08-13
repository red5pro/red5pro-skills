---
title: 1. Create MySQL Database
description: ""
menu_order: 2
---

**NOTES:**

* For optimal performance, the database should be geographically close to the Stream Manager.
* You will need to allow network access to port **3306** on the database instance, from the Stream Manager instance(s).
* Currently, Red5 Pro autoscaling only support MySQL version `5.x` (5.7 or 5.8).

## Installing And Updating MySQL on Ubuntu 16.04

* Install MySQL [(reference)](https://www.fullstackpython.com/blog/install-mysql-ubuntu-1604.html) `sudo apt-get install mysql-server` - you will be prompted to set the root password.
* (Optional) Run the MySQL security script `sudo mysql_secure_installation` to lock down the database as you see fit.
* Test to make sure that MySQL is running `systemctl status mysql.service`
* If MySQL isn't running, you can start it with `sudo systemctl start mysql`
* Modify `/etc/mysql/mysql.conf.d/mysqld.cnf` commenting out the line: `bind-address = 127.0.0.1` by pre-pending with a `#`; Also, uncomment the `max_connections` line and set that to 100000 (`max_connections = 100000`)
* Restart MySQL service `systemctl restart mysql`

* Add non-root user:
  * Connect to database as root `mysql -u root -p` (enter root password).
  * Create new user: at `mysql>` prompt: `CREATE USER 'mynewuser'@'%' IDENTIFIED BY 'goodPassword';` where `mynewuser` is your dbadmin and `goodPassword` is your secure password. (NOTE: if you are running mysql on the same server as the stream manager, you can restrict the access to localhost - i.e., `CREATE USER 'mynewuser'@'localhost' IDENTIFIED BY 'goodPassword';`
  * If you are successful, you will see `Query OK, 0 rows affected (0.00 sec)`
  * Apply privileges to the new user: `GRANT ALL PRIVILEGES ON * . * TO 'mynewuser'@'%';`
  * Reload the privileges to make sure the new ones are in place: `FLUSH PRIVILEGES;`
* Create `cluster` database:
  * Connect with the new user: type `quit` to logout root user, then `mysql -u mynewuser -p`
  * Create database: `CREATE DATABASE cluster;`
  * `quit` to return to the system prompt
* Add Cluster schema:
  * Download the Red5 Pro Server Distribution, and unzip on your server.
  * Navigate to `{red5prohome}/webapps/streammanager/WEB-INF/sql/` to find the `cluster.sql` file.
  * Run the sql script: `mysql -u mynewuser -p cluster < cluster.sql` (you will be prompted to enter the password that you set above).