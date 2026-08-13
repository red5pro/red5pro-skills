---
title: Overview
description: Deploying Stream Manager and Autoscaling on Amazon Web Services (AWS)
menu_order: 1
---

This document assumes that you have some basic knowledge of AWS EC2 management.  It also assumes that you have some basic Linux and network administration skills. If you need more detailed information, please contact us.

In order to use the Red5 Pro Stream Manager service you will need the following:

1. The latest [Red5 Pro Server build](https://account.red5.net/net)
2. The latest aws-cloud-controller.jar, from the [Red5 Pro Autoscaling Library Extensions section](https://account.red5.net/net)
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license types.
4. An active [AWS](https://aws.amazon.com/) account

Before you Begin:

**NOTE:** Because of the structure of the AWS EC2, many of the steps in this process need to be executed against every region in which you choose to include autoscaling.

> You will want to **keep a record** of the usernames, passwords, IP addresses, and other information generated during the setup process, as you will need the information for stream manager configuration and future operations via the API.
