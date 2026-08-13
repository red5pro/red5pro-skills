_From: Scale Policy Management_

## Create Scale Policy

**Description**

Create a new scale policy. Note: if you intend to use the Autoscaling Tier 2 functionality, you need a minimum of **two** each **origin, edge** and **relay** nodes per group. If you are also using the Adaptive Bitrate Susbcriber or VP8 Transcode functionality, then you would need at least two **transcode** nodes per group.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/scalepolicy?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON

```json
   {
  "policy": {
          "name": "<policy-name>",
          "description": "<policy-description>",
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

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data**:

```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
```

* **Success**: HTTP CODE `201`
* **Data**:

```json
     {
   "policy": {
     "name": "<policy-name>",
     "description": "<policy-description>>",
     "version": "<policy-version>",
     "type": "<policy-type>",
     "targets": {
       "target": [{
         "role": "<role>",
         "minLimit": "<min-node-count>",
         "maxLimit": "<max-node-count>",
         "scaleAdjustment": "<node-scale-adjustment>"
       }]
     }
   }}
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/scalepolicy?accessToken=xyz123`
* **Method**: POST
* **Data**:  JSON

```json
   {
      "policy": {
          "name": "alltypes-01",
          "description": "Scale policy file with all node types",
          "type": "com.red5pro.services.autoscaling.model.ScalePolicyMaster",
          "version": "0.0.3",
          "targets": {
              "region": [
                  {
                      "name": "default",
                      "target": [
                          {
                              "role": "edge",
                              "minLimit": 2,
                              "maxLimit": 20,
                              "scaleAdjustment": 1
                          },
                          {
                              "role": "origin",
                              "minLimit": 2,
                              "maxLimit": 20,
                              "scaleAdjustment": 1
                          },
                                                    {
                              "role": "relay",
                              "minLimit": 2,
                              "maxLimit": 20,
                              "scaleAdjustment": 1
                          },
                                                    {
                              "role": "transcoder",
                              "minLimit": 2,
                              "maxLimit": 20,
                              "scaleAdjustment": 1
                          }
                      ]
                  }
                      ]
                  }
      }
  }
```

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
{
    "policy": {
        "name": "alltypes-01",
        "description": "Scale policy file with all node types",
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
                            "maxLimit": 20,
                            "scaleAdjustment": 1,
                            "minLimit": 2
                        },
                        {
                            "role": "relay",
                            "maxLimit": 20,
                            "scaleAdjustment": 1,
                            "minLimit": 2
                        },
                        {
                            "role": "transcoder",
                            "maxLimit": 20,
                            "scaleAdjustment": 1,
                            "minLimit": 2
                        }
                    ]
                }
            ]
        }
    }
}
```
