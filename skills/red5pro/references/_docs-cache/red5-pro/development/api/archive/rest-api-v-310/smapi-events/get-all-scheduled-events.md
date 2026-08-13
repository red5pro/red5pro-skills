_From: Event Scheduling_

## Get all Scheduled Events

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/scheduler?accessToken=<accessToken>
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
[
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
            }
          ],
         "launchConfig": "<launch-config-name>",
         "scalePolicy": "<scale-policy-name>",
        },
       "state": "<scheduled-job-state>"
    }
]
```

**Example**:

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/scheduler?accessToken=xyz123
```
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
[
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
]
```

> The content of `data` is arbitrary and will depend on the type of scheduling (create/resize) requested and input specified. A create response will contain `launchConfig` and `scalePolicy` attributes, whereas resize/update response will contain a `nodeGroup` attribute denoting the target nodegroup to be resized.
