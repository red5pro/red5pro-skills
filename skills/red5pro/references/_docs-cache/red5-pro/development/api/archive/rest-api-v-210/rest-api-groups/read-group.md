_From: REST API for Groups_

### Read Group

**Description**

Reads a node group.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/2.0/admin/nodegroup/<groupName>?accessToken=<accessToken>`
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
    {
      "id": <autogen-group-id>,
      "originConnections": 0,
      "name": "<autogen-group-name>",
      "region": [
        "<region-code>"
      ],
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
      "timestamp": <timestamp>
    }
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:5080/streammanager/api/2.0/admin/nodegroup/group-d2f6aade-c6eb-4b92-b056-3f3a9f99b96f?accessToken=xyz123`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
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
      "timestamp": 1452595891000
    }
    ```

---
