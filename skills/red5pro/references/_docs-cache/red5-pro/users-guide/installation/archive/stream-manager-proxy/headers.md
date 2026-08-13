---
title: Headers
description: ""
menu_order: 4
---

The Red5 Pro Stream Manager provides information about the originating client using custom headers.

## Headers Sent From Stream Manager Proxy to WebRTC Plugin on Red5 Pro

```json
{Sec-WebSocket-Key=XsuhAp80WSWenevmuVlFeQ==, X-Forwarded-For-Meta-Port=52965, X-Forwarded-For-Meta-Type=WEB, User-Agent=Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0, Sec-WebSocket-Version=13, X-Forwarded-For=192.168.1.45, X-Forwarded-For-Meta-Secure=false, Sec-WebSocket-Protocol=json}
```

## Custom Headers

* `X-Forwarded-For`: Use if you want to know the IP address of the originating client.
* `X-Forwarded-For-Meta-Secure`: Relay whether the client session is over secure connection (or not). This information is obtained through the WebSocket connection object.
* `X-Forwarded-For-Meta-Port`: Relate the originating client’s port.
* `X-Forwarded-For-Meta-Type`: Provides information about the originating client’s connection type. This information is derived from the WebSocket connection class on streammanager. Connection type can be `DIRECT` or `WEB`.