---
title: 3. Configure SQL Database
description: Configure SQL Database for Stream Manager
menu_order: 4
---

Click on the newly created database to go to the Instance info screen.

1. If you have not yet added the Stream Manager IP, then you can do so from the left-hand `connenctions` menu

## Create the “cluster” Database

![lefthanddbmenu](/_images/installation/server/autoscalgooglecloud/lefthanddbmenu.png)

1. From the left-hand menu, click on Databases
2. Under MySQL Databases, click on `Create database`
3. Name the new database: cluster
4. Leave the default character set (utf8)
5. Click Add to finish

![sql setup](/_images/installation/server/autoscalgooglecloud/04newsqldb.png)

## Add a Database User Account

1. From the left-hand menu, click on Users
2. Click on Create user account
3. Set a username and password
4. **NOTE:** these will be used by the Stream Manager, so make sure to note the username/password you’ve created; For security, do not use the same password as you set for the root account.
5. Allow any host
6. Create to add the user account
7. **NOTE:** you will not be able to alter permissions once you’ve created the user, but you can update the password through google cloud dashboard

**Make a note of the following for stream manager configuration:**

1. SQL Host IP Address (Can be seen in the Overview section)
2. Database access username and password (from step 4)

## Populate the Cluster Database Tables

You will find **cluster.sql** in the `{red5prohome}/webapps/streammanager/WEB-INF/sql` directory of the latest Red5 Pro server distribution. This file should be used to populate the cluster database.  You can do this using MySQL Workbench, or even via the Google Developer Console by:

### Using Google Developer Console

1. Under Storage Tab, Storage menu option in the sliding menu pane on left, CREATE BUCKET (for example: autoscaling). Click on your new bucket, then UPLOAD FILES, to add the `cluster.sql` file to the bucket.
2. **Import** the file through the Google Cloud SQL management tool:
3. From left-hand navigation, choose SQL
4. Click on your database instance, then click on IMPORT (format of import -  SQ6.
5. Browse to the `cluster.sql` file. Show advanced options, and enter Database name: **"cluster"**
6. Then click on Import.
  ![storage](/_images/installation/server/autoscalgooglecloud/05storage.png)