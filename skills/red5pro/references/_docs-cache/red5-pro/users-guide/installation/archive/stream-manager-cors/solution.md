---
title: Solution
description: ""
---

To solve the problem of Cross Domain access to data, the server must allow requests from the given source or from all sources.

Red5 Pro is based on Tomcat server. So one option is to add the Tomcat compatible CORS filter which modifies the header of the response by adding  `Access-Control-*`.

The Tomcat CORS filter configuration allows you to restrict Cross Origin Access to specific IP addresses or URLs. The following configuration goes into the `{red5pro}/webapps/streammanager/WEB-INF/web.xml` file just as shown above.

```xml
<filter>
      <filter-name>CorsFilter</filter-name>
      <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
      <init-param>
         <param-name>cors.allowed.origins</param-name>
         <param-value>http://localhost:5080, http://192.168.1.46:5080, https://mywebsite.com</param-value>
      </init-param>
      <init-param>
         <param-name>cors.exposed.headers</param-name>
         <param-value>Access-Control-Allow-Origin</param-value>
      </init-param>
      <init-param>
       <param-name>cors.allowed.methods</param-name>
       <param-value>GET, POST, PUT, DELETE</param-value>
      </init-param>
      <async-supported>true</async-supported>
  </filter>
  <filter-mapping>
      <filter-name>CorsFilter</filter-name>
      <url-pattern>/api/*</url-pattern>
  </filter-mapping>
```

The above configuration allows access from `localhost`, `192.168.1.46` and `https://mywebsite.com` using the `cors.allowed.origins` param. It is important to know that the port must be specified to which the request is being made. Since the default http port for Red5 Pro is 5080, that is what we specify in the above sample.

Additionally the `cors.allowed.methods` param is essential in configuring access to the REST api methods on Stream Manager. If this param is excluded or some of the `values` for the param shown above are omitted, all the API calls may not function as expected.

**IMPORTANT:** with the 8.0.0 Red5 Pro server, `<async-supported>true</async-supported>` is required.

There are many other ways to configure the filter. You can look up those options in the [official documentation.](https://tomcat.apache.org/tomcat-7.0-doc/config/filter.html)

**SPECIAL NOTES:**
>There is a known issue with the Tomcat CORS filter and the Red5 Pro implementation of HLS.
>The above technique is specific to Stream Manager, since a Stream Manager instance is not used for streaming.