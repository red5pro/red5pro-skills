---
title: Client Control API
description: ""
menu_order: 8
---

* [getClients](#getclients)
* [getClientStatistics](#getclientstatistics)
* [terminateClient](#terminateclient)
* [terminateClients](#terminateclients)

## getClients

**Description**

Returns list of clients (connections) on this application.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/clients?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |

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
* **Data**: Returns a list of [**Client**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#Client) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/clients?accessToken=xyz123
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
    {
      "id": "S9YD7FMFXK9WG",
      "creation_time": 1467122341429,
      "last_ping": -1,
      "remote_address": "192.168.0.102"
    }
  ],
  "timestamp": 1467122362235
}
```

## getClientStatistics

**Description**

Returns connections details for a single client (connection).

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/clients/{clientId}?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| clientId |  Path Param | Client id | Required |  |
| scope |  Query Param | Application sub-scope path | Optional |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |

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
* **Data**: Returns a [**ClientStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#ClientStatistics) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/clients/S9YD7FMFXK9WG?accessToken=xyz123
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
    "path": "live",
    "bytes_out": 4452098,
    "bytes_in": 3557,
    "messages_written": 10,
    "messages_read": 3484,
    "messages_dropped": 0,
    "messages_pending": -10,
    "remote_port": 50198,
    "connection_protocol": "rtmp",
    "host": "192.168.0.102",
    "id": "S9YD7FMFXK9WG",
    "creation_time": 1467122341429,
    "last_ping": -1,
    "remote_address": "192.168.0.102"
  },
  "timestamp": 1467122429965
}
```

## terminateClient

**Description**

Terminates the specified client connection from an application.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/clients/{clientId}?accessToken={security-token}
```
* **Method**: DELETE
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| clientId |  Path Param | Client id | Required |  |
| scope |  Query Param | Application sub-scope path | Optional |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |

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
* **Data**: Returns a [**Client**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#Client) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/clients/S9YD7FMFXK9WG?accessToken=xyz123
```
* **Method**: DELETE
* **Data**:

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "id": "S9YD7FMFXK9WG",
    "creation_time": 1467122341429,
    "last_ping": -1,
    "remote_address": "192.168.0.102"
  },
  "timestamp": 1467122487591
}
```

## terminateClients

**Description**

Terminates all client connections from an application.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/clients?accessToken={security-token}
```
* **Method**: DELETE
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |

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
* **Data**: NA

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/clients?accessToken=xyz123
```
* **Method**: DELETE
* **Data**:

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": {},
  "timestamp": 1467122593391
}
```
