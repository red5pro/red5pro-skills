_From: Scale Policy Management_

## Update Scale Policy

**Description**

Updates a scale policy

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/scalepolicy/{policy-name}?accessToken=<accessToken>`
* **Method**: PUT
* **Data**:  JSON

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

* **Success**: HTTP CODE `200`
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

**NOTES ON UPDATE API**:

* Only `minLimit` and `maxLimit` properties should be updated while the policy is in use by one or more node groups.
* Any part of the policy can be updated while the policy is not in use by any of the node groups.

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/scalepolicy/alltypes-01?accessToken=xyz123`
* **Method**: PUT
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
                              "maxLimit": 30,
                              "scaleAdjustment": 1
                          },
                          {
                              "role": "origin",
                              "minLimit": 2,
                              "maxLimit": 30,
                              "scaleAdjustment": 1
                          },
                                                    {
                              "role": "relay",
                              "minLimit": 2,
                              "maxLimit": 30,
                              "scaleAdjustment": 1
                          },
                                                    {
                              "role": "transcoder",
                              "minLimit": 2,
                              "maxLimit": 30,
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

* **Success**: HTTP CODE `200`
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
                              "minLimit": 2,
                              "maxLimit": 30,
                              "scaleAdjustment": 1
                          },
                          {
                              "role": "origin",
                              "minLimit": 2,
                              "maxLimit": 30,
                              "scaleAdjustment": 1
                          },
                                                    {
                              "role": "relay",
                              "minLimit": 2,
                              "maxLimit": 30,
                              "scaleAdjustment": 1
                          },
                                                    {
                              "role": "transcoder",
                              "minLimit": 2,
                              "maxLimit": 30,
                              "scaleAdjustment": 1
                          }
                      ]
                  }
                      ]
                  }
      }
  }
```
