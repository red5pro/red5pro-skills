_From: Red5 Pro WebSockets_

## WebSocket

Websocket plug-in is integrated into the Tomcat plugin as of Red5 Pro 5.4 release. The primary reasoning behind this is the maintenance aspect. This change also means a move away from Mina for the I/O layer for WebSockets; the previous plugin will continue to live on [here](https://github.com/Red5/red5-websocket).

This plugin is meant to provide websocket functionality for applications running in red5. The code is constructed to comply with [rfc6455](https://datatracker.ietf.org/doc/html/rfc6455) and [JSR365](https://www.oracle.com/technical-resources/articles/java/jsr356.html).

The previous Red5 WebSocket plugin was developed with assistence from Takahiko Toda and Dhruv Chopra.
