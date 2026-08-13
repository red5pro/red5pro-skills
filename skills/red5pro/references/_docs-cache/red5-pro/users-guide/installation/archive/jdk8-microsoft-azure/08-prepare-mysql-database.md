---
title: 6. Prepare MySQL Database
description: ""
menu_order: 9
---

Azure provides two types of MySQL database offerings to help developers integrate MySQL with their web apps - *Azure database for MySQL servers* and *ClearDB*. Both types of offerings work with Stream Manager web application. However based on price and performance we recommend using **Azure database for MySQL servers**.

**NOTE: For Optimal performance, the Stream Manager and Database should be in the same Region.**

> Make a note of database credentials while creating the database for later use.

<u>**To Create the Database for Autoscaling:**</u>

* Navigate to [Azure Database For MYSQL Servers](https://portal.azure.com/#blade/HubsExtension/Resources/resourceType/Microsoft.DBforMySQL%2Fservers).
* Click on **Create Azure Database For MySQL users**.
* Fill in the form displayed as necessary for new database provisioning.
  * **Server Name**: The database name following the naming convention. e.g.: `red5proautoscaling-eastus-db`
  * **Subscription**: Select a subscription account
  * **Resource Group**: Select **Use existing** and select your Red5 Pro autoscaling  **master** resource group
  * **Server admin login name**: The admin user name
  * **Password**: The admin password
  * **Confirm the password**
  * **Location**: Select a region for the database server (recommend the same region as your stream manager)
  * **Version**: Select the latest MySQL version (5.7 at the time of writing)
  * **Pricing tier**: You can edit the pricing plan of the database offering  or reconfigure the selected plan.

> Currently Azure MySQL offering does not offer many options for configuration. You can configure the **COMPUTE UNITS** to adjust performance. For more information, check out: [Azure Database for MySQL pricing](https://azure.microsoft.com/en-in/pricing/details/mysql/)

Click **Create**  to create the database server.

![New Azure MySQL Database Server ](/_images/installation/server/autoscaleazure/azure-mysql-2.png)

>It may take a few minutes for the database to get created. You can refresh the page once the deployment is complete to see the instance in the listing.

* You can click the database server to see the details view.

![Database Details ](/_images/installation/server/autoscaleazure/azure-mysql-overview.png)

* Next we need to configure the **Security** for the database server. To configure security, with the database server selected :
  * Click on **Connection Security** menu item.
  * Disable the **SSL** settings (*SSL access to database server from Stream Manager is currently not supported*).
* Configure **firewall** rules:
  * **+Add My IP** so you can administer the database via MySQL Workbench.
  * Add the Stream Manager's reserved IP address (for Start IP and End IP) to allow it to access the database server.
  * Click **Save** from top menu.

![Database Connection Security ](/_images/installation/server/autoscaleazure/azure-mysql-security.png)

>This completes the security configuration. We can now access the server using MySQL workbench.

**Database connection properties**

To be able to connect to the database you should know the database host, the admin username and the password; in addition, your IP should  be registered in the firewall rules. You can find the database host and username in the **Properties** menu after clicking on the database server. The password is not shown. You should have noted it down while creating the database server itself. If you lose the password, you can reset it from the database Overview section.

![Database Connection Properties](/_images/installation/server/autoscaleazure/azure-mysql-db-properties.png)
