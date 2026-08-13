_From: Groups_

## Node Relations Map

**Description**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup/<nodegroup>/node/map?accessToken=<accesstoken>`
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
[NodeGroup: <nodegroup id>
]
|-> [ORIGINS: <origin1>, <origin2>
]
|   |->  ESTABLISHED [RELAY-1: <relay1>
]
|   |   ·->  ESTABLISHED [EDGE-1: <edge1>
]
|   ·->  ESTABLISHED [RELAY-2: <relay2>
]
|       ·->  ESTABLISHED [EDGE-2: <edge2>
]
·-> [TRANSCODERS: <transcoder1>, <transcoder2>
]
```

**Example : Displaying node relations map**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup/group-9e8eedc4-08d0-4af7-b80c-4460efceb19c/node/relations?accessToken=xyz123&linkstate=true`
* **Method**: GET

**RESPONSE**

* **Success**:  HTTP CODE `200`
* **Data**:

```json
[NodeGroup: group-1891ed39-9a70-4a93-9e73-4d27d51929eb
]
|-> [ORIGINS: 161.35.184.133,
    161.35.184.129
]
|   |->  ESTABLISHED [RELAY-nyc3: 161.35.180.11
]
|   |   ·->  ESTABLISHED [EDGE-nyc3: 161.35.176.9
]
|   ·->  ESTABLISHED [RELAY-nyc3: 161.35.184.111
]
|       ·->  ESTABLISHED [EDGE-nyc3: 161.35.184.132
]
·-> [TRANSCODERS: 161.35.184.131,
    161.35.184.127
]
```
