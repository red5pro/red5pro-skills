---
title: Alarms
description: ""
menu_order: 11
---

* [Get Alarm Threshold](#get-alarm-threshold)
* [Set Alarm Threshold](#set-alarm-threshold)

## Get Alarm Threshold

**Description**

Reads the current alarm threshold value for the system.

This read operation provides the stream manager with the alarm threshold value which is used in autoscaling (scaling-outwards). This value is the default scaleout alarm threshold for all nodegroups.

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=<nodeType>&accessToken=<accessToken>
```

FOR EDGE: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=edge&accessToken=<accessToken>
```

FOR ORIGIN: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=origin&accessToken=<accessToken>
```

FOR RELAY: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=relay&accessToken=<accessToken>
```

FOR TRANSCODER: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=transcoder&accessToken=<accessToken>
```

* **Method**: GET
* **Data**:

Query Param : type

Value(s) : edge or origin

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data** :

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
      "id": <alarm-id>,,
      "type": "<alarm-type>",
      "metric": "<alarm-metric>",
      "unit": "<alarm-metric-unit>",
      "threshold": <alarm-threshold>,
      "comparator": "<alarm-threshold-comparator>"
      "targetType":  "<alarm-target-type>"
    }
```

**Example**

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=edge&accessToken=xyz123
```
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "id": 1,
      "type": "SCALEOUTALARM",
      "metric": "CONNECTIONS",
      "unit": "PERCENTAGE",
      "threshold": 60,
      "comparator": "GREATERTHAN",
      "targetType": "GROUP"
    }
```

## Set Alarm Threshold

**Description**

Sets the current alarm threshold value for the system.

This write operation provides the stream manager with the alarm threshold value which is used in autoscaling (scaling-outwards). This value is the default scaleout alarm threshold for all nodegroups. The value should be within 1-100 (technically), but recommended values are between 20 and 80 (percentage). The default value for a new setup is 60.

As opposed to previous versions of the Stream Manager, you no longer need to stop the server to update the scaleout alarm threshold value.

>> This operation should be run only when you have no active traffic on your system. Threshold value should not be updated on live systems.

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=<nodeType>&threshold=<threshold>&accessToken=<accessToken>
```

FOR EDGE: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=edge&threshold=<threshold>&accessToken=<accessToken>
```

FOR ORIGIN: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=origin&threshold=<threshold>&accessToken=<accessToken>
```

FOR RELAY: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=relay&threshold=<threshold>&accessToken=<accessToken>
```

FOR TRANSCODER: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=transcoder&threshold=<threshold>&accessToken=<accessToken>
```

* **Method**: POST
* **Data**:

Query Param : type

Value(s) : edge or origin

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
      "id": <alarm-id>,,
      "type": "<alarm-type>",
      "metric": "<alarm-metric>",
      "unit": "<alarm-metric-unit>",
      "threshold": <alarm-threshold>,
      "comparator": "<alarm-threshold-comparator>"
      "targetType":  "<alarm-target-type>"
    }
```

**Example**

**REQUEST**

* **URI**: 
```
http://{host}:{port}/streammanager/api/3.1/admin/alarm/scaleout/default?type=edge&threshold=80&accessToken=xyz123
```
* **Method** : POST

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "id": 1,
      "type": "SCALEOUTALARM",
      "metric": "CONNECTIONS",
      "unit": "PERCENTAGE",
      "threshold": 80,
      "comparator": "GREATERTHAN",
      "targetType": "GROUP"
    }
```