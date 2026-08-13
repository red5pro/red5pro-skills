---
title: 5. Prepare MySQL Database
description: ""
menu_order: 6
---

**NOTE: For Optimal performance, the Stream Manager and Database should be in the same Region**

<u>**To Create the Database for Autoscaling:**</u>

* Open the [AWS RDS console](https://console.aws.amazon.com/rds/)
* First - create a new `parameter group` so that you can define a higher maximum connection count:
  * From the left-hand navigation, choose **Parameter Groups**
  * Click on **Create parameter group**
  * Parameter group family: mysql5.7
  * Set a group name (something you'll remember - like red5proautodb), then click on **create**
  * Select your new group from the list, then click on the *Parameter group actions* pull-down, and select *Edit*
  * Using the filter, search for `max_connections`
  * Change the value from `{DBInstanceClassMemory/12582880}` to `100000` (the highest allowed)
  * **Save changes**
* From left-hand navigation, under RDS Dashboard, click on **Instances**
* Click on **Launch DB Instance**
* Step 1: Select Engine - Click on the MySQL tab and click **Select**
    ![selectenginemysql](/_images/installation/server/autoscaleaws/selectenginemysql.png)
* Step 2: Production? - Select MySQL for production environment use and click the “Next Step” button. (Note: if you are setting this up for development/testing, you can choose that option, but you will need to set up a different Production instance when you go live).
    ![production](/_images/installation/server/autoscaleaws/production.png)
* Step 3: Specify DB Details - Set the DB Instance Class as per your traffic needs, keeping in mind that higher configurations account for higher billing charges by AWS. For Storage Type anything other than magnetic helps in performance boost. Stream Manager doesn't not require much storage, but depending on your use-case you may want to allocate more or less space accordingly. The default settings will likely be sufficient for your autoscaling solution. For DB Engine Version, choose the latest 5.7 (at this time we **do not** support version 8.x)
* Finally set a database instance identifier and **database credentials for access by the Stream Manager**. Make a note of the username and password.
    ![mysqlconfig](/_images/installation/server/autoscaleaws/mysqlconfig.png)
* Step 4: Configure Advanced Settings -

**Network & Security:**

* VPC - select the VPC that you created for autoscaling
* Subnet Group: Create new DB Subnet Group (or use default)
* Publicly Accessible: Yes
* Availability Zone: No Preference
* VPC Security Group(s):  Create new Security Group (We will be configuring the security group for RDS next)

**Database Options:**

* Database Name:  cluster
* DB parameter group: choose the *parameter group* that you created above
* Leave other options as their default values.
* Backup, Monitoring, and Maintenance options should be configured per your operations' requirements.
* Click **Launch DB Instance**
    ![dbadvanced](/_images/installation/server/autoscaleaws/dbadvanced.png)
* Click on the **View your DB Instances**.
* You should now be able to see your db instance being created. It will take several minutes (you can stretch your legs now) for the initialization process to be completed.
    ![creating](/_images/installation/server/autoscaleaws/creating.png)
* When Status has changed from "creating" to "available" select your database instance and click on configuration details tab icon (middle icon).
* Make a note of the Endpoint url (will be something like streammanager-db.abcdefghijk123.us-west-1.rds.amazonaws.com) of the mysql database since this will be used for the config.dbHost variable in the stream manager red5-web.properties file.
* On this tab, locate and click on the **Security Group** for this instance to navigate to the security group configuration page.
    ![configdetails](/_images/installation/server/autoscaleaws/configdetails.png)

Configure Stream Manager access to this security group:

* Select the security group (Description will be "Created from the RDS Management Console") and click on “Actions” => “Edit inbound rules” option.
* Click **Add Rule**
* Select - “MySql/Aurora” for Type (port 3306)
* Select - “Custom IP” in source and enter the stream manager's elastic IP address with its CIDR. (typing  a “ / ” after the ip address will auto suggest CIDR values for you select)
* Additionally, you will need to add the **private IP address** of the Stream Manager to the security group - this will be assigned after the Stream Manager instance is associated with the reserved IP address. Alternatively, you can add the stream manager security group id.
* For source, select “My IP” to add your IP address to the whitelist of the RDS security group. This will ensure that you can connect to MySql from your desktop and populate the database schema using a RDS client. When you select My IP in source amazon will auto fill in your CIDR too.  (note: AWS may have already added this by default)
* Click “Save” to apply changes to this security group. Your stream manager instance will now be able to connect to the mysql instance after it has been deployed.