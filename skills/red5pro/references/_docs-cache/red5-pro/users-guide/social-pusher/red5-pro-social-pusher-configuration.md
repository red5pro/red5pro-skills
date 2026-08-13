---
title: Social Pusher Configuration
description: ""
menu_order: 2
---

You will need to add the SocialPusher servlet to `webapps/root/WEB-INF/web.xml` (or uncomment):

```xml
<!-- SocialPusher api servlet - start - -->
<servlet>
	<servlet-name>socialpusherapi</servlet-name>
	<servlet-class>com.red5pro.socialpusher.SocialPusherApiServlet</servlet-class>
</servlet>
<servlet-mapping>
	<servlet-name>socialpusherapi</servlet-name>
	<url-pattern>/socialpusher/api</url-pattern>
</servlet-mapping>
<!-- /SocialPusher api servlet - end - -->
```