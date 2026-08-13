---
title: Configuring Credentials
description: ""
menu_order: 6
---

The simple-authentication module stores its credentials in the `RED5_HOME/conf/simple-auth-plugin.credentials` file. Each credential is stored as a property-value pair and all the credentials are loaded into memory when the server starts. If your scope configuration overrides this to use a different credentials file, the process to edit credentials would be the same as shown below.

A credential (username & password) pair is stored in a new line with a single space separating the username and the password.

Sample __simple-auth-plugin.credentials file__

```properties
#Simple auth credentials file
#[ Add username and password as key-value pair separated by a space (one per line) ]
#Example: testuser testpass

testuser testpass
```

__Add__ a new entry by adding the new credentials in a new line.

```properties
#Simple auth credentials file
#[ Add username and password as key-value pair separated by a space (one per line) ]
#Example: testuser testpass

testuser testpass
newuser newpass
```

__Remove__ credentials by removing the line.

```properties
#Simple auth credentials file
#[ Add username and password as key-value pair separated by a space (one per line) ]
#Example: testuser testpass

newuser newpass
```

> NOTE: Red5pro server must be restarted for changes to take effect.

# Client Authentication

RTMP, RTSP, and WebRTC clients must provide connection parameters when attempting to establish a connection with the server. The plugin will extract two parameters (username and password) and try to match them against the username-password pairs in the properties file.

*Following are some snippets, explaining how authentication can be achieved for different client types.*

## Authenticating RTMP Clients

RTMP clients must pass authentication parameters (username & password) using the connection arguments in [NetConnection.connect](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/NetConnection.html#connect())

__Example A__

```java
var nc:NetConnection = new NetConnection();
nc.addEventListener(NetStatusEvent.NET_STATUS, onStatus);
nc.connect("rtmp://localhost/myapp", "testuser", "testpass");

function onStatus(ns:NetStatusEvent):void
{
    trace(ns.info.code);
}
```

> Username and password should be the first two parameters in the arguments array being sent to Red5 Pro.

With the `simpleauth.default.rtmp.queryparams=true` in the plugin configuration file or using the `rtmpAllowQueryParamsEnabled` property of configuration bean set to `true`, RTMP clients can also pass parameters in the query string.

__Example B__

```java
var nc:NetConnection = new NetConnection();
nc.addEventListener(NetStatusEvent.NET_STATUS, onStatus);
nc.connect("rtmp://localhost/myapp?username=testuser&password=testpass");

function onStatus(ns:NetStatusEvent):void
{
    trace(ns.info.code);
}
```

## Authenticating RTSP Clients

RTSP clients (Android & iOS) must pass authentication parameters (username & password) using the `R5Configuration` object in the SDK.

__Android Example__

<!-- [R5Configuration documented in Android SDK API]FIXME-DOM(ref:///docs_static/static/android-streaming/classcom_1_1red5pro_1_1streaming_1_1config_1_1_r5_configuration.html) -->

```java
R5Configuration config = new R5Configuration(R5StreamProtocol.RTSP,
    TestContent.GetPropertyString("host"),
    TestContent.GetPropertyInt("port"),
    TestContent.GetPropertyString("context"),
    TestContent.GetPropertyFloat("buffer_time"));

config.setParameters("username=testuser;password=testpass;");
R5Connection connection = new R5Connection(config);
```

__iOS Example__
<!-- 
[R5Configuration documented in iOS SDK API]FIXME-DOM(ref:///docs_static/static/ios-streaming/interface_r5_configuration.html) -->

```swift
Swift
func getConfig()->R5Configuration{
    // Set up the configuration
    let config = R5Configuration()
    config.host = Testbed.getParameter("host") as! String
    config.port = Int32(Testbed.getParameter("port") as! Int)
    config.contextName = Testbed.getParameter("context") as! String
    config.parameters = @"username=testuser;password=testpass;";
    config.`protocol` = 1;
    config.buffer_time = Testbed.getParameter("buffer_time") as! Float
    return config
}
```

## Authenticating WebRTC Clients

WebRTC clients (Using Red5 Pro HTML5 SDK) must pass authentication parameters using the `connectionParams` property of the `baseConfiguration` object.

__Example:__

```js
  var baseConfiguration = {
    host: window.targetHost,
    app: 'myapp',
    iceServers: iceServers,
    bandwidth: desiredBandwidth,
    connectionParams: {username: "testuser", password: "testpass"}
  };
```

## Special Note (for Application Developers)

To use this plugin properly with your application it is important to follow the application lifecycle. The plugin intercepts the invocation of the method - `public boolean appConnect(IConnection conn, Object[] params)`. Your application's main class (MultithreadedApplicationAdapter) must make a call to the `super` method as shown in the snippet below.

```java
@Override
public boolean appConnect(IConnection conn, Object[] params){
    // your custom logic here
    // your custom logic here

    return super.appConnect(conn, params);
}
```

> A `true` or `false` returned directly will drop the application from the plugin's call chain.
