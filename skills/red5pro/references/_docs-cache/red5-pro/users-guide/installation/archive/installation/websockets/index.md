---
title: Red5 Pro WebSockets
description: ""
---


# WebSockets with Red5 Pro

[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) allows you to connect your JavaScript code on client-side to server-side Java code and create a low-latency remote method invocation or push notification mechanism. For example: you could create your own Red5 Pro Java application with business logic for real-time communication, data gathering and more, and access the methods from client-side using JavaScript. Quite useful! Especially since this is a low-latency technique that can be used in conjunction with the very low-latency video streaming on Red5 Pro Server. Here are few tips for using WebSockets on Red5 Pro.

Traditional systems of using Flash for a chat application involved connecting the Flash client to the application via a particular scope in Red5 Pro. A scope is a logical separation within Red5 Pro, much like logical partitions on a physical hard drive. Scopes give you the advantage of better management of resources when building applications which involve lots of connections. Traditionally scopes were used as “rooms” in chat applications.

The standard way of connecting to a Red5 Pro application via a RTMP client is to use the following RTMP URL format: `rtmp://host:5080/{application}`. And to connect to a scope within the application, the URL format would be: `rtmp://host:5080/{application}/{scopename}`

WebSockets do not have rooms or scopes. So `ws://localhost:8081/chat/room1/room2` won't work out of the box. Think of WebSockets as a single-level application where there is no depth. However there can be `paths`.

## Contents

- [Migration Steps](migration-steps.md)
- [WebSocket](websocket.md)
- [Configuration](configuration.md)
- [Initializing WebSockets For a Red5pro Application](initializing-websockets-for-a-red5pro-application.md)
- [Using Scopes with WebSockets](using-scopes-with-websockets.md)
