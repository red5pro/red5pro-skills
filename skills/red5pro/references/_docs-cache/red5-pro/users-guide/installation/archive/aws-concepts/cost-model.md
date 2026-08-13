---
title: System and Cost Model on AWS
description: ""
menu_order: 5
---

The following can be used to help determine what system type to run and the cost model involved in running that instance type.

## Server Sizing

The selection of instance size depends on your expected server load.  There is a sweet spot between balancing the instance size price against the Red5 Pro per instance pricing.  Also, note that Red5 Pro does not scale linearly on x86 hardware so there is a point at which adding more CPU to an instance does not gain value and additional instances are needed.

Server Performance for c5.Large and c5.xLarge can be found on the [Server Performance Metrics](/docs/red5-pro/resources/release-notes/archive/red5pro-server-releasenotes/latest-server-performance-metrics/) page.

## Single Server

Required Services:
* Amazon Elastic Cloud Compute (EC2) Instance
* Amazon VPC
* AWS Security Group
* AWS IAM Account
* AWS Elastic IP

Optional Services:
* Amazon Simple Storage System (S3)

## Autoscale Cluster

Required Services:
* Amazon Elastic Cloud Compute (EC2) Instance
* Amazon VPC
* AWS Security Group
* AWS IAM Account
* AWS Elastic IP
* Amazon RDS
* AWS Elastic Load Balancer

Optional Services:
* Amazon Simple Storage System (S3)
