---
title: Single Port Muxing
menu_order: 120
---

Red5 Pro supports muxing of service endpoints via a single port. This is useful when the server is behind a firewall or NAT and only a single port can be opened for traffic. The server will then route the traffic to the appropriate service endpoint based on the protocol being used. By muxing the service endpoints, the server listens on a single port for all traffic, however, in the current version,  two ports are used, one for TCP and the other for UDP. 

## Configuration

Primary PortMux service setup is via the `conf/red5pro-activation.xml` section; to enable the feature, set portMux to true and provide ports for TCP and UDP as needed.

```xml
  <!-- Single port / port mux service configuration -->
  <property name="portMux" value="true" />
  <property name="muxPortTCP" value="443" />
  <property name="muxPortUDP" value="5082" />
  <!-- RTMP and HTTP ports referenced from red5.properties file -->
  <property name="rtmpPort" value="${rtmp.port}" />
  <property name="httpPort" value="${http.port}" />
  <property name="httpsPort" value="${https.port}" />
```

When configuring the ports, it is important to also modify the `http.port` and `https.port` in the `conf/red5.properties` file to prevent a conflict. The same rule applies to RTMP. If the mux port for TCP is set to 443, ensure that `http.port` and `https.port` do not use the same ports as those used for the mux. Additional port configuration can be found in `conf/red5pro-activation.xml`, ensure that none of those ports conflict with the mux ports.

Example entries:

HTTP:

```
http.host=0.0.0.0
http.port=5080
https.port=5443
```

RTMP:

```
rtmp.host=0.0.0.0
rtmp.port=1935
```

Note: with a non-Docker install, the rtmp.port does not need to be modified, 1935 is perfectly functional

If running servers on a LAN or during instance testing, the server gathered candidates can be modified to make look ups work as expected and not fail when a public port isn’t routed on the outside interface. In these cases, the local network option should be set to the IP address on the LAN for the server instance in `conf/network.properties`

## Containers

When using Red5 Pro in a container, the `conf/network.properties` file can be modified to set the local network address. This is the IP address of the server instance on the local network. For example:

`local.network.address=10.0.0.35`

When a public facing IP address does not restrict the ports being used, this can be blank.

## TCP ICE Candidates

If intending to use TCP ice candidates the following must be enabled as well `conf/network.properties`:

`ice.enable.tcp=true`

A common configuration set would look like this:

```
local.network.address=
ice.ignore.remotehost=false
ice.enable.tcp=true
```

## Loggers

`conf/logback.xml` can be modified to provide additional logging for the PortMux service. The following loggers are available:

```xml
  <logger name="com.red5pro.service.portmux" level="TRACE" />
  <logger name="com.red5pro.service.portmux.codec.MuxRequestDecoder" level="DEBUG" />
  <logger name="com.red5pro.service.portmux.PortMuxClientAdapter" level="DEBUG" />
```

Setting MuxRequestDecoder to TRACE is useful when raw byte array inspection is required.

When the ICE debugging is needed, the following logger are helpful:

```xml
  <!-- Root level for any ice logger -->
  <logger name="com.red5pro.ice" level="DEBUG"/>
  <logger name="com.red5pro.ice.Agent" level="INFO"/>
  <!-- Ice message handling -->
  <logger name="com.red5pro.ice.nio.IceHandler" level="ERROR"/>
  <logger name="com.red5pro.ice.nio.IceDecoder" level="TRACE"/>
  <logger name="com.red5pro.ice.socket.SizeTrackedLinkedTransferQueue" level="WARN"/>
```

Example start-up log entries:

```
INFO  com.red5pro.service.portmux.PortMux - PortMux start - TCP port: 443 UDP port: 5082
INFO  com.red5pro.service.portmux.codec.MuxRequestDecoder - Initialized with ports - HTTP: 5080 HTTPS: 5443 RTMP: 1935 RTSP: 8554
INFO  com.red5pro.service.portmux.PortMux - TCP send buffer size: 65536 recv buffer size: 65536 so linger: 1000
INFO  com.red5pro.service.portmux.PortMux - TCP acceptor bound on: /0:0:0:0:0:0:0:0:443
INFO  com.red5pro.service.portmux.PortMux - UDP send buffer size: 65536 recv buffer size: 65536
INFO  com.red5pro.service.portmux.PortMux - UDP acceptor bound on: /0.0.0.0:5082
```

## Testing

FFMpeg examples:

RTMP:

```
ffmpeg -stream_loop -1 -re -i test.mp4 -c:v libx264 -b:v 3M -vprofile baseline -level 3.2 -x264-params keyint=30:min-keyint=20:scenecut=0:bframes=0:intra-refresh=0 -c:a aac -b:a 128k -ar 48000 -ac 2 -f flv "rtmp://portmux.red5pro.net:443/live/stream1"
```

RTSP:

```
ffmpeg -stream_loop -1 -re -i test.mp4 -c:v libx264 -b:v 3M -vprofile baseline -level 3.2 -x264-params keyint=30:min-keyint=20:scenecut=0:bframes=0:intra-refresh=0 -c:a aac -b:a 128k -ar 48000 -ac 2 -f rtsp "rtsp://portmux.red5pro.net:443/live/stream1"
```
