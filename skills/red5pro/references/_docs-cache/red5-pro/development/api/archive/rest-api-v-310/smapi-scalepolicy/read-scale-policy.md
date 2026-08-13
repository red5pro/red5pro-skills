_From: Scale Policy Management_

## Read Scale Policy

**Description**

Read a scale policy.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/scalepolicy/{policy-name}?accessToken=<accessToken>`
* **Method**: GET
* **Data**:  NA

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

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/scalepolicy/alltypes-01?accessToken=xyz123`
* **Method**: GET
* **Data**:  NA

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
