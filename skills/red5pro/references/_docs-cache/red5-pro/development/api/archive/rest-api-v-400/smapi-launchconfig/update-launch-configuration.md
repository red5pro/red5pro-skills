_From: Launch Configs_

## Update Launch Configuration

**Description**

Updates an existing launch configuration

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/launchconfig/{configuration-name}?accessToken=<accessToken>`
* **Method**: PUT
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
* **Data**: JSON

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

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/launchconfig/alltypes-01?accessToken=xyz123`
* **Method**: PUT
* **Data**:  JSON

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
                    "connectionCapacity": 1000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "origin",
                    "connectionCapacity": 2000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "relay",
                    "connectionCapacity": 1000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "transcoder",
                    "connectionCapacity": 1000,
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
                    "connectionCapacity": 1000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "origin",
                    "connectionCapacity": 2000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "relay",
                    "connectionCapacity": 1000,
                    "instanceType": "c5.large"
                },
                {
                    "role": "transcoder",
                    "connectionCapacity": 1000,
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
