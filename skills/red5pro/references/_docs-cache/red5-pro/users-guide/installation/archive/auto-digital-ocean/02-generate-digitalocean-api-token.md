---
title: Generate DigitalOcean API Token
description: ""
menu_order: 3
---

1. From the left-hand navigation of the Digital Ocean dashboard, under the Account section choose [API](https://cloud.digitalocean.com/account/api)
2. Under Personal access tokens, click on Generate New Token
3. In the New personal access token popup, enter a Token Name;  Select scopes: Read and Write scopes (save API key), and click on Generate Token
4. Copy the token (it will be 64-characters and alpha-numeric)

> **NOTE:** if you have multiple autoscaling environments (for example, develop and production), then you need to create separate API keys for each environment, to ensure that they stay isolated.

![personalaccesstoken](/_images/installation/server/autoscaledigitalocean/personalaccesstoken.png)

