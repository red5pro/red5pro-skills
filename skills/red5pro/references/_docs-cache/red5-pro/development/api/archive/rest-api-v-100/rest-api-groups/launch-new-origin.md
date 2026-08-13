_From: REST API for Groups_

### Launch New Origin

**Description**

Launches a new origin node for a node group. Only one origin per group is permitted in this version of Red5 Pro Stream Manager. Launching a node on a Cloud Platform is a complex asynchronous process. The REST gateway will provide you a response as soon as it knows that the cloud platform has acknowledged the request.

The actual instance boot up may take up to 2 minutes or less (for [Google Compute Platform](https://cloud.google.com/products/compute)).

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup/{groupName}/node/origin?accessToken=<accessToken>`
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
      "region": "<compute-region-code>",
      "role": "<role>",
      "group": "<group-identifier>",
      "requestTime": <timestamp>
    }
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/nodegroup/cluster-51921df1-d68e-4fee-8332-6dbdf7102e47/node/origin?accessToken=xyz123`
* **Method**: POST

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:
    ```json
    {
      "id": 6,
      "identifier": "node-us-central1-a-1452600712264",
      "region": "us-central1-a",
      "role": "origin",
      "group": "cluster-51921df1-d68e-4fee-8332-6dbdf7102e47",
      "requestTime": 1452600723615
    }
    ```
