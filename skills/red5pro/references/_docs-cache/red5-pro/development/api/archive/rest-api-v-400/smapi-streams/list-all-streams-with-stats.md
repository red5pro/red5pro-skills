_From: Streams_

## List All Streams With Stats

**Description**

Lists all active streams in the system with stats. This api call can produce two different kinds of results - `aggregated` and `non-aggregated`.**Aggregated** result displays list of publishing streams (streams at origin) and renders the value of `currentSubscribers` as the net total of individual `currentSubscribers` values taken from each edge of the nodegroup.**Non-Aggregated** result displays streams list for each node (origin & edge) that the stream resides on, with the `currentSubscribers` value corresponding only to that node.

The optional boolean query parameter `aggregate` is used to differentiate between aggregated & non-aggregated stats request.A value of `true` will specify request for aggregated stats whereas a value of `false` implies a non-aggregated stats request. If the parameter is not specified it defaults to `true`.

_AGGREGATED STATS REQUEST_

`http://{host}:{port}/streammanager/api/4.0/event/list/stats`

OR

_NON-AGGREGATED STATS REQUEST_

`http://{host}:{port}/streammanager/api/4.0/event/list/stats?aggregate=false`

### For Aggregated Stats (default)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/list/stats`
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
* **DATA**:

```json
    [
    {
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<origin-host-address>",
      "type": "<node-role>",
      "region": "<region-code>",
      "currentSubscribers": <aggregate-subscriber-count>,
      "startTime": <start-timestamp>
    }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/list/stats`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:

```json
    [
    {
        "currentSubscribers": 0,
        "startTime": 1545130249838,
        "type": "origin",
        "name": "stream1",
        "scope": "live",
        "serverAddress": "100.27.43.27",
        "region": "us-east-1"
    },
    {
        "currentSubscribers": 1,
        "startTime": 1545130259426,
        "type": "edge",
        "name": "origin",
        "scope": "live",
        "serverAddress": "100.27.43.27",
        "region": "us-east-1"
    }
    ]
```

### For Non-Aggregated Stats (i.e., `?aggregate=false`)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/list/stats?aggregate=false`
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
* **DATA**:

```json
    [
    {
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<node-host-address>",
      "type": "<node-role>",
      "region": "<region-code>",
      "currentSubscribers": <subscriber-count>,
      "startTime": <start-timestamp>
    }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/list/stats`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:

```json
    [
    {
        "currentSubscribers": 0,
        "startTime": 1545130249838,
        "type": "origin",
        "name": "stream1",
        "scope": "live",
        "serverAddress": "100.27.43.27",
        "region": "us-east-1"
    },
    {
        "currentSubscribers": 0,
        "startTime": 1545130249838,
        "type": "edge",
        "name": "stream1",
        "scope": "live",
        "serverAddress": "34.237.139.9",
        "region": "us-east-1"
    },
    {
        "currentSubscribers": 0,
        "startTime": 1545130259426,
        "type": "origin",
        "name": "stream2",
        "scope": "live",
        "serverAddress": "100.27.43.27",
        "region": "us-east-1"
    },
    {
        "currentSubscribers": 0,
        "startTime": 1545130259426,
        "type": "edge",
        "name": "stream2",
        "scope": "live",
        "serverAddress": "34.237.139.9",
        "region": "us-east-1"
    }
    ]
```
