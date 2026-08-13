---
title: Application-Level Configuration
description: ""
menu_order: 5
---

The simple-authentication plugin does not apply security to web applications by default. To attach the security module to a particular Red5 Pro application, you need to add a security configuration java bean in its context file - `red5-web.xml`.

__Example 1:__  Attaching plugin security to an application

To apply security to the live application, you can add the security configuration to `RED5_HOME/webapps/live/WEB-INF/red5-web.xml` as shown below :

```xml
<bean id="simpleAuthSecurity" class="com.red5pro.server.plugin.simpleauth.Configuration" >
        <property name="active" value="true" />
        <property name="rtmp" value="true" />
        <property name="rtsp" value="true" />
        <property name="rtc" value="true" />
        <property name="rtmpAllowQueryParamsEnabled" value="true" />
    <property name="allowedRtmpAgents" value="*" />
  </bean>
```

The name of the bean must be `simpleAuthSecurity`, and it must instantiate the simple auth module configuration class - `com.red5pro.server.plugin.simpleauth.Configuration`.

With the preceding configuration applied, the application requests the plugin to force authentication on `RTMP`, `RTSP`, and `WebRTC` connections. Also, the application specifies the plugin will allow query string authentication for RTMP clients.

__Example 2:__ Specifying a custom properties file

To specify a custom properties file for authentication for an application, you can use the following configuration:

```xml
<bean id="authDataValidator" class="com.red5pro.server.plugin.simpleauth.datasource.impl.Red5ProFileAuthenticationValidator" init-method="initialize">
    <property name="context" ref="web.context" />
    <property name="dataSource" value="/WEB-INF/simple-auth-plugin.credentials" />
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

In the above configuration, we instantiate the `Red5ProFileAuthenticationValidator` class with the context and relative path to the properties file. In this case, the authentication provider will use your validator instead of the default one and validate credentials against the information stored in your application's `WEB-INF/simple-auth-plugin.credentials`.

> You can copy the file `simple-auth-plugin.credentials` from `RED5_HOME/conf` directory to your web app's `WEB-INF` directory.
> <br />
> NOTE: if any application-level property is missing in your configuration bean definition, the value for that property is copied over from the master configuration (plugin configuration).

## Application-Level Configuration Bean Properties

The following parameters are allowed in a bean configuration at the application level (configured in the application's red5-web.xml).

| Property  | Type  | Description  |    |
|---|---|---|---|
| active  | Boolean  | Sets the state of security for the application  |   |
| rtmp  | Boolean  | Sets the state of RTMP security for the application  |   |
| rtsp  | Boolean  | Sets the state of RTSP security for the application  |   |
| rtc  | Boolean  | Sets the state of WebRTC security for the application  |   |
| rtmpAllowQueryParamsEnabled  | Boolean  | Sets the state of query string-based authentication for RTMP clients  |   |
| allowedRtmpAgents  | String  | Sets the list of allowed RTMP agent strings separated by semicolons. By default, all agent strings are allowed.  |   |

