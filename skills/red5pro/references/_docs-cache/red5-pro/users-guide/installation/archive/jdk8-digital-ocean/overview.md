---
title: Overview
description: Deploying Stream Manager and Autoscaling on DigitalOcean
menu_order: 1
---

<!-- ![](/_images/installation/tmp/red5pro_logo.svg) -->

Autoscaling on Digital Ocean utilizes a Terraform server for deploying and removing Red5 Pro instances.

This document assumes that you have some basic knowledge of Digital Ocean platform management.  It also assumes that you have some basic linux and network administration skills. If you need more detailed information, please contact us.

In order to use the Red5 Pro Stream Manager service you will need the following:

1. The latest [Red5 Pro Server build](https://account.red5.net/login).
2. The *Autoscale controller for Digital Ocean* (`terraform-cloud-controller.jar`), and *Terraform binary and configuration files for Terraform server* (`terraform-service.zip`) from the [Red5 Pro Autoscaling Library Extensions section](https://account.red5.net/login).
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license type
4. An active Digital Ocean account with administrative rights.
5. Dedicated droplets on which you can deploy Red5 Pro.