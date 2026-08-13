_From: Mixer APIs_

## Read Composition

**DESCRIPTION**:

Reads and returns the details of a composition.

* **URI**: `http://{host}:{port}/streammanager/api/4.0/composition/{composition-name}?accessToken=<accessToken>`

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
    "event": "<event-name>",
    "transcodeComposition": <true|false>,
    "digest": "<stream-manager-access-token>",
    "location": [
        "<mixer-region>"
    ],
    "mixers": [
        {
            "id": "<sm-generated-id>",
            "mixerName": "<mixer-name>",
            "location": "<mixer-region>",
            "mixingPage": "<URL-mixing-page>",
            "streamName": "<composite-stream-name>", 
            "path":"<composite-stream-scope>",
            "width":<width-composite-stream>,
            "height":<height-composite-stream>,
            "framerate":<framerate-composite-stream>,
            "bitrate":<bitrate-kbps-composite-stream>,
            "destinationMixerName": "<destination-mixer-name>",
            "serverAddress": "<mixer-IP>",
            "destination": "<destination-node-IP>",
            "doForward": true,
            "state": "INSERVICE"
        }
    ]
}
```

**Example**: Reads mixer composition details.

**REQUEST URI**: `https://streammanager.url.com/streammanager/api/4.0/composition/test1?accessToken=xyz123`

**Method**: GET

**RESPONSE**

* **Success**: HTTP CODE 200
* **Data**:

```json
{
    "event": "test1",
    "transcodeComposition": false,
    "digest": "password",
    "location": [
        "nyc3"
    ],
    "mixers": [
        {
            "id": "nex83node-nyc3-1615320241113",
            "mixerName": "mixer1",
            "location": "nyc3",
            "mixingPage": "https://test.red5pro.com/mixerpage1.html",
            "streamName": "stream01",
            "path": "live",
            "destinationMixerName": "mixer2",
            "serverAddress": "209.97.159.55",
            "destination": "159.203.113.122",
            "width": 1280,
            "height": 720,
            "framerate": 30,
            "bitrate": 1500,
            "doForward": true,
            "state": "INSERVICE"
        }
    ]
}
```
