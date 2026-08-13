---
title: Log Access
description: ""
menu_order: 13
---

* [List Logs](#list-logs)
* [Get Log](#get-log)

**NOTE: Log access is granted only if the property `debug.logaccess` is true in the Stream Manager `red5-web.properties` file.**

## List logs

**Description**

Lists all logs files on the server.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/log?accessToken=<acccessToken>`
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
    {
      [
      {
          "name": "<logfilename>",
          "lastModified": <lastmodified>,
          "size": <size-in-bytes>
      }
      ]
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/log?accessToken=xyz123`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      [
      {
          "name": "0.0.0.0_access..2017-12-21.log",
          "lastModified": 1513867540636,
          "size": 51310
      },
      {
          "name": "0.0.0.0_access..2017-12-22.log",
          "lastModified": 1513944946049,
          "size": 426
      },
      {
          "name": "0.0.0.0_access..2017-12-25.log",
          "lastModified": 1514226382149,
          "size": 4174
      },
      {
          "name": "0.0.0.0_access..2017-12-26.log",
          "lastModified": 1514231665577,
          "size": 1201
      },
      {
          "name": "0.0.0.0_access..2017-12-30.log",
          "lastModified": 1514654154593,
          "size": 3888
      },
      {
          "name": "0.0.0.0_access..2018-01-01.log",
          "lastModified": 1514830704204,
          "size": 1138
      },
      {
          "name": "0.0.0.0_access..2018-01-02.log",
          "lastModified": 1514900907233,
          "size": 55014
      },
      {
          "name": "cloudstorage.log",
          "lastModified": 1514900046626,
          "size": 1688
      },
      {
          "name": "red5.log",
          "lastModified": 1514900045099,
          "size": 53982
      },
      {
          "name": "red5pro.log",
          "lastModified": 1514900045100,
          "size": 43368
      },
      {
          "name": "rtsp.log",
          "lastModified": 1514900045101,
          "size": 0
      }
      ]

    }
```

## Get log

**Description**

Allows access to a log file by name by making it temporarily accessible via the Red5 Pro web server. A temporary path is generated to enable the download. You can download the file by using the server address, the path provided in the response, and the filename. After a limited time, the file is removed and the temporary path is deleted (for security).

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/log/{logfilename}?accessToken=<accessToken>`
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
      {
        "path": "<temporary-path-to-log>",
        "comment": "This download will expire in 60 seconds.",
        "name": "<logfilename>",
        "lastModified": <lastmodified>,
        "size": <size-in-bytes>
      }
    }
```

> The log file can then be downloaded using the url: `http(s)://{host}:{port}/<temporary-path-to-log>/{logfilename}`
The download is auto expired and removed after a set limit by the `logAccessManager`.

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/log/red5.log?accessToken=xyz123`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      {
      "path": "/tmplogs/yFFFbTch/",
      "comment": "This download will expire in 60 seconds.",
      "name": "red5.log",
      "lastModified": 1514900045099,
      "size": 29642
      }

    }
```

> The log file can then be downloaded using the URL `http://streammanager:5080/tmplogs/yFFFbTch/red5.log`
