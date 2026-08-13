_From: Geozone & Regions_

## Read Geozone

**Description**

Reads a `geozone` by `code`.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/geozone/<geozone-code>?accessToken=<accessToken>`
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
        "name": "<geozone-name>",
        "code": "<geozone-code>"
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/geozone/asia?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
          "name": "Asia",
          "code": "asia"
    }
```
