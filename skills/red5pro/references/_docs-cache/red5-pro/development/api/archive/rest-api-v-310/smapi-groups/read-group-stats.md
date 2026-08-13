_From: Groups_

## Read Group Stats

**Description**

Displays the load statistics for this node group.

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/{nodeGroup}/stats?accessToken=<accessToken>
```
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
    {
      "totalConnections": <total-group-connections>,
      "targetTypeLoadSummary": [
        {
          "type": "<role>",
          "totalNodeCount": <total-node-count>,
          "totalActiveNodeCount": <total-active-nodes>,
          "netConnectionCapacity": <total-available-capacity>,
          "netConnectionLoad": <total-connection-load>
        }
      ]
    }
```

**Example**

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/group-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4/stats?accessToken=xyz123
```
* **Method**: GET

**RESPONSE**

* **Success**:  HTTP CODE `200`
* **Data**:

```json
    {
      "totalConnections": 0,
      "targetTypeLoadSummary": [
        {
          "type": "origin",
          "totalNodeCount": 1,
          "totalActiveNodeCount": 1,
          "netConnectionCapacity": 5,
          "netConnectionLoad": 0
        },
        {
          "type": "edge",
          "totalNodeCount": 1,
          "totalActiveNodeCount": 0,
          "netConnectionCapacity": 30,
          "netConnectionLoad": 0
        }
      ]
    }
```
