_From: Groups_

## List Group Origins

**Description**

List all origin nodes in a  group.

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/{nodeGroup}/node/origin?accessToken=<accessToken>
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

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
     {
        "identifier": "<node-identifier>",
        "role": "<role>",
        "availabilityZone": "<availability-zone-code",
        "address": "<host>",
        "state": "<node-state>",
        "launchConfig": "<launch-config-name>",
        "capacity": <connection-capacity>
      }
    ]
```

**Example**

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/group-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4/node/origin?accessToken=xyz123
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:

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
      }
    ]
```

### List Group Edges

**Description**

List all edge nodes in a  group.

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/{nodeGroup}/node/edge?accessToken=<accessToken>
```
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
        "availabilityZone": "<availability-zone-code",
        "address": "<host>",
        "state": "<node-state>",
        "launchConfig": "<launch-config-name>",
        "capacity": <connection-capacity>
      }
    ]
```

**Example**

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/group-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4/node/edge?accessToken=xyz123
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
      {
        "identifier": "node-us-central1-a-1452587484090",
        "role": "edge",
        "availabilityZone": "us-central1-a",
        "address": "104.197.138.228",
        "state": "inservice",
        "launchConfig": "default",
        "capacity": 500
      },
      {
        "identifier": "node-us-central1-f-1452587643929",
        "role": "edge",
        "availabilityZone": "us-central1-f",
        "address": "104.197.234.171",
        "state": "inservice",
        "launchConfig": "default",
        "capacity": 500
      }
    ]
```
