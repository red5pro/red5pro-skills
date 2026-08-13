_From: Red5 Pro WebSockets_

## Migration Steps

### Migration from Red5 Tomcat plugin version 1.20

The only new part of the configuration to support WebSocket, is the addition of the property to enable or disable the WebSocket feature within the `tomcat.server` bean.

```xml
    <property name="websocketEnabled" value="true" />
```

### Migration from Red5 WebSocket plugin version 1.16.14 and earlier

The first step is to identify a special configuration in-place within your existing `webSocketTransport` or `webSocketTransportSecure` beans. If you have specified `cipherSuites` or `protocols`, they will need to be translated over to the Tomcat configuration bean. Once you've taken note of your configuration options, remove the `webSocketTransport` or `webSocketTransportSecure` beans in your `conf/jee-container.xml` file.

The IP addresses and ports identified for `ws` and `wss` in the `conf/jee-container.xml` file are no longer used. The `http` and `https` configuration in the Tomcat bean are used instead since this version of the WebSocket plugin is integrated with Tomcat itself.
