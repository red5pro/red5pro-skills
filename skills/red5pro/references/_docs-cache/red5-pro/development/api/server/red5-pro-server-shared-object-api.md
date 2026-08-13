---
title: Shared Objects
description: ""
menu_order: 6
---

* [getSharedObjects](#getsharedobjects)
* [getSharedObjectStatistics](#getsharedobjectstatistics)

Shared objects are collaboration points for Red5 Pro applications. These are mostly used for chats, games, etc. used to update real-time data to all connected clients. Shared objects are also known as server-side cookies.

## getSharedObjects

**Description**

Returns a list of shared object names in the specified application.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/sharedobjects?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional |  |
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
  http://localhost:5080/api/v1/applications/live/sharedobjects?accessToken=xyz123
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
    "BallControl"
  ],
  "timestamp": 1467211887976
}
```

## getSharedObjectStatistics

**Description**

Returns statistics for a requested SharedObject.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/sharedobjects/{soname}?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| soname |  Path Param | Shared object name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional |  |
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
* **Data**: Returns a [**SoStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#SoStatistics) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definitions.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/sharedobjects/BallControl?accessToken=xyz123
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
    "name": "BallControl",
    "persistent": false,
    "version": 1,
    "active_listeners": 1,
    "total_listeners": 1,
    "max_listeners": 1,
    "total_changes": 0,
    "total_deletes": 0,
    "totalSends": 0
  },
  "timestamp": 1467211947486
}
```
