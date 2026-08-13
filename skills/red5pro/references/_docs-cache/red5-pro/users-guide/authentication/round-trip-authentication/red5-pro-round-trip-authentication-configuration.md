---
title: Round Trip Authentication Configuration
description: ""
menu_order: 4
---

To enable security on your web application, you need to add and configure the `Simple Auth Plugin` security bean along with the `validator` bean to your web application's context file, `red5-web.xml`, as explained below.

## Application-level Configuration

To attach simple auth plugin to a webapp using the `RoundTripAuthValidator` validator, you need to specify the core plugin configuration bean along with the validator bean to use for authentication, in the application's context, `red5-web.xml`, file.

__Example 1:__  Attaching plugin security to the `live` webapp using `RoundTripAuthValidator` for authentication with standard configuration settings.

**STEP 1**

To apply security to the `live` application, add the security configuration to `{red5pro}/webapps/live/WEB-INF/red5-web.xml` as shown below. Note that in the following example the value `<property name="clientTokenRequired" value="false"/>` Set this to `true` if you want to enforce sending a token with your request:

```xml
<bean id="roundTripValidator" class="com.red5pro.server.plugin.simpleauth.datasource.impl.roundtrip.RoundTripAuthValidator" init-method="initialize">
    <property name="adapter" ref="web.handler" />
    <property name="context" ref="web.context" />
    <property name="protocol" value="${server.protocol}" />
    <property name="host" value="${server.host}" />
    <property name="port" value="${server.port}" />
    <property name="validateCredentialsEndPoint" value="${server.validateCredentialsEndPoint}"/>
    <property name="invalidateCredentialsEndPoint" value="${server.invalidateCredentialsEndPoint}"/>
    <property name="clientTokenRequired" value="false"/>
</bean>


<bean id="simpleAuthSecurity" class="com.red5pro.server.plugin.simpleauth.Configuration" >
    <property name="active" value="true" />
    <property name="rtmp" value="true" />
    <property name="rtsp" value="true" />
    <property name="rtc" value="true" />
    <property name="rtmpAllowQueryParamsEnabled" value="true" />
    <property name="allowedRtmpAgents" value="*" />
    <property name="validator" ref="roundTripValidator" />
</bean>
```

**STEP 2**

In the `{red5pro}/webapps/live/WEB-INF/red5-web.properties` file, add the following section:

```aconf
server.validateCredentialsEndPoint=/validateCredentials
server.invalidateCredentialsEndPoint=/invalidateCredentials
server.host=<serverIP>
server.port=3000
server.protocol=http://
```

The property values are substituted from the `red5-web.properties` file into the `red5-web.xml` file at runtime. If you are running the mock auth service on the same instance as your Red5 Pro Server, the `server.host` value should be the private IP address of your instance (same as in the Node.js index.js file).

With the following configuration applied, the server will be expecting client validation requests at `http://<serverIP>:3000/validateCredentials` and invalidate requests at `http://<serverIP>:3000/invalidateCredentials`. The plugin configuration is set to force authentication on `RTMP`, `RTSP` and `WebRTC` connections.

## Application-level Bean Configuration

The following parameters are allowed in a bean configuration at the application level (configured in application's `red5-web.xml`):

**CORE**

| Property  | Type  | Description  |
|---|---|---|
| active  | Boolean  | Sets the state of security for the application  |
| rtmp  | Boolean  | Sets the state of RTMP security for the application  |
| rtsp  | Boolean  | Sets the state of RTSP security for the application  |
| rtc  | Boolean  | Sets the state of WebRTC security for the application  |
| rtmpAllowQueryParamsEnabled  | Boolean  | Sets the state of query string based authentication for RTMP clients  |
| allowedRtmpAgents  | String  | Sets the list of allowed RTMP agent strings separated by semicolons. By default, all agent string is allowed.  |

**VALIDATOR**

| Property  | Type  | Description  |
|---|---|---|
| context  | Reference  | The reference to the `web.context` bean   |
| adapter  | Reference  | The reference to thr `web.handler` bean, which indicates the Application  |
| protocol  | String  | The remote validation server protocol (`HTTP or HTTPS`) to use  |
| host  | String  | The remote validation server host (`hostname or IP`)  |
| port  | String  | The remote validation server port (`80 or 443 or other`)  |
| validateCredentialsEndPoint  | String  | The remote server-client `validation` endpoint `URI` relative to the server root  |
| invalidateCredentialsEndPoint  | String  | The remote server-client `invalidation` endpoint `URI` relative to the server root  |
| clientTokenRequired  | Boolean  | Specifies whether `token` parameter is a `required` or `optional` param in client request   |