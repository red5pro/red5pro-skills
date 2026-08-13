_From: Groups_

## Create Group

**Description**

Create a new node group.

**REQUEST**

* **URI** : 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup?accessToken=<accessToken>
```
* **Method**: POST
* **Data**:  JSON

```json
    {
        "regions": [
            "<region-code>"
        ],
        "launchConfig": "<launch-config-name>",
        "scalePolicy": "<scale-policy-name>"
    }
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
      "id": <autogen-group-id>,
      "name": "<autogen-nodegroup>",
      "originConnections": <min-origin-connections>,
      "regions": [
        "<region-code>"
      ],
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
      "state": "<nodegroup-state>",
      "timestamp": <timestamp>
    }
```

**Example**

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup?accessToken=xyz123
```
* **Method**: POST
* **Data** :  JSON

```json
    {
        "regions": [
            "us-central1",
            "us-east1"
        ],
        "launchConfig": "default",
        "scalePolicy": "default"
    }
```

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
      "id": 2,
      "name": "group-d2f6aade-c6eb-4b92-b056-3f3a9f99b96f",
      "originConnections": 0,
      "regions": [
        "us-central1",
        "us-east1"
      ],
      "launchConfig": "default",
      "scalePolicy": "default",
      "state": "new",
      "timestamp": 1452595891000
    }
```

### regions

The geographical regions where you would like the nodes to be created. Stream Manager usually lets the Autoscaler use this list in a round-robin style. You can find a list of [available Google Cloud regions here](https://cloud.google.com/compute/docs/regions-zones?hl=en) or [a list of available AWS regions here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions).

### originConnections

An attribute reserved for future use. Currently this is always set to zero, whena  new group is created.

### launchConfig

Name of the launch configuration to be used for launching each new instance in the nodegroup. Usually this implies the consistent machine configuration for a group. A launch configuration defines your machine type, max connections, etc. for each instance type (origin and edge).

### scalePolicy

Name of the scale policy to be used by Autoscaler to launch new edges when load conditions occur. A scale policy defines details such as min-max edges allowed, instances warm-up time, cooldown period, etc.
