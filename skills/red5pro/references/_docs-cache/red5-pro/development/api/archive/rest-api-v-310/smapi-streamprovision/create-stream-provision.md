_From: Stream Provisioning_

## Create Stream Provision

**Description**

Create a new stream provision for a given Stream and Scope; returns the newly created provision data.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/event/meta/{scopeName}/{streamName}?accessToken=<accessToken>`
* **Method**: POST
* **DATA**:

```json
{
  "meta": {
      "authentication": {
      "username": "<username>",
      "password": "<password>"
     },
      "stream": [
        {
          "name": "<variant_name>",
          "bandwidth": "<variant_bitrate>",
          "level": "<variant_level>",
          "properties": {}
         }
],
      "georules": {
      "regions": [
        "<location_name>"
      ],
      "restricted": "<restriction_status>"
    },
    "qos": "<QOS-Constant-Index>"
  }
}
```

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:

```json
{
    "name": "<streamName>",
    "scope": "<scopeName>",
    "data": {
       "meta": {
           "authentication": {
                "username": "<username>",
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

* **Failure**: HTTP CODE 400 or 404
* **Data**:

```json
{
  "errorMessage": "<error-message-string>",
  "timestamp": <error-timestamp>
}
```

**Example**

**REQUEST URI**: `https://streammanager.url.com/streammanager/api/3.1/admin/event/meta/live/stream1?accessToken=xyz123`

* **Method**: POST
* **Data**: JSON

```json
{
  "meta": {
      "authentication": {
      "username": "acme",
      "password": "acme!newpass"
     },
    "stream": [{
          "name": "stream1_3",
          "bandwidth": 200000,
          "level": 3,
          "properties": {
          "videoWidth": 320,
          "videoHeight": 240,
          "videoFPS": 15,
        }
        },
        {
          "name": "stream1_2",
          "bandwidth": 500000,
          "level": 2,
          "properties": {
          "videoWidth": 640,
          "videoHeight": 480,
          "videoFPS": 30,
        }
        },
        {
          "name": "stream1_1",
          "bandwidth": 750000,
          "level": 1,
          "properties": {
          "videoWidth": 800,
          "videoHeight": 600,
          "videoFPS": 30,
        }
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
}
```

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
          "name": "stream1_3",
          "bandwidth": 200000,
          "level": 3,
          "properties": {
          "videoWidth": 320,
          "videoHeight": 240,
          "videoFPS": 15,
        }
        },
        {
          "name": "stream1_2",
          "bandwidth": 500000,
          "level": 2,
          "properties": {
          "videoWidth": 640,
          "videoHeight": 480,
          "videoFPS": 30,
        }
        },
        {
          "name": "stream1_1",
          "bandwidth": 750000,
          "level": 1,
          "properties": {
          "videoWidth": 800,
          "videoHeight": 600,
          "videoFPS": 30,
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
    "updated": 1520946314644
}
```
