---
title: Metadata and NetStreamSends
description: ""
menu_order: 8
---

You can respond to stream events and access metadata using JavaScript. To receive the script data tags within a live stream, the Red5 Pro service is accessed via WebSockets:

```javascript
JavaScript
var service = "ws://SERVER_IP:6262/metadata";
var context = "/live"
var stream = "/stream1";
var request = service + context + stream;
var metasocket;

function connect(uri){
    metasocket = new WebSocket(uri);
    metasocket.onopen = function(evt){
        console.log("on open");
    };
    metasocket.onclose =  function(evt){
        console.log("on close");
    };
    metasocket.onmessage = function(evt){
        console.log("on message  "+evt.data);
        // json {"name":"onMetaData", "data":{"orientation":90,"otherstuff":"blablabla"}}
        // * metadata client will continue to receive script data tags other than metadata from publishers until socket is closed.
        // * metadata client can reveive server initiated calls.
        // * metadata client cannot initiate other service calls to server yet.
        // * Second Screen host sdk can initiate arbitrary RPC to server.
        // * Clients will receive periodic pings to check if IO is active. You can ignore `data` if it does not have a `name` property.
    };
    metasocket.onerror =  function(evt){
        console.log("on error");
    };
}
connect(request);
```
