_From: REST API for Groups_

### List Group Origins

**Description**

List all origin nodes in a  group.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup/{groupName}/node/origin?accessToken=<accessToken>`
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
* **Success**: HTTP CODE `200`
* **DATA**:
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

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup/cluster-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4/node/origin?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:
    ```json
    [
      {
        "identifier": "node-us-central1-a-1452586832022",
        "role": "origin",
        "region": "us-central1-a",
        "adddress": "104.197.131.87",
        "state": "inservice",
        "launchConfigurationName": "default",
        "capacity": 1500
      }
    ]
    ```

---
