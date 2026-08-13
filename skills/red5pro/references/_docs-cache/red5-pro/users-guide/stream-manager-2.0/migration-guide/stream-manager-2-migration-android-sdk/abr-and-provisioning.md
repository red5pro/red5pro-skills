_From: Stream Manager 2.0 Migration Guide - Android SDK_

## ABR and Provisioning

The Red5 Server supports Adaptive Bitrate (ABR) streaming through the submission of Provisions to the Stream Manager. The provision structure - which will be detailed for both Stream Manager 1.0 and Stream Manager 2.0 in this section - consists of a listing of variants of stream properties, of which the highest variant is expected to be delivered in a stream related to the associated Stream GUID; the server will handle transcoding the lower variants for delivery to subscribing clients based on bandwidth estimation.

With the Stream Manager 2.0 release, the endpoint to submit provision requests has changed as well as the structure of the provision to submit and the return payload.

Additionally, while both versions require authentication credentials, Stream Manager 2.0 authentication is based on JWT and requires a token to perform administrative tasks - such as provisioning.

### ABR & Stream Manager 1.0

Whe submitting provisions to Stream Manager 1.0, an `accessToken` was used for authentication of the request. This `accessToken` was a value pre-defined for your Stream Manager 1.0 deployment and shared with only those that were privy to perform administrative tasks.

The URL structure for provision submission was the following:

```java
public String getProvisionSubmitURL() {
    String host = "streammanager.red5.host";
    String app = "live";
    String streamName = "stream1";
    String accessToken = "abc123";

    String url = "https://" + host + "/streammanager/api/4.0/admin/event/meta/" + app + "/" + streamName + "?accessToken=" + accessToken;
    return url;
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

```java
public void publishToManager(String serverAddress, String streamNameVariant) {
    String app = "live";

    R5Configuration config = new R5Configuration(R5StreamProtocol.RTSP, serverAddress, 8554, app);
    // Create a new connection using the configuration above
    R5Connection connection = new R5Connection(config);
    R5Stream publish = new R5Stream(connection);
    // Attach media...
    publish.publish(streamNameVariant, R5Stream.RecordType.Live);
}

public void startPublish() {
    String host = "streammanager.red5.host";
    String app = "live";
    String streamName = "stream1";
    String streamNameVariant = streamName + "_1";

    String url = "https://" + host + "/streammanager/api/4.0/event/" + app + "/" + streamName + "?action=broadcast&transcode=true";

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
                        publishToManager(serverAddress, streamNameVariant);
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

Of note in the above example is the addition of `transcode=true` to the query parameters for Node address request, and the subsequent call to pushing with stream name `"stream1_1"`, denoting that the client is going to be streaming with the highest variant quality to be transcoded.

### ABR & Stream Manager 2.0

As mentioned at the start of this section, the authentication process for administrative tasks is different between Stream Manager 1.0 and Stream Manager 2.0, mainly in the fact that all requests as such require a JWT token in Stream Manager 2.0. You can access a JWT token by authenticating with a username and password defined in the Stream Manager 2.0 deployment.

With the username and password known, you can access a JWT token in order to submit an ABR provision as follows:

```java
public void authenticate(String host, String username, String password) {

    String url = String.format("https://%s/as/v1/auth/login", host);
    String creds = String.format("%s:%s", username, password);
    String token = String.format("Basic %s", Base64.getEncoder().encodeToString(creds.getBytes()));

    URL url1 = new URL(url);
    HttpURLConnection httpURLConnection = (HttpURLConnection) url1.openConnection();
    httpURLConnection.setDoOutput(true);
    httpURLConnection.setDoInput(true);
    httpURLConnection.setChunkedStreamingMode(0);
    httpURLConnection.setRequestProperty("Authorization", token);
    httpURLConnection.setRequestProperty("Accept", "application/json");
    httpURLConnection.setRequestProperty("Content-type", "application/json");
    httpURLConnection.setRequestMethod("PUT");

    InputStream in = new BufferedInputStream(httpURLConnection.getInputStream());
    BufferedReader reader = new BufferedReader(new InputStreamReader(in));
    StringBuilder result = new StringBuilder();
    String line = null;
    try {
        while ((line = reader.readLine()) != null) {
            result.append(line + "\n");
        }
        final JSONObject jsonObject = new JSONObject(result.toString());
        final String token = jsonObject.getString("token");
        sentProvisions(token, data);
    } catch (Exception e) {
        throw e;
    }

}
```

With the JWT token accessed through authentication, a submission of ABR pvovision can be achieved as such providing the `Bearer` token in an Auth Header:

```java
public void sendProvisions (String token, Object provisionData) {

    String host = "streammanager.red5.host";
    String app = "live";
    String streamName = "stream1";
    String nodeGroup = "nodegroup-oci";

    String url = String.format("https://%s/as/v1/streams/provision/%s", host, nodeGroup);

    HttpURLConnection conn = null;
    try {
        URL url1 = new URL(url);
        conn = (HttpURLConnection) url1.openConnection();
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setChunkedStreamingMode(0);
        conn.setRequestProperty("Authorization", "Bearer " + authToken);
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestMethod("POST");

        OutputStream out = conn.getOutputStream();
        out.write(json.getBytes());
        out.flush();
        out.close();

        startPublish(streamName, streamName + "_1");

    } catch (Exception e) {
        e.printStackTrace()
    }
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

```java
public void publishToManager(String serverAddress, String streamName) {
    String app = "live";
    R5Configuration config = new R5Configuration(R5StreamProtocol.RTSP, serverAddress, 8554, app);
    // Create a new connection using the configuration above
    R5Connection connection = new R5Connection(config);
    R5Stream publish = new R5Stream(connection);
    // Attach media...
    publish.publish(streamName, R5Stream.RecordType.Live);
}

public void startPublish(streamName, streamNameVariant) {
    String host = "streammanager.red5.host";
    String app = "live";
    String nogeGroup = "nodegroup-oci";

    String url = String.format("https://%s/as/v1/streams/stream/%s/publish/%s/%s?transcode=true",
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
                        publishToManager(serverAddress, streamNameVariant);
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

#### Subscribing to an ABR Variant

It should be noted that accessing an Edge address for a subscriber client for ABR support is very similar to that of a non-ABR subscriber. The only difference is that the stream name in the request would be the initial desired variant and not the top-level GUID for the stream, i.e.,:

```java
public String getEdgRequestURL(int variantLevel) {
    String host = "streammanager.red5.host";
    String app = "live";
    String streamName = "stream1";
    String nodeGroup = "nodegroup-oci";

     return url = String.format("https://%s/as/v1/streams/stream/%s/subscribe/%s/%s",
        host,
        nodeGroup,
        app,
        streamName + "_" + variantLevel);
}
```

The Stream Manager 2.0 will return the Edge node address to be used in configuration of the RTSP Subscriber client and will initially deliver the variant stream defined. As network conditions change for the subscriber client, so will the variant stream being delivered.
