---
title: Autoscale Deploy - Linode
description: Deploying Stream Manager and Autoscaling on Linode
menu_order: 11
---

<!-- ![](/_images/installation/tmp/red5pro_logo.svg) -->

Autoscaling on Linode utilizes a Terraform server for deploying and removing Red5 Pro instances.

This document assumes that you have some basic knowledge of the Linode Cloud Platform. It also assumes that you have some basic Linux and network administration skills.

In order to use the Red5 Pro Stream Manager service you will need the following:

1. The latest [Red5 Pro Server build](https://account.red5.net/login).
2. The *Terraform Autoscale controller* (`terraform-cloud-controller.jar`), and *Terraform binary and configuration files for Terraform server* (`terraform-service.zip`) from the [Red5 Pro Autoscaling Library Extensions section](https://account.red5.net/login).
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license type.
4. An active [Linode](https://www.linode.com/) account with administrative privileges.
5. Dedicated Linodes on which you can deploy Red5 Pro.