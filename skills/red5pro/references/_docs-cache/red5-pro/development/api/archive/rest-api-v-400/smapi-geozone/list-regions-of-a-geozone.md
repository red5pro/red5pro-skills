_From: Geozone & Regions_

## List Regions of a Geozone

**Description**

List all registered regions.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/geozone/<geozone-code>/region?accessToken=<accessToken>`
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
    [
        {
            "name": "<region-name>",
            "code": "<region-code>"
        }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/asia/region?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
        {
            "name": "East Asia",
            "code": "asia-east-1"
        }
    ]
```
