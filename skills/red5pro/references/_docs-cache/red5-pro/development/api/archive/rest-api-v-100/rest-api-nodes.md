---
title: REST API for Nodes
description: ""
---

> * [Read Node](#read-node)
> * [Terminate Node](#terminate-node)

### Read Node

**Description**

Reads a node by its host address.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/node/<host-address>?accessToken=<accessToken>`
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
     {
        "identifier": "<node-identifier>",
        "role": "<role>",
        "region": "<compute-region-code",
        "adddress": "<host>",
        "state": "<node-state>",
        "launchConfigurationName": "<launch-config-name>",
        "capacity": <connection-capacity>,
        "group": <group-identifier>
      }
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/node/104.197.138.228?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:
    ```json
    {
        "identifier": "node-us-central1-a-1452586832022",
        "role": "origin",
        "region": "us-central1-a",
        "adddress": "104.197.131.87",
        "state": "inservice",
        "launchConfigurationName": "default",
        "capacity": 1500,
        "group": "cluster-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4"
      }
    ```

---

### Terminate Node

**Description**

Terminates a node by its host address.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/node/<host-address>?accessToken=<accessToken>`
* **Method**: DELETE

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
     {
        "identifier": "<node-identifier>",
        "role": "<role>",
        "region": "<compute-region-code>",
        "adddress": "<host>",
        "state": "<node-state>",
        "launchConfigurationName": "<launch-config-name>",
        "capacity": <connection-capacity>,
        "group": <group-identifier>
      }
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/node/104.197.228.198?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:
    ```json
    {
        "identifier": "node-us-central1-a-1452586832022",
        "role": "origin",
        "region": "us-central1-a",
        "adddress": "104.197.228.198",
        "state": "inservice",
        "launchConfigurationName": "default",
        "capacity": 1500,
        "group": "cluster-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4"
    }
    ```
