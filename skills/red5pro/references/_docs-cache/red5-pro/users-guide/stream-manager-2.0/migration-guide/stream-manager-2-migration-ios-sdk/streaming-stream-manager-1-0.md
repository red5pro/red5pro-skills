_From: Stream Manager 2.0 Migration Guide - iOS SDK_

## Streaming & Stream Manager 1.0

Integrating web clients using the Red5 WebRTC SDK and Stream Manager 1.0 involved first making an API request for either the Origin or Edge (for publisher or subscriber, respectively), then responding to the payload to assign the target node IP as the `host` on the `R5Configuration` for the client, e.g.,:

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
            var json: [String: AnyObject]
            do {
                json = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions()) as! [String: AnyObject]
            } catch {
                print(error)
                return
            }

            if let ip = json["serverAddress"] as? String {
                print("Retrieved %@ from %@, of which the usable IP is %@", dataAsString!, url, ip);
                resolve(ip, nil)
            }
            else if let errorMessage = json["errorMessage"] as? String {
                print(AccessError.error(message: errorMessage))
            }

    })
}

func startPublish() -> Void {
    let host = "streammanager.red5.host"
    let app = "live"
    let streamName = "stream1"

    let url = "https://\(host)/streammanager/api/4.0/event/\(app)/\(streamName)?action=broadcast"

    requestOrigin(url, (_ ip: String?, _ error: Error?) -> Void) {

        let config = R5Configuration()
        config.host = ip
        config.port = 8554
        config.contextName = app

        // Create a new connection using the configuration above
        let connection = R5Connection(config: config)
        let publishStream = R5Stream(connection: connection)
        // Attach media...
        publishStream.publish(streamName, type: R5RecordTypeLive)

    })

}
```

> Unlike the Red WebRTC SDK - which requires the Stream Manager endpoint to act as a proxy due to browser security restrictions - the RTSP connection used in the iOS Mobile SDK can take the IP of the node returned by the REST request from Stream Manager.
