---
title: Adding Backwards Compatibility for Client Connections
description: ""
---

**Note**: this is critical if you have a Mobile application that is referencing a previous stream manager API version.

If you have existing streaming clients (mobile or webapp) referencing the previous version of Stream Manager API, upgrading to the latest Stream Manager will make your streammanager API service inaccessible to them unless you add in redirection support.

The process of changing a URL request endpoint dynamically at runtime on a server is known as URLRewriting. To ensure that the API 3.x event-stream requests are automatically sent to the new API 4.0 request path we need to rewrite the requests as `/api/4.0` requests.

Red5 Pro runs on Tomcat engine, so we need to use a Tomcat supported solution for our URL-rewriting. The following solution uses [UrlRewriteFilter](http://tuckey.org/urlrewrite/), a popular URL-rewrite library for apache tomcat:

__STEP 1: Download the url-rewrite library__

Download the latest version of the UrlRewriteFilter library (jar) from [here](https://mvnrepository.com/artifact/org.tuckey/urlrewritefilter/4.0.3).

__STEP 2: Copy the library into streammanager__

Copy the downloaded jar into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

__STEP 3: Register the library in streammanager to intercept and handle web requests__

* Edit `{red5prohome}/webapps/streammanager/WEB-INF/web.xml` with the editor of your choice, adding the `UrlRewriteFilter` filter xml snippet at the end (after the authFilter):-

```xml
<filter>
<filter-name>UrlRewriteFilter</filter-name>
<filter-class>org.tuckey.web.filters.urlrewrite.UrlRewriteFilter</filter-class>

<init-param>
<param-name>statusEnabled</param-name>
<param-value>false</param-value>
<async-supported>true</async-supported>
</init-param>
</filter>

<filter-mapping>
<filter-name>UrlRewriteFilter</filter-name>
<url-pattern>/*</url-pattern>
<dispatcher>REQUEST</dispatcher>
<dispatcher>FORWARD</dispatcher>
</filter-mapping>
```

__STEP 4: Activate URLRewriting for event broadcast & subscribe requests__

* Create a file named `urlrewrite.xml` in `{red5prohome}/webapps/streammanager/WEB-INF/`, with the following code (note that this contains redirects for both `3.0` and `3.1` clients to the new `3.1` api:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE urlrewrite PUBLIC "-//tuckey.org//DTD UrlRewrite 4.0//EN"
"http://www.tuckey.org/res/dtds/urlrewrite4.0.dtd">

<urlrewrite use-context="true" use-query-string="true">

<rule match-type="regex">
<from>/api/3.0/event/(.*)$</from>
<to type="redirect">/api/4.0/event/$1</to>
</rule>

<rule match-type="regex">
<from>/api/3.1/event/(.*)$</from>
<to type="redirect">/api/4.0/event/$1</to>
</rule>

</urlrewrite>
```

This file contains the re-writing rule which is used by __UrlRewriteFilter__ to decide when to and how to redirect URL request paths.

If you want to be able to make calls beyond the broadcast/susbcribe, then extend the rule to the base, ie:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE urlrewrite PUBLIC "-//tuckey.org//DTD UrlRewrite 4.0//EN"
"http://www.tuckey.org/res/dtds/urlrewrite4.0.dtd">

<urlrewrite use-context="true" use-query-string="true">

<rule match-type="regex">
<from>/api/3.1/(.*)$</from>
<to type="redirect">/api/4.0/$1</to>
</rule>

</urlrewrite>
```


__STEP 5: Restart server__

Once all of the above steps are done, you need to restart the Red5 Pro service on the Stream Manager for changes to take effect.

# Verifying Backwards Compatibility

Once your deployment is active, you can test the UrlRewriteFilter by making a simple GET request at the old api 3.1 endpoint from the browser.

Example: (This is a test endpoint)

__REQIUEST__

__Url__

`<streammanagerurl>/streammanager/api/3.1/event/test?action=broadcast`

__Method__: GET

__RESPONSE__

__Success:__ HTTP CODE 200

__DATA__

`welcome to stream manager event route`

Once you enter the URL in the browser and hit "Enter", you should see your URL automatically changing to `<streammanagerurl>/streammanager/api/4.0/event/test?action=broadcast` in the browser's address bar.