_From: Scale Policy Management_

## Clone Scale Policy

**Description**

Creates a new scale policy with a new name using the data from an existing policy.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/configurations/scalepolicy/<existing-policy-name>/copy/<new-policy-name>?accessToken=<accessToken>`
* **Method**: POST
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

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/scalepolicy/alltypes-01/copy/alltypes-02?accessToken=xyz123`
* **Method**: POST
* **Data**:  n/a

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
{
    "policy": {
        "name": "alltypes-02",
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
