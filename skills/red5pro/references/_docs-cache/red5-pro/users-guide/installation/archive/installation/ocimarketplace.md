---
title: Oracle Cloud Marketplace
description: ""
---

# Installing Red5 Pro from Oracle Marketplace

Red5 Pro Server - easy installation on Oracle Cloud via the [marketplace image](https://cloudmarketplace.oracle.com/marketplace/en_US/listing/136040263).

> If you are starting out with Oracle Cloud, refer to [network security groups](/docs/red5-pro/users-guide/installation/archive/auto-oci/04-network-security-groups/) for details on adding a security group.

From the OCI dashboard, navigate to Compute, [Instances](https://cloud.oracle.com/compute/instances). If you have more than one compartment, select the one that you want to add the VM to from the left-side menu. Choose the region from the top right drop-down, then click on the **Create Instance** button.

Give your instance a name, and under the **Image and shape** section click on the **Change image** button. For **Image source** select **Partner images** and search for `RED5 PRO SERVER`. Click to place a check next to `RED5 PRO SERVER` and review and accept the Oracle Terms of Use, Partner terms and conditions, and the [Oracle General Privacy Policy](https://www.oracle.com/legal/privacy/privacy-policy/?er=221886), then **Select image**. The default VM shape is a VM.Standard.E4.Flex with 1 OCPU (1 OCPU = 2 VCPUs) and 8G memory, which is fine for your initial development testing.

Choose what VCN to add this VM to 