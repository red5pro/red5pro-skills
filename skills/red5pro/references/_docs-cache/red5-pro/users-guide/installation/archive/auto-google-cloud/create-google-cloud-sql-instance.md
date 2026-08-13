---
title: 2. Create Google Cloud SQL Instance
description: ""
menu_order: 3
---

1. Select the SQL menu option in the sliding menu pane on left to create a new MySQL db.
2. Click on "Create instance" option.
3. Click on "Choose MySQL".
4. Set a instance ID such as `streammanager-db`.
5. Set a root password (you can let GCP generate the password).
6. Database version: Select MySQL 8.0.
7. Select the region where you reserved the static IP for the stream manager. For high-availability, select "Multiple Zones" (recommended for production environments).
8. Click and expand `Configuration options`.
9. Select a machine type, storage type according to estimated usage load.
10. Under `Set Connectivity`, make sure `Public IP` is selected. Below it click on `+Add Networks` and add the stream manager IP address. *Note*: You might also want to add your IP address to be able to manage the stream manager database.
10. Leave the other options to default settings.
11. Under `Set maintenance schedule`, select an appropriate time for possible maintainence. Select a day which falls outside your streaming schedule.
12. Press "Create" button to create the instance.
