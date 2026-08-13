_From: Rest API_

### Clear Provisions

**Description**

Removes all instance provisions from the simulated cloud platform.

**REQUEST**

* **URI**:

```html
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision?accessToken=<accessToken>
```

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
* **Data**: NA

**<u>Example</u>**

**REQUEST**

* **URI**:

```html
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision?accessToken=<accessToken>
```

* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**: NA

* * *
