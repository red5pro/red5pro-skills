---
title: REST API for Streams
description: ""
---

> * [Read Stream](#read-stream)
> * [Read Stream With Stats](#read-stream-with-stats)
> * [List Streams](#list-streams)
> * [List All Streams With Stats](#list-all-streams-with-stats)

### Read Stream

**Description**

Reads an event stream from system. This read operation provides the client with an origin server address for the given stream name and scope.

* For __Broadcasters__ the Origin address is used to publish a stream
* For __Subscribers__ the Origin address helps in looking up a suitable edge address for the stream via Origin API gateway

If a stream is not publishing, a subscribe type request will result in a http code `400` or `404`.

**REQUEST**

* **URL**:
    _Broadcaster_

    `http://{host}:{port}/streammanager/api/1.0/event/{scopeName}/{streamName}?action=broadcast`

    _Subscriber_

    `http://{host}:{port}/streammanager/api/1.0/event/{scopeName}/{streamName}?action=subscribe`
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

#### For Broadcaster (i.e., `?action=broadcast`)

* **Success**: HTTP CODE `200`
* **DATA**:
    ```json
    {
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<origin-host-address>",
      "region": "<origin-compute-region-code>"
    }
    ```

#### For Subscriber (i.e., `?action=subscribe`)

* **Success**: HTTP CODE `200`
* **DATA**:
    ```json
    {
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<edge-host-address>",
      "region": "<origin-compute-region-code>"
    }
    ```

---

**Example** 1.a - Broadcaster (?action=broadcast)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/live/demo?action=broadcast`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:
    ```json
    {
      "name": "demo",
      "scope": "/live",
      "serverAddress": "104.197.131.87",
      "region": "us-east-1"
    }
    ```

---

**Example** 1.b - Subscriber (?action=subscribe)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/live/demo?action=subscribe`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:
    ```json
    {
      "name": "demo",
      "scope": "/live",
      "serverAddress": "104.197.85.57",
      "region": "us-east-1"
    }
    ```

---

### Read Stream With Stats

**Description**

Reads an event stream details from system.

This read operation provides the client with the details of the stream and stats on it.

If a stream is not publishing, this operation will result in a `400` or `404` HTTP code.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/{scopeName}/{streamName}/stats`

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
      "region": "<origin-compute-region-code>",
      "currentSubscribers": <subscriber-count>,
      "startTime": <start-timestamp>
    }
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/live/demo/stats`
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

---

### List Streams

**Description**

Reads all active streams the system.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/list`
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
    [
    {
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<origin-host-address>",
      "region": "<origin-compute-region-code>"
    }
    ]
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/list`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:
    ```json
    [
    {
      "name": "demo",
      "scope": "/live",
      "serverAddress": "104.197.131.87",
      "region": "us-east-1"
    }
    ]
    ```

---

### List All Streams With Stats

**Description**

Lists all active streams in the system with stats.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/list/stats`
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
      "region": "<origin-compute-region-code>",
      "currentSubscribers": <subscriber-count>,
      "startTime": <start-timestamp>
    }
    ]
    ```

---

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/event/list/stats`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:
    ```json
    [
      {
        "name": "demo",
        "scope": "/live",
        "serverAddress": "104.197.131.87",
        "region": "us-east-1",
        "currentSubscribers": 0,
        "startTime": 0
      }
    ]
    ```
