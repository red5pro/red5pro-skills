_From: REST API for Groups_

### Launch New Origin

**Description**

Launches a new origin for a node group. Launching a node on a Cloud Platform is a complex asynchronous process. The REST gateway will provide you a response as soon as it knows that the cloud platform has acknowledged the request.

>> The maximum number of origins allowed in a nodegroup is defined through the scale policy file.
>> Additional origins cannot be launched in a group after an edge has been launched in it.

The actual instance boot up may take up to two minutes, dependingo on the environment.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/2.0/admin/nodegroup/{groupName}/node/origin?accessToken=<accessToken>`
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

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/2.0/admin/nodegroup/group-51921df1-d68e-4fee-8332-6dbdf7102e47/node/origin?accessToken=xyz123`
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
