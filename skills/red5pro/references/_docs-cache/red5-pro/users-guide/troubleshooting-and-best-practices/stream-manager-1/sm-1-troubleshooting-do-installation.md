---
title: Troubleshooting Digital Ocean Autoscale Deployment
description: ""
menu_order: 13
---

If creating a new nodegroup appears to succeed, but no droplets are deployed:

* Check the terraform server's red5.log file for any Digital Ocean API errors. Make sure that the `cloud.do_api_token=` value is set to the Digital Ocean API token string.
* On the stream manager `red5pro/webapps/streammanager/WEB-INF/red5-web.properties` file, verify that the `terra.token=` value is the same as the `api.accessToken=` configured on the terraform server, and that the `terra.regionNames=` includes all of the regions where you are trying to deploy

