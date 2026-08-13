_From: WHIP Client_

## Providing a WHIP endpoint

If you want to allow the usual default configuration properties of a publisher client (of which the `WHIPClient` is an extension), you can simply provide the **WHIP** endpoint and target media element to the constructor of `WHIPClient`:

```js
const whipEndpoint =
  'https://yourred5pro.com/live/whip/endpoint/stream1'

const additionalOptions = {...}

const publisher = new WHIPClient(
  whipEndpoint,
  document.querySelector('#red5pro-publisher'),
  additionalOptions
)
publisher.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHIPClient`, the SDK will automatically start the connection calls and continue on to broadcast once available.

The construction of the **WHIP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whip/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHIP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whip/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHIP** endpoint as such, the `WHIPClient` will attempt its own broadcast - you do not have to make an additional `publish()` call.
