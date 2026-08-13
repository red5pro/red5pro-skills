---
title: Common Events
description: ""
---

The following events are common across all SharedObject implementations from the Red5 Pro WebRTC SDK. They can be accessed from the global `red5prosdk` object from the `SharedObjectEventTypes` attribute.

| Access | Name | Meaning |
| :--- | :---: | :--- |
| CONNECT_SUCCESS | 'Connect.Success' | When the shared object has established a required remote connection. |
| CONNECT_FAILURE | 'Connect.Failure' | When the shared object has failed to establish a required remote connection. |
| PROPERTY_UPDATE | 'SharedObject.PropertyUpdate' | When an update to a property held on the shared object has been updated. |
| PROPERTY_REMOVE | 'SharedObject.PropertyRemove' | When property held on the shared object has been removed. |
| METHOD_UPDATE | 'SharedObject.MethodUpdate' | When a client has invoked a message to be received on connected clients. |
| CONNECTION_CLOSED | 'SharedObject.Connection.Closed' | When the Shared Object is successfully `close`d on the server. |
