_From: Rest API_

### Read Unavailable Provisions

**Description**

Reads instance provisions from the simulated cloud platform that are actively available for use. This will include only those instances that have been terminated (not re-provisioned for reuse) or currently in-use.

**REQUEST**

* **URI**:

```html
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision/unavailable?accessToken=<accessToken>
```

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
    "nodeId": "<provision-id>",
    "location": "<availability-zone>",
    "host": "<instance-host-address>",
    "instanceType": "<instance-type>",
    "state": "<provision-state>",
    "meta": "<metadata>"
  }
]
```

**<u>Example</u>**

**REQUEST**

* **URI**:

```html
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision/unavailable?accessToken=<accessToken>
```

* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
[
  {
    "nodeId": "provision-9a3aaad7-2706-4e17-8634-eacbf869ce52",
    "location": "us-test1-a",
    "host": "192.168.1.27",
    "instanceType": "standard",
    "state": "TERMINATED",
    "meta": ""
  },
  {
    "nodeId": "provision-9a3aaad7-2796-4e17-8734-eactfy69ce52",
    "location": "us-test1-a",
    "host": "192.168.1.19",
    "instanceType": "standard",
    "state": "RUNNING",
    "meta": ""
  }
]
```

* * *
