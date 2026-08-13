_From: Rest API_

### Remove Provision

**Description**

Removes a single instance provision from the simulated cloud platform.

**REQUEST**

* **URI**:

```html
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision/<provision-host>?accessToken=<accessToken>
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
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision/192.168.1.31?accessToken=<accessToken>
```

* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
  "nodeId": "provision-36962be9-efc4-4d31-9445-9855be023c90",
  "location": "us-test1-a",
  "host": "192.168.1.31",
  "instanceType": "standard",
  "state": "RUNNING",
  "meta": ""
}
```

* * *
