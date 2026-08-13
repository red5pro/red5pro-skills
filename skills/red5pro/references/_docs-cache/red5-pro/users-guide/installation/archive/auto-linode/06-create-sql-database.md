---
title: Configure MySQL Database
description: ""
menu_order: 7
---

1. SSH into the MySQL Instance that you created
2. Install NTP and unzip: `apt-get install unzip ntp`
3. Install MySQL: `apt-get install mysql-server` - during the MySQL installation, you will be prompted to set the root password - make a note of what you set this to.
4. **IMPORTANT:** Modify `/etc/mysql/mysql.conf.d/mysqld.cnf` commenting out the line: `bind-address = 127.0.0.1` by pre-pending with a `#`; Also, uncomment the `max_connections` line and set that to `100000` (`max_connections = 100000`). *(NOTE: for a development environment, you may want to run Stream Manager, Terraform and MySQL all on the same droplet. In this case, you would leave the default `bind-address` setting)* 
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
8. Add Cluster schema (**Note** as of server version 9.0.0, the database is automatically populated when the Stream Manager starts up):
  * Download the Red5 Pro Server Distribution, and unzip on your server.
  * Navigate to `{red5prohome}/webapps/streammanager/WEB-INF/sql/` to find the `cluster.sql` file.
  * Run the sql script: `mysql -u mynewuser -p cluster < cluster.sql` (you will be prompted to enter the password that you set above).