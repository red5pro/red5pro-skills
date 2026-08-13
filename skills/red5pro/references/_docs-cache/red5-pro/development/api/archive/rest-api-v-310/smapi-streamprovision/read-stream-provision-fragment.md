_From: Stream Provisioning_

## Read Stream Provision Fragment

**Description**

Reads and returns a part of the stream provision from Stream Manager data store for a given Stream and Scope by a specified meta ‘key’.

**NOTE**: The property targeted by the `key` parameter must exist at the root level, ie: under the `meta` object.

**URI**: `http://{host}:{port}/streammanager/api/3.1/admin/event/meta/{scopeName}/{streamName}?accessToken=<accessToken>&key=<metaKey>`

* **Method**: GET

* **Parameters**:

| Parameter | Description | Value |
|---|---|---|
| key | Name of a property to be read. This property should exist under the root object `meta` | A property name string |

**RESPONSE**

* **Failure**: HTTP CODE 400 or 404
* **Data**:

```json
{
  "errorMessage": "<error-message-string>",
  "timestamp": <error-timestamp>
}
```

**SUCCESS**

* **CODE**: 200
* **DATA**:

```json
{
    "name": "<streamName>",
    "scope": "<scopeName>",
    "data": {
        "<key>": {
        <data>
    },
    "updated": <updated-timestamp>
}
```

**Example**: Reading global authentication information

**URI**: `https://streammanager.url.com/streammanager/api/3.1/admin/event/meta/live/stream1?accessToken=xyz123&key=authentication`

**Method**: GET

**RESPONSE**

* **Success**: HTTP CODE 201
* **Data**:

```json
{
    "name": "stream1",
    "scope": "live",
    "data": {
        "authentication": {
            "username": "acme",
            "password": "acme!newpass"
        }
    },
    "updated": 1520946314644
}
```
