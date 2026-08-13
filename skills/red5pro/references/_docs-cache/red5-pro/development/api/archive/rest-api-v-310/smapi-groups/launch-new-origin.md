_From: Groups_

## Launch New Origin

**Description**

Launches a new origin for a node group - this will initiate the nodegroup and populate it per the nodegroup's scaling policy. The REST gateway will provide you a response as soon as it knows that the cloud platform has acknowledged the request.

The actual instance boot up may take up to two minutes, depending on the environment.

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/{nodeGroup}/node/origin?accessToken=<accessToken>
```
* **Method**: POST

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data**:

```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
```

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
      "id": <auto-gen-id>,
      "identifier": "<node-identifier>",
      "availabilityZone": "<availability-zone-code>",
      "role": "<role>",
      "group": "<group-identifier>",
      "requestTime": <timestamp>
    }
```

**Example**

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/nodegroup/group-51921df1-d68e-4fee-8332-6dbdf7102e47/node/origin?accessToken=xyz123
```
* **Method**: POST

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
      "id": 6,
      "identifier": "node-us-central1-a-1452600712264",
      "availabilityZone": "us-central1-a",
      "role": "origin",
      "group": "group-51921df1-d68e-4fee-8332-6dbdf7102e47",
      "requestTime": 1452600723615
    }
```
