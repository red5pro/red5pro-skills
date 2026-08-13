_From: Red5 Pro WebSockets_

## Initializing WebSockets For a Red5pro Application

Websockets can be enabled for a Red5pro application through its Application adapter class. The recommended way of doing this is to register websocket for the application in the `appStart` handler and remove it using the `appStop` handler. The code snippet given below shows how the `Application adapter` of the [chat](https://github.com/Red5/red5-websocket-chat) application is used for registering and unregistering with the websocket plugin.

```java

public class Application extends MultiThreadedApplicationAdapter implements ApplicationContextAware {

    private static Logger log = Red5LoggerFactory.getLogger(Application.class, "chat");

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    @Override
    public boolean appStart(IScope scope) {
        log.info("Chat starting");

        configureApplicationScopeWebSocket(scope);

        return super.appStart(scope);
    }

    @Override
    public void appStop(IScope scope) {
        log.info("Chat stopping");
        // remove our app
        WebSocketScopeManager manager = ((WebSocketPlugin) PluginRegistry.getPlugin("WebSocketPlugin")).getManager(scope);
        manager.removeApplication(scope);
        manager.stop();
    }

    /**
     * Configures a websocket scope for a given application scope.
     *
     * @param scope Server application scope
     */
    private void configureApplicationScopeWebSocket(IScope scope) {

        // first get the websocket plugin
        WebSocketPlugin wsPlugin = ((WebSocketPlugin) PluginRegistry.getPlugin(WebSocketPlugin.NAME));
        // get the websocket scope manager for the red5 scope
        WebSocketScopeManager manager = wsPlugin.getManager(scope);

        if (manager == null) {
            // get the application adapter
            MultiThreadedApplicationAdapter app = (MultiThreadedApplicationAdapter) scope.getHandler();
            log.debug("Creating WebSocketScopeManager for {}", app);
            // set the application in the plugin to create a websocket scope manager for it
            wsPlugin.setApplication(app);
            // get the new manager
            manager = wsPlugin.getManager(scope);
        }

        // the websocket scope
        WebSocketScope wsScope = (WebSocketScope) scope.getAttribute(WSConstants.WS_SCOPE);

        // check to see if its already configured
        if (wsScope == null) {
            log.debug("Configuring application scope: {}", scope);
            // create a websocket scope for the application
            wsScope = new WebSocketScope(scope);
            // register the ws scope
            wsScope.register();
        }
    }
}

```

Once the application is registered with the websocket plugin, the next step is to create your websocket handler class, extending the `org.red5.net.websocket.listener.WebSocketDataListener` class. This class wil handle the standard server side websocket events for the clients. An example of the implementation would be the TODO
<!-- broken link?
[WebSocketChatDataListener.java]FIXME-DOM(#https://github.com/Red5/red5-websocket-chat/blob/master/src/main/java/org/red5/demos/chat/WebSocketChatDataListener.java) class. -->

Finally we tell the application to use this `WebSocketDataListener` implementation to handle all websocket requests to our Red5pro application. This is done by adding a Bean definition to the context file (`red5-web.xml`) of the Red5pro application.

If you look at the Red5 `red5-web.xml` file of the [red5 websocket chat](https://github.com/Red5/red5-websocket-chat) sample application, you will see how a reference of the Red5 application is made available to the websocket listener via the virtual router (Router.java) using spring bean configuration.

```xml
    <bean id="web.handler" class="org.red5.demos.chat.Application" />

    <bean id="router" class="org.red5.demos.chat.Router">
        <property name="app" ref="web.handler" />
    </bean>

    <!-- WebSocket scope with our listeners -->
    <bean id="webSocketScopeDefault" class="org.red5.net.websocket.WebSocketScope" lazy-init="true">
        <!-- Application scope -->
        <constructor-arg ref="web.scope" />
        <!-- The ws scope listeners -->
        <property name="listeners">
            <list>
                <bean id="chatListener" class="org.red5.demos.chat.WebSocketChatDataListener">
                    <property name="router" ref="router" />
                </bean>
            </list>
        </property>
    </bean>
```

### Websocket filter (required for Red5 Pro version 5.4.0 or higher)

Lastly, the websocket filter must be added to each web application that will act as a websocket end point. In the webapp descriptor `webapps/myapp/WEB-INF/web.xml` add this entry alongside any other filters or servlets.

```xml
    <!-- WebSocket filter -->
    <filter>
        <filter-name>WebSocketFilter</filter-name>
        <filter-class>org.red5.net.websocket.server.WsFilter</filter-class>
        <async-supported>true</async-supported>
    </filter>
    <filter-mapping>
        <filter-name>WebSocketFilter</filter-name>
        <url-pattern>/*</url-pattern>
        <dispatcher>REQUEST</dispatcher>
        <dispatcher>FORWARD</dispatcher>
    </filter-mapping>
```

To support subprotocols, add them as a comma-delimited string in the `web.xml`:

```xml
    <!-- WebSocket subprotocols -->
    <context-param>
        <param-name>subProtocols</param-name>
        <param-value>chat,json</param-value>
    </context-param>
```

The plugin will default to allowing any requested subprotocol if none are specified.

You can use this to form a means of communication between your Red5 application adapter and WebSocket data listener classes.

# Extending the WebSocket Endpoint

Implementers may extend the default websocket endpoint class provided by this plugin `org.red5.net.websocket.server.DefaultWebSocketEndpoint`. The first step is to become familiar with the class and then `extend` it in your application; once that is complete, your class must be placed in the `lib` directory of your Red5 server, not the `webapps/yourapp/WEB-INF/lib` directory. Lastly, in your webapp descriptor `webapps/yourapp/WEB-INF/web.xml` file, an entry named `wsEndpointClass` will need to be made for your class:

```xml
    <context-param>
        <param-name>wsEndpointClass</param-name>
        <param-value>com.mydomain.websocket.MyWebSocketEndpoint</param-value>
    </context-param>
```

One reason to extend the endpoint for your own use is because the default endpoint implementation only handles text data.

# Security Features

Since WebSockets don't implement Same Origin Policy (SOP) nor Cross-Origin Resource Sharing (CORS), we've implemented a means to restrict access via configuration using SOP / CORS logic. To configure the security features, edit your `conf/jee-container.xml` file and locate the bean displayed below:

```xml
   <bean id="tomcat.server" class="org.red5.server.tomcat.TomcatLoader" depends-on="context.loader" lazy-init="true">
        <property name="websocketEnabled" value="true" />
        <property name="sameOriginPolicy" value="false" />
        <property name="crossOriginPolicy" value="true" />
        <property name="allowedOrigins">
            <array>
                <value>localhost</value>
                <value>red5.org</value>
            </array>
        </property>
```

Properties:

* [sameOriginPolicy](https://www.w3.org/Security/wiki/Same_Origin_Policy) - Enables or disables SOP. The logic differs from standard web SOP by *NOT* enforcing protocol and port.
* [crossOriginPolicy](https://www.w3.org/Security/wiki/CORS) - Enables or disables CORS. This option pairs with the `allowedOrigins` array.
* allowedOrigins - The list or host names or fqdn which are to be permitted access. The default if none are specified is `*` which equates to any or all.
