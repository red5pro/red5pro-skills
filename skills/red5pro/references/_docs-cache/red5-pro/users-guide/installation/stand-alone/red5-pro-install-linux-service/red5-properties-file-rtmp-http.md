_From: Defining Red5 Pro as a Service on Linux_

### red5.properties file : RTMP, HTTP

To modify the default RTMP port, edit `{red5pro}/conf/red5.properties` RTMP section:

```properties
# RTMP
rtmp.host=0.0.0.0
rtmp.port=1935
```

To modify the default HTTP (or HTTPS) port, edit the HTTP section:

```properties
# HTTP
http.host=0.0.0.0
http.port=5080
https.port=5443
```
