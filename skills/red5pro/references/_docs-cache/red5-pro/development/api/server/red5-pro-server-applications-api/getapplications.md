_From: Applications API_

## getApplications

**Description**

Returns a list of all the Red5 Pro web applications on the server.

**REQUEST**

* **URI**:`http://{host}:5080/api/v1/applications?accessToken={security-token}`
* **Method**: GET
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| accessToken |  Query Param | Security token | Required if token security is enabled |  |

**RESPONSE**

* **Failure**: NA
* **Data**: NA

* **Success**: HTTP CODE `200 - OK`
* **Data**:

---

**Example**

**REQUEST**

* **URI**:`http://localhost:5080/api/v1/applications?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": [
    "api",
    "live"
  ],
  "timestamp": 1467060546158
}
```
