_From: Geozone & Regions_

## Register Geozone

**Description**

Registers a `geozone` by `name` and `code`. A geozone is a macro location such as a continent etc. A geozone may group contain one or more regions.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/geozone?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON

```json
    {
          "name": "<geozone-name>",
          "code": "<geozone-code>"
    }
```

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data**:

```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
```

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
        "name": "<geozone-name>",
        "code": "<geozone-code>"
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/geozone?accessToken=xyz123`
* **Method**: POST
* **Data** :  JSON

```json
    {
          "name": "Asia",
          "code": "asia"
```

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
          "name": "Asia",
          "code": "asia"
    }
```
