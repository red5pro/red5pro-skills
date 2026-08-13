---
title: Create Stream Manager and Terraform Instances
description: ""
menu_order: 6
---

We will now create two new VMs from the optimized disk image created.

> Note: recommended for TESTING ONLY, you can run terraform, stream manager, and MySQL all on the same instance. 

1. From the [custom images menu (in the Compute section)](https://cloud.oracle.com/compute/images) select the image that you created, and click on **Create Instance**.
2. Give the instance an easily-identifiable name (e.g. `streammanager-qa01`).
3. Choose the correct Compartment and select any Availability Domain.
4. For the Stream Manager instance, we want an instance with more memory, so click on **Change Shape** and adjust to use 1 OCPU and 16G memory.
5. For **Networking** select the VCN and Subnet that you created. **Show advanced options** and place a check in *Use network security groups to control traffic*, choosing the Stream Manager Network Security Group
6. For **Add SSH keys** select **Generate a key pair for me** and then **Download private key** (you must download the key at this stage). Download the public key as well. *We will copy the public key to the terraform server when we configure that.*
7. Click to Create Instance.

Repeat the above steps to create a **Terraform Service** instance. As Terraform does not need much memory, you can set that allocation value to 4G.

SSH key pair you can use existing which you generated and downloaded for Stream Manager instance:

* For **Add SSH keys** select **Upload public key files (.pub)** click **Browse** then choose your public ssh key. Example: **ssh-key-2023-06-26.key.pub**
