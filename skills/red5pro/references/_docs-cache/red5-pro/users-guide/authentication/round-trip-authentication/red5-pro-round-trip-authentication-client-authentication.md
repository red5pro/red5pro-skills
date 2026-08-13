---
title: Client Authentication
description: ""
menu_order: 5
---

RTMP, RTSP and WebRTC clients must provide the required connection parameters when attempting to establish a connection with the server. The plugin will extract expected parameters and validate their presence locally first, before transmitting them to the remote server.

__Given below are some snippets, explaining how authentication can be achieved for different client types.__

## Authenticating RTMP Clients

RTMP clients must pass authentication parameters (username and password) using the connection arguments.
> Username and password should be the first two parameters in the arguments array being sent to Red5 Pro.

With the `simpleauth.default.rtmp.queryparams=true` in the plugin configuration file or using the `rtmpAllowQueryParamsEnabled` property of configuration bean set to `true`, RTMP clients can also pass parameters in the query string.

**Example using FFmpeg:**
```bash
ffmpeg -re -stream_loop -1 -i [media file] -c:v h264 -bsf:v h264_mp4toannexb -profile:v baseline -c:a aac -b:a 128k -ar 44100 -f flv "rtmp://[red5 server endpoint]:1935/live?username=testuser&password=testpass&token=mytoken/[stream name]"
```

## Authenticating RTSP Clients

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

## Authenticating WebRTC Clients

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

# TESTING

## WebRTC

You can use the HTML5 [Publish - Round Trip Authentication](https://github.com/red5pro/streaming-html5/tree/master/src/page/test/publishRoundTripAuth) and [Subscribe - Round Trip Authentication](https://github.com/red5pro/streaming-html5/tree/master/src/page/test/subscribeRoundTripAuth) tests to validate round-trip security.

If you have a Red5 Pro autoscale environment, use the HTML5 [Stream Manager Proxy Publish - Round Trip Authentication](https://github.com/red5pro/streaming-html5/tree/master/src/page/sm-test/publishStreamManagerProxyRoundTripAuth) and [Stream Manager Proxy Subscribe - Round Trip Authentication](https://github.com/red5pro/streaming-html5/tree/master/src/page/sm-test/subscribeStreamManagerProxyRoundTripAuth) tests to validate round-trip security.

## iOS

The [Publish - Authentication](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/PublishAuth) and [Subscribe - Authentication](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/SubscribeAuth) use a hard-coded username and password.

## Android

The [Publish - Authentication](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/PublishAuthTest) and [Subscribe - Authentication](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/SubscribeAuthTest) use a hard-coded username and password.

