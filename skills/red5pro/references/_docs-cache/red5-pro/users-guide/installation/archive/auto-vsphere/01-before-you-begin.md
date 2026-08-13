---
title: Before you Begin
description: ""
menu_order: 2
---

# vSphere

[Vsphere](https://www.vmware.com/products/cloud-infrastructure/vsphere) is a VMware tool used to simulate a cloud-hosted hosted infrastructure in an on-premises deployment. It is recommended as a replacement for the [Simulated Cloud](/docs/red5-pro/users-guide/installation/archive/auto-managed/overview/) solution.

This document assumes that you have configured vSphere vCenter and have knowledge of vSphere management, and as such only covers the Red5 Pro aspects of the configuration. Please reference [VMware's vSphere Documentation](https://techdocs.broadcom.com) for your vSphere configuration.

* Note: we have tested with vSphere 7.0, but the implementation should be compatible with v6.x, v7.0, or v8.0.

---

> You will want to **keep a record** of the usernames, passwords, IP addresses, and other information generated during the setup process, as you will need the information for Stream Manager configuration and future operations via the API.

You will need to create and record the following, in order to configure the terraform service:

* vSphere user name. Example: `Administrator@vsphere.local`
* vSphere user password.
* vSphere (vCenter) server IP address or domain name.
* vSphere datacenter name. This is to discover the ID of a vSphere datacenter. Example: `dc1`
* vSphere datastore name. This is to fetch the datastore ID that you want to use to create virtual machines. Example: `datastore1`
* vSphere resource pool. This is to fetch the ID of a resource pool that you want to use to create virtual machines. Example: `esxi1/Resources`
* vSphere network name. This is to discover the ID of a network in vSphere. Example: `Private`
* Domain name. This is to configure the domain name inside of new VMs (nodes). Example: `sm.autoscaling`
