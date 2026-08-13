---
title: vSphere Parameters for Terraform
description: ""
menu_order: 3
---

The following items will need to be recorded to your [Red5 Pro vSphere Autoscaling checklist](/docs_static/installation/static/vSphereAutoScalingChecklist.rtf) for Terraform configuration.

1. Register a new user, or use an existing user with administrative privileges in vSphere. Record the user name (`cloud.vsphere_user`) and password (`cloud.vsphere_password`) in your checklist.
2. Record the IP address or domain name of your vSphere server (also called a VMware vCenter server) as the `cloud.vsphere_server` value.
3. Connect to the vSphere/vCenter server using a Web browser, and log in to the vCenter Server by using the [vSphere Client](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/7-0/vcenter-and-host-management-7-0.html).
4. Find the name of the datacenter, and record the ID/name as the `cloud.vsphere_datacenter ` value. Example: `dc1`
5. Find the name of the datastore where you will be creating virtual machines, and record the value as the `cloud.vsphere_datastore` value. Example: `datastore1`
6. Find the name of the resource pool where you will be creating virtual machines, and record the value as the `cloud.vsphere_resource_pool` value. Example: `esxi1/Resources`
7. Find the name of the network where you will be creating virtual machines, and record the value as the `cloud.vsphere_network` value. Example: `Private`
8. You will also need to choose a "domain" to use for the node VMs, to be recorded as the `cloud.vsphere_domain` value. Example: `sm.autoscaling`
