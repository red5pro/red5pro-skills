---
title: Monitoring the Health of Red5 Pro on AWS
description: ""
menu_order: 4
---

You can configure [AWS CloudWatch](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch.html) service to monitor your Red5 Pro installation.

## Single Server Metrics
Single server instaces should be monitored for Availibility, CPU Usage, CPU Load and disk space at a minimum.  If CPU Usage goes about 80% or CPU load approaches the number of vCPUs you have in your system then you should upgrade.  Additionaly, disk space should be cleared or additional space added if go about 80% usage.  Availability monitoring depends on your use case, but the following are suggested to be monitored via both the Public IP and the internal IP:
* Monitor web service port availability (port 5080, with SSL installed port 443)
* RTMP service port availabilty (port 1935)

## Autoscale Metrics
Autoscale instances are ephemeral, but monitoring can be placed on the RDS and Elastic Load Balancers that service the cluster.  If the RDS CPU usage goes above 60% you should consider upgrading.  The following should be monitored via the Elastic Load Balancer Public IP as well as directly against the RDS Service:
* Monitor web service port availability (port 443)
* RDS:
    * AllocatedStorage
    * CPUUtilization
