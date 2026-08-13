---
title: Technical Prerequisites of deploying on AWS
description: ""
menu_order: 1
---

This document assumes that you have some basic knowledge of AWS EC2 management.  It also assumes that you have some basic linux and network administration skills. If you need more detailed information, please contact us.

# Installation Requirements
To complete the installation you will need:
* AWS Account
* Red5 Pro License
* DNS name mapped to your Elastic IP (single server) or Elastic Load Balancer (Autoscale)

# Supported AWS Regions
The following regions are supported for Red5 Pro Single Server and Autoscale Clusters:
* All Regions

# Single Server
Estimated Installation Time: 1 hour

## Concepts
To deploy Red5 Pro to Amazon using a Single Server you need to understand the following concepts:
* Basic Linux System Administration
* Basic Network Administration
* AWS Compute Instances deployment and configuration
* AWS VPCs deployment and configuration
* AWS Security Group configuration
* AWS Elastic IPs deployment and configuration
* AWS AMI management
* AWS IAM
* AWS S3 Storage configuration
* SSH Key management

## Deployment Diagram
![Single Server Deployment Diagram](/_images/installation/aws/single-red5pro-server-aws.drawio.png)

## Resources
Red5 Pro Single Server uses the following resources:
* Ubuntu 20.04
* AWS Compute Instance
* AWS VPC
* AWS Security Group
* AWS IAM Account
* AWS Elastic IP
* AWS AMI
* AWS S3 (optional)
* SSH Key

## Storage Requirements
Storage Requirements:
* AWS S3 (optional): depends on the number of streams stored, their quality and length (~2GB/hour of 1080p video at 4.5Mbps)

# Autoscale
Estimated Installation Time: 2-4 hours

## Concepts
To deploy Red5 Pro to Amazon using Autoscaling you need to understand the following **additional** concepts:
* Basic Linux System Administration
* Basic Network Administration
* AWS Compute Instances deployment and configuration
* AWS VPCs deployment and configuration
* AWS Security Group configuration
* AWS Elastic IPs deployment and configuration
* AWS AMI management
* AWS IAM
* AWS S3 Storage configuration
* SSH Key management
* AWS RDS deployment and configuration
* AWS Elastic Load Balancer configuration
* AWS Regions configuration

## Deployment Diagram
![Autoscale Cluster Deplpoyment Diagram](/_images/installation/aws/autoscale-aws-single-region.drawio.png)

## Resources
Red5 Pro Autoscale uses the following resources:
* Ubuntu 20.04
* AWS Compute Instance
* AWS VPC
* AWS Security Group
* AWS IAM Account
* AWS Elastic IP
* AWS AMI
* AWS S3 (optional)
* SSH Key
* AWS RDS database
* AWS Elastic Load Balacer

When complete you will have the following resources deployed:
* AWS VPC
* AWS Security Group
* AWS Elastic Load Balancer
* AWS Elastic IP
* AWS RDS
* Red5 Pro Cluster Deployment on AWS Compute Instances
* AWS S3 Bucket (Optional)

## Storage Requirements
Storage Requirements:
* AWS RDS: 20G
* AWS S3 (Optional): depends on the number of streams stored, their quality and length (~2GB/hour of 1080p video at 4.5Mbps)

## Secrets Storage
The credentials for the Stream Manager to login to the database are stored in /usr/local/red5pro/webapps/streammanager/WEB-INF/red5-web.properties on the Stream Manager.
