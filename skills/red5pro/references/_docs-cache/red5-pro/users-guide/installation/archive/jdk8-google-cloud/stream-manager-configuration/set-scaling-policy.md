_From: 6. Stream Manager Configuration_

## Set Scaling Policy

With Stream Manager API v3.0, the Scaling and Launch policies are set via the API (see [scale policy management](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-scalepolicy/) and [launch policy management](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-launchconfig/)).

Using a tool like [Postman](https://www.postman.com/), you must set a scaling policy before creating any node groups. The policy supports two optional attributes per `role` target - `scaleInWaitTime` & `scaleOutWaitTime`. These are optional parameters denoting delayed scale-in/scale-out time in milliseconds. The attributes require positive values (>=0). If the attribute is omitted it defaults to `0`. For more information see scale policy description.

You will need to create a scaling policy that includes each node type that you want in your setup. If you want to take advantage of the new features (multi-bitrate streaming, adaptive bitrate subscribing, and dynamic clustering) you need to have a minimum of **two** each **origin, edge,** and **relay** nodes. If you want to include VP8 transcoding support, then you also need two **transcoder** nodes.

**POST call:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=<accessToken>
```

**Data** (make sure to select **JSON** as the body type):

```json
   {
    "policy": {
        "name": "<policy-name>",
        "description": "<policy-description>>",
        "version": "<policy-version>",
        "type": "<policy-type>",
    "targets": {
      "target": [
        {
          "role": "<role>",
          "minLimit": "<min-node-count>",
          "maxLimit": "<max-node-count>",
          "scaleAdjustment": "<node-scale-adjustmant>"
        }
      ]
    }
    }}

```

**Example:**

**REQUEST:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=xyz123
```

**Data:**

```json
   {
      "policy": {
          "name": "default-v3",
          "description": "Sample Scale Config policy with all node types",
          "type": "com.red5pro.services.autoscaling.model.ScalePolicyMaster",
          "version": "0.0.3",
          "targets": {
              "region": [
                  {
                      "name": "default",
                      "target": [
                          {
                              "role": "edge",
                              "maxLimit": 20,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "origin",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "relay",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "transcoder",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          }
                      ]
                  }

```
