---
title: Archive - Google Cloud - for JDK8/MySQL 5 Builds
description: Deploying Stream Manager and Autoscaling on Google Cloud Platform
menu_order: 22
---

This document assumes that you have a basic knowledge of operating on the Google Cloud Platform and some basic Linux administration skills. If you need more detailed information, please contact us.

Before you proceed with the setup make sure you have the following prerequisite steps:

* You have already set up your GCP account with valid billing information.
* You should have a valid accessible `Project` in your GCP account with an active billing account associated.
* You should have installed and configured the associated SDK for management ([https://cloud.google.com/sdk/](https://cloud.google.com/sdk/)).

In order to use the Red5 Pro Stream Manager service you will need the following:

1. Latest [Red5 Pro Server build](https://account.red5.net/login)
2. The google-cloud-controller.jar, from the [Red5 Pro Autoscaling Library Extensions section](https://account.red5.net/login)
3. An active Red5 Pro license key, Startup Pro level or higher. [REGISTER HERE.](https://account.red5.net/register). **Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license types.
4. A Google Cloud Platform Developer project ID

Before you Begin:

> You will want to **keep a record** of the usernames, passwords, IP addresses, and other information generated during the setup process, as you will need the information for stream manager configuration and future operations via the API.
[Click here to download a handy list for tracking all of your Red5 Pro Autoscaling values](/docs_static/installation/static/GoogleCloudComputeAutoScalingChecklist.rtf)
