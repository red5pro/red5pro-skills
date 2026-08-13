---
title: Stream Manager 2.0 Installation on Linode Overview
menu_order: 1
---

This document assumes that you have some basic knowledge of Linode Cloud Platform.  It also assumes that you have some basic Linux and network administration skills. If you need more detailed information, please contact us.

Autoscaling on Linode utilizes a Terraform service (as-terraform) for deploying and removing Red5 Pro nodes (Origin, Edge, Transcoder, Relay, Mixer)

### In order to use the Red5 Pro Stream Manager 2.0 on Linode, you will need the following:

1. Have active Linode account with administrative rights
2. Generate API key in Linode for your account
3. Create network and Security groups
4. Create instance image for Red5 Pro nodes
5. Deploy Stream Manager 2.0 instance with microservices (docker-compose)
6. Create DNS record for Stream Manager 2.0 instance public IP
7. Create autoscaling node group using API calls to Stream Manager 2.0

#### Arifacts

1. The latest [Red5 Pro Server build](https://account.red5.net/login).
2. An active [Red5 Pro license key](https://account.red5.net/overview), Startup Pro level or higher. 
**Note:** clustering and autoscaling are not supported by `TRIAL` or `DEVELOPER` license type.
3. Stream Manager 2.0 docker-compose [Examples](https://github.com/red5pro/red5pro-stream-manager-2-examples).
