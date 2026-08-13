_From: 6. Stream Manager Configuration_

## Set Launch Configuration Policy

You will need to create a launch policy that includes each node type that you want in your setup. If you want to take advantage of the new features (multi-bitrate streaming, adaptive bitrate subscribing, and dynamic clustering) you need to have a minimum of **two** each **origin, edge,** and **relay** nodes. If you want to include VP8 transcoding support, then you also need two **transcoder** nodes. 

<!-- You will need the name of the `ami` that you created in [step 7 above]FIXME-DOM(#7prepare-red5-pro-ami-for-nodes). 
-->
You can choose different instance types and capacities for each node type if you wish.

**POST call:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<accessToken>
```

**Data** (make sure to select **JSON** as the body type):

```json
   {
    "launchconfig": {
      "name": "<configuration-name>",
      "description": "<configuration-descrption>",
      "image": "<red5pro-image>",
      "version": "0.0.2",

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

**Example:**

**REQUEST:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchpolicy?accessToken=xyz123
```

**Data:**

```json
     {
    "launchconfig": {
      "name": "all-nodes-launch",
      "description": "Sample Launch Config with all four nodetypes",
      "image": "red5pro-image-name",
      "version": "0.0.3",

      "targets": {
          "target": [
        {
          "role": "origin",
          "instanceType": "n1-standard-2",
          "connectionCapacity": "2000"
        },
        {
          "role": "edge",
          "instanceType": "n1-standard-2",
          "connectionCapacity": "2000"
        },
        {
          "role": "relay",
          "instanceType": "n1-standard-2",
          "connectionCapacity": "2000"
        },
        {
          "role": "transcoder",
          "instanceType": "n1-standard-4",
          "connectionCapacity": "2000"
        }
         ]
        },

        "properties": {
          "property": [
            {
              "name": "property-name",
              "value": "property-value"
            }
          ]
        },
        "metadata": {
          "meta": [
            {
              "key": "meta-name",
              "value": "meta-value"
            }
          ]
        }
      }}
```
