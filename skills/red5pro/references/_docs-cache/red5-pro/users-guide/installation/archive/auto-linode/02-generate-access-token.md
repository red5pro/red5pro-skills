---
title: Generate Linode Personal Access Token
description: ""
menu_order: 3
---

* From the right-hand side of the console click on your profile.

Now a list will appear and click on API Tokens.
![personalaccesstoken1](/_images/installation/server/linode/personalaccesstoken01.png)

* Click on create a personal access token.
* Add label name, token expiry and provide read/write permissions to all the required services.

![personalaccesstoken2](/_images/installation/server/linode/personalaccesstoken02.png)

* Now click on create a token and save the token for stream manager configurations.

> **NOTE:** if you have multiple autoscaling environments (for example, develop and production), then you need to create separate API keys for each environment, to ensure that they stay isolated.

