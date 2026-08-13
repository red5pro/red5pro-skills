_From: Streams_

## List Streams

**Description**

Reads all streams active in the system.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/list`
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
      "type": "node-role",
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<origin-host-address>",
      "region": "region-code>"
    }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/list`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
    {
        "type": "origin",
        "name": "stream1",
        "scope": "live",
        "serverAddress": "34.200.228.163",
        "region": "us-east-1"
    },
    {
        "type": "edge",
        "name": "stream1",
        "scope": "live",
        "serverAddress": "34.238.220.153",
        "region": "us-east-1"
    }
    ]
```
