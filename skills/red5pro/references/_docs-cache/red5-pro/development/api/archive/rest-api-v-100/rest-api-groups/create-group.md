_From: REST API for Groups_

### Create Group

**Description**

Create a new node group.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON
    ```json
    {
     "regions": [
       "<region-code>",
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
      "name": "<autogen-group-name>",
      "regions": [
        "<egion-code>","
      ],
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
      "timestamp": <timestamp>
    }
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup?accessToken=xyz123`
* **Method**: POST
* **Data** :  JSON
    ```json
    {
     "regions": [
       "us-west-2"
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
      "id": 36,
      "name": "group-bbcc379d-57ed-4649-ac68-9f3365dea59f",
      "originConnections": 0,
      "regions": [
        "us-west-2"
      ],
      "launchConfig": "default",
      "scalePolicy": "default",
      "timestamp": 1463514107313
    }
    ```

#### baseCapacity

Minimum subscriber connections that this group should support. This parameter helps the scale-in process decide when to scale down an edge. This should be based on the `connectionCapacity` that you define for new instances in the launchconfig policy file.

For example: If your `connectionCapacity` for an edge is set to __1000__, and you anticipate that your active concurrent connections are generally going to exceed __2000__, then you will want to set this to __2000__ to ensure there are always at least two active edges in your group.

#### originConnections

Minimum connections at origin. This should always be zero (0) for the current version of Stream Manager.

#### regions

The compute zones where you would like the edges to be created. Stream Manager usually lets the Autoscaler use this list in a round-robin style. You can find a list of zones to use on official Google Cloud documentation page: [https://cloud.google.com/compute/docs/zones?hl=en](https://cloud.google.com/compute/docs/regions-zones?hl=en)

#### launchConfig

Name of the launch configuration to be used for launching a new instance. Usually this implies the consistent machine configuration for a group. A launch configuration defines your compute machine type, max connections, etc. for an instance.

#### scalePolicy

Name of the scale policy to be used by Autoscaler to launch new edges when load conditions occur. A scale policy defines details such as min-max edges allowed, instances warm up time, cooldown period, etc.

---
