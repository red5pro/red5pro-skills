_From: Stream Provisioning_

## Delete Stream Provision

**DESCRIPTION**

Deletes a stream provision from Stream Manager data store by a given Stream and Scope and returns the deleted provision data.

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/event/meta/{scopeName}/{streamName}?accessToken=<accessToken>`
* **METHOD**: DELETE

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
        "meta": {
            "authentication": {
                "username": "<username",
                "password": "<password>"
            },
            "stream": [
                    {
                        "name": "<variant_name>",
                        "bandwidth": <variant_bitrate>,
                        "level": <variant_level>,
                        "properties": {}
                    }
       ],
            "georules": {
                "regions": [
                    "<location_name>"
                ],
                "restricted": "<restriction_status>"
            },
            "qos": <QOS-Constant-Index>
        }
    },
    "updated": <updated-timestamp>
}
```

**Example**: Deletes the stream provision created earlier

* **URI**: `https://streammanager.url.com/streammanager/api/3.1/admin/event/meta/live/stream1?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE 201
* **Data**:

```json
{
    "name": "stream1",
    "scope": "live",
    "data": {
        "meta": {
            "authentication": {
                "username": "acme",
                "password": "acme!newpass"
            },
            "stream": [
                {
                    "name": "stream1_1",
                    "bandwidth": 25000,
                    "level": 3,
                    "properties": {}
                },
                {
                    "name": "stream1_2",
                    "bandwidth": 37500,
                    "level": 2,
                    "properties": {}
                },
                {
                    "name": "stream1_3",
                    "bandwidth": 62500,
                    "level": 1,
                    "properties": {}
                }
            ],
            "georules": {
                "regions": [
                    "US",
                    "UK"
                ],
                "restricted": "false"
            },
            "qos": 3
        }
    },
    "updated": 1520947709222
}
```
