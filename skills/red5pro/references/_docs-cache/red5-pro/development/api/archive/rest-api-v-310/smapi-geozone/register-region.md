_From: Geozone & Regions_

## Register Region

**Description**

Registers a `region` by `name` and `code`.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/geozone/<geozone-code>/region?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON

```json
    {
          "name": "<region-name>",
          "code": "<region-code>"
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
        "name": "<region-name>",
        "code": "<region-code>"
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/geoinfo/geozone/asia/region?accessToken=xyz123`
* **Method**: POST
* **Data** :  JSON

```json
    {
          "name": "East Asia",
          "code": "asia-east-1"
    }
```

**RESPONSE**

* **Success**: HTTP CODE `201`
* **Data**:

```json
    {
          "name": "East Asia",
          "code": "asia-east-1"
    }
```
