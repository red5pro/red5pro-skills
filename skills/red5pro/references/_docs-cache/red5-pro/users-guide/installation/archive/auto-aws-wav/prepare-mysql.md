---
title: Prepare MySQL Database
description: ""
---

# Recommended - run MySQL on the Stream Manager Instance

For testing, it is fine (and more cost-effective) to run MySQL on the same instance as your stream manager.

1. Install MySQL: `apt-get install mysql-server` - during the MySQL installation, you may be prompted to set the root password - make a note of what you set this to.
2. Modify `/etc/mysql/mysql.conf.d/mysqld.cnf` uncommenting the `max_connections` line and set that to `100000` (`max_connections = 100000`).
3. Restart MySQL service `systemctl restart mysql` to apply the above settings.
4. Add non-root user:
  * Connect to database as root `mysql -u root -p` (enter root password).
  * Create new user: at `mysql>` prompt: `CREATE USER 'mynewuser'@'%' IDENTIFIED BY 'goodPassword';` where `mynewuser` is your dbadmin and `goodPassword` is your secure password.
  * If you are successful, you will see `Query OK, 0 rows affected (0.00 sec)`
  * Apply privileges to the new user: `GRANT ALL PRIVILEGES ON * . * TO 'mynewuser'@'%';`
  * Reload the privileges to make sure the new ones are in place: `FLUSH PRIVILEGES;`
5. Create `cluster` database:
  * Connect with the new user: type `quit` to logout root user, then `mysql -u mynewuser -p`
  * Create database: `CREATE DATABASE cluster;`

The database will be populated automatically on starting the red5pro service on the Stream Manager.

---

**NOTE: For Optimal performance, the Stream Manager and Database should be in the same Region**

## To Create A Hosted Database for Autoscaling

* Open the [AWS RDS console](https://console.aws.amazon.com/rds/)
* First - create a new `parameter group` so that you can define a higher maximum connection count:
  * From the left-hand navigation, choose **Parameter Groups**
  * Click on **Create parameter group**
  * Parameter group family: mysql8.0
  * Set a group name (something you'll remember - like red5proautodb), then click on **create**
  * Select your new group from the list, then click on the *Parameter group actions* pull-down, and select *Edit*
  * Using the filter, search for `max_connections`
  * Change the value from `{DBInstanceClassMemory/12582880}` to `100000` (the highest allowed)
  * **Save changes**
* From left-hand navigation, under RDS Dashboard, click on **Instances**
* Click on **Launch DB Instance**
* Step 1: Select Engine - Click on the MySQL tab and click **Select**
* Step 2: Production? - Select MySQL for production environment use and click the “Next Step” button.
* Step 3: Specify DB Details - Set the DB Instance Class as per your traffic needs, keeping in mind that higher configurations account for higher billing charges by AWS. For Storage Type anything other than magnetic helps in performance boost. Stream Manager doesn't require much storage, but depending on your use-case you may want to allocate more or less space accordingly. The default settings will likely be sufficient for your autoscaling solution. For DB Engine Version, choose 8.0.
* Finally set a database instance identifier and **database credentials for access by the Stream Manager**. Make a note of the username and password.
* Step 4: Configure Advanced Settings -

## Network & Security

* VPC - select the VPC that you created for autoscaling
* Subnet Group: Create new DB Subnet Group (or use default)
* Publicly Accessible: Yes
* Availability Zone: No Preference
* VPC Security Group(s):  Create new Security Group (We will be configuring the security group for RDS next)

## Database Options

* Database Name:  cluster
* DB parameter group: choose the *parameter group* that you created above
* Leave other options as their default values.
* Backup, Monitoring, and Maintenance options should be configured per your operations' requirements.
* Click **Launch DB Instance**
* Click on the **View your DB Instances**.
* You should now be able to see your db instance being created. It will take several minutes (you can stretch your legs now) for the initialization process to be completed.
* When Status has changed from "creating" to "available" select your database instance and click on configuration details tab icon (middle icon).
* Make a note of the Endpoint url (will be something like streammanager-db.abcdefghijk123.us-west-1.rds.amazonaws.com) of the mysql database since this will be used for the config.dbHost variable in the stream manager red5-web.properties file.
* On this tab, locate and click on the **Security Group** for this instance to navigate to the security group configuration page.

## Configure Stream Manager access to this security group

* Select the security group (Description will be "Created from the RDS Management Console") and click on “Actions” => “Edit inbound rules” option.
* Click **Add Rule**
* Select - “MySql/Aurora” for Type (port 3306)
* Select - “Custom IP” in source and enter the stream manager's elastic IP address with its CIDR. (typing  a “ / ” after the ip address will auto suggest CIDR values for you select)
* Additionally, you will need to add the **private IP address** of the Stream Manager to the security group - this will be assigned after the Stream Manager instance is associated with the reserved IP address. Alternatively, you can add the stream manager security group id.
* Alternatively, if you choose "custom" you can also enter security group ID (`sg-#####`) used by your stream manager (or load balanced stream managers)
* For source, select “My IP” to add your IP address to the whitelist of the RDS security group. This will ensure that you can connect to MySql from your desktop and populate the database schema using a RDS client. When you select My IP in source amazon will auto fill in your CIDR too.  (note: AWS may have already added this by default)
* Click “Save” to apply changes to this security group. Your stream manager instance will now be able to connect to the mysql instance after it has been deployed.