_From: Streams_

## Read Stream With Stats

**Description**

Reads event stream details from system. If a stream is not broadcasting, this operation will result in a `400` or `404` HTTP code.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/{scopeName}/{streamName}/stats`
* **Method**: GET

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data** :

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
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<origin-host-address>",
      "region": "<region-code>",
      "currentSubscribers": <subscriber-count>,
      "startTime": <start-timestamp>
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/live/demo/stats`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "name": "demo",
      "scope": "/live",
      "serverAddress": "104.197.131.87",
      "region": "us-east-1",
      "currentSubscribers": 0,
      "startTime": 1454369656708
    }
```
