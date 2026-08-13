_From: REST API for Groups_

### Delete Group

**Description**

Deletes a node group. If the group has no nodes in it then it is deleted right away, otherwise all the nodes of the group are deleted in the background separately, and then the group itself is deleted once it is empty.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/2.0/admin/nodegroup/<groupName>?accessToken=<accessToken>`
* **Method**: DELETE

**RESPONSE**

* **FAILURE**: HTTP CODE `400` or `404`
* **Data** :
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
      "name": "<autogen-group-name>",
      "originConnections": 0,
      "regions": [
        "<compute-region-code>"
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
* **Method**: DELETE

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
        "us-central1"
      ],
      "launchConfig": "default",
      "scalePolicy": "default",
      "timestamp": 1452595891000
    }
    ```

---
