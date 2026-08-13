---
title: Create MySQL Database
description: ""
menu_order: 6
---

> NOTE: If you are logged in as a non-root user, you will need to pre-pend the commands with `sudo`.

1. Install MySQL: `apt-get install mysql-server` - during the MySQL installation, you may be prompted to set the root password - make a note of what you set this to. 
2. **IMPORTANT:** Modify `/etc/mysql/mysql.conf.d/mysqld.cnf` uncommenting the `max_connections` line and set the value to `100000` (`max_connections = 100000`). Additionally, you should add the parameter `skip-log-bin` to the `mysqld.cnf` to prevent excessive logging.
3. Restart MySQL service `systemctl restart mysql` to apply the above settings
4. Add non-root database user:
  * Connect to database as root `mysql -u root -p` (enter root password if you set one).
  * Create a new user: at `mysql>` prompt: `CREATE USER 'mynewuser'@'%' IDENTIFIED BY 'goodPassword';` where `mynewuser` is your dbadmin and `goodPassword` is your secure password.
  * If you are successful, you will see `Query OK, 0 rows affected (0.00 sec)`
  * Apply privileges to the new user: `GRANT ALL PRIVILEGES ON * . * TO 'mynewuser'@'%';`
  * Reload the privileges to make sure the new ones are in place: `FLUSH PRIVILEGES;`
5. Create `cluster` database:
  * Connect with the new user: type `quit` to log out the root user, then `mysql -u mynewuser -p`
  * Create database: `CREATE DATABASE cluster;`

The database will be populated by the stream manager when that is running.