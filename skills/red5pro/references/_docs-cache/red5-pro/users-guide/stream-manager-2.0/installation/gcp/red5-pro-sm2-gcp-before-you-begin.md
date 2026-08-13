---
title: Before You Begin
menu_order: 2
---

# GCP Architecture

Google Cloud Platform (GCP) offers a variety of security features to protect resources in the cloud. See [this documentation](https://cloud.google.com/security) for an overview of security options and best practices for securing your environment.

## Resource Management in GCP

For better organization and resource management, it's recommended to create separate **projects** for each environment (such as development, staging, production, etc.), each with its own **VPC network**.

---

### GCP Resource Organization

Before configuring the Stream Manager 2.0 as-terraform service, ensure you have the following GCP resources set up:

* GCP project ID
* GCP service account
* GCP Compute Engine VM instance details
* GCP VPC network and subnet information
* Static IP address (for Stream Manager instance)
* SSH public key (for VM access)

Once these resources are created and recorded, you will be ready to configure Stream Manager 2.0 with Terraform in GCP.

