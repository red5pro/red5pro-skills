---
title: Backup and Recovery on AWS
description: ""
menu_order: 3
---

## Single Server Node Backup

Red5 Pro Single Server installations can be backed up using AWS Backup [Getting Started with AWS Backup](https://aws.amazon.com/getting-started/hands-on/amazon-ec2-backup-and-restore-using-aws-backup/).  Important data on the Single Server includes configuration files and any ephemeral recordings that have not been uploaded to storage via the [Cloud Storage Plugin](https://www.red5.net/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/red5-pro-cloud-storage-aws/#set-up-an-s3-storage-bucket-to-be-used-for-vod) or other manual methods.

## Autoscale RDS Backup

In an autoscale environment you should expect the instances to be ephemeral and as such they do not need to be backed up.

Red5 Pro Autoscale installations will need to backup the RDS.  When configuring the RDS service, a backup schedule should be configured via using AWS Backup [Backup and Restore of RDS using AWS Backup](https://aws.amazon.com/getting-started/hands-on/amazon-rds-backup-restore-using-aws-backup/).  The schedule of this backup should conform with your security policies.
