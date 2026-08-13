---
title: API Basics
description: ""
menu_order: 15
---

(for full API, see [Red5 Pro Stream Manager API](/docs/red5-pro/development/api/archive/rest-api-v-400/))

Verify Stream Manager is Using the Correct Controller

GET call:

```
http://<streammanager_IP>:5080/streammanager/api/4.0/admin/debug/cloudcontroller?accessToken=<rest.administratorToken from red5-web.properties file>
```

should return:  `Microsoft Azure`

Create a New Node Group (post)

Using a tool like [Postman](https://www.postman.com/), create a new node group via the API.

> Not all regions may support virtual machines based on the nature of your subscription. You would need to check with Azure support about the limitations of your subscription.

POST call:
```
http://<streammanager_IP>:5080/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken from red5-web.properties file>
```

Data (make sure to select **JSON** as the body type):

```json
{
 "regions": [
   "eastus"
 ],
 "launchConfig": "az-default-v2",
 "scalePolicy": "default-v2"
}
```

**Note the cluster “name” that is returned by the above call. It will be used to create a new Origin server.**

Launch New Origin (post)
After you create a node group, create the origin server.  *Creating an origin server will also generate at least one edge, per scaling policy min limit.*

```
http://<streammanager_IP>:5080/streammanager/api/4.0/admin/nodegroup/<cluster-name>/node/origin?accessToken=<rest.administratorToken from red5-web.properties file>
```

Set Alarm Threshold (POST)

By default, the alarm threshold (the capacity percentage at which the cluster will scale up) is set to 60%. To modify this, POST the following:

**FOR EDGE:**

```
http://<streammanager_IP>:5080/streammanager/api/4.0/admin/alarm/scaleout/default?type=edge&threshold=<threshold>&accessToken=<rest.administratorToken from red5-web.properties file>
```

**FOR ORIGIN:**

```
http://<streammanager_IP>:5080/streammanager/api/4.0/admin/alarm/scaleout/default?type=origin&threshold=<threshold>&accessToken=<rest.administratorToken from red5-web.properties file>
```

LIST GROUPS (get)

```
http://<streammanager_IP>:5080/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken from red5-web.properties file>
```