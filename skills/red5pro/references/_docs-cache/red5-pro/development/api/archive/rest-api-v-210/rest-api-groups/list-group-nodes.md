_From: REST API for Groups_

### List Group Nodes

**Description**

List all nodes in a  group and their status. The different statuses for a node are:

* pending (stream manager has contacted the cloud service to start an instance)
* running (instance has been launched, and services are starting up)
* **inservice** (node is active and available for streaming)
* terminating (node is being deactivated)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/2.0/admin/nodegroup/{groupName}/node?accessToken=<accessToken>`
* **Method**: GET

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **DATA**:
    ```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
    ```
* **Success**:  HTTP CODE `200`
* **Data**:
    ```json
    [
     {
        "identifier": "<node-identifier>",
        "role": "<role>",
        "availabilityZone": "<availability-zone-code>",
        "address": "<host>",
        "state": "<node-state>",
        "launchConfig": "<launch-config-name>",
        "capacity": <connection-capacity>
      }
    ]
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/2.0/admin/nodegroup/group-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4/node?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**:  HTTP CODE `200`
* **Data**:
    ```json
    [
      {
        "identifier": "node-us-central1-a-1452586832022",
        "role": "origin",
        "availabilityZone": "us-central1-a",
        "address": "104.197.131.87",
        "state": "inservice",
        "launchConfig": "default",
        "capacity": 1500
      },
      {
        "identifier": "node-us-central1-a-1452587484090",
        "role": "edge",
        "availabilityZone": "us-central1-a",
        "address": "104.197.138.228",
        "state": "inservice",
        "launchConfig": "default",
        "capacity": 500
      }
      ]
    ```

---
