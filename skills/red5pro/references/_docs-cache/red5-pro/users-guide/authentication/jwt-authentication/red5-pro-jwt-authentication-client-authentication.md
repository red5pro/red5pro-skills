---
title: Client Authentication
description: ""
menu_order: 16
---

RTMP, RTSP and WebRTC clients must provide the JWT when attempting to establish a connection with the server. The plugin will extract and validate the JWT.

__Given below are some snippets, explaining how authentication can be achieved for different client types.__

## Authenticating RTMP Clients
RTMP clients must pass authentication parameters (username & password) using the connection arguments in [NetConnection.connect](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetConnection.html#connect())

__Example A__

```actionscript3
var nc:NetConnection = new NetConnection();
nc.addEventListener(NetStatusEvent.NET_STATUS, onStatus);
nc.connect("rtmp://localhost/myapp", "jwt", "jwt", "eyJhbGciOiJIUzI1NiJ9...");

function onStatus(ns:NetStatusEvent):void {
   trace(ns.info.code);
}
```

> Username and password should be the first two parameters in the arguments array being sent to Red5pro.

With the `simpleauth.default.rtmp.queryparams=true` in the plugin configuration file or using the `rtmpAllowQueryParamsEnabled` property of configuration bean set to `true`, RTMP clients can also pass parameters in the query string.

__Example B__

```actionscript3
var nc:NetConnection = new NetConnection();
nc.addEventListener(NetStatusEvent.NET_STATUS, onStatus);
nc.connect("rtmp://localhost/myapp?username=jwt&password=jwt&token=eyJhbGciOiJIUzI1NiJ9...");

function onStatus(ns:NetStatusEvent):void {
    trace(ns.info.code);
}
```

## Authenticating RTSP Clients
RTSP clients (Android & iOS) must pass the JWT using the `R5Configuration` object in the SDK.

__Android Example__

```java
R5Configuration config = new R5Configuration(R5StreamProtocol.RTSP,
    TestContent.GetPropertyString("host"),
    TestContent.GetPropertyInt("port"),
    TestContent.GetPropertyString("context"),
    TestContent.GetPropertyFloat("buffer_time"));

config.setParameters("username=jwt;password=jwt;token=eyJhbGciOiJIUzI1NiJ9...;");
R5Connection connection = new R5Connection(config);
```

__iOS Example__

```swift
func getConfig()->R5Configuration{
    // Set up the configuration
    let config = R5Configuration()
    config.host = Testbed.getParameter("host") as! String
    config.port = Int32(Testbed.getParameter("port") as! Int)
    config.contextName = Testbed.getParameter("context") as! String
    config.parameters = "username=jwt;password=jwt;token=eyJhbGciOiJIUzI1NiJ9...;"
    config.protocol = 1;
    config.buffer_time = Testbed.getParameter("buffer_time") as! Float
    return config
}
```

## Authenticating WebRTC Clients
WebRTC clients (Using Red5 Pro HTML5 SDK) must pass the JWT using the `connectionParams` property of the `baseConfiguration` object.

__Example:__

```js
var baseConfiguration = {
    host: window.targetHost,
    app: 'myapp',
    iceServers: iceServers,
    bandwidth: desiredBandwidth,
    connectionParams: {username: "jwt", password: "jwt", token: "eyJhbGciOiJIUzI1NiJ9..."}
};
```

## Authentication Parameters

For all client types, the authentication parameters are:

- **username**: Can be any value when using JWT authentication (typically set to "jwt")
- **password**: Can be any value when using JWT authentication (typically set to "jwt")
- **token**: The actual JWT string obtained from your authentication service

The JWT should be passed as a complete token string (including all three parts: header.payload.signature) without any "Bearer " prefix when using the token parameter.
