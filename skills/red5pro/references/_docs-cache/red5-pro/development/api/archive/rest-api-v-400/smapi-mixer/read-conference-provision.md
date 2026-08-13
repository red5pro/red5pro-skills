_From: Mixer APIs_

## Read Conference Provision

**DESCRIPTION**:

Reads and returns details of a conference provision.

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/meta/{scope}/{room-name}/{room-name}?accessToken=xyz123`

**METHOD**: GET

**RESPONSE**

* **Failure**: HTTP CODE 400 or 404
* **Data**:

```json
{
  "errorMessage": "<error-message-string>",
  "timestamp": <error-timestamp>
}
```

* **SUCCESS**: HTTP CODE
* **DATA:**:
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

**Example**: Reads conference provision details.

**REQUEST URI**: `https://streammanager.url.com/streammanager/api/4.0/admin/event/meta/live/room1/room1?accessToken=xyz123`

**Method**: GET

**RESPONSE**

* **Success**: HTTP CODE 200
* **Data**:
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
