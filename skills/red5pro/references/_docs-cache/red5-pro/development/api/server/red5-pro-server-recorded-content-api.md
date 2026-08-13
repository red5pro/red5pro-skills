---
title: Recorded Content (VOD)
description: ""
menu_order: 5
---

* [getVodFiles](#getvodfiles)
* [deleteVodFile](#deletevodfile)

## getVodFiles

**Description**

Returns the list of available media files in a specified application's streams storage directory.

**REQUEST**

* **URI** : 
```
http://{host}:5080/api/v1/applications/{appname}/media?accessToken={security-token}
```
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| scope |  Query Param | Application sub-scope path | Optional |  |
| extension |  Query Param | Extension for filtering lookup | Optional | |
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
* **Data**: Returns a list of [**OnDemandMedia**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#OnDemandMedia) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definitions.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/media?accessToken=xyz123
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
      "name": "stream1.flv",
      "last_modified": 1466098500000,
      "file_size": 785
    },
    {
      "name": "stream2.flv",
      "last_modified": 1466102050000,
      "file_size": 1747
    },
    {
      "name": "stream3.flv",
      "last_modified": 1467059658000,
      "file_size": 5795
    }
  ],
  "timestamp": 1467060770935
}
```

## deleteVodFile

**Description**

Deletes a media file from stream storage location by its name and extension.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/media?filename={filename}&extension={extension}&accessToken={security-token}
```
* **Method**: DELETE
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| scope |  Query Param | Application sub scope path | Optional |  |
| filename |  Query Param | filename to delete | Optional |  |
| extension |  Query Param | Extension for file lookup | Required |  |
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
* **Data**: Returns a [**OnDemandMedia**](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/#OnDemandMedia) json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definitions.

---

**Example**

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/live/media?filename=stream1&extension=flv&accessToken=xyz123
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
    "name": "stream1.flv",
    "last_modified": 1466102050000,
    "file_size": 1747
  },
  "timestamp": 1467060841959
}
```
