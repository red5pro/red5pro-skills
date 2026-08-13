---
title: Before you Begin
menu_order: 2
---

# OCI Architecture

There are several layers of security options in OCI. See [this doc](https://docs.oracle.com/en/solutions/cis-oci-benchmark/index.html#GUID-4572A461-E54D-41E8-89E8-9576B8EBA7D8) for an example of how complex you can make your environment.

## Autoscale Environments and Resource Management in OCI

For ease of resource management, we suggest that you create separate [compartments](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm) for each environment (such as development, staging, production, etc), each with its own [VCN](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingVCNs.htm).

---

You will need to create and record the following, in order to configure the Stream Manager 2.0 as-terraform service:

* OCI tenancy ocid
* OCI user ocid
* OCI compartment id
* OCI subnet name
* OCI network security group
* OCI API key fingerprint
* OCI API private key
* SSH public key
