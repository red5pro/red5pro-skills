---
title: Create MySQL Database
description: ""
menu_order: 7
---

# Oracle Hosted Database

Navigate to the [DB Systems](https://cloud.oracle.com/mysqlaas/db-systems) section in the Compartment where you're configuring your autoscale environment.

1. Click on **Create DB System**
2. Give your database an easily identifiable name
3. If this is a low-traffic or QA environment you can choose *Standalone*. **High Availability** is recommended for production environments.
4. *Create Administrator Credentials*, and record the username and password in your checklist (note: *Administrator password must be between 8 and 32 characters, and contain at least 1 uppercase, 1 lowercase, 1 numeric, and 1 special character*.)
5. *Configure networking*, select the VCN and subnet you created.
6. *Configure hardware*, click on Change Shape. Database size requirements depend on the number of nodes in your nodegroup and the number of concurrent connecting clients. The `max_connections` value is dependent on shape. See [below](#max-connections) for the defaults.
7. If this is a production environment, then *Show advanced options* and place a check in **Delete protected**. Most of the data stored are ephemeral, so automatic backups are not strictly necessary.
8. Click on **Create** (it can take 10-15 minutes to create the database)
9. When it is created, copy the private IP to your checklist (you will need this for the stream manager and terraform connections).

# Configure MySQL Database

1. In order to modify the MySQL database, you will need to connect from a VM in the same VCN and subnet (for ease of management, you can do this from your stream manager). **Important**: *make sure that port 3306 is included in the security rules for your subnet, otherwise you will not be able to connect*.
2. Install the MySQL client: `sudo apt-get install mysql-client`
3. Connect to your database: `mysql --host <database-private-IP> -u <Username> -p`
4. When prompted to `Enter password:` enter the password created above.
5. From the `mysql>` prompt, type: `create database cluster;` and then return.
6. Type `quit` to exit the database.


## Max Connections

The OCI managed MySQL `max_connections` value is dependent on the VM shape. The default values per shape are:

* 8GB shapes - 500
* 16GB shapes - 1000
* 32GB shapes - 2000
* 64GB shapes - 4000
* all shapes larger than 64GB - 8000