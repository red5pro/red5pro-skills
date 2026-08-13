_From: WHEP Client_

## WHEP Proxy

```javascript
const host = "my-deployment";
const streamName = "mystream";
const nodeGroup = "my-node-group";
const endpoint = `https://${host}/as/v1/proxy/whep/live/${streamName}`;
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup,
  },
  // additional configurations
};
const subscriber = await new WHEPClient().init(config);
subscriber.on("*", (event) => console.log(event));
await subscriber.subscribe();
```

There are a few things to note here:

- The difference of `/whip` and `/whep` in the URI for the endpoint calls between `WHIPClient` and `WHEPClient`, respecively.
- The requirement of a `nodeGroup` connection parameter that is the target nodegroup within your Stream Manager deployment on which you want to proxy the WHIP/WHEP client(s).
