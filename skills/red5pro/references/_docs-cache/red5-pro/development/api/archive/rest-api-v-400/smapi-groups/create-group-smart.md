_From: Groups_

## Create Group (Smart)

Create a new node group using information about expected traffic. Optionally a boolean query parameter - `autoinit` can be provided to specify whether the nodegroup should automatically be initialized with an `origin` after successful creation.

**NOTES FOR NodeGroup Smart API Call:**

* The launch configuration must already exist in the Stream Manager data store before attempting to use this API.
* A unique scale policy name should be specified. When the nodegroup is created using the smart api call, the scale policy is automatically generated from the publisher-subscriber data provided.
* Currently the API supports groups that involve only `origin` and `edge` nodetypes; `relay` and `transcoder` specifications will be supported in future releases.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON

```json
    {
      "launchConfig": "<existing-launch-config-name>",
      "scalePolicy": "<new-scale-policy-name>",
      "region": [{
        "name": "<region-code>",
        "info": {
          "minPublishers": "<min-publishers>",
          "maxPublishers": "<max-publishers>",
          "minSubscribers": "<min-subscribers>",
          "maxSubscribers": "<max-subscribers>"
        }
      }]
    }
```

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
      "id": <autogen-group-id>,
      "name": "<autogen-group-name>",
      "originConnections": <min-origin-connections>,
      "regions": [
        "<region-code>"
      ],
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
      "state": "<nodegroup-state>",
      "timestamp": <timestamp>
    }
    ]
```

**Example1**: Create smart nodegroup without auto-initializing it.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup?accessToken=xyz123`
* **Method**: POST
* **Data**:  JSON

```json
    {
      "launchConfig": "default-v3",
      "scalePolicy": "mypolicy",
      "region": [{
        "name": "us-east-1",
        "info": {
          "minPublishers": "500",
          "maxPublishers": "500",
          "minSubscribers": "20000",
          "maxSubscribers": "60000"
        }
      }]
    }
```

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
        "id": 10,
        "name": "group-01cd747b-c649-4165-bdec-81141e494490",
        "originConnections": 0,
        "regions": [
            "us-east-1"
        ],
        "launchConfig": "default-v2",
        "scalePolicy": "mypolicy",
        "state": "new",
        "timestamp": 1525248471265
    }
```

**Example2**: Create smart nodegroup and auto-initialize it with an origin.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup?accessToken=xyz123&autoinit=true`
* **Method**: POST
* **Data** :  JSON

```json
    {
      "launchConfig": "default-v2",
      "scalePolicy": "mypolicy",
      "region": [{
        "name": "us-east-1",
        "info": {
          "minPublishers": "500",
          "maxPublishers": "500",
          "minSubscribers": "20000",
          "maxSubscribers": "60000"
        }
      }]
    }
```

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
        "id": 10,
        "name": "group-01cd747b-c649-4165-bdec-81141e494490",
        "originConnections": 0,
        "regions": [
            "us-east-1"
        ],
        "launchConfig": "default-v2",
        "scalePolicy": "mypolicy",
        "state": "initializing",
        "timestamp": 1525248471265
    }
```

**NOTE: If the origin initialization fails, the group will be automatically removed from data store.**
