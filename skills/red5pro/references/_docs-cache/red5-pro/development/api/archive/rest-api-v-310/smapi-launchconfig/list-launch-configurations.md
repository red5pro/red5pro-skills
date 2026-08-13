_From: Launch Configuration Management_

## List Launch Configurations

**Description**

List launch configurations by name

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/3.1/admin/configurations/launchconfig?accessToken=<accessToken>`
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
      "<configuration-name>"
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/configurations/launchconfig?accessToken=xyz123`
* **Method**: GET
* **Data**:  NA

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
      "alltypes-01",
      "default-v3"
    ]
```
