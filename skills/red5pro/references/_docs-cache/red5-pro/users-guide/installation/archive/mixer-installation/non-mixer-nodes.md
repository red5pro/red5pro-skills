---
title: Autoscale Node Webapps Configuration
description: ""
menu_order: 3
---

# Non-Mixer Nodes

The server side `live` webapp must be configured with the webhook endpoint to call when streams are published or unpublished. This configuration must be applied to the live webapp on Transcoder, Origin, Edge, and Relay nodes as they exist in your nodegroup.

Configure the live webapp by editing `{Red5Pro}/webapps/live/WEB-INF/red5-web.properties` with the webhook configuration (and optionally add the configuration for the round trip authentication):

**Without Authentication Enabled**

```xml
webapp.contextPath=/live
webapp.virtualHosts=*

# Optional endpoint like http://localhost:8001/webhook for stream-published, stream-unpublished webhook events
# Leave empty if not used
webhooks.endpoint=https://node.js.host/webhook
```

**With Round Trip Authentication Enabled**

```xml
webapp.contextPath=/live
webapp.virtualHosts=*

# Optional endpoint like http://localhost:8001/webhook for stream-published, stream-unpublished webhook events
# Leave empty if not used
webhooks.endpoint=https://node.js.host/webhook

# Round Trip Authentication Section:
server.validateCredentialsEndPoint=/validateCredentials
server.invalidateCredentialsEndPoint=/invalidateCredentials

server.host=node.js.host
server.port=443
server.protocol=https://
```

Where:

* `webhooks.endpoint` - is the endpoint of the webhook that will receive the stream published and unpublished events. The Node.js server provides this endpoint at `https://<Node.js-host>/webhook`.
* `server.validateCredentialsEndPoint` - the round trip authentication endpoint used to validate publish and subscribe requests.
* `server.invalidateCredentialsEndPoint` - the round trip authentication endpoint used to invalidate publish requests.
* `server.host` - the host of the backend Node.js server for the Mixer testbeds.
* `server.port` - the port of the backend Node.js server for the Mixer testbeds.
* `server.protocol` - the protocol of the backend Node.js server for the Mixer testbeds.