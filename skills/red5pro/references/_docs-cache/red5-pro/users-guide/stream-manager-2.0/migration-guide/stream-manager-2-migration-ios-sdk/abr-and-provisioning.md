_From: Stream Manager 2.0 Migration Guide - iOS SDK_

## ABR and Provisioning

The Red5 Server supports Adaptive Bitrate (ABR) streaming through the submission of Provisions to the Stream Manager. The provision structure - which will be detailed for both Stream Manager 1.0 and Stream Manager 2.0 in this section - consists of a listing of variants of stream properties, of which the highest variant is expected to be delivered in a stream related to the associated Stream GUID; the server will handle transcoding the lower variants for delivery to subscribing clients based on bandwidth estimation.

With the Stream Manager 2.0 release, the endpoint to submit provision requests has changed as well as the structure of the provision to submit and the return payload.

Additionally, while both versions require authentication credentials, Stream Manager 2.0 authentication is based on JWT and requires a token to perform administrative tasks - such as provisioning.

### ABR & Stream Manager 1.0

Whe submitting provisions to Stream Manager 1.0, an `accessToken` was used for authentication of the request. This `accessToken` was a value pre-defined for your Stream Manager 1.0 deployment and shared with only those that were privy to perform administrative tasks.

The URL structure for provision submission was the following:

```swift
func getProvisionSubmitURL() -> String {
    let host = "streammanager.red5.host"
    let app = "live"
    let streamName = "stream1"
    let accessToken = "abc123"

    let url = "https://\(host)/streammanager/api/4.0/admin/event/meta/\(app)/\(streamName)?accessToken=\(accessToken)"
    return url
}
```

The provision schema to submit a list of variants for an ABR stream was as follows:

```json
{
    "meta": {
        "authentication": {
            "username": "",
            "password": ""
        },
        "stream": [
            {
                "name": "<stream-name>_<variant-level>",
                "level": <variant-level>,
                "properties": {
                    "videoBR": <variant-bitrate>,
                    "videoWidth": <variant-width>,
                    "videoHeight": <variant-height>
                }
            },
            // ...
        ],
        "georules": {
            "regions": ["US", "UK"],
            "restricted": false
        },
        "qos": 3
    }
}
```

The `stream` listing of the provision details the variant ladder of streams that the server will generate for consumption. In order for the ABR streams to be made available related to the stream name GUID (that is `stream1` in these examples and used to construct the request URL in the previous section), a publish stream is then expected to be started for the top-level variant (`stream1_1`) with the bitrate and resolution defined.

As such, the URL to access a Node address to stream the top-level variant through Stream Manager 1.0 was slightly different than the [basic node request](#streaming--stream-manager-10):

```swift
func startPublish() -> Void {
    let host = "streammanager.red5.host"
    let app = "live"
    let streamName = "stream1"

    let url = "https://\(host)/streammanager/api/4.0/event/\(app)/\(streamName)?action=broadcast&transcode=true"

    requestOrigin(url, (_ ip: String?, _ error: Error?) -> Void) {

        let config = R5Configuration()
        config.host = ip
        config.port = 8554
        config.contextName = app

        // Create a new connection using the configuration above
        let connection = R5Connection(config: config)
        let publishStream = R5Stream(connection: connection)
        // Attach media...
        publishStream.publish("\(streamName)_1", type: R5RecordTypeLive)

    })

}
```

Of note in the above example is the addition of `transcode=true` to the query parameters for Node address request, and the subsequent call to pushing with stream name `"\(streamName)_1"`, denoting that the client is going to be streaming with the highest variant quality to be transcoded.

### ABR & Stream Manager 2.0

As mentioned at the start of this section, the authentication process for administrative tasks is different between Stream Manager 1.0 and Stream Manager 2.0, mainly in the fact that all requests as such require a JWT token in Stream Manager 2.0. You can access a JWT token by authenticating with a username and password defined in the Stream Manager 2.0 deployment.

With the username and password known, you can access a JWT token in order to submit an ABR provision as follows:

```swift
func authenticate(host: String, username: String, password: String, resolve: @escaping (_ token: String?, _ error: Error?) -> Void) {

        let data = "\(username):\(password)".data(using: .utf8)!
        let base64String = data.base64EncodedString()
        let url = "https://\(host)/as/v1/auth/login"

        var request = URLRequest(url: URL(string: url)!)
        request.httpMethod = "PUT"
        request.setValue("Basic \(base64String)", forHTTPHeaderField: "Authorization")

        let session = URLSession.shared
        let task = session.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error: \(error)")
                return
            }

            if let httpResponse = response as? HTTPURLResponse {
                print("Status code: \(httpResponse.statusCode)")
                if let data = data {
                    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
                        var json: [String: AnyObject]
                        do {
                            json = try JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions()) as! [String: AnyObject]
                            if let token = json["token"] as? String {
                                resolve(token, nil)
                            }
                        } catch {
                            print("Could not Authenticate to post Provisions.")
                            return
                        }
                    }
                }
            }
        }
        task.resume()
    }
```

With the JWT token accessed through authentication, a submission of ABR pvovision can be achieved as such providing the `Bearer` token in an Auth Header:

```swift
func sendProvisions (token: String, provisionData: [String : Any]) {

    let host = "streammanager.red5.host"
    let app = "live"
    let streamName = "stream1"
    let nodeGroup = "nodegroup-oci"
    let url = "https://\(host)/as/v1/streams/provision/\(nodeGroup)"

    let jsonData = try? JSONSerialization.data(withJSONObject: [provisionData])
    var request = URLRequest(url: URL(string: url)!)
    request.httpMethod = "POST"
    request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
    request.setValue("\(jsonData!.count)", forHTTPHeaderField: "Content-Length")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpBody = jsonData

    let session = URLSession.shared
    let task = session.dataTask(with: request) { data, response, error in
        // Handle response...
    }

    task.resume()
}
```

The schema of a Provision to be submitted to Stream Manager 2.0 differs slightly from that delivered to Stream Manager 1.0. Here is an example of the Provision schema for Stream Manager 2.0:

```json
{
    "streamGuid": "<app>/<stream-name>",
    "messageType": "ProvisionCommand",
    "streams": [
        {
            "streamGuid": "<stream-guid>_<variant-level>",
            "abrLevel": <variant-level>,
            "videoParams": {
                "videoBitRate": <variant-bitrate>,
                "videoWidth": <variant-width>,
                "videoHeight": <variant-height>
            }
        },
        // ...
    ]
}
```

To begin a stream with the high-level variant is variant similar to a non-ABR stream, but with the `transcode=true` query parameter appended. This allows the Stream Manager 2.0 to know to direct the stream to a Transcoder Node:

```swift
func startPublish(_ streamGuid: String /* e.g., live/stream1_1 */) -> Void {
    let host = "streammanager.red5.host"
    let nodeGroup = "nodegroup-oci"

    let url = "https://\(host)/as/v1/streams/stream/\(nodeGroup)/publish/\(streamGuid)?transcode=true"

    requestOrigin(url, (_ ip: String?, _ streamGuid: String?, _ error: Error?) -> Void) {

        var paths = streamGuid?.split(separator: "/")
        let name = String((paths?.popLast())!)
        let scope = paths?.joined(separator: "/")

        let config = R5Configuration()
        config.host = ip
        config.port = 8554
        config.contextName = scope

        // Create a new connection using the configuration above
        let connection = R5Connection(config: config)
        let publishStream = R5Stream(connection: connection)
        // Attach media...
        publishStream.publish(name, type: R5RecordTypeLive)

    })

}
```

#### Subscribing to an ABR Variant

It should be noted that accessing an Edge address for a subscriber client for ABR support is very similar to that of a non-ABR subscriber. The only difference is that the stream name in the request would be the initial desired variant and not the top-level GUID for the stream, i.e.,:

```swift
func getEdgRequestURL(_ variantLevel: Int = 2) -> String {
    let host = "streammanager.red5.host"
    let app = "live"
    let streamName = "stream1"
    let accessToken = "abc123"

    let url = "https://\(host)/as/v1/streams/stream/\(nodeGroup)/subscribe/\(app)/\(streamName)_\(variantLevel)"
    return url
}
```

The Stream Manager 2.0 will return the Edge node address to be used in configuration of the RTSP Subscriber client and will initially deliver the variant stream defined. As network conditions change for the subscriber client, so will the variant stream being delivered.
