_From: Applications API_

## getApplicationStatistics (all apps)

**Description**

Returns statistics for all applications.

**REQUEST**

* **URI**:`http://{host}:5080/api/v1/applications/statistics?accessToken={security-token}`
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| unit |  Query Param | Unit of data transfer | Optional | b (bytes), kb, mb, gb |
| accessToken |  Query Param | Security token | Required if token security is enabled |  |
| app |  Query Param | web app to include in the report | Optional |  |

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
* **Data**: Returns a list of [**ScopeStatistics**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#ScopeStatistics) JSON objects, depending on the number of apps that are running under red5pro. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definitions.  A filtered list of applications can also be specified by providing one or multiple entries for the query parameter 'app' in the query string.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/statistics?accessToken=xyz123
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "name": "api",
            "path": "/default",
            "creation_time": 1623880035035,
            "depth": 1,
            "active_connections": 0,
            "total_connections": 0,
            "max_connections": 0,
            "active_subscopes": 0,
            "total_subscopes": 0,
            "max_subscopes": 0,
            "bytes_in": 0.0,
            "bytes_out": 0.0,
            "messages_out": 0,
            "messages_in": 0,
            "type": "application",
            "data_unit": "b"
        },
        {
            "name": "live",
            "path": "/default",
            "creation_time": 1623880034862,
            "depth": 1,
            "active_connections": 0,
            "total_connections": 0,
            "max_connections": 0,
            "active_subscopes": 0,
            "total_subscopes": 0,
            "max_subscopes": 0,
            "bytes_in": 0.0,
            "bytes_out": 0.0,
            "messages_out": 0,
            "messages_in": 0,
            "type": "application",
            "data_unit": "b"
        },
        {
            "name": "streammanager",
            "path": "/default",
            "creation_time": 1623880034917,
            "depth": 1,
            "active_connections": 0,
            "total_connections": 0,
            "max_connections": 0,
            "active_subscopes": 0,
            "total_subscopes": 0,
            "max_subscopes": 0,
            "bytes_in": 0.0,
            "bytes_out": 0.0,
            "messages_out": 0,
            "messages_in": 0,
            "type": "application",
            "data_unit": "b"
        }
    ],
    "timestamp": 1623880073212
}

```

**Example2**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/statistics?accessToken=xyz123&app=live&app=api
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
            "name": "api",
            "path": "/default",
            "creation_time": 1623880035035,
            "depth": 1,
            "active_connections": 0,
            "total_connections": 0,
            "max_connections": 0,
            "active_subscopes": 0,
            "total_subscopes": 0,
            "max_subscopes": 0,
            "bytes_in": 0.0,
            "bytes_out": 0.0,
            "messages_out": 0,
            "messages_in": 0,
            "type": "application",
            "data_unit": "b"
        },
        {
            "name": "live",
            "path": "/default",
            "creation_time": 1623880034862,
            "depth": 1,
            "active_connections": 0,
            "total_connections": 0,
            "max_connections": 0,
            "active_subscopes": 0,
            "total_subscopes": 0,
            "max_subscopes": 0,
            "bytes_in": 0.0,
            "bytes_out": 0.0,
            "messages_out": 0,
            "messages_in": 0,
            "type": "application",
            "data_unit": "b"
        }
    ],
    "timestamp": 162384973212
}

```
