_From: Red5 Pro WebSockets_

## Using Scopes with WebSockets

To connect a WebSocket to a Red5 Pro application the following URL syntax is used: `ws://{host}:5080/{application}/`. You then pass the scope path to the application via `query string` or `URL path`. How you wish to do this depends on your application design.

---

### OPTION 1

```
rtmp://{host}:1935/{application}?scope=conference1
ws://{host}:5080/{application}/?scope=conference1
```

* When you use this method you will need to parse out the scope variable value from querystring.
* Your clients will all be connecting to the top-most application level.
* You need to design a mechanism to generate a unique name for your shared objects using the scope requested (since all connections are on single level). You then need to check if the shared object exists, and if not then create it with the evaluated name.
* RTMP clients can push messages to shared objects via client-side API.
* This will require special logic for WebSocket clients to resolve a SharedObject using scope name on server side and then push messages to it.

### OPTION 2

```
rtmp://{host}:1935/{application}/conference1
ws://{host}:5080/{application}/conference1/
```

When you use this method you will need to capture the `path` from the connection url for websocket handler. RTMP publisher will automatically create its sub scope(s).

```java
WebSocketConnection.getPath()
```

* Your RTMP clients will all be connecting to the scope specified in the RTMP URL and WebSocket connections will connect as they normally do.
* RTMP clients can use same shared object name since the scope automatically manages isolation of shared object by same name. ie: /conference => SO and /conference1/SO are automatically separated and uniquely identified using the scope path.
* RTMP clients can push messages to shared objects via client side API.
* This will require special logic for WebSocket clients to resolve a SharedObject using scope name on server side and then push messages to it.

Or, you can also use a mix of **Option 1 and 2** :

### OPTION 3

```
rtmp://{host}:1935/{application}/conference1
ws://{host}:5080/{application}/?scope=conference1
```

### OPTION 4

```
rtmp://{host}:1935/{application}?scope=conference1
ws://{host}:5080/{application}/conference1/
```

No matter which option you choose the challenge lies in connecting the WebSocket client to a scope for sending/receiving messages to/from RTMP clients. The answer to this can be found in the virtual `router` implementation [`Router.java`](https://github.com/Red5/red5-websocket-chat/blob/master/src/main/java/org/red5/demos/chat/Router.java) of the sample WebSocket app [red5 websocket chat](https://github.com/Red5/red5-websocket-chat).

Below is the function adapted from the red5-websocket-chat example app:

```java
    /**
     * Get the Shared object for a given path.
     *
     * @param path
     * @return the shared object for the path or null if its not available
     */
    private ISharedObject getSharedObject(String path, String soname)
    {
        // get the application level scope
        IScope appScope = app.getScope();
        // resolve the path given to an existing scope
        IScope scope = ScopeUtils.resolveScope(appScope, path);
        if (scope == null)
        {
            // attempt to create the missing scope for the given path
            if (!appScope.createChildScope(path))
            {
                log.warn("Scope creation failed for {}", path);
                return null;
            }
            scope = ScopeUtils.resolveScope(appScope, path);
        }
        // get the shared object
        ISharedObject so = app.getSharedObject(scope, soname);
        if (so == null)
        {
            if (!app.createSharedObject(scope, soname, false))
            {
                log.warn("Chat SO creation failed");
                return null;
            }
            // get the newly created shared object
            so = app.getSharedObject(scope, "chat");
        }
        // ensure the so is acquired and our listener has been added
        if (!so.isAcquired())
        {
            // acquire the so to prevent it being removed unexpectedly
            so.acquire(); // TODO in a "real" world implementation, this would need to be paired with a call to release when the so is no longer needed
            // add a listener for detecting sync on the so
            so.addSharedObjectListener(new SharedObjectListener(this, scope, path));
        }
        return so;
    }

```

---

### Explanation

The function accepts a `path` which is the location of the scope the WebSocket client is interested in for messages. This can be parsed from a query string or the WebSocket `path` property (as mentioned above). The second parameter is the shared object name on which it wishes to convey messages. This name needs to be same for RTMP and WebSocket clients.

The function tries first to find the scope at the given location `path`. If it fails to find one it will attempt to create one. If at least one RTMP client is connected to the scope it will persist automatically, otherwise it will be lost.

Once we have a scope we attempt to connect to a shared object in it by the name `soname`. As with the scope, we have to force-create a new shared object if we can't find an existing one. Finally we `acquire` it and register a [`ISharedObjectListener`](/docs_static/red5/org/red5/server/api/so/class-use/ISharedObjectListener.html) on it. This is to receive a notification when an event occurs on the SharedObject. A `SharedObjectListener` is used to monitor events occuring on the acquired [`SharedObject`](/docs_static/red5/org/red5/server/so/SharedObject.html). The typical logic here is to update a attribute on the shared object such that it automatically triggers a sync event to all listeners (including flash clients).

NOTE: As a good programming habit make sure to `release` the acquired object when you know it wont be used anymore.

The ISharedObjectListener implementation for this SharedObject would look like this:

```java
private final class SharedObjectListener implements ISharedObjectListener
{

    private final Router router;

    private final IScope scope;

    private final String path;

    SharedObjectListener(Router router, IScope scope, String path) {
        log.debug("path: {} scope: {}", path, scope);
        this.router = router;
        this.scope = scope;
        this.path = path;
    }

    @Override
    public void onSharedObjectClear(ISharedObjectBase so) {
        log.debug("onSharedObjectClear path: {}", path);
    }

    @Override
    public void onSharedObjectConnect(ISharedObjectBase so) {
        log.debug("onSharedObjectConnect path: {}", path);
    }

    @Override
    public void onSharedObjectDelete(ISharedObjectBase so, String key) {
        log.debug("onSharedObjectDelete path: {} key: {}", path, key);
    }

    @Override
    public void onSharedObjectDisconnect(ISharedObjectBase so) {
        log.debug("onSharedObjectDisconnect path: {}", path);
    }

    @Override
    public void onSharedObjectSend(ISharedObjectBase so, String method, List<?> attributes) {
        log.debug("onSharedObjectSend path: {} - method: {} {}", path, method, attributes);
    }

    @Override
    public void onSharedObjectUpdate(ISharedObjectBase so, IAttributeStore attributes) {
        log.debug("onSharedObjectUpdate path: {} - {}", path, attributes);
    }

    @Override
    public void onSharedObjectUpdate(ISharedObjectBase so, Map<String, Object> attributes) {
        log.debug("onSharedObjectUpdate path: {} - {}", path, attributes);
    }

    @Override
    public void onSharedObjectUpdate(ISharedObjectBase so, String key, Object value) {
        log.debug("onSharedObjectUpdate path: {} - {} = {}", path, key, value);
        // route to the websockets if we have an RTMP connection as the originator, otherwise websockets will get duplicate messages
        if (Red5.getConnectionLocal() != null) {
            router.route(scope, value.toString());
        }
    }
}
```

In the above class `SharedObjectListener`, take note of the method `onSharedObjectUpdate`. On the SharedObject update event we check to make sure that only messages from RTMP clients are relayed to WebSocket Clients. To prevent duplicates, messages from WebSocket clients are not relayed. (If you wanted to send messages from WebSocket to WebSocket you could design a unicast/multicast solution to check certain parameters, such as IP address, and relay messages only to specific WebSocket connections).

# Demo application project

[Red5 open source websocket chat](https://github.com/Red5/red5-websocket-chat)
