---
title: 4. Create VPC and Firewall Rules
description: ""
menu_order: 5
---

Your GCP environment should have a `default` VPC, which can be used for autoscaling. However if you wish, you can also use a separate network for Red5 Pro autoscaling.

## To Create a new VPC

* Navigate to **VPC network** and click on **CREATE VPC NETWORK**
* Provide appropriate details for the new VPC form

* **Name**: Specify a name for the VPC such as `red5pronetwork`.
* **Description**: Add a description for the VPC.
* Select **Automatic** subnet creation mode, to generate subnets in all regions.
* Select all essential **Firewall rules** for your VPC except `allow-rdp`.
* Select a **Dynamic routing mode** according to your needs or just leave it to default.
* Click `Create` to create VPC

### Create firewal rules

* Under **VPC Network** tab -> Firewall Rules, Click on `CREATE FIREWALL RULE`. Add a new firewall rule to the network profile you wish to use for autoscaling.
* **Name**: Specify a name for the rule such as `red5pro-ports`
* **Description**: Add a description
* **Logs**: Leave to default (off)
* **Network**: Make sure `default` network, or the one you created, is selected
* **Priority**: Leave to default
* **Direction of traffic**: Leave to default (`Ingress`)
* **Action on match**: Leave to default (`Allow`)
* **Targets**: All instances in the network
* **Source Filter**: IP Ranges
* **Source IP Ranges**: `0.0.0.0/0` (Implies Any)
* **Second Source Filter**: Leave to default
* **Protocols & Ports**: Select **Specified Protocols & Ports** and enter the following ports for mentioned protocols.

`TCP`: 5080,443,1935,8554,22
`UDP`: 40000-65535

* Click `Create` to create rule

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC / Stream Manager | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |