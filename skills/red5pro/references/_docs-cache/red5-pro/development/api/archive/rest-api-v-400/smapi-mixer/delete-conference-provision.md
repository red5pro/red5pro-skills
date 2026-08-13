_From: Mixer APIs_

## Delete Conference Provision

**DESCRIPTION**

Deletes a conference provision from the Stream Manager data store.

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/meta/{scope}/{room-name}/{room-name}?accessToken=xyz123`
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
    "name":"<room-name>",
    "scope":"<scope>",
    "data": {
        "guid": "<scope>/<room-name>",
        "context": "<scope>/<room-name>",
        "name": "<room-name>",
        "level": 0,
        "isRestricted": false,
        "parameters": {
            "group": "webrtc",
            "audiotracks": <audio-tracks-returned-to-participant>,
            "videotracks": <video-tracks-returned-to-participant>
        },
        "restrictions": [],
        "primaries": [],
        "secondaries": []
    },
    "updated":<timestamp>
 }
```

**Example**: Deletes the conference provision created earlier

* **URI**: `https://streammanager.url.com/streammanager/api/4.0/admin/event/meta/live/room1/room1?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE 200
* **DATA**: 
```json
{
    "name":"room1",
    "scope":"live",
    "data": {
        "guid": "live/room1",
        "context": "live/room1",
        "name": "room1",
        "level": 0,
        "isRestricted": false,
        "parameters": {
            "group": "webrtc",
            "audiotracks": 3,
            "videotracks": 1
        },
        "restrictions": [],
        "primaries": [],
        "secondaries": []
    },
    "updated": 1615402189012
}  
```
