_From: Event Scheduling_

## Update Scheduled Event

### Update a scheduled new nodegroup creation request for an event

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
  "data": {
      "launchConfig": "<launch-config-name>",
      "scalePolicy": "<scale-policy-name>",
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
        "launchConfig": "<launch-config-name>",
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
      ],
        "scalePolicy": "<scale-policy-name>"
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
      "launchConfig": "default",
      "scalePolicy": "auction",
      "region": [
        {
          "name": "us-east-1",
          "info": {
            "minPublishers": "15",
            "maxPublishers": "20",
            "minSubscribers": "15",
            "maxSubscribers": "20"
          }
        }
      ]
    }
}
```

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
    "id": 4,
    "eventName": "auction",
    "date": "1537795840000",
    "data": {
        "launchConfig": "default",
        "scalePolicy": "auction",
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
        ]
    },
    "state": "pending"
}
```
