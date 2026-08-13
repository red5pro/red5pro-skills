---
title: Set Up Stream Manager as Proxy
description: ""
menu_order: 3
---

Note that in order to have a Stream Manager act as WebRTC Proxy, in addition to `{red5prohome}/conf/autoscale.xml` and `{red5prohome}/plugins/red5pro-autoscale-plugin-<version>.jar`, you **must** remove the `{red5prohome}/plugins/red5pro-webrtc-plugin-<version>.jar` file from the stream manager instances.

## Proxy Configuration

Proxy configuration can be found in the `{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties` file. Set `proxy.enabled` to `true` (this is set to `false` by default).

```xml
## WebSocket PROXY SECTION
proxy.enabled=true
```

* `proxy.enabled` : Enables  / disables the WebSocket proxy service (Boolean)