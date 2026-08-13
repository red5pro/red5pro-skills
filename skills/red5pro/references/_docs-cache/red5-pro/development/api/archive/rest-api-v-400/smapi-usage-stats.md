---
title: Short-Term Stream Usage Statistics
description: ""
menu_order: 13
---

The new Stream Manager update has stats collection which can be viewed after a stream ends. This expands on earlier versions of Stream Manager that supported simple live statistics about a stream via `currentSubscribers`.

This `Short-Term Stream Usage Statistics` API has more detailed information about a stream session, such as approximate disconnects, total subscribers, stream duration.

<!-- `Short-Term Stream Usage Statistics` are logged automatically when the broadcast stream unpublishes. The short term stats have a small margin of error due to the fact that they run on the auto scaling setup and the accuracy of the stats depends on the autoscale reports being delivered from the node to the Stream Manager.

Multiple sessions of the same stream are uniquely identified and logged using the start time (in UTC milliseconds) of the stream. -->

* [Read All Usage Stats](#read-all-usage-stats)
* [Read Stream Usage Stats](#read-stream-usage-stats)
* [Delete Stream Usage Stats](#delete-stream-usage-stats)
* [Delete Specific Stream Usage Stats](#delete-specific-stream-usage-stats)
* [Delete All Usage Stats](#delete-all-usage-stats)

**Notes on Usage Stats**

* The stream usage stats provide useful information about stream usage over an autoscaling setup. The `usage stats` attempts to mirror a small part of `stream statistics` provided by standalone Red5 Pro instances using the `Red5 pro server api`. Since the actual connect/disconnect, subscribe/unsubscribe logging depends on the `autoscale` plugin `reportingSpeed`, there can be a slight margin of error in evaluating the exact number of subscribers at a given time.
* Stream Manager attempts to collect and accumulate stream stats even from failed/terminating edges as well in case of an edge failure in between a streaming session. However nodes are force-removed from the system are not accounted for since they do not follow the node life-cycle.
* Currently this feature is only available for use with "simple" clusters (containing origin and edge nodes only).

## Read All Usage Stats

**Description**

Reads all stream usage records from the data store.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/event/usage?accessToken=<accessToken>`
* **Method**: GET
* **Data**:  NA

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
          "startTime": <publish-start-time>,
          "endTime": <publish-stop-time>,
          "duration": <session-duration>,
          "aciveSubscribers": <last-known-active-subscribers>,
          "maxSubscribers": <last-known-peak-subscribers>,
          "lostSubscribers": <last-known-disconnected-subscribers>,
          "totalSubscribers": <last-known-total-subscribers>,
          "updated": <last-update-timestamp>
      }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage?accessToken=xyz123`
* **Method**: GET
* **Data** :  NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
        {
        "name": "stream1",
        "scope": "live",
        "startTime": 1525079735737,
        "endTime": 1525079744557,
        "duration": 8820,
        "aciveSubscribers": 2,
        "maxSubscribers": 0,
        "lostSubscribers": 2
        "totalSubscribers": 4,
        "updated": 1525079744558
        }
    ]
```

---

## Read Stream Usage Stats

**Description**

Reads stream usage records for a given stream name and a scope from the data store.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/event/usage/{scopeName}/{streamName}?accessToken=<accessToken>`
* **Method**: GET
* **Data**:  NA

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
        "startTime": <publish-start-time>,
        "endTime": <publish-stop-time>,
        "duration": <session-duration>,
        "aciveSubscribers": <last-known-active-subscribers>,
        "maxSubscribers": <last-known-peak-subscribers>,
        "lostSubscribers": <last-known-disconnected-subscribers>,
        "totalSubscribers": <last-known-total-subscribers>,
        "updated": <last-update-timestamp>
      }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage?accessToken=xyz123`
* **Method**: GET
* **Data** : NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
        {
        "name": "stream1",
        "scope": "live",
        "startTime": 1525079735737,
        "endTime": 1525079744557,
        "duration": 8820,
        "aciveSubscribers": 2,
        "maxSubscribers": 0,
        "lostSubscribers": 2
        "totalSubscribers": 4,
        "updated": 1525079744558
        }
    ]
```

---

## Delete Stream Usage Stats

**Description**

Deletes stream usage records for a given stream name and a scope from the data store

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage/{scopeName}/{streamName}?accessToken=<accessToken>`
* **Method**: DELETE
* **Data**:  NA

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
* **Data**: NA

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage/live/stream1?accessToken=xyz123?accessToken=xyz123`
* **Method**: DELETE
* **Data**: NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**: NA

---

### Delete Specific Stream Usage Stats

**Description**

Deletes a specific stream usage record for a identified by the stream name, the scope and the stream publish start time (as UTC milliseconds) from the data store

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage/{scopeName}/{streamName}?accessToken=<accessToken>&startTime=<publish-start-time>`
* **Method**: DELETE
* **Data**:  NA

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
        "name": "<stream-name>",
        "scope": "<stream-scope>",
        "startTime": <publish-start-time>,
        "endTime": <publish-stop-time>,
        "duration": <session-duration>,
        "aciveSubscribers": <last-known-active-subscribers>,
        "maxSubscribers": <last-known-peak-subscribers>,
        "lostSubscribers": <last-known-disconnected-subscribers>,
        "totalSubscribers": <last-known-total-subscribers>,
        "updated": <last-update-timestamp>
      }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage/live/stream1?accessToken=xyz123&startTime=1525065208331`
* **Method**: DELETE
* **Data**:  NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
        "name": "stream1",
        "scope": "live",
        "startTime": 1525079735737,
        "endTime": 1525079744557,
        "duration": 8820,
        "aciveSubscribers": 2,
        "maxSubscribers": 0,
        "lostSubscribers": 2
        "totalSubscribers": 4,
        "updated": 1525079744558
    }
```

---

## Delete All Usage Stats

**Description**

Deletes stream usage records for a given stream name and a scope from the data store

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage?accessToken=<accessToken>`
* **Method**: DELETE
* **Data**: NA

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
* **Data**: NA

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/usage?accessToken=xyz123`
* **Method**: DELETE
* **Data** : NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**: NA

---

Parameters such as `startTime`, `endTime` and `updated` are represented in terms of UTC milliseconds, making it easy to be converted and read in any timezone.

Short term stats are automatically cleared up periodically by the Stream Manager’s internal cron. The max time period (in days) can be configured in the Stream Manager configuration file `{RED5_HOME}/webapps/streammanager/WEB-INF/red5-web.properties` in the `DATA STORE MANAGEMENT CONFIGURATION SECTION` as shown below:

```properties
## DATA STORE MANAGEMENT CONFIGURATION SECTION
store.usageStatsDiscardThresholdDays=7
```

You can also manually delete records using the `Delete Stream Usage Stats` and `Delete Specific Stream Usage Stats` API calls.
