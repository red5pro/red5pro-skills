_From: REST API for Groups_

### List Group Edges

**Description**

List all edge nodes in a  group.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup/{groupName}/node/edge?accessToken=<accessToken>`
* **Method**: GET

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
    [
     {
        "identifier": "<node-identifier>",
        "role": "<role>",
        "region": "<compute-region-code",
        "adddress": "<host>",
        "state": "<node-state>",
        "launchConfigurationName": "<launch-config-name>",
        "capacity": <connection-capacity>
      }
    ]
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup/cluster-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4/node/edge?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:
    ```json
    [
      {
        "identifier": "node-us-central1-a-1452587484090",
        "role": "edge",
        "region": "us-central1-a",
        "adddress": "104.197.138.228",
        "state": "inservice",
        "launchConfigurationName": "default",
        "capacity": 500
      },
      {
        "identifier": "node-us-central1-f-1452587643929",
        "role": "edge",
        "region": "us-central1-f",
        "adddress": "104.197.234.171",
        "state": "inservice",
        "launchConfigurationName": "default",
        "capacity": 500
      }
    ]
    ```

---
