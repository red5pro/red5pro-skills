_From: Stream Manager 2.0 Migration Guide - Android SDK_

## Streaming & Stream Manager 1.0

Integrating web clients using the Red5 WebRTC SDK and Stream Manager 1.0 involved first making an API request for either the Origin or Edge (for publisher or subscriber, respectively), then responding to the payload to assign the target node IP as the `host` on the `R5Configuration` for the client, e.g.,:

```java
public void publishToManager(String serverAddress) {
    String app = "live";
    String streamName = "stream1";

    R5Configuration config = new R5Configuration(R5StreamProtocol.RTSP, serverAddress, 8554, app);
    // Create a new connection using the configuration above
    R5Connection connection = new R5Connection(config);
    R5Stream publish = new R5Stream(connection);
    // Attach media...
    publish.publish(streamName, R5Stream.RecordType.Live);
}

public void startPublish() {
    String host = "streammanager.red5.host";
    String app = "live";
    String streamName = "stream1";

    String url = "https://" + host + "/streammanager/api/4.0/event/" + app + "/" + streamName + "?action=broadcast";

    try {
        HttpClient httpClient = new DefaultHttpClient();
        HttpResponse response = httpClient.execute(new HttpGet(url));
        StatusLine statusLine = response.getStatusLine();

        if (statusLine.getStatusCode() == HttpStatus.SC_OK) {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            response.getEntity().writeTo(out);
            String responseString = out.toString();
            out.close();

            JSONObject data = new JSONObject(responseString);
            final String serverAddress = data.getString("serverAddress");

            if( !serverAddress.isEmpty() ) {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        publishToManager(serverAddress);
                    }
                });
            } else {
                System.out.println("Server address not returned");
            }
        } else {
            response.getEntity().getContent().close();
            throw new IOException(statusLine.getReasonPhrase());
        }
    } catch (Exception e) {
        e.printStackTrace()
    }
}
```

> Unlike the Red WebRTC SDK - which requires the Stream Manager endpoint to act as a proxy due to browser security restrictions - the RTSP connection used in the Android Mobile SDK can take the IP of the node returned by the REST request from Stream Manager.
