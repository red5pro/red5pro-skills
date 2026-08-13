_From: Mixer APIs_

## Create Conference

**Description**

Create a conference.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/meta/{scope}/{room-name}/{room-name}?accessToken=<accessToken>`
* **Method**: POST
* **DATA**:
```json
{
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
 }
```

When a conference provision for `{scope}/{room-name}/{room-name}` is created, every WebRTC live stream published using the new HTML5 SDK `RTCConferenceParticipant` in `{scope}/{room-name}/{stream-name}` will be part of the conference. As a result of that, the audio packets of that stream will be processed to generate the mix minus tracks for the participants. Additionally,  the `RTCConferenceParticipant`  will receive back the video feed `{scope}/{room-name}/{room-name}` that could include a composition of the conference or a program feed and the mix minus audio tracks with the audio of the other participants. 

**RESPONSE**

* **Success**: HTTP CODE `200`
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

* **Failure**: HTTP CODE 400 or 404
* **Data**:

```json
{
  "errorMessage": "<error-message-string>",
  "timestamp": <error-timestamp>
}
```

**Example**

**REQUEST URI**: `http://streammanagerurl.red5pro.com/streammanager/api/4.0/admin/event/meta/live/room1/room1?accessToken=xyz123`

* **Method**: POST
* **Data**: JSON

```json
{
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
 }
```

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
