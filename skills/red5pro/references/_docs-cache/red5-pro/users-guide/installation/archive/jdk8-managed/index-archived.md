---
title: Archive - Simulated Cloud - for JDK8/MySQL 5 Builds
description: Deploying Simulated Cloud Stream Manager and Autoscaling
menu_order: 24
---

If you wish to run the Red5 Pro autoscaling solution on a hosted platform other than AWS or Google, then you can use the Simulated Cloud API.

In order to use the Red5 Pro Stream Manager service you will need the following:

1. The latest [Red5 Pro Server build](https://account.red5.net/login)
2. The `simulated-cloud-controller.jar`, from the [Red5 Pro Autoscaling Library Extensions section](https://account.red5.net/login)
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license types.
4. Dedicated Linux instances on which you can deploy Red5 Pro.

## Before you Begin

> You will want to **keep a record** of the usernames, passwords, IP addresses, and other information generated during the setup process, as you will need the information for Stream Manager configuration and future operations via the API.


## Reserve a static IP address for your Stream Manager

You will need a static IP address for the Stream Manager in order to configure your nodes.

>If you are going to use WebRTC publishing, then you will also need to register a domain name and procure an SSL Certificate for the Stream Manager.
