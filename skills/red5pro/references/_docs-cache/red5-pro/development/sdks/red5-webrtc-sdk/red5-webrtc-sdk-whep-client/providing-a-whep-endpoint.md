_From: WHEP Client_

## Providing a WHEP endpoint

If you want to allow the usual default configuration properties of a subscriber client (of which the `WHEPClient` is an extension), you can simply provide the **WHEP** endpoint and target media element to the constructor of `WHEPClient`:

```js
const whepEndpoint =
  'https://yourred5pro.com/live/whep/endpoint/stream1'

const additionalOptions = {...}

const subscriber = new WHEPClient(
  whepEndpoint,
  document.querySelector('#red5pro-subscriber'),
  additionalOptions
)
subscriber.on('*', (event) => console.log(event))
```

When providing the endpoint, the _optional_ target media element and the _optional_ additional init configuration properties in the constructor for `WHEPClient`, the SDK will automatically start the connection calls and continue on to playback once available.

The construction of the **WHEP** endpoint URL is the following when integrating with a standalone deployment of the Red5 Server:

```sh
https://<your server deployment FQDN>/<app scope>/whep/endpoint/<stream name>
```

When integrating with a Red5 Cloud deployment (using autoscaling and the Stream Manager), the **WHEP** endpoint will have the following structure:

```sh
https://<your cloud deployment FQDN>/as/v1/proxy/whep/<app scope>/<stream name>
```

Where:

- `your deployment FQDN` - the host endpoint of your deployment.
- `app scope` - the target webapp scope to stream to. Typically `live`.
- `stream name` - the name of the stream to subscribe to.

> It is important to note that in using the **WHEP** endpoint as such, the `WHEPClient` will attempt its own playback - you do not have to make an additional `subscribe()` call.
