---
title: Create a new Disk Image with the updated build
description: ""
menu_order: 2
---

It is recommended to use your existing node image(s) as a base and to upgrade on a new VM created from those (unless there is an OS change or update between versions). This will save you from repeating the optimizations and libraries installation steps.

> If you have different images configured for different node types, make sure to carry over the differences for your new images.


## Create a new AMI/Image for AWS

See the **Create AMI Image from Instance** section of [Prepare Red5 Pro AMI for Nodes](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/prepare-red5-pro-ami-for-nodes/).

## Create a new Image for Google Cloud

See [Create Disk Image](/docs/red5-pro/users-guide/installation/archive/auto-google-cloud/create-red5-pro-disk-image/).

## Create a new Image for Digital Ocean

See [create node image](/docs/red5-pro/users-guide/installation/archive/auto-digital-ocean/11-create-node-image/)


## Create a new Image for Microsoft Azure

See [prepare Red5 Pro image for nodes](/docs/red5-pro/users-guide/installation/archive/auto-microsoft-azure/10-prepare-red5-pro-image-for-nodes/).

## Create a new Image for Linode

See [create node image](/docs/red5-pro/users-guide/installation/archive/auto-digital-ocean/11-create-node-image/).

> NOTE: If required for the platform, make sure to copy the image to all of the regions where you have nodegroups. 