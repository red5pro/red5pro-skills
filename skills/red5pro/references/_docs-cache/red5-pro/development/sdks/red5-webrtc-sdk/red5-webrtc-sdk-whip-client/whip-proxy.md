_From: WHIP Client_

## WHIP Proxy

```javascript
const host = "my-deployment";
const streamName = "mystream";
const nodeGroup = "my-node-group";
const endpoint = `https://${host}/as/v1/proxy/whip/live/${streamName}`;
const config = {
  endpoint,
  streamName,
  connectionParams: {
    nodeGroup,
  },
  // additional configurations
};
const publisher = await new WHIPClient().init(config);
publisher.on("*", (event) => console.log(event));
await publisher.publish();
```
