_From: Mixer APIs_

## Create Composition

**Description**

Create a mixer composition. The simple example creates a mixed stream that is then published to a transcoder (if `transcodeComposition` is `true`) or origin node (if `transcodeComposition` is `false`). The `URL-mixing-page` can be any HTTP/S page.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/composition?accessToken=<accessToken>`
* **Method**: POST
* **DATA**:

```json
{ 
    "event": "<event-name>",
    "transcodeComposition": <true|false>, 
    "digest": "<stream-manager-access-token>",
    "mixers": [
        { 
            "mixerName":"<mixer-name>",
            "mixingPage":"<URL-mixing-page>?sm=true",
            "streamName": "<composite-stream-name>", 
            "path":"<composite-stream-scope>",
            "width":<width-composite-stream>,
            "height":<height-composite-stream>,
            "framerate":<framerate-composite-stream>,
            "bitrate":<bitrate-kbps-composite-stream>,
            "doForward": true,
            "destinationMixerName":""
        }
    ],
    "location":[ 
           "<mixer-region>"
    ]
}
```

Where:

* `event` - the "event name" is used to track your specific composition
* `transcodeComposition` - set to `true` if you want to transcode your mixed composition, or `false` if you are not using ABR.
* `digest` - this must match the stream manager access token value.
* `mixingPage` - in theory, you can use any HTTP/S URL for this page. We've provided some sample mix pages with the webrtcexamples that are accessible at `https://{streammanager-URL}/webrtcexamples/sample-mixer-pages/` (`/2x2`, `/3x3`, `/7x7/`, and `/nxn/`). **IMPORTANT**: You must include the `?sm=true` at the end of the URL path since the composition is being generated via a stream manager request.
* `streamName` - the name of the outgoing stream. This is the stream name that your subscribers will connect to in order to view the composite stream.
* `path` - the scope of the outgoing stream. Unless you have a custom webapp, use the `live` webapp that is included with the server distribution
* `width`, `height`, `framerate`, and `bitrate` - the attributes of your mixed stream.
* `doForward` - this value should always be set to **true**; as you will either be forwarding to another mixer node, origin node, or transcoder node (if `transcodeComposition` is set to `true`)
* `destinationMixerName` - if you are forwarding the mixer output to another mixer, then use a dummy mixer name here (e.g. `mixer`); otherwise, leave this value blank.

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:

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

* **Failure**: HTTP CODE 400 or 404
* **Data**:

```json
{
  "errorMessage": "<error-message-string>",
  "timestamp": <error-timestamp>
}
```

**Example**

**REQUEST URI**: `https://streammanagerurl.red5pro.com/streammanager/api/4.0/composition?accessToken=xyz123`

* **Method**: POST
* **Data**: JSON

```json
{ 
    "event": "test1",
    "transcodeComposition": false, 
    "digest": "password",
    "mixers": [
        { 
            "mixerName":"mixer1",
            "mixingPage":"https://test.red5pro.com/mixerpage1.html?sm=true",
            "streamName": "stream01", 
            "path":"live",
            "width": 1280,
            "height": 720,
            "framerate": 30,
            "bitrate": 1500,
            "doForward": true,
            "destinationMixerName":""         
        }
    ],
    "location":[ 
           "nyc3"
    ]
}
```

**RESPONSE**

* **Success**: HTTP CODE 201
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
            "mixingPage": "https://test.red5pro.com/mixerpage1.html?sm=true",
            "streamName": "stream01",
            "path": "live",
            "destinationMixerName": "mixer2",
            "serverAddress": "{mixer1 IP address}",
            "destination": "{mixer2 IP address}",
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
