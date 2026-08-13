---
title: Autoscale Deploy - Microsoft Azure
description: Deploying Stream Manager and Autoscaling on Microsoft Azure
menu_order: 10
---

** We recommend using the public Terraform Modules to install Red5 Pro on cloud platforms. **

This document assumes that you have some basic operational knowledge of Microsoft Azure platform management and have administrative access to the Microsoft portal with a valid subscription. It also assumes that you have some basic linux administration skills. If you need more detailed information, please contact us.

In order to use the Red5 Pro Stream Manager service you will need the following:

1. Latest [Red5 Pro Server build](https://account.red5.net/login)
2. The azure-cloud-controller.jar, from the [Red5 Pro Autoscaling Library Extensions section](https://account.red5.net/login)
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license types.
4. An active [Azure](https://azure.microsoft.com/) account.

>A **Free Trial** subscription might be good to try things out but it is not recommended due to restrictions put in place by Microsoft.
