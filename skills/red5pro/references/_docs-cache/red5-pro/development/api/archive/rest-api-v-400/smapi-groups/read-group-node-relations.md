_From: Groups_

## Read Group Node Relations

**Description**

Reads cluster relations between nodes of a nodegroup. Cluster relations in a Red5 Pro cluster comprises of nodes acting as parent or child. Parents are usually the point of ingest (origin, relay) and child nodes are the point of egress (edge).

Optionally, you can also track the clustering link state between the parent and child nodes by specifying the query param `linkstate`. If `linkstate` is set to `true` the result includes clustering link state between the nodes otherwise it renders just the parent and child information. The default value for `linkstate` is false.

**CLUSTERING LINK STATES:**

Once a cluster relation is created it tracked in Stream Manager as transitioning between several expected states owing to the nature of the sequence of network events. Given below are the states that a clustering link may transition through.

* `prospective`:The default state of a parent child association.At this stage Stream Manager marked the parent and child nodes for clustering. The relation is created in the data store, but there is no active connection between the two nodes.
* `connecting`:An intermittent state that indicates that Stream Manager has issued a clustering call to the child node with information about the parent.
* `established`:Indicates a successful clustering link between the parent and the child nodes.
* `disconnecting`:An intermittent state that indicates that Stream Manager has issued a de-clustering call to the child node with information about the parent.
* `disconnected`:Indicates that an active clustering link between the parent and the child has been closed.This state can also be intermittent in nature if the one of the nodes involved in the relation is being terminated.
* `error`: Represents an erroneous state of the clustering link owing to an improper sequence of clustering events or a internal failure in selecting the next appropriate link state for a relation.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup/{nodeGroup}/node/relations?accessToken=<accessToken>`
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
    [
    {
        "parent": {
            "address": "<host>",
            "state": "<node-state>",
            "role": "<role>",
            "availabilityZone": "<availability-zone-code>",
            "identifier": "<node-identifier>",
            "launchTime": <node-launch-time>
        },
        "child": {
            "address": "<host>",
            "state": "<node-state>",
            "role": "<role>",
            "availabilityZone": "<availability-zone-code>",
            "identifier": "<node-identifier>",
            "launchTime": <node-launch-time>
        },
        "link": {
            "state": "<clustering-link-state",
            "stateUpdated": <cluster-link-last-update>
        }
    }
    ]
```

**Example : Displaying Node relations**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup/group-9e8eedc4-08d0-4af7-b80c-4460efceb19c/node/relations?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**:  HTTP CODE `200`
* **Data**:

```json
    [
        {
            "parent": {
                "address": "104.197.234.171",
                "state": "inservice",
                "role": "origin",
                "availabilityZone": "india-east-1a",
                "identifier": "node-india-east-1a-1525859616627",
                "launchTime": 1525859621693
            },
            "child": {
                "address": "104.197.138.228",
                "state": "inservice",
                "role": "edge",
                "availabilityZone": "india-east-1a",
                "identifier": "node-india-east-1a-1525859641793",
                "launchTime": 1525859646836
            }
        }
    ]
```

**Example : Displaying node relations with link state**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup/group-9e8eedc4-08d0-4af7-b80c-4460efceb19c/node/relations?accessToken=xyz123&linkstate=true`
* **Method**: GET

**RESPONSE**

* **Success**:  HTTP CODE `200`
* **Data**:

```json
    [
        {
            "parent": {
                "address": "104.197.234.171",
                "state": "inservice",
                "role": "origin",
                "availabilityZone": "india-east-1a",
                "identifier": "node-india-east-1a-1525859616627",
                "launchTime": 1525859621693
            },
            "child": {
                "address": "104.197.138.228",
                "state": "inservice",
                "role": "edge",
                "availabilityZone": "india-east-1a",
                "identifier": "node-india-east-1a-1525859641793",
                "launchTime": 1525859646836
            },
            "link": {
                "state": "established",
                "stateUpdated": 1525859664662
            }
        }
    ]
```
