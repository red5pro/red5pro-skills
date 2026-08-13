_From: Event Scheduling_

## Create Scheduled Event

### Create New Nodegroup For Event

To create and initialize a new nodegroup for an event, at a scheduled time, you must provide an existing `launchConfig` name (must exist), a new `scalePolicy` name (must *not* exist) as shown in the JSON data sample below.

**REQUEST**

* **URI** : `http://{host}:{port}/streammanager/api/4.0/admin/scheduler?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON

```json
{
  "eventName": "<event-name>",
  "date": "<date-in-milliseconds>",
  "data": {
      "launchConfig": "<existing-launch-config-name>",
      "scalePolicy": "<new-scale-policy-name>",
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

* **Success**: HTTP CODE `201`
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

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/scheduler?accessToken=xyz123`
* **Method**: POST
* **Data** :  JSON

```json
{
  "eventName": "auction",
  "date": "1537525200000",
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

* **Success**: HTTP CODE `201`
* **Data**:

```json
{
    "id": 1,
    "eventName": "auction",
    "date": "1537525200000",
    "data": {
        "launchConfig": "default",
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
        "scalePolicy": "auction"
    },
    "state": "pending"
}
```

### Resize Existing Nodegroup For Event

To resize an existing nodegroup for an event at a scheduled time, you must specify the name of the target in the `data` JSON Object as shown in the sampe below. For an existing nodegroup, `launchConfig` and `scalePolicy` are not to be specified, as they were already defined in the initial setup of the nodegroup.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/scheduler?accessToken=<accessToken>`
* **Method**: POST
* **Data**:  JSON

```json
{
  "eventName": "<event-name>",
  "date": "<date-in-milliseconds>",
  "data": {
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

* **Success**: HTTP CODE `201`
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

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/scheduler?accessToken=xyz123`
* **Method**: POST
* **Data**:  JSON

```json
{
  "eventName": "auction",
  "date": "1537536000000",
  "data": {
      "nodeGroup": "group-3f5163ec-bbed-4e67-adca-b56b2915be47",
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

* **Success**: HTTP CODE `201`
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
