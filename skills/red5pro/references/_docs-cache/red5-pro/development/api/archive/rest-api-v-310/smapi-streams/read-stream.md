_From: Streams_

## Read Stream

**Description**

Reads an event stream from system. This read operation provides the client with an origin server address for the given stream name and scope.

To help select nodes from a geographically, Stream Manager allows you to specify two geo info query parameters.

* `region` : The `region` query parameter can be specified if origin / edge at a specific region is required. If a node is found at the requested region, that will be provided else the next best optimal node will be provided.

* `geozone` : The `geozone` query parameter can be specified to target one or more regions as grouped under the `geozone`. A `geozone` is a macro location concept such as a continent, which can be used to group one or more regions together.

The `region` and `geozone` parameters are mutually exclusive. If `region` is specifed, the `geozone` defaults to `global` and if the `geozone` parameter is specified, the region(s) will be determined by what regions are grouped under the `geozone`. If the `Geo Information` has not been provisoned and the geozone is specified,  it will result in a user error.

* For __Broadcasters__ the Origin address is used to publish a stream
* For __Subscribers__ the Origin address helps in looking up a suitable Edge address for the stream via Origin API gateway
* Query parameter __region__ , is used to optionally lookup a node in a specific region for a broadcast or subscribe request. The specified value for __region__ should match the regions supported by your cloud service provider ([Google Compute](https://cloud.google.com/compute/docs/regions-zones) or [Amazon Web Services](https://docs.aws.amazon.com/general/latest/gr/rande.html).

If a stream is not publishing, a subscribe type request will result in a http code `400` or `404`.

**REQUEST**

* **URL**:

### Broadcaster

_SIMPLE REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast`

OR

_REGION SPECIFIC REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast&region={regionName}`

OR

_REGION STRICT REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast&region={regionName}&strict=true`

In using `strict` with this request, the broadcast will not be executed if the region specified does not have any live nodes.

OR

_GEOZONE SPECIFIC REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast&geozone={geozoneCode}`

OR

_GEOZONE STRICT REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast&geozone={geozoneCode}&strict=true`

This request requires that the geo information should have been provisioned in Stream Manager about target geozones nd what regions they include.

* When you specify `endpoints` > 0 along with `strict=true` in a geozone request, Stream Manager will try to collect `{endpoints}` number of origins/edges while attempting to utilize each region in the geozone only once. The request will succeed only if each region of the geozone can provide   one node (without repeatition) and the requested number of endpoints does not exceed the total number of regions in the geozone.

* When you specify `endpoints` > 0 along with `strict=false` in a geozone request, Stream Manager will try to collect `{endpoints}` number of origins/edges from any regions in the geozone without any specific considerations. If however all the regions of the geozone together cannot provide the minimum required endpoints, the request will fail.

OR

_MULTI ORIGIN REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast&endpoints={count}`

Where count corresponds to the number of origins that are needed for the broadcast stream. The attribute accepts a numeric value starting from 1. If the attribute is skipped the count assumes the value of 1, thereby returning one server endpoint for ingest. For count >1 Stream Manager returns an array response whereas for count = 1, a single object is returned. With the `strict` flag, the request will fail if the number of nodes existing do not match the number requested.

_MULTI ORIGIN STRICT REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast&endpoints={count}&strict=true`

Where count corresponds to the number of origins that are needed for the broadcast stream. The attribute accepts a numeric value starting from 1. If the attribute is skipped the count assumes the value of 1, thereby returning one server endpoint for ingest. For count >1 Stream Manager returns an array response whereas for count = 1, a single object is returned. With the `strict` flag, the request will fail if the number of nodes existing do not match the number requested.

OR

_TRANSCODER REQUEST_

**NOTE:** The transcoder broadcast will generate additional multiple bitrate stream variants based off of the original stream (which in turn is used for adaptive bitrate subscription). Before you make a **transcode** broadcast request, you must [create a Stream Provision](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-streamprovision/#create-stream-provision) with the additional bitrate and resolution settings.

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=broadcast&transcode=true`

This request should return a Transcoder node IP address. **Note:** if you have not provisioned the stream name, then this request will return an Origin server IP address.

### Subscriber

_SIMPLE REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=subscribe`

OR

_REGION SPECIFIC REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=subscribe&region={regionName}`

OR

_REGION STRICT REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=subscribe&region={regionName}&strict=true`

In using `strict` with this request, the broadcast will not be executed if the region specified does not have any live nodes.

OR

_MULTI EDGE REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=subscribe&endpoints={count}`

OR

_MULTI EDGE STRICT REQUEST_

`http://{host}:{port}/streammanager/api/3.1/event/{scopeName}/{streamName}?action=subscribe&endpoints={count}&strict=true`

Where count corresponds to the number of edges that are needed for subscribing to the stream. The attribute accepts a numeric value starting from 1. If the attribute is skipped the count assumes the value of 1, thereby returning one server endpoint for ingest. For count >1 Stream Manager returns an array response whereas for count = 1, a single object is returned. With the `strict` flag, the request will fail if the number of nodes existing do not match the number requested.

### For Broadcaster (i.e., `?action=broadcast`)

* **Success**: HTTP CODE `200`
* **DATA**:

```json
    {
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<origin-host-address>",
      "region": "<region-code>"
    }
```

### For Subscriber (i.e., `?action=subscribe`)

* **Success**: HTTP CODE `200`
* **DATA**:

```json
    {
      "name": "<stream-name>",
      "scope": "<stream-scope>",
      "serverAddress": "<edge-host-address>",
      "region": "<region-code>"
    }
```

**Example** Broadcaster (?action=broadcast)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/event/live/demo?action=broadcast`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:

```json
    {
      "name": "demo",
      "scope": "/live",
      "serverAddress": "104.197.131.87",
      "region": "us-east-1"
    }
```

**Example** Subscriber (?action=subscribe)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/event/live/demo?action=subscribe`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **DATA**:

```json
    {
      "name": "demo",
      "scope": "/live",
      "serverAddress": "104.197.85.57",
      "region": "us-east-1"
    }
```
