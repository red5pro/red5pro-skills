_From: Rest API_

### Reset Provision

**Description**

Resets a instance provision (Reprovisioning a used up isntance) on the simulated cloud platform. This process reprovisions a used (Terminated) instance for reuse within the simulated cloud platform.

**REQUEST**

* **URI**:

```html
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision/<provision-host>?accessToken=<accessToken>
```

* **Method**: POST

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
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision/192.168.1.21?accessToken=<accessToken>
```

* **Method**: POST

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
  "nodeId": "provision-36962be9-efc4-4d31-9445-9855be023c90",
  "location": "us-test1-a",
  "host": "192.168.1.21",
  "instanceType": "standard",
  "state": "RUNNING",
  "meta": ""
}
```
