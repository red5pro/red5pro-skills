---
title: Troubleshooting AWS Autoscale Deployment
description: ""
menu_order: 10
---

1. You can see the role of a node on the Tags tab in the EC2 console ![instancetags](/_images/troubleshooting/server/autoscaleaws/instancetags.png)
* If you are using an existing AWS VPC that hasn't been created per our [instructions](/docs/red5-pro/users-guide/installation/archive/auto-aws/create-vpcs-and-security-groups/), then it is **essential** that when you create (or modify) the subnets they use a different route table than the VPC AND that their route table includes an internet gateway.
* If you are using AWS Wavelength zones then you will need to [contact us](mailto:info@red5pro.com) about getting a server distribution which includes Wavelength Zone support.
