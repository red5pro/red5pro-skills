_From: Round-Trip Authentication Validator_

## CLIENT AUTHENTICATION

RTMP, RTSP and WebRTC clients must provide the required connection parameters when attempting to establish a connection with the server. The plugin will extract expected parameters and validate their presence locally first, before transmitting them to the remote server.

__Given below are some snippets, explaining how authentication can be achieved for different client types.__

### Authenticating RTMP Clients

RTMP clients must pass authentication parameters (username and password) using the connection arguments in [NetConnection.connect](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetConnection.html#connect())

__Example A__

```actionscript3
var nc:NetConnection = new NetConnection();
nc.addEventListener(NetStatusEvent.NET_STATUS, onStatus);
nc.connect("rtmp://localhost/myapp", "testuser", "testpass", "mytoken");

function onStatus(ns:NetStatusEvent):void
{
   trace(ns.info.code);
}
```

> Username and password should be the first two parameters in the arguments array being sent to Red5 Pro.

With the `simpleauth.default.rtmp.queryparams=true` in the plugin configuration file or using the `rtmpAllowQueryParamsEnabled` property of configuration bean set to `true`, RTMP clients can also pass parameters in the query string.

__Example B__

```actionscript3
var nc:NetConnection = new NetConnection();
nc.addEventListener(NetStatusEvent.NET_STATUS, onStatus);
nc.connect("rtmp://localhost/myapp?username=testuser&password=testpass&token=mytoken");

function onStatus(ns:NetStatusEvent):void
{
    trace(ns.info.code);
}
```

### Authenticating RTSP Clients

RTSP clients (Android and IOS) must pass authentication parameters (username and password) using the `R5Configuration` object in the Red5 Pro Mobile SDK.

__Android Example__

```java
R5Configuration config = new R5Configuration(R5StreamProtocol.RTSP,
    TestContent.GetPropertyString("host"),
    TestContent.GetPropertyInt("port"),
    TestContent.GetPropertyString("context"),
    TestContent.GetPropertyFloat("buffer_time"));

config.setParameters("username=testuser;password=testpass;token=mytoken;");
R5Connection connection = new R5Connection(config);
```

__IOS Example__

```objective-c
Swift
func getConfig()->R5Configuration{
    // Set up the configuration
    let config = R5Configuration()
    config.host = Testbed.getParameter("host") as! String
    config.port = Int32(Testbed.getParameter("port") as! Int)
    config.contextName = Testbed.getParameter("context") as! String
    config.parameters = @"username=testuser;password=testpass;token=mytoken";
    config.`protocol` = 1;
    config.buffer_time = Testbed.getParameter("buffer_time") as! Float
    return config
}

```

### Authenticating WebRTC Clients

WebRTC clients (Using Red5 Pro HTML5 SDK) must pass authentication parameters using the `connectionParams` property of the `baseConfiguration` object.

__Example:__

```js
  var baseConfiguration = {
    host: window.targetHost,
    app: 'myapp',
    iceServers: iceServers,
    bandwidth: desiredBandwidth,
    connectionParams: {username: "testuser", password: "testpass", token: "mytoken"}
  };
```
