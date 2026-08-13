---
title: 1. Reserve Static IP for Stream Manager
description: ""
menu_order: 2
---

> **NOTE:** if you are going to use [GCP Autoscaling for Stream Managers](/docs/red5-pro/users-guide/installation/archive/auto-google-cloud/smautoscalegoogle/), you do not need to reserve a static IP address.

It is critical that the Stream Manager have a static IP address, so that in the event that the instance is rebooted, it will retain the same public IP address. You can reserve a static IP address via the Google Cloud SDK. Choose the region in which you wish to host the stream manager:

```sh
gcloud compute --project <your-project-id> addresses create streammanagerip --region <preferred-region>
```

You can also reserve a static IP address via the Google Cloud Console. Navigate to VPC Networks, External IP Addresses and assign an IP.

![Reserve Static IP](/_images/installation/server/autoscalgooglecloud/reserve-static-ip.png)

Google cloud offers two types of static IP addresses- `Premium` and `Standard`. The `Premium` IP addresses (`default` selection) are optimized for better routing using google's own backbone. The shell command specified above will reserve a `Premium` IP address. To know more about IP addresses and their differences take a look at official [documentation on External IP addresses](https://cloud.google.com/compute/docs/ip-addresses/configure-static-external-ip-address)

*Make a note of the assigned IP address. You will need this for Database permissions and Stream Manager configuration.*
