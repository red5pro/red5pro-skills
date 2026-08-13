---
title: Server API
description: ""
menu_order: 3
---

* [getServerInfo](#getserverinfo)
* [ping](#ping)
* [getServerStatistics](#getserverstatistics)

## getServerInfo

**Description**

Returns basic Red5 Pro server information.

**REQUEST**

* **URI** : 
```
http://{host}:5080/api/v1/server?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: NA
* **Data**: NA
* **Success**: HTTP CODE `200 - OK`
* **Data**: Returns a [**ServerInfo**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#ServerInfo/) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definitions.

---

**Example**

**REQUEST**

* **URI** 
```
http://localhost:5080/api/v1/server?accessToken=xyz123
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "red5_pro_version": "1.2.1.b109-release",
    "fms_version": "RED5/1,0,7,0",
    "capabilities": 33,
    "uptime": 473884
  },
  "timestamp": 1467224198453
}
```

## ping

**Description**

Pings the server to see if it’s alive, and returns its latest timestamp.

**REQUEST**

* **URI** : 
```
http://{host}:5080/api/v1/server/ping?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: NA
* **Data**: NA

* **Success**: HTTP CODE `200 - OK`
* **Data**:

---

**Example**

**REQUEST**

* **URI** 
```
http://localhost:5080/api/v1/server/ping?accessToken=xyz123
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": 1467060909455,
  "timestamp": 1467060909455
}
```

## getServerStatistics

**Description**

Returns detailed server statistics report. `Total_connections` are the total since server was started, `active_connections` are the current live connections, and `max_connections` are the maximum number of concurrent connections since server startup.

**REQUEST**

* **URI** : 
```
http://{host}:5080/api/v1/server/statistics?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| unit |  Query Param | Unit of data transfer | Optional | b (bytes), kb, mb, gb |
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404` or `500` or `401`
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
* **Data**: Returns a [**ServerStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-api/#getServerStatistics/) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definitions.

---

**Example**

**REQUEST**

* **URI**:
  ```
  http://localhost:5080/api/v1/server/statistics?accessToken=xyz123
  ```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "red5_pro_version": "1.2.1.b109-release",
    "fms_version": "RED5/1,0,7,0",
    "up_time": 2436402,
    "os_name": "Mac OS X",
    "os_version": "10.11.5",
    "processors": 4,
    "architecture": "x86_64",
    "total_memory": 222298112,
    "max_memory": 1908932608,
    "free_memory": 22372784,
    "num_apps": 5,
    "active_sub_scopes": 1,
    "total_sub_scopes": 4,
    "max_sub_scopes": 1,
    "total_connections": 9,
    "active_connections": 1,
    "max_connections": 2,
    "bytes_in": 12,
    "bytes_out": 0,
    "messages_in": 0,
    "messages_out": 0,
    "data_unit": "b"
  },
  "timestamp": 1467060941836
}
```
