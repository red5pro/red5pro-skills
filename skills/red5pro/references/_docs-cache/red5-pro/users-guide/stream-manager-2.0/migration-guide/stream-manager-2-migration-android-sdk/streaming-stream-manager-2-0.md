_From: Stream Manager 2.0 Migration Guide - Android SDK_

## Streaming & Stream Manager 2.0

With the release of Stream Manager 2.0, Node Groups and their configurations play a more significant role in the autoscale functionality. As such, the target node group for streaming is required in the REST call in obtaining an Origin or Edge.

Additionally, the response payload for Node request differs slightly from that of Stream Manager 1.0 API.

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
    String nogeGroup = "nodegroup-oci";

    String url = String.format("https://%s/as/v1/streams/stream/%s/publish/%s/%s",
        host,
        nodeGroup,
        app,
        streamName);

    try {
        HttpClient httpClient = new DefaultHttpClient();
        HttpResponse response = httpClient.execute(new HttpGet(url));
        StatusLine statusLine = response.getStatusLine();

        if (statusLine.getStatusCode() == HttpStatus.SC_OK) {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            response.getEntity().writeTo(out);
            String responseString = out.toString();
            out.close();

            JSONArray origins = new JSONArray(responseString);
            JSONObject data = origins.getJSONObject(0);
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
    } catch (Exception e){
        e.printStackTrace();
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
