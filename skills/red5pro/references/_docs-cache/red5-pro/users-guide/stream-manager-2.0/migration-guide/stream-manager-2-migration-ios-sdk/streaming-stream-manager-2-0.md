_From: Stream Manager 2.0 Migration Guide - iOS SDK_

## Streaming & Stream Manager 2.0

With the release of Stream Manager 2.0, Node Groups and their configurations play a more significant role in the autoscale functionality. As such, the target node group for streaming is required in the REST call in obtaining an Origin or Edge.

Additionally, the response payload for Node request differs slightly from that of Stream Manager 1.0 API.

```swift
func requestOrigin(_ url: String, resolve: @escaping (_ ip: String?, _ error: Error?) -> Void) {
    NSURLConnection.sendAsynchronousRequest(
        NSURLRequest( url: NSURL(string: url)! as URL ) as URLRequest,
        queue: OperationQueue(),
        completionHandler:{ (response: URLResponse?, data: Data?, error: Error?) -> Void in

            if ((error) != nil) {
                print(error)
                return
            }

            //   Convert our response to a usable NSString
            let dataAsString = NSString( data: data!, encoding: String.Encoding.utf8.rawValue)
            //   The string above is in JSON format, we specifically need the serverAddress value
            var json: [[String: AnyObject]]
            do {
                json = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions()) as! [[String: AnyObject]]
            } catch {
                print(error)
                return
            }

            if let origin = json.first {
                if let ip = origin["serverAddress"] as? String,
                    let guid = origin["streamGuid"] as? String {
                    print("Retrieved %@ from %@, of which the usable IP is %@", dataAsString!, url, ip);
                    resolve(ip, guid, nil)
                } else if let errorMessage = origin["errorMessage"] as? String {
                    print(AccessError.error(message: errorMessage))
                }
            }

    })
}

func startPublish() -> Void {
    let host = "streammanager.red5.host"
    let app = "live"
    let streamName = "stream1"
    let nodeGroup = "nodegroup-oci"

    let url = "https://\(host)/as/v1/streams/stream/\(nodeGroup)/publish/\(app)/\(streamName)"

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
        publishStream.publish(streamName, type: R5RecordTypeLive)

    }
}
```

> While the above example demonstrates making requests for an Origin node for a publishing client, the URI component of the URL request can be changed from `publish` to `subscribe` to access an Edge node for subscribing.

### Node Request Payload

The request payload for publish and subscribe has the following structure:

```json
[
	{
		"streamGuid": "live/stream1",
		"serverAddress": "xxx.xxx.xxx.xxx",
		"nodeRole": "<origin|edge>",
		"subGroup": "ashburn",
		"nodeState": "INSERVICE",
		"subscribers": 0
	}
]
```
