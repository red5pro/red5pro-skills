---
title: API Basics
description: API Basics, to get you started
menu_order: 14
---

(for full API, see [Red5 Pro Stream Manager API](/docs/red5-pro/development/api/archive/rest-api-v-400/))

For the POST calls, we recommend using a tool like [Postman](https://www.postman.com/).

## Verify Stream Manager is Using the Correct Controller

GET call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/debug/cloudcontroller?accessToken=<rest.administratorToken>
```

should return:  `Amazon Web Services`

## Create a Scale Policy

HTTP Method: POST

* Make sure to include a `role` section for each node type you want to include (origin, edge, relay, transcoder):

POST call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=<rest.administratorToken>
```

Data (make sure to select **JSON** as the body type):

```json
   {
  "policy": {
          "name": "<policy-name>",
          "description": "<policy-description>>",
          "type": "<policy-type>",
          "version": "<policy-version>",
          "targets": {
              "region": [
                  {
                      "name": "default",
                      "target": [
        {
          "role": "<role>",
          "minLimit": "<min-node-count>",
          "maxLimit": "<max-node-count>",
          "scaleAdjustment": "<node-scale-adjustment>"
        }
      ]
    }
    }}
```

## Create a Launch Policy 

HTTP Method: POST

For ease of administration, we recommend naming the policy something easily identifiable and descriptive, such as `<imagename>-<nodetypes>` (e.g., `red5pro6.4.0-allnodetypes`)

POST call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<rest.administratorToken>
```

Data (make sure to select **JSON** as the body type):

```json
   {
    "launchconfig": {
      "name": "<configuration-name>",
      "description": "<configuration-descrption>",
      "image": "<red5pro-image>",
      "version": "0.0.3",

    "targets": {
        "target": [
      {
        "role": "<role>",
        "instanceType": "<instance-type>",
        "connectionCapacity": "<instance-capacity>"
      }
      ]
      },

      "properties": {
        "property": [
          {
            "name": "<property-name>",
            "value": "<property-value>"
          }
        ]
      },
      "metadata": {
        "meta": [
          {
            "key": "<meta-name>",
            "value": "<meta-value>"
          }
        ]
      }
    }}
```

## Create a New Node Group 

HTTP Method: POST

POST call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken>
```

Data (make sure to select **JSON** as the body type):

```json
{
 "regions": [
   "<region, eg: us-west-2>"
 ],
 "launchConfig": "<launchconfig-created-above>",
 "scalePolicy": "<scaleconfig-created-above>"
}
```

**Note the cluster “name” that is returned by the above call. It will be used to create a new Origin server.**

## Launch New Origin 

HTTP Method: POST

After you create a node group, create the origin server.  *Creating an origin server will also generate at least one edge, per scaling policy min limit.*

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup/<cluster-name>/node/origin?accessToken=<rest.administratorToken from red5-web.properties file>
```

**NOTE:** If you wish to launch more than one origin, you can repeat the call. The maximum origins allowed will depend on the maxLimit attribute of the 'origin' object described in scale policy. If 'origin' is omitted from the scale policy then the default value for maximum origins is 1.

## Set Alarm Threshold 

HTTP Method: POST

By default, the alarm threshold (the capacity percentage at which the cluster will scale up any given node type) is set to 60%. To modify this, POST the following:

**FOR EDGE:**

```
https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=edge&threshold=<threshold>&accessToken=<rest.administratorToken>
```

**FOR ORIGIN:**

```
https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=origin&threshold=<threshold>&accessToken=<rest.administratorToken>
```

**FOR RELAY:**

```
https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=relay&threshold=<threshold>&accessToken=<rest.administratorToken>
```

**FOR TRANSCODER:**

```
https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=transcoder&threshold=<threshold>&accessToken=<rest.administratorToken>
```

## List Groups 

HTTP Method: GET

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken from red5-web.properties file>
```
