---
title: Streams
description: ""
menu_order: 7
---

* [getLiveStreams](#getlivestreams)
* [getLiveStreamStatistics](#getlivestreamstatistics)
* [unpublishLiveStream](#unpublishlivestream)
* [recordLiveStream](#recordlivestream)
* [stopStreamRecord](#stopstreamrecord)

## getLiveStreams

**Description**

Returns all live streams in the specified application.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/streams?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional (required if your stream is scoped) |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: HTTP CODE `404` or `500` or `401`
  See failure [status code table](/docs/red5-pro/development/api/server/red5-pro-server-api-failure-status-codes/) for more information on error cause.
* **Data**:

```json
{
  "status": "error",
  "code": <http-status-code>,
  "message": <error-message>",
  "timestamp": <server-timestamp>
}
```

* **Success**: HTTP CODE `200 - OK`
* **Data**:

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/streams?accessToken=xyz123
```
* **Method**: GET
* **Data**:

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": [
    "stream1",
    "stream2"
  ],
  "timestamp": 1467061170310
}
```

## getLiveStreamStatistics

**Description**

Returns statistics for the specified live stream.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/streams/{streamname}?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| streamname |  Path Param | Stream name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional (required if your stream is scoped) |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: HTTP CODE `404` or `500` or `401`
  See failure [status code table](/docs/red5-pro/development/api/server/red5-pro-server-api-failure-status-codes/) for more information on error cause.
* **Data**:

```json
{
  "status": "error",
  "code": <http-status-code>,
  "message": <error-message>",
  "timestamp": <server-timestamp>
}
```

* **Success**: HTTP CODE `200 - OK`
* **Data**: Returns a [**BroadcastStreamStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#BroadcastStreamStatistics) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/streams/stream1?accessToken=xyz123
```
* **Method**: GET
* **Data** :

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "bytes_received": 1017748288,
    "active_subscribers": 1,
    "total_subscribers": 2,
    "max_subscribers": 2,
    "id": 1,
    "name": "6a4857ac-c7c6-4637-a583-b414f94ef875",
    "publish_name": "stream1",
    "creation_time": 1467059370440,
    "scope_path": "/default",
    "is_recording": false,
    "state": "uninit"
  },
  "timestamp": 1467061226826
}
```

## unpublishLiveStream

**Description**

Unpublishes an active ongoing live stream by terminating the publishing connection.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/streams/{streamname}/action/unpublish?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| streamname |  Path Param | Stream name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional (required if your stream is scoped) |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: HTTP CODE `404` or `400` or `409` or `500` or `401`
  See failure [status code table](/docs/red5-pro/development/api/server/red5-pro-server-api-failure-status-codes/) for more information on error cause.
* **Data**:

```json
{
  "status": "error",
  "code": <http-status-code>,
  "message": <error-message>",
  "timestamp": <server-timestamp>
}
```

* **Success**: HTTP CODE `200 - OK`
* **Data**: Returns a [**StreamStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#StreamStatistics) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/streams/stream1/action/unpublish?accessToken=xyz123
```
* **Method**: GET
* **Data**:

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {
      "id": 1,
      "name": "7cf1e6e8-b9b3-43be-930c-39dcf4423d43",
      "publish_name": "stream1",
      "creation_time": 1547807031430,
      "scope_path": "/default",
      "is_recording": false,
      "state": "CLOSED"
    },
    "timestamp": 1547807043517
}
```

## recordLiveStream

**Description**

Starts the recording of an active live stream (if you are publishing a stream you can choose to record it via this command even if you haven't started it with the R5RecordTypeRecord setting in the mobile client).

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/streams/{streamname}/action/startrecord?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| streamname |  Path Param | Stream name | Required |  |
| saveas |  Query Param | filename to save as | Optional | `{streamname}` |
| append |  Query Param | Append flag | Optional | false |
| scope |  Query Param | Application sub-scope path | Optional (required if your stream is scoped) |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: HTTP CODE `404` or `400` or `409` or `500` or `401`
  See failure [status code table](/docs/red5-pro/development/api/server/red5-pro-server-api-failure-status-codes/) for more information on error cause.
* **Data**:

```json
{
  "status": "error",
  "code": <http-status-code>,
  "message": <error-message>",
  "timestamp": <server-timestamp>
}
```

* **Success**: HTTP CODE `200 - OK`
* **Data**: Returns a [**RecordStreamStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#RecordStreamStatistics) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/streams/stream1/action/startrecord?accessToken=xyz123
```
* **Method**: GET
* **Data**:

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "record_name": "stream1.flv",
    "append": false,
    "id": 1,
    "name": "6a4857ac-c7c6-4637-a583-b414f94ef875",
    "publish_name": "streams",
    "creation_time": 1467059370440,
    "scope_path": "/default",
    "is_recording": true,
    "state": "UNINIT"
  },
  "timestamp": 1467061453937
}
```

## stopStreamRecord

**Description**

Stops the ongoing recording of a live stream. Note: this can only be run against a recording that has been started via the API.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/streams/{streamname}/action/stoprecord?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| streamname |  Path Param | Stream name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional (required if your stream is scoped) |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: HTTP CODE `404` or `400` or `409` or `500` or `401`
  See failure [status code table](/docs/red5-pro/development/api/server/red5-pro-server-api-failure-status-codes/) for more information on error cause.
* **Data**:

```json
{
  "status": "error",
  "code": <http-status-code>,
  "message": <error-message>",
  "timestamp": <server-timestamp>
}
```

* **Success**: HTTP CODE `200 - OK`
* **Data**: Returns a [**StreamStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#StreamStatistics) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/streams/stream1/action/stoprecord?accessToken=xyz123
```
* **Method**: GET
* **Data**:

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "id": 1,
    "name": "6a4857ac-c7c6-4637-a583-b414f94ef875",
    "publish_name": "streams",
    "creation_time": 1467059470440,
    "scope_path": "/default",
    "is_recording": false,
    "state": "UNINIT"
  },
  "timestamp": 1467061492531
}
```
