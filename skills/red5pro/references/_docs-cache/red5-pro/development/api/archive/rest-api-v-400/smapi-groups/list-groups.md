_From: Groups_

## List Groups

**Description**

List all available groups in the system.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup?accessToken=<accessToken>`
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
      "name": "<autogen-nodegroup>"
      "originConnections": <min-origin-connections>,
      "regions": [
        "<compute-region-code>"
      ],
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
      "state": "<nodegroup-state>",
      "timestamp": <timestamp>
    }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
      {
        "id": 3,
        "name": "group-e658a196-cb39-411a-86c1-d1e618222100",
        "originConnections": 0,
        "regions": [
          "us-central1-a",
          "us-central1-f"
        ],
        "launchConfig": "default",
        "scalePolicy": "default",
        "state": "active",
        "timestamp": null
      },
      {
        "id": 4,
        "name": "group-51921df1-d68e-4fee-8332-6dbdf7102e47",
        "originConnections": 0,
        "regions": [
          "us-central1-a",
          "us-central1-f"
        ],
        "launchConfig": "default",
        "scalePolicy": "default",
        "state": "active",
        "timestamp": null
      }
    ]
```
