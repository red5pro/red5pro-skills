_From: Geozone & Regions_

## Delete Region

**Description**

Deletes a `region` by `code`.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/region/<region-code>?accessToken=<accessToken>`
* **Method**: DELETE

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
        "name": "<region-name>",
        "code": "<region-code>"
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/region/asia-east-1?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
        "name": "East Asia",
        "code": "asia-east-1"
    }
```
