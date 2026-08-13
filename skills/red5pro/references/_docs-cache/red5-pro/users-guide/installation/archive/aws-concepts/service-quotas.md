---
title: Service Quotas on AWS
description: ""
menu_order: 6
---

Service Quotas can be used to help protect you from unexpected excessive provisioning as well as protection from malicious activities intended to increase your AWS bill.

The quotas should be set based on your usage expectations and will need to be adjusted as the scale of your deployment changes. AWS provides [Service Limit Architectural Guidance](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

## Single Server

The single server instance will count against these quotas:
* Amazon Elastic Compute Cloud (Amazon EC2): a single server will add a count of one against this quota
* Amazon Virtual Private Cloud (Amazon VPC): a single server may add a count of one against this quota assuming the Single Server is placed in new VPC rather than in an existing one.

## Autoscale Cluster

In an autoscale cluster will count against these quotas:
* Amazon Relational Database Service (Amazon RDS): the autoscale cluster will add a count of one against this quot
* Elastic Load Balancer (ELB): The autoscale cluster will add a count of one against this quota for each region in use
* Amazon Elastic Compute Cloud (Amazon EC2): the autoscale cluster will add up to the amount specified in your configuration policy against this quota
* Amazon Virtual Private Cloud (Amazon VPC): the autoscale cluster may add a count up to the number of regions deployed assuming the autoscale cluster is placed in new VPCs rather than in existing ones
