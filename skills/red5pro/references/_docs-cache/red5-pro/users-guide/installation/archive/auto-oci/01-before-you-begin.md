---
title: Before you Begin
description: ""
menu_order: 2
---

# OCI Architecture

There are several layers of security options in OCI. See [this doc](https://docs.oracle.com/en/solutions/cis-oci-benchmark/index.html#GUID-4572A461-E54D-41E8-89E8-9576B8EBA7D8) for an example of how complex you can make your environment.

## Autoscale Environments and Resource Management in OCI

For ease of resource management, we suggest that you create separate [compartments](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm) for each environment (such as development, staging, production, etc), each with its own [VCN](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingVCNs.htm).

---

> You will want to **keep a record** of the usernames, passwords, IP addresses, and other information generated during the setup process, as you will need the information for Stream Manager configuration and future operations via the API.

You will need to create and record the following, in order to configure the terraform service:

* tenancy ocid
* user ocid
* fingerprint
* private key path
* compartment id
* subnet name
* ssh pub path
* network security group
