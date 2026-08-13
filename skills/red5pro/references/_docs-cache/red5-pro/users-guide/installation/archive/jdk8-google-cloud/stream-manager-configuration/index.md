---
title: 6. Stream Manager Configuration
description: ""
menu_order: 7
---

Create a new VM instance using the image you created above.

> It is recommended that you select a machine type with a minimum of 4 vcpu and 8 GiB Memory (`n1-standard-2`) for acceptable performance for the Stream Manager.

From Compute Engine, VM Instances:

* Create an instance
* Choose the same Zone where your MySQL database was assigned
* Boot disk - Change - Your image tab, select the server image you just created
* Boot disk type: Standard persistent disk
* **IMPORTANT:** - Compute Engine default service account, Allow full access to all Cloud APIs
* On networking tab:
* You can choose the default network profile that you set up for Red5 Pro, or if you want to be more restrictive, the Stream Manager only needs ports 22, for ssh access, and 5080 open. If you are using the Stream Manager as an SSL proxy, then you also need to open port 8083.
* Under External IP, choose the static IP that you reserved from the Networking tab.

![createsm](/_images/installation/server/autoscalgooglecloud/createsm.png)

Copy the google-cloud-controller.jar file up to the server (`gcloud compute scp google-cloud-controller.jar stream-manager-01:/tmp/`)

> The google cloud SDK will help you generate SSH keys that are required to access the compute instances for your project.Usually the keys are associated with your login account when generated using the cloud SDK. Also checkout [Connecting to Instance](https://cloud.google.com/compute/docs/connect/standard-ssh).

SSH into the stream manager instance (`gcloud compute ssh stream-manager-01`)

Stop the Red5 Pro service (`sudo systemctl stop red5pro`)

## Contents

- [Install NTP (network time protocol)](install-ntp-network-time-protocol.md)
- [Remove Autoscale Files and WebRTC Plugin](remove-autoscale-files-and-webrtc-plugin.md)
- [Import Cloud Controller and Activate](import-cloud-controller-and-activate.md)
- [Modify Stream Manager App Properties (red5-web.properties)](modify-stream-manager-app-properties-red5-web-properties.md)
- [Optional: Load-Balance Multiple Stream Managers](optional-load-balance-multiple-stream-managers.md)
- [Set Scaling Policy](set-scaling-policy.md)
- [Set Launch Configuration Policy](set-launch-configuration-policy.md)
