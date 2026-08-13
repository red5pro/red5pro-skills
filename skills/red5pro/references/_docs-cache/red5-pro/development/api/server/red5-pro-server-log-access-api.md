---
title: Log Access API
description: ""
menu_order: 9
---

* [List Logs](#list-logs)
* [Get Log](#get-log)

## List Logs

To enable log access, modify `{red5pro}/webapps/api/WEB-INF/red5-web.properties`

```xml
## DEBUGGING API CONFIGURATION SECTION
debug.logaccess=false
debug.logcachexpiretime=60000
```

Change the default value of `false` to `true`. If desired, you can also modify the log cache expiration time (the amount of time that the randomly-generated URL will be accessible) from the default 60,000ms.

> **WARNING!** Please note that the log files may contain sensitive information such as your license key, so enable this feature only at your discretion.

**Description**

Lists all log files on the server.

**REQUEST**

* **URI**:

`http://{host}:{port}/api/v1/log?accessToken=<acccessToken>`

* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| accessToken |  Query Param | Security token | Required if token security is enabled |

**RESPONSE**

* **Failure**: HTTP CODE `404` or `500` or `401`
  See failure [status code table](/docs/red5-pro/development/api/server/red5-pro-server-api-failure-status-codes/) for more information on error cause.
* **Data** :

```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
```

* **Success**: HTTP CODE `200 - OK`
* **Data**: Returns a **LogFile** json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.

```json
{
"status": "success",
"code": 200,
"data": [{
"name": "<logfilename>",
"lastModified": <lastmodified> ,
"size": <size-in-byte>
}],
"timestamp": 1515766780094
}
```

**Example**

**REQUEST**

* **URI**: 

`http://localhost:5080/api/v1/log?accessToken=xyz123`

* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
    "status": "success",
    "code": 200,
    "data": [
        {
            "name": "0.0.0.0_access..2017-12-30.log",
            "last_modified": 1514649032999,
            "size": 7372
        },
        {
            "name": "0.0.0.0_access..2018-01-12.log",
            "last_modified": 1515766778955,
            "size": 318
        },
        {
            "name": "cloudstorage.log",
            "last_modified": 1515766545267,
            "size": 1737
        },
        {
            "name": "red5.log",
            "last_modified": 1515766543800,
            "size": 25155
        },
        {
            "name": "red5pro.log",
            "last_modified": 1515766543800,
            "size": 21639
        },
        {
            "name": "rtsp.log",
            "last_modified": 1515766543800,
            "size": 0
        }
    ],
    "timestamp": 1515766780094
  }
```

## Get log

**Description**

Allows access to a log file by name by making it temporarily accessible via the Red5 Pro web server. A temporary path is generated to enable the download. You can download the file by using the server address, the path provided in the response, and the filename. After a limited time, the file is removed and the temporary path is deleted (for security).

**REQUEST**

* **URI**: 

`http://{host}:{port}/api/v1/log/{logfilename}?accessToken=<accessToken>`

* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| logfilename |  Path Param | Log file name | Required |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data** :

```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
```

* **Success**: HTTP CODE `200 - OK`
* **Data**: Returns a **DownloadableLogFile** json object. See [Response objects](/docs/red5-pro/development/api/server/red5-pro-server-response-data-objects/) for attribute definition.
* **Data**:

```json
{
"status": "success",
"code": 200,
"data": {
"path": "<temporary-path-to-log>",
  "comment": "This download will expire in 60 seconds.",
  "name": "<logfilename>",
  "lastModified": <lastmodified>,
  "size": <size-in-bytes>
},
"timestamp": 1515766780094
}
```

> The log file can then be downloaded using the url: `http(s)://{host}:{port}/{temporary-path-to-log}/{logfilename}`
The download is auto expired and removed after a set limit by the `logAccessManager`.

**Example**

**REQUEST**

* **URI**: 

`http://localhost:5080/api/v1/log/red5.log?accessToken=xyz123`

* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
"status": "success",
"code": 200,
"data": {
  "path": "/tmplogs/yFFFbTch/",
  "comment": "This download will expire in 60 seconds.",
  "name": "red5.log",
  "lastModified": 1514900045099,
  "size": 29642
},
"timestamp": 1515766780094
}
```

> The log file would then be accessible using the URL:  `http://localhost:5080/tmplogs/yFFFbTch/red5.log`
