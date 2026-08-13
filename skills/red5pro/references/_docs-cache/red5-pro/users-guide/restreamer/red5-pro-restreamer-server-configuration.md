---
title: Server Configuration
description: ""
menu_order: 4
---

## Restreamer Servlet

In Red5 Pro server, restreaming is enabled by default.

To disable Red5 Pro restreaming, comment the following servlet from `red5pro/webapps/live/WEB-INF/web.xml`, or exlude it in your custom webapp's `web.xml`.

```xml
   <servlet>
      <servlet-name>RestreamerServlet</servlet-name>
      <servlet-class>com.red5pro.restreamer.servlet.RestreamerServlet</servlet-class>
   </servlet>
   <servlet-mapping>
      <servlet-name>RestreamerServlet</servlet-name>
      <url-pattern>/restream</url-pattern>
   </servlet-mapping>
```

## Individual Restreamer Flags

In addition, some restreamers can be disabled individually in `red5pro/conf/restreamer-plugin.properties`:

```properties
enable.tsingest=true
enable.ipcam=true
enable.srtingest=true
enable.whip=true
```

`enable.ipcam` controls RTSP IP Camera pull ingest. `enable.srtingest` controls SRT listener ingest. `enable.tsingest` controls MPEG-TS ingest and Zixi integration. `enable.whip` controls WHIP-based restreaming support.

## IP Cam Configuration

Note that if you are using restreaming IP Cam in a custom app, it is necessary to modify the `red5pro/conf/ipcam-plugin.properties` file, modifying the default scope from `live` to the name of your webapp.

```xml
# Default scope to attach onto
scope.name=live
```
