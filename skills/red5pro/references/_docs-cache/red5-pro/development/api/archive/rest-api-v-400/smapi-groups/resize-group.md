_From: Groups_

## Resize Group

**Description**

Lets you specify the minimum/maximum range of publishers and subscribers you expect to have. Stream Manager evaluates the minimum and maximum number of nodes that you should have in your nodegroup and updates the scale policy for your nodegroup based on the calculated `minLimit` and `maxLimit`.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup/<nodeGroup>?accessToken=<accessToken>`
* **Method**: PUT
* **Data**:  JSON

```json
    {
      "region": [{
        "name": "default",
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

* **Success**: HTTP CODE `200`
* **Data**:

 ```json
    {
      "id": <group-id>,
      "name": "<autogen-nodegroup>",
      "originConnections": <min-origin-connections>,
      "regions": [
        "<region-code>"
      ],
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
      "state": "<nodegroup-state>",
      "timestamp": <timestamp>
    }
 ```

**NOTES:**

* You cannot add a new region using this api. Only regions originally specified can be modified.
* Currently the api supports TIER-1 nodegroups only (groups that involve only origin & edge). `relays` and `transcoders` specifications will be supported in future releases.
* The `region` property is an array of regional capacity definitions. Therefore you can specify definition for more than one region at a time.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/nodegroup/group-01cd747b-c649-4165-bdec-81141e494490?accessToken=xyz123`
* **Method**: PUT
* **Data** :  JSON

```json
    {
      "region": [{
        "name": "us-east-1",
        "info": {
          "minPublishers": "500",
          "maxPublishers": "1000",
          "minSubscribers": "1000",
          "maxSubscribers": "3000"
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
        "state": "active",
        "timestamp": 1525248471265
    }
```

---
