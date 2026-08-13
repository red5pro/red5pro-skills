_From: REST API for Groups_

### List Groups

**Description**

List all available groups in the system.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup?accessToken=<accessToken>`
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
      "id": <autogen-group-id>,
      "name": "<autogen-group-name>",
      "baseCapacity": <group-min-connections>,
      "originConnections": <min-origin-connections>,
      "regions": [
        "<compute-region-code>",
        "<compute-region-code>"
      ],
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
      "timestamp": <timestamp>
    }
    ]
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:
    ```json
    [
      {
        "id": 3,
        "name": "cluster-e658a196-cb39-411a-86c1-d1e618222100",
        "baseCapacity": 100,
        "originConnections": 0,
        "regions": [
          "us-central1-a",
          "us-central1-f"
        ],
        "launchConfig": "default",
        "scalePolicy": "default",
        "timestamp": null
      },
      {
        "id": 4,
        "name": "cluster-51921df1-d68e-4fee-8332-6dbdf7102e47",
        "baseCapacity": 200,
        "originConnections": 0,
        "regions": [
          "us-central1-a",
          "us-central1-f"
        ],
        "launchConfig": "default",
        "scalePolicy": "default",
        "timestamp": null
      }
    ]
    ```

---
