---
title: Simple Authentication - Extending the Plugin
description: ""
menu_order: 20
---

**STEP 1**

If you wish to get more out of this plugin such as authenticating against different sources etc, you can implement your own validator class by implementing the `IAuthenticationValidator` interface.

__Example:__

```java
public class CustomSourceValidator implements IAuthenticationValidator {

    private static Logger logger = Red5LoggerFactory.getLogger(CustomSourceValidator.class, "CustomSourceValidator");
    private Object dataSource;
    public CustomSourceValidator()
    {
    }
    public CustomSourceValidator(Object dataSource)
    {
        this.dataSource = dataSource;
    }
    @Override
    public void initialize()
    {
        // load / initialize your data source object here
    }
    @Override
    public boolean onConnectAuthenticate(String username, String password, Object[] rest)
    {
        try
        {
            // authenticate here and return a true if authentication is successful, else return false
        }
        catch(Exception e)
        {
            logger.error("Error validating credentials : " + e.getMessage());
            return false;
        }
    }
    public Object getDataSource() {
        return dataSource;
    }
    public void setDataSource(Object dataSource) {
        this.dataSource = dataSource;
    }
}
```

Clustering involves a group of interconnected nodes (origins and edges). A publisher stream is streamed from an origin to one or more edges by the Red5 pro `cluster-restreamer`. In the context of a Red5 Pro ecosystem, the restreamer itself is a connection. Hence when the simple auth plugin is turned on, the authentication restriction applies to the `cluster-restreamer` as well. The `red5pro-simple-auth-plugin` treats a `cluster-restreamer` connection as a special client identified by the class name `com.red5pro.server.stream.util.restreamer.ConnectorShell`.

The `red5pro-simple-auth-plugin` checks the connection class name for each `IConnection` during authentication and allows the `restreamer` connection to pass through unconditionally.

When extending the `red5pro-simple-auth-plugin` using an `IAuthenticationValidator` or implementing your own custom plugin that needs to work on a Red5 Pro cluster, make sure to check for the `IConnection` class name. you can use the following sample snippet to check for a `cluster-restreamer` connection.

```java
static String RESTREAMER = "com.red5pro.server.stream.util.restreamer.ConnectorShell";
 IConnection connection = Red5.getConnectionLocal(); // Or the `IConnection` could also be a passed param

String connectionClassName = connection.getClass().getCanonicalName();

if(connectionClassName.equalsIgnoreCase(RESTREAMER))
{
    // This is a cluster-restreamer connection
}
```

If the class name represents the `cluster-restreamer`, you should make sure to allow it to pass through unconditionally in your custom logic.

**STEP 2**

Instantiate your custom validator using spring in `red5-web.xml` and pass it as a reference to the `simpleAuthSecurity` configuration bean.

```xml
<bean id="authDataValidator" class="com.example.CustomSourceValidator" init-method="initialize">
    <property name="dataSource" ref="{data-source-object}" />
</bean>

<bean id="simpleAuthSecurity" class="com.red5pro.server.plugin.simpleauth.Configuration" >
        <property name="active" value="true" />
        <property name="rtmp" value="true" />
        <property name="rtsp" value="true" />
        <property name="rtc" value="true" />
        <property name="rtmpAllowQueryParamsEnabled" value="true" />
    <property name="allowedRtmpAgents" value="*" />
    <property name="validator" ref="authDataValidator" />
 </bean>
```

> The plugin will now use your custom validator to validate the authentication info.