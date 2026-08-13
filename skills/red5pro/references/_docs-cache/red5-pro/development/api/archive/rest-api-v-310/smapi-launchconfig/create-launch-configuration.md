_From: Launch Configuration Management_

## Create Launch Configuration

**Description**

Create a new launch configuration

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/launchconfig?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON

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
* **Data**:JSON

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

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/launchconfig?accessToken=xyz123`
* **Method**: POST
* **Data**:  JSON

```json
    {
    "launchconfig": {
      "name": "alltypes-01",
      "description": "Launch config policy with all node types",
      "image": "red5pro-image-name",
      "version": "0.0.3",

      "targets": {
          "target": [
        {
          "role": "origin",
          "instanceType": "c5.large",
          "connectionCapacity": "2000"
        },
        {
          "role": "edge",
          "instanceType": "c5.large",
          "connectionCapacity": "2000"
        },
        {
          "role": "relay",
          "instanceType": "c5.large",
          "connectionCapacity": "2000"
        },
        {
          "role": "transcoder",
          "instanceType": "c5.xlarge",
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

**RESPONSE**

* **Success**: HTTP CODE `201`
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
```
