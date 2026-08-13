---
title: Restreamer - Server Configuration
description: ""
---

To use Red5 Pro restreaming, uncomment the following servlet from `red5pro/webapps/live/WEB-INF/web.xml`, or include it in your custom webapp's `web.xml`.

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

In addition, if you are using restreaming in a custom app, it is necessary to modify the `red5pro/conf/ipcam-plugin.properties` file, modifying the default scope, which is set to `live`, to be that of your webapp.

```xml
# Default scope to attach onto
scope.name=live
```

---

A note about provisions: there are required fields that must be specified per the implementation beyond what the *Restreamer* uses and they are:

* guid - unique identifier
* context - the context path
* name - stream name
* level - priority level (lower the number, the higher the priority 0 > 1)

The restreamer makes primary use of the `parameters` field in the provision which is a free-form key/value collection. The common keys used by both the IPCam (RTSP) and MPEG-TS plugins are as follows:

* type - type of plugin, either `ipcam` or `mpegts`
* action - action to perform, one of `create`, `kill`, or `list` with list being the default
* port - the port being used for ingest