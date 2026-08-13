---
title: Create MySQL, Terraform, and Stream Manager Instances
description: ""
menu_order: 6
---

We will now create two new instances, using the snapshot created in the previous step.

> Note: recommended for TESTING ONLY, you can run terraform, stream manager, and mysql all on the same instance. 

## Linode instance for MySQL Database

> Note: As Linode doesn't have the managed MySQL database service, users need to run MySQL on a Linode instance.

* Click on Create and select Linode from the Linodes section.
* Choose Image – `red5-optimized-disk-image` (Optimized Linode Image)
* Select Region from the drop-down list.
* It is recommended that you use a Linode `g6-dedicated-2` or `g6-dedicated-4` instance type, depending on your anticipated user load
* Provide a Linode Label as per your choice For Example – `red5pro-autoscaling-mysql`
* Add tags, For Example – `mysql-linode`.
* Enter a Strong root password and select the SSH key added in the previous step.
* Click on Create Linode in right.

## Linode instance for Terraform Server

* Click on Create and select Linode from the Linodes section.
* Choose Image – `red5-optimized-disk-image` (Optimized Linode Image)
* Select Region from the drop-down list.
* Use dedicated CPU 4GB Plan.
* Provide a Linode Label as per your choice For Example – `red5pro-autoscaling-terraform`
* Add tags, For Example – `terraform-linode`.
* Enter a Strong root password and select the SSH key added in the previous step.
* Click on Create Linode in right.

## Linode instance for Stream Manager

* Click on Create and select Linode from the Linodes section.
* Choose Image – `red5-optimized-disk-image` (Optimized Linode Image)
* Select Region from the drop-down list.
* Use dedicated CPU 8GB Plan (You can also use 4 GB depending upon your load)
* Provide a Linode Label as per your choice For Example – `red5pro-autoscaling-stream-manager`
* Add tags, For Example – `stream-manager-linode`.
* Enter a Strong root password and select the SSH key added in the previous step.
* Click on Create Linode in right.