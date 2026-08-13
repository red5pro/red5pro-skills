---
title: Nodes
description: ""
menu_order: 7
---

* [Read Node](#read-node)
* [Terminate Node](#terminate-node)
* [Read Node Statistics](#read-node-stats)

## Read Node

**Description**

Reads a node by its host address.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/node/<host-address>?accessToken=<accessToken>`
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
        "availabilityZone": "<availability-zone-code",
        "address": "<host>",
        "state": "<node-state>",
        "launchConfig": "<launch-config-name>",
        "capacity": <connection-capacity>,
        "group": <group-identifier>
      }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/node/104.197.138.228?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

    ```json
    {
        "identifier": "node-us-central1-a-1452586832022",
        "role": "origin",
        "availabilityZone": "us-central1-a",
        "address": "104.197.131.87",
        "state": "inservice",
        "launchConfig": "default",
        "capacity": 1500,
        "group": "group-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4"
      }
    ```

## Terminate Node

**Description**

Terminates a node by its host address. This requires that the node is in the `INSERVICE` state. If a node is already in terminating state or is a newly launched node it cannot be terminated until it becomes active (attains the INSERVICE state).

Optionally you can `force delete` a node using the boolean query parameter `force`  if it is stuck in a transitioning state for long and you ar eunable to terminate it normally. The value for the parameter `force`  can be `true` or `false`. This will remove the node entry from database and streammanager will delete it from cloud after some time.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/node/<host-address>?accessToken=<accessToken>`
    OR
    `http://{host}:{port}/streammanager/api/3.1/admin/node/<host-address>?accessToken=<accessToken>&force=true`
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
        "availabilityZone": "<availability-zone-code>",
        "address": "<host>",
        "state": "<node-state>",
        "launchConfig": "<launch-config-name>",
        "capacity": <connection-capacity>,
        "group": <group-identifier>
      }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/node/104.197.228.198?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
        "identifier": "node-us-central1-a-1452586832022",
        "role": "origin",
        "availabilityZone": "us-central1-a",
        "address": "104.197.228.198",
        "state": "inservice",
        "launchConfig": "default",
        "capacity": 1500,
        "group": "group-8bcc96ed-b7e5-4044-b797-1bc93d5f0be4"
    }
```

## Read Node Stats

**Description**

Displays the load statistics for a single node (edge or origin).

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/node/{host}/stats?accessToken=<accessToken>`
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
      "totalConnections": <total-connection-count>,
      "parents": [
        "<parent-host-1>",
        "<parent-host-N>"
      ],
      "lastTrafficTime": <last-traffic-time>,
      "lastPing": <last-ping-time>,
      "group": "<group-identifier>",
      "identifier": "<node-identifier>",
      "role": "<role>",
      "availabilityZone": "<availability-zone-code>",
      "address": "<host>",
      "state": "<node-state>",
      "launchConfig": "<launch-configuration-name>",
      "capacity": <connection-capacity>
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/admin/node/54.152.171.193/stats?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**:  HTTP CODE `200`
* **Data**:

```json
    {
      "totalConnections": 0,
      "parents": [
        "54.92.190.62"
      ],
      "lastTrafficTime": 0,
      "lastPing": 1483534238634,
      "group": "group-7fd29762-58f9-4177-a503-04d7f5e1aa49",
      "identifier": "node-us-east-1a-1483534045592",
      "role": "edge",
      "availabilityZone": "us-east-1a",
      "address": "54.152.171.193",
      "state": "inservice",
      "launchConfig": "rajdeep-v3",
      "capacity": 4
    }
```