---
title: HLS Subscriber Authentication
description: ""
menu_order: 9
---

If you wish to enable authentication for live HLS streams, you will need to take the following steps:

# Standalone Server and Autoscale Nodes

## red5-web.xml modification

You will need to uncomment the `roundTripValidator` bean, as described [here](/docs/red5-pro/users-guide/authentication/round-trip-authentication/red5-pro-round-trip-authentication-configuration/#application-level-configuration). In addition, you will need to add `http` to the `simpleAuthSecurity` bean. It will look like:

```xml
<bean id="simpleAuthSecurity" class="com.red5pro.server.plugin.simpleauth.Configuration" >
    <property name="active" value="true" />
    <property name="rtmp" value="true" />
    <property name="rtsp" value="true" />
    <property name="rtc" value="true" />
    <property name="http" value="true" />
    <property name="rtmpAllowQueryParamsEnabled" value="true" />
    <property name="allowedRtmpAgents" value="*" />
    <property name="validator" ref="roundTripValidator" />
</bean>
```

## web.xml modification

Uncomment the HLS `authServlet` in `web.xml`:

```xml
<!-- uncomment for HLS auth -->
    <!--
    <filter>
        <filter-name>authServlet</filter-name>
        <filter-class>com.red5pro.server.plugin.simpleauth.servlet.AuthServlet</filter-class>
        </filter>
        <filter-mapping>
            <filter-name>authServlet</filter-name>
            <url-pattern>*.m3u8</url-pattern>
        </filter-mapping>
-->
 ```
 
Client applications that use new session requests for each file or segment, such as newer VLC apps, will not be able to include a query string with the authentication parameters for requests beyond the first for the playlist. If you know that your subscriber can support the additional requests then you may want to include the `*.ts` filter mapping.

 
 ```xml
<filter>
    <filter-name>authServlet</filter-name>
    <filter-class>com.red5pro.server.plugin.simpleauth.servlet.AuthServlet</filter-class>
    </filter>
    <filter-mapping>
            <filter-name>authServlet</filter-name>
            <url-pattern>*.m3u8</url-pattern>
    <filter-mapping>
            <filter-name>authServlet</filter-name>
            <url-pattern>*.ts</url-pattern>
    </filter-mapping>
    <filter-mapping>
            <filter-name>authServlet</filter-name>
            <url-pattern>*.m4*</url-pattern>
    </filter-mapping>
    </filter-mapping>
```
 
# Stream Manager

To implement VOD HLS authentication for StreamManager API calls, modify the `red5pro/webapps/live/WEB-INF/web.xml`, replacing the standard `M3U8ListingServlet` with the following:

```xml
<servlet>
    <servlet-name>playlists</servlet-name>
    <servlet-class>com.red5pro.server.plugin.simpleauth.servlet.M3U8ListingServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>playlists</servlet-name>
    <url-pattern>/playlists/*</url-pattern>
</servlet-mapping>
```

This replaces the `com.red5pro.stream.transform.mpegts.server.M3U8ListingServlet` class with `com.red5pro.server.plugin.simpleauth.servlet.M3U8ListingServlet` which provides authentication, as opposed to the unmodified version which allows any request.

# Passing Authentication Credentials

Authentication credentials for HLS subscribers should be passed in the URL, for example: `https://myserver.com/live/stream1.m3u8?username=user&password=pass&token=token`
 