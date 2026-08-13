_From: Launch Configs_

## Create Launch Configuration

**Description**

Create a new launch configuration. **Addition with API 4.0:** option to target specific image per node type.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<accessToken>`
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

*NOTE:* The `properties` and `metadata` values can be used for custom launch configurations. For an example, see [AWS EC2 User Data](https://www.red5.net/docs/red5-pro/users-guide/installation/archive/auto-aws/ec2-user-data/). These fields are required for a valid launch configuration policy, even with no data.

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

**Example1**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=xyz123`
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
          "connectionCapacity": "30"
        },
        {
          "role": "edge",
          "instanceType": "c5.large",
          "connectionCapacity": "300"
        },
        {
          "role": "relay",
          "instanceType": "c5.large",
          "connectionCapacity": "300"
        },
        {
          "role": "transcoder",
          "instanceType": "c5.large",
          "connectionCapacity": "30"
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
                    "connectionCapacity": 300,
                    "instanceType": "c5.large"
                },
                {
                    "role": "origin",
                    "connectionCapacity": 30,
                    "instanceType": "c5.large"
                },
                {
                    "role": "relay",
                    "connectionCapacity": 300,
                    "instanceType": "c5.large"
                },
                {
                    "role": "transcoder",
                    "connectionCapacity": 300,
                    "instanceType": "c5.large"
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

### Example2 Target Specific Image Per Node Type

If you don't include an image target for a defined node-type, it will just use the `general` image defined in the initial section of the request.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=xyz123`
* **Method**: POST
* **Data**:  JSON

```json
    {
    "launchconfig": {
      "name": "alltypes-01",
      "description": "Launch config policy with all node types",
      "image": "general-red5pro-image-name",
      "version": "0.0.3",

      "targets": {
          "target": [
        {
          "role": "origin",
          "instanceType": "c5.large",
          "connectionCapacity": "30",
          "image": "origin-image"
        },
        {
          "role": "edge",
          "instanceType": "c5.large",
          "connectionCapacity": "300",
          "image": "edge-image"
        },
        {
          "role": "relay",
          "instanceType": "c5.large",
          "connectionCapacity": "300",
          "image": "relay-image"
        },
        {
          "role": "transcoder",
          "instanceType": "c5.xlarge",
          "connectionCapacity": "30",
          "image": "transcoder-image"
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
                    "connectionCapacity": 300,
                    "instanceType": "c5.large",
                    "edge-image"
                },
                {
                    "role": "origin",
                    "connectionCapacity": 30,
                    "instanceType": "c5.large",
                    "origin-image"
                },
                {
                    "role": "relay",
                    "connectionCapacity": 300,
                    "instanceType": "c5.large",
                    "relay-image"
                },
                {
                    "role": "transcoder",
                    "connectionCapacity": 30,
                    "instanceType": "c5.xlarge",
                    "transcoder-image"
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
