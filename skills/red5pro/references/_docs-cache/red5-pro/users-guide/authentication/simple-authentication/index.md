---
title: Simple Authentication
menu_order: 2
---

The `red5pro-simple-auth-plugin` is a simple authentication plugin for Red5 Pro which enables you to add simple `connection-level authentication` for RTMP, RTSP, and WebRTC clients. It can be configured to attach security to a web app on-demand by adding a security configuration to the context file (red5-web.xml) of the web app or by applying security to each web application deployed on the server.

The default security configuration of the plugin authenticates connection parameters against a simple `.properties` file which contains username-password as property-value records. When the plugin is configured to apply security automatically to each web app, it uses the `simple-auth-plugin.credentials` file located at `RED5_HOME/conf` directory. Custom security configuration at the application level allows you to override this for each application.

The plugin also allows fine-tuning of security for each connection type (RTMP / RTSP / RTC) individually.
