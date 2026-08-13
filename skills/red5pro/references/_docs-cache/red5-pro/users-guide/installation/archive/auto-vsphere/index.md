---
title: Autoscale Deploy - vSphere
description: ""
menu_order: 14
---

This document assumes that you have configured vSphere vCenter and have knowledge of vSphere management, and as such only covers the Red5 Pro aspects of the configuration. Please reference [VMware's vSphere Documentation](https://techdocs.broadcom.com) for your vSphere configuration.

In order to use the Red5 Pro Stream Manager service with vSphere, you will need the following:

1. The latest [Red5 Pro Server build](https://account.red5.net/login).
2. The *Terraform Autoscale controller* (`terraform-cloud-controller.jar`), and *Terraform binary and configuration files for Terraform server* (`terraform-service.zip`) from the [Red5 Pro Autoscaling Extension Libraries section](https://account.red5.net/login).
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license type.
