_From: Mixer APIs_

## List Conferences

**DESCRIPTION**:

Lists conferences that are provisioned through the Stream Manager.

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/event/meta?accessToken=<accessToken>`

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

* **SUCCESS**: HTTP CODE 200
* **Data**:

```json
[
    "guid: <scope>/<room-name>/<room-name>",
    "guid: <scope>/<room-name>/<room-name>",
    "guid: <scope>/<room-name>/<room-name>"
]
```

**Example**: Lists the provisioned conferences.

**REQUEST URI**: `https://streammanager.url.com/streammanager/api/4.0/admin/event/meta?accessToken=xyz123`

**Method**: GET

**RESPONSE**

* **Success**: HTTP CODE 201
* **Data**:

```json
[
    "guid: live/room1/room1",
    "guid: live/room2/room2",
    "guid: live/room3/room3",
]
```
