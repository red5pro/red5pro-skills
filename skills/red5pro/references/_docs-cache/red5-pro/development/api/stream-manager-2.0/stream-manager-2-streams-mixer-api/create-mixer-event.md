_From: Stream Manager 2.0 Streams Mixer API_

### Create Mixer Event

On the best available Mixer Node, create a new Mixer Event. This is similar to **Get Server for Publish**, but for Mixers.

Note that here, the word "event" is used in the sense of a music concert or sporting event, rather than the EventListener sense.

Mixer output is always forwarded to another clustered server. AS-Streams chooses that server by internally calling **Get Server for Publish**. Effectively, the mixer acts like a publisher to the PUBLISH server.

Note that if a matching Provision is found (a Provision containing a matching `streamGuid`), this request forwards the provision to the chosen server(s). This is primarily to support transcoding an ABR ladder from the mixer output stream.

#### Create Mixer Event Request

POST `https://<host>/as/v1/streams/mixer/<nodeGroupName>?subgroup=us-east&strict=false&transcode=false`

`nodeGroupName`: Required. The name of the NodeGroup. If running a system with only one NodeGroup, you may use `default` as an alias (the name `default` matches any NodeGroup's name as long as there is only one NodeGroup defined).

`eventId`: Required. Min 1 char, max 16 chars. Alphanumeric, plus `-`, `_`, and `.`. Must be unique within the NodeGroup.

`subgroup`: Optional, default `null` meaning "all". The name of the subgroup (the immediate parent) of candidate nodes. May be a comma-separated list, in order of preference.

`strict`: Optional, default false. Return only servers from the specified `subgroup` (or fail). If not strict, other regions may be returned.

`transcode`: Optional, default `false` If true, there must be a valid provision (previously created with a Create Provision request), such that the `Provision.streamGuid` matches this mixer's output `streamGuid`. If false, there must be no such Provision.


Body:

```json
{
	"eventId": "event1",
	"streamGuid": "live/mix1",
	"originIp": "192.168.1.222",
	"width": 1920,
	"height": 1080,
	"frameRate": 30,
	"bitRate": 4000000,
	"maxBitRate": 7000000,
	"qpMin": 28,
	"qpMax": 48,
	"audioSampleRate": 48000,
	"audioChannels": 2,
	"subMixes": 2
}
```

`eventId`: String, alphanumeric, up to 256 characters. Name of this mixer or set of mixers. 

`streamGuid`: String. 

`originIp`: Optional. String, up to 45 characters. Origin node to forward to. Must be a routable address. Usually an Origin node within a cluster. If this field is null or missing, the Streams Service will internally perform a Get Server for Publish call passing any parameters `subgroup`, `strict`, and `transcode`.

`width`: Integer, between 2 and 7680. Video frame width in pixels.

`height`: Integer, between 2 and 4320. Video frame height in pixels.

`bitRate`: Integer, between 100 and 1048576. Video data rate in bits per second.

`maxBitRate`: Integer, between 100 and 1048576. Maximum video data rate in bits per second.

`qpMin`: Integer, between 0 and 63. Must be less than or equal to `qpMax`. Minimum h264 quantizer.

`qpMax`: Integer, between 0 and 63. Must be greater than or equal to `qpMin`. Maximum h264 quantizer.

`audioSampleRate`: Integer, between 8000 and 96000. Audio data rate in samples per second.

`audioChannels`: Integer, either 1 and 2 (mono or stereo).

`subMixes`: (Optional) Integer, between 1 and 10. The number of simultaneous mixers to create for this event. Default is 1.


#### Create Mixer Event Response

The response is a list of one or more stream locations. 

The first location will always be the mixer. The second location will be the node where the mixer will publish (an PUBLISH-capable node, or maybe TRANSCODE-capable). In the case that an ABR Provision has previously been created, and transcoding requested, the response will also include the Transcoder's destination Origin.

**On success:**

HTTP 201: CREATED

Body:

```json
[
   {
      "nodeRole" : "mixer",
      "nodeState" : "INSERVICE",
      "serverAddress" : "129.213.150.214",
      "streamGuid" : "live/mix1",
      "subGroup" : "ashburn"
   },
   {
      "nodeRole" : "origin",
      "nodeState" : "INSERVICE",
      "serverAddress" : "129.213.93.116",
      "streamGuid" : "live/mix1",
      "subGroup" : "ashburn",
      "subscribers" : 0
   }
]
```

**On error:**

HTTP 400: Bad Request | Validation failure (see response body for details).

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`, or no provision found for `streamGuid` while `transcode=true`.

HTTP 409: Conflict | A mixer event with this `eventId` already exists in this NodeGroup.

HTTP 409: Conflict | A stream with this `streamGuid` already exists in this NodeGroup.
