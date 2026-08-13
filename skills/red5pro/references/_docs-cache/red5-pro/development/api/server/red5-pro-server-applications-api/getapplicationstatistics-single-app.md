_From: Applications API_

## getApplicationStatistics (single app)

**Description**

Returns statistics for a single application. Optionally you can provide the relative path to the scope (a subdirectory of an application) if you wish to get statistics for that scope.

**REQUEST**

* **URI** :
```
http://{host}:5080/api/v1/applications/{appname}?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional (For use with single app request) |  |
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
* **Data**: Returns a single [**ScopeStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#ScopeStatistics) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definitions.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live?accessToken=xyz123
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
      "name": "live",
      "path": "/default",
      "creation_time": 1467058529097,
      "depth": 1,
      "active_connections": 0,
      "total_connections": 9,
      "max_connections": 2,
      "active_subscopes": 1,
      "total_subscopes": 4,
      "max_subscopes": 1,
      "bytes_in": 10,
      "bytes_out": 0,
      "messages_out": 0,
      "messages_in": 0,
      "type": "application",
      "data_unit": "b"
    },
  "timestamp": 1467060616203
}
```
