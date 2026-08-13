---
title: 6. Add Cluster Schema
description: Connect to MySQL and Add Cluster Schema
menu_order: 7
---

To connect to the mysql instance which we just created, we suggest using the freeware MySQL workbench tool, and can be downloaded from [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/).

* Launch MySQL Workbench tool on your system
* Click on the “+” icon to the right of MySQL Connections to open the new connection configuration window.
* Enter a connection name - (for example, “aws-mysql”)
* Hostname: the database endpoint URL which we obtained from RDS instance details tab
* Username: the Database Master Username configured above
* Password: the Database Master password configured above
* Default Schema: cluster (database schema for streammanager)
* *Click on Test Connection to verify you can connect.*  - if you are not on the system that was added as "my IP" when you created the RDS security policy, this may fail.
    ![mysqlworkbench](/_images/installation/server/autoscaleaws/mysqlworkbench.png)
* Click “ok” to save configuration and close window.
* Download the Red5 Pro Server Distribution, and unzip to your desktop.
* Double click on the new connection you created to open database workspace view.
* Download the Red5 Pro Server Distribution, and unzip to your desktop.
* From menu click => File => Open SQL Script, and browse the server distribution to find the `cluster.sql` file `{red5prohome}/webapps/streammanager/WEB-INF/sql/cluster.sql`
* Click the execute icon to execute the sql script which populates the cluster database ![execute](/_images/installation/server/autoscaleaws/execute.png)
    ![clusterdbpopulated](/_images/installation/server/autoscaleaws/clusterdbpopulated.png)
