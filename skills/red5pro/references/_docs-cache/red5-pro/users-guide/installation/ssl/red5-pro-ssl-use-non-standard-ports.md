---
title: Using Non Standard Ports for HTTP/HTTPS
description: ""
menu_order: 12
---

As you will see with most of our documentation, we recommend using the default Red5 Pro HTTP port of 5080, and the standard HTTPS port 443. As of Red5 Pro Server Release 5.4.0, those ports are also used for WebRTC Websockets. In fact, websockets ports are no longer defined separately, they just automatically use the ports assigned to HTTP and HTTPS in the `{red5pro}/conf/red5.properties` file.

These ports are also hard-coded into our accompanying front end for websockets. So, if you want to use our front-end but with different ports than 5080 and 443 for http and https, you will need to modify the following files in the live webapp:

* playback.jsp - `r port = window.location.port ? window.location.port : (protocol === 'https' ? 443 : 80);`
* r5pro-playback-failover.js - `return protocol === 'http' ? {protocol: 'ws', port: 5080} : {protocol: 'wss', port: 443};`
* r5pro-publisher-failover.js - `return protocol === 'http' ? {protocol: 'ws', port: 5080} : {protocol: 'wss', port: 443};`
* r5pro-subscriber-failover.js - `return protocol === 'http' ? {protocol: 'ws', port: 5080} : {protocol: 'wss', port: 443};`
* r5pro-viewer-failover.js - `return protocol === 'http' ? {protocol: 'ws', port: 5080} : {protocol: 'wss', port: 443};`
* r5pro-viewer-vod-failover.js - `return protocol === 'http' ? {protocol: 'ws', port: 5080} : {protocol: 'wss', port: 443};`
* subscribe.jsp - `port = port == -1 ? (protocol == "https" ? 443 : 80) : port;`

If you are using the webrtcexamples, then you just need to modify:

scripts/testbed-config.js:

```js
"wsport": 5080,
"wssport": 443,
```