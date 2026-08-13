---
title: API Basics with Wavelength Zones
description: API Basics, to get you started
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

**NOTE: you will need to define the wavelength and non-wavelength subnets in your scale policy**

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
          "name": "1o-1e-mobile",
          "description": "sample scale policy including wavelength subnet",
          "type": "com.red5pro.services.autoscaling.model.ScalePolicyMaster",
          "version": "0.0.4",
          "targets": {
              "region": [
                  {
                      "name": "default",
                      "subnet": "default",
                      "target": [
                          {
                              "role": "edge",
                              "maxLimit": 20,
                              "scaleAdjustment": 1,
                              "minLimit": 1
                          },
                          {
                              "role": "origin",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 1
                          }
                      ]
                  },
                                    {
                      "name": "us-west-2",
                      "vpc": "wav-vpc",
                      "subnet": "wav-reg-subnet-public1-us-west-2a",
                      "target": [
                          {
                              "role": "edge",
                              "maxLimit": 20,
                              "scaleAdjustment": 1,
                              "minLimit": 1
                          },
                          {
                              "role": "origin",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 1
                          }
                      ]
                  },
                                    {
                      "name": "us-west-2",
                      "vpc": "wav-vpc",
                      "subnet": "wav-mobile-uswest2-wl1laxwlz",
                      "target": [
                          {
                              "role": "edge",
                              "maxLimit": 20,
                              "scaleAdjustment": 1,
                              "minLimit": 1
                          },
                          {
                              "role": "origin",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 1
                          }
                      ]
                  }
                  
                      ]
                  }
      }
  }
```

## Create a Launch Policy 

HTTP Method: POST

For ease of administration, we recommend naming the policy something easily identifiable and descriptive, such as `<imagename>-<nodetypes>` (e.g., `red5pro6.4.0-allnodetypes`), NOTE: Wavelength zones only support t3.medium, t3.xlarge, r5.2xlarge, and g4dn.2xlarge VMs.

POST call: `https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<rest.administratorToken>`

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
        "instanceType": "t3.medium",
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

**Note the nodegroup “name” that is returned by the above call. It will be used to create a new Origin server.**

## Launch New Origin 

HTTP Method: POST

After you create a node group, create the origin server.  *Creating an origin server will also generate at least one edge, per scaling policy min limit.*

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup/<nodegroup-name>/node/origin?accessToken=<rest.administratorToken from red5-web.properties file>
```

**NOTE:** If you wish to launch more than one origin, you can repeat the call. The maximum origins allowed will depend on the maxLimit attribute of the 'origin' object described in scale policy. If 'origin' is omitted from the scale policy then the default value for maximum origins is 1.


## List Group Nodes 

HTTP Method: GET

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup/<nodegroup-name>/node?accessToken=<rest.administratorToken from red5-web.properties file>
```

When all nodes are listed as `INSERVICE` then the cluster is useable for broadcasting/subscribing.

> NOTE: it may take 10-15 minutes for the nodegroup to stabilize, depending on which wavelength zone you are using.