---
title: Security and Configuration
description: ""
menu_order: 2
---

To use the Red5 Pro Server API, you must set a security access Token in the file `$RED5PRO_HOME/webapps/api/WEB-INF/red5-web.properties`.  The `security.accessToken=` is blank by default, which disables API access.

With the CORE SECURITY PROVIDER SETTINGS set to true, a token is required for use with any of the API REST calls.

Additional security is set in `$RED5PRO_HOME/webapps/api/WEB-INF/security/hosts.txt`. This is set to localhost with the Red5 Pro Server distribution. You can add specific IP addresses, one per line, to allow access.

For example:

<pre>
localhost
98.76.54.32
~
</pre>

Alternatively, you can allow access from all IPs with a * entry:

<pre>
localhost
*
~
</pre>

>Note: You will need to restart Red5 Pro if you modify either or both of the above files.
