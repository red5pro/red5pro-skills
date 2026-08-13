_From: Launch Configuration Management_

## Read Launch Configuration

**Description**

Read a launch configuration

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/launchconfig/{configuration-name}?accessToken=<accessToken>`
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

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/launchconfig/alltypes-01?accessToken=xyz123`
* **Method**: GET
* **Data**:  NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
    "launchconfig": {
        "image": "red5pro-image-name",
        "metadata": {
            "meta": [
                {
                    "value": "meta-value",
                    "key": "meta-name"
                }
            ]
        },
        "name": "alltypes-01",
        "description": "Launch config policy with all node types",
        "version": "0.0.3",
        "targets": {
            "target": [
                {
                    "role": "edge",
                    "connectionCapacity": 2000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "origin",
                    "connectionCapacity": 2000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "relay",
                    "connectionCapacity": 2000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "transcoder",
                    "connectionCapacity": 2000,
                    "instanceType": "c5.xlarge"
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
        }
    }
}
```
