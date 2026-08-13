---
title: Stream Manager 2.0 Installation Overview
menu_order: 1
---

## Recommended: Use Terraform Modules

**We strongly recommend using the official Red5 Pro Terraform modules** for deploying Stream Manager instances. These modules automatically handle IAM roles, instance profiles, security groups, and all required infrastructure, ensuring best practices and security compliance.

**Available Terraform Modules:**
* **AWS**: [red5pro/aws](https://registry.terraform.io/modules/red5pro/red5pro/aws/latest) - AWS Infrastructure deployment
* **OCI**: [red5pro/oci](https://registry.terraform.io/modules/red5pro/red5pro/oci/latest) - Oracle Cloud Infrastructure deployment
* **GCP**: [red5pro/gcp](https://registry.terraform.io/modules/red5pro/red5pro/gcp/latest) - Google Cloud Platform deployment
* **Linode**: [red5pro/linode](https://registry.terraform.io/modules/red5pro/red5pro/linode/latest) - Linode deployment
* **Digital Ocean**: [red5pro/digitalocean](https://registry.terraform.io/modules/red5pro/red5pro/digitalocean/latest) - Digital Ocean deployment

If you're deploying manually (without using these Terraform modules), please follow the manual setup instructions in the provider-specific guides below.

## Cloud Providers

Stream Manager 2.0 currently supports the following cloud providers:
* [Amazon Web Services (AWS)](/docs/red5-pro/users-guide/stream-manager-2-0/installation/aws/red5-pro-sm2-aws-installation-overview/)
* [Google Cloud Platform (GCP)](/docs/red5-pro/users-guide/stream-manager-2-0/installation/gcp/red5-pro-sm2-gcp-installation-overview/)
* [Linode](/docs/red5-pro/users-guide/stream-manager-2-0/installation/linode/red5-pro-sm2-linode-installation-overview/)
* [Oracle Cloud Infrastructure (OCI)](/docs/red5-pro/users-guide/stream-manager-2-0/installation/oci/red5-pro-sm2-oci-installation-overview/)
* [DigitalOcean (DO)](/docs/red5-pro/users-guide/stream-manager-2-0/installation/digital-ocean/red5-pro-sm2-digitalocean-installation-overview/)

Installing Stream Manager involves configuring the Stream Manager infrastructure at a cloud provider of choice. From there the Stream Manager takes control and installs and manages your Red5 Pro infrastructure. Please see each section for additional information about how to complete the installation process.
