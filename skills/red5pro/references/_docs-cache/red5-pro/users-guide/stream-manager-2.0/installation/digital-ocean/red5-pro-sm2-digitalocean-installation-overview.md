---
title: Stream Manager 2.0 Installation on DigitalOcean Overview
menu_order: 1
---

This document assumes that you have some basic knowledge of the DigitalOcean Cloud Platform. It also assumes that you have some Linux and network administration experience. If you need additional assistance or specific implementation help, please contact us.

Autoscaling on DigitalOcean utilizes a Terraform service (as-terraform) for deploying and removing Red5 Pro nodes (Origin, Edge, Transcoder, Relay, Mixer) inside your DigitalOcean environment.

### In order to use Red5 Pro Stream Manager 2.0 on DigitalOcean, you will need the following:

1. An active **DigitalOcean account** with administrative rights  
2. A **DigitalOcean Personal Access Token** with Read & Write permissions  
3. A **DigitalOcean Project** where all resource will be created
4. A **VPC network** and **Firewall rules** configured for Stream Manager and Red5 Pro nodes  
5. A **Droplet snapshot image** prepared with the Red5 Pro server installed (used for autoscaling nodes)  
6. A **Stream Manager 2.0 instance** deployed using Docker Compose (microservices)  
7. A **DNS record** pointing your Stream Manager domain to its public IP address  
8. One or more **autoscaling node groups**, created via Stream Manager 2.0 API calls  

---

#### Artifacts

1. The latest [Red5 Pro Server build](https://account.red5.net/login).  
2. An active [Red5 Pro license key](https://account.red5.net/overview), Startup Pro level or higher.  
   **Note:** Clustering and autoscaling are *not* supported with `TRIAL` or `DEVELOPER` license types.
3. Stream Manager 2.0 Docker Compose  
   [Examples Repository](https://github.com/red5pro/red5pro-stream-manager-2-examples).
