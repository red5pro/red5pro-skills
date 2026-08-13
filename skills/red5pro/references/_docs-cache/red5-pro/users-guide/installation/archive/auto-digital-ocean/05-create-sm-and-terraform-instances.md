---
title: Create Stream Manager and Terraform Instances
description: Create Stream Manager and Terraform Instances
menu_order: 6
---

We will now create two new droplets, using the snapshot created in the previous step.

> Note: recommended for TESTING ONLY, you can run terraform, stream manager, and mysql all on the same instance. 

1. From the Snapashots menu, click on the **More** dropdown, and select **Create Droplet**
2. *Choose a plan* - for the Stream Manager instance, we want an instance with more memory, so click on **Memory-Optimized** and select the `16 GB / 2 CPUs` droplet type, with the default `1x SSD`
3. Skip *Add block storage*
4. *Choose a datacenter region*  - the datacenter where you created the image will be selected by default (if you want to create a droplet in a different region, then you first will need to copy the snapshot to that region)
5. *VPC Network* - as of this document, Red5 Pro autoscaling does not support targeting by Digital Ocean VPC, so you must leave this as the default.
7. *Authentication* - select **SSH keys** and add a check next to the ssh key that you added in the previous step.
8. *Finalize and create* - choose the default `1 droplet` and modify the name to identify the droplet (note: this hostname is only a label, it is not a DNS name)
9. If you have multiple projects, select the one you want to use for this environment, and click on **Create Droplet**

Repeat the above steps to create a Terraform instance, but use the `Compute Optimized C-2` instance type, as Terraform does not need the additional memory.