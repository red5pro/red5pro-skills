---
title: Headers - Client API
description: ""
menu_order: 1
---

## Client API for Usage

Broadcasters and subscribers need to use the Red5 Pro Stream Manager [REST API](/docs/red5-pro/development/api/archive/rest-api-v-400/overview/) to request an origin/edge for publish/subscribe operations. Once a server IP has been obtained, it can be used in conjunction with additional parameters to establish a connection with the remote Red5 Pro server node and begin stream operations. This is a two-step process, and the proxy operation is decoupled from Stream Manager internals.  The publishing and subscribing is done using the Red5 Pro HTML5 Streaming SDK.

The `base configuration` object of the HTML5 client (on the Stream Manager instance) should look like this:

```xml
var baseConfiguration = {
    host: window.targetHost,
    app: 'streammanager',
    iceServers: iceServers,
    bandwidth: desiredBandwidth,
   connectionParams: {host:"<target-server-ip>", app:"<stream-scope>", context:"<optional-sub-scope>"}
  };
```

Connection parameters are required for the HTML5 client to attempt a connection with the remote Red5 Pro server via the Stream Manager proxy.

**connectionParams**:  Connection parameters must include the proxy target server `host` and target scope `app` for publish and subscribe operations. Any optional connection parameters should also be included, to be forwarded to the target server. Subscopes can be targeted using the context parameter.

**host**: The target host must be a URL with a valid SSL certificate for proxy.

**app**:  The application parameter should point to `streammanager` scope since all traffic will be routed through it.

```xml
* `host` : <target-server-url>,
* `app` : <stream-scope>,
* `context` : <optional-sub-scope>
```

### Publish/Subscribe Process Via Proxy

**PUBLISHER**:

**SIMPLE REQUEST**
```
http://{host}:{port}/streammanager/api/4.0/event/{scopeName}/{streamName}?action=broadcast
```

OR

**REGION PRIORITY REQUEST**
```
http://{host}:{port}/streammanager/api/4.0/event/{scopeName}/{streamName}?action=broadcast&region={region-code}
```

**RESPONSE DATA** :

```xml
{
  "name": "<stream-name>",
  "scope": "<stream-scope>",
  "serverAddress": "<origin-host-address>",
  "region": "<region-code>"
}
```

__GENERIC RED5PRO HTML5 SDK PUBLISHER CONFIGURATION__

```xml
var baseConfiguration = {
    host: streammanager-host,
    app: 'streammanager',
    iceServers: iceServers,
    bandwidth: desiredBandwidth,
    connectionParams: {host:"<origin-host-address>", app:"<stream-scope>"}
  };
```

---

**SUBSCRIBER**:

**SIMPLE REQUEST**
`http://{host}:{port}/streammanager/api/4.0/event/{scopeName}/{streamName}?action=subscribe`

OR

**REGION PRIORITY REQUEST**
`http://{host}:{port}/streammanager/api/4.0/event/{scopeName}/{streamName}?action=subscribe&region={region-code}`

**RESPONSE DATA** :

```xml
{
  "name": "<stream-name>",
  "scope": "<stream-scope>",
  "serverAddress": "<edge-host-address>",
  "region": "<region-code>"
}
```

__GENERIC RED5PRO HTML5 SDK SUBSCRIBER CONFIGURATION__

```xml
var baseConfiguration = {
    host: streammanager-host,
    app: 'streammanager',
    iceServers: iceServers,
    bandwidth: desiredBandwidth,
    connectionParams: {host:"<edge-host-address>", app:"<stream-scope>"}
  };
```