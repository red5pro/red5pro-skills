---
title: Overview
description: Deploying Stream Manager and Autoscaling on Amazon Web Services (AWS)
menu_order: 1
---

**We recommend using the public [Terraform Modules](/docs/red5-pro/users-guide/installation/archive/installation/terraforminstall/) to install Red5 Pro on cloud platforms.**

This document assumes that you have some basic knowledge of AWS EC2 management.  It also assumes that you have some basic linux and network administration skills. If you need more detailed information, please contact us.

These instructions cover how to install Red5 Pro as an single or multiple availability zone, and single and multiregion autoscale deployment.  To install a single server, refer to the [Single Server Installation Instructions](/docs/red5-pro/users-guide/installation/archive/cloudinstall/awsinstall/).

In order to use the Red5 Pro Stream Manager service you will need the following:

1. The latest [Red5 Pro Server build](https://account.red5.net/login)
2. The latest aws-cloud-controller.jar, from the [Red5 Pro Autoscaling Library Extensions section](https://account.red5.net/login)
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license types.
4. An active [AWS](https://aws.amazon.com/) account

**Additional prerequisite information is available on the [Technical Prerequisites](/docs/red5-pro/users-guide/installation/archive/aws-concepts/technical-prerequisites/) page.**

Before you Begin:

**NOTE:** Because of the structure of the AWS EC2, many of the steps in this process need to be executed against every region in which you choose to include autoscaling.

> You will want to **keep a record** of the usernames, passwords, IP addresses, and other information generated during the setup process, as you will need the information for stream manager configuration and future operations via the API.   [Click here to download a handy list for tracking all of your Red5 Pro Autoscaling values](/docs_static/installation/static/AWSAutoScalingChecklist.rtf)
