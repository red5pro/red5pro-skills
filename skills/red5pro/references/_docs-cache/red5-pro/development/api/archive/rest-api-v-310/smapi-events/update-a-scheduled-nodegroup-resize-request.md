_From: Event Scheduling_

## Update a scheduled nodegroup resize request

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/scheduler/{eventName}?accessToken=<accessToken>
```
* **Method**: PUT
* **Data**:  JSON

```json
{
  "eventName": "<event-name>",
  "date": "<date-in-milliseconds>",
      "nodeGroup": "<nodegroup-name>",
      "region": [
        {
          "name": "<region-code>",
          "info": {
            "minPublishers": "<min-publishers>",
            "maxPublishers": "<max-publishers>",
            "minSubscribers": "<min-subscribers>",
            "maxSubscribers": "<max-subscribers>"
          }
        }
      ]
    }
}
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
{
    "id": <autogen-event-id>,
    "eventName": "<event-name>",
    "date": "<date-in-milliseconds>",
    "data": {
        "region": [
        {
          "name": "<region-code>",
          "info": {
            "minPublishers": "<min-publishers>",
            "maxPublishers": "<max-publishers>",
            "minSubscribers": "<min-subscribers>",
            "maxSubscribers": "<max-subscribers>"
          }
        },
        "nodeGroup": "<nodegroup-name>",
    },
    "state": "<scheduled-job-state>"
}
```

**Example**:

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/scheduler/auction?accessToken=xyz123
```
* **Method**: PUT
* **Data**:  JSON

```json
{
    "eventName": "auction",
    "date": "1537795840000",
    "data": {
        "region": [
            {
                "name": "us-east-1",
                "info": {
                    "minSubscribers": "15",
                    "minPublishers": "15",
                    "maxPublishers": "20",
                    "maxSubscribers": "20"
                }
            }
        ],
        "nodeGroup": "group-3f5163ec-bbed-4e67-adca-b56b2915be47"
    }
}
```

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
    "id": 9,
    "eventName": "auction",
    "date": "1537536000000",
    "data": {
        "region": [
            {
                "name": "us-east-1",
                "info": {
                    "minSubscribers": "15",
                    "minPublishers": "15",
                    "maxPublishers": "20",
                    "maxSubscribers": "20"
                }
            }
        ],
        "nodeGroup": "group-3f5163ec-bbed-4e67-adca-b56b2915be47"
    },
    "state": "pending"
}
```
