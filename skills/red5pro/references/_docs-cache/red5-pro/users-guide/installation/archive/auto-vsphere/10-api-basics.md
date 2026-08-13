---
title: API Basics
description: API Basics, to get you started
menu_order: 11
---

(for full API, see [Red5 Pro Stream Manager API](/docs/red5-pro/development/api/archive/rest-api-v-400/))

## Verify Stream Manager Controller (GET)

GET call:

```
https://<streammanager_URL>/streammanager/api/4.0/admin/debug/cloudcontroller?accessToken=<rest.administratorToken>
```

should return:  `Terraform Cloud Service`

## Create a Scale Policy (post)

* Make sure to include a `role` section for each node type you want to include (origin, edge, relay, transcoder):

POST call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=<accessToken>
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

## Create a Launch Policy (post)

For ease of administration, we recommend naming the policy something easily identifiable and descriptive, such as `<imagename>-<nodetypes>` (e.g., `red5pro-11.0-origin-edge`).

### Image name

The image name will be the name of the VM that you configured to use as the node image.

### Instance type

Terraform has predefined VM types for vSphere and we can change it in the terraform file: `cloud_controller_vsphere_dhcp.tf`

* `2cpu_4mem` -- 2 cpu cores and 4gb memory
* `4cpu_8mem` -- 4 cpu cores and 8gb memory
* `8cpu_16mem` -- 8 cpu cores and 16gb memory
* `16cpu_32mem` -- 16 cpu cores and 32gb memory
* `32cpu_64mem` -- 32 cpu cores and 64gb memory


POST call:

```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<accessToken>
```

Data (make sure to select **JSON** as the body type):

```json
   {
    "launchconfig": {
      "name": "<configuration-name>",
      "description": "<configuration-descrption>",
      "image": "red5pro-11.0-template",
      "version": "0.0.3",

    "targets": {
        "target": [
      {
        "role": "<role>",
        "instanceType": "2cpu_4mem",
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

## Create a New Node Group (POST)

Using a tool like [Postman](https://www.postman.com/), create a new node group via the API.

### Region

You can use any region name for vSphere configuration, but you need to use the same value in the SM configuration `red5-web.properties` file as in node group creation. Example: `private`

* In the SM configuration file: red5-web.properties -- `terra.regionNames=private`
* In the node group creation: "private"

POST call:

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken>
```

Data (make sure to select **JSON** as the body type):

```json
{
 "regions": [
   "private"
 ],
  "launchConfig": "vsphere-launch-01",
  "scalePolicy": "vsphere-scale-01"
}
```

**Note the cluster “name” that is returned by the above call. It will be used to create a new Origin server.**

## Launch New Origin (POST)

After you create a node group, create the origin server.  *Creating an origin server will also generate at least one edge, per scaling policy min limit.*

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup/<cluster-name>/node/origin?accessToken=<rest.administratorToken from red5-web.properties file>
```

## Set Alarm Threshold (POST)

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

## List Groups (GET)

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken>
```

