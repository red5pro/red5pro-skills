_From: Mixer APIs_

## Join Conference

**DESCRIPTION**

Returns the server to use for joining a conference.

* **URI**: `http://{host}:{port}/streammanager/api/4.0/event/{scope}/{room-name}/join`
* **METHOD**: GET

**RESPONSE**

* **Failure**: HTTP CODE 400 or 404
* **Data**: (NONE)

> **NOTE:** The call will return 400 if the Stream Manager cannot find an existing composition with `event` equal to `{room-name}` and a mixer publishing the stream `{scope}/{room-name}/{room-name}`. That is because the conference streams need to be published to the server to which the mixer is forwarding its *composite* stream. 

**SUCCESS**

* **CODE**: 200
* **DATA**: 
```json
{
    "name": "<scope>/<room-name>",
    "scope": "<room-name>",
    "serverAddress": "<origin-host-address>",
    "region": "<region-code>"
}
```


**Example**: Get the server for joining the conference created earlier

* **URI**: `https://streammanager.url.com/streammanager/api/4.0/event/live/room1/join`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE 200
* **DATA**: 
```json
{
    "scope": "live/room1",
    "name": "room1",
    "serverAddress": "167.172.235.187",
    "region": "nyc3"
}
```
