_From: Scale Policy Management_

## List Scale Policies

**Description**

List scale policies by name

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/3.1/admin/configurations/scalepolicy?accessToken=<accessToken>`
* **Method**: GET
* **Data**:  NA

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
      "<policy-name>"
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/scalepolicy?accessToken=xyz123`
* **Method**: GET
* **Data**:  NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
      "config-01",
      "alltypes-01"
      "default-v3"
    ]
```
