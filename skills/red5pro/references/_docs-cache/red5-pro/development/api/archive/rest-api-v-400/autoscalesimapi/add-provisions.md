_From: Simulated Cloud Provisioning_

### Add Provisions

**Description**

Provision one or more active Red5 Pro instances to simulated cloud. The instances must be active and running before they are added.

> **NOTE:** Use the `instance type` value if you have instances with different specifications for node role types. For example, if you are using the Transcoder nodes, they will need more processing power than the other nodes, so you may want to designate a `largecpu` server type for those instances. When you define a nodegroup, you specify which instance type to use for each node type.

**REQUEST**

* **URI**:

```html
http://{host}:{port}/streammanager/api/4.0/admin/controller/provisions?accessToken=<accessToken>
```

* **Method**: POST
* **Data**:

```json
[
  {
    "location": "<availability-zone>",
    "host": "<instance-host-address>",
    "instanceType": "<instance-type>"
  }
]
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
http://{host}:{port}/streammanager/api/4.0/admin/controller/provision?accessToken=<accessToken>
```

* **Method**: POST
* **Data**:

```json
[
  {
    "location": "us-test1-a",
    "host": "192.168.1.50",
    "instanceType": "standard"
  },
  {
    "location": "us-test1-a",
    "host": "192.168.1.31",
    "instanceType": "standard"
  }
]
```

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
[
  {
    "nodeId": "provision-9a3aaad7-2706-4e17-8634-eacbf869ce52",
    "location": "us-test1-a",
    "host": "192.168.1.50",
    "instanceType": "standard",
    "state": "RUNNING",
    "meta": ""
  },
  {
    "nodeId": "provision-36962be9-efc4-4d31-9445-9855be023c90",
    "location": "us-test1-a",
    "host": "192.168.1.31",
    "instanceType": "standard",
    "state": "RUNNING",
    "meta": ""
  }
]
```
