---
title: Digital Ocean Installation
description: ""
---

**We recommend using the public [Terraform Modules](/docs/red5-pro/users-guide/installation/archive/installation/terraforminstall/) to install Red5 Pro on cloud platforms.**

# Installing Red5 Pro on a Digital Ocean Droplet

The following describes the steps in setting up a standalone Red5 Pro server instance on a Digital Ocean Droplet. *We recommend running Red5 Pro on Ubuntu linux.*

## Droplet Setup

1. From your Digital Ocean [dashboard](https://cloud.digitalocean.com/projects), click on the **Create** button, and from the pull-down select `Droplets`   ![droplet](/_images/installation/server/do-install/createdroplet.png)
2. Distributions: select Ubuntu, and from the drop-down choose **20.04 (LTS) x64**
3. The Basic 4GB/2CPU (`s-2vcpu-4gb`) droplet type will be able to support minimal testing - however, because they do not have dedicated CPUs, you may see issues. The CPU-Optimized 8GB/4CPU (`c-4`) Droplet (suggested both for the number of CPUs and network performance) will support most live production streaming implementations.
  * In choosing the instance type, note that `WebRTC` uses more memory and CPU than `RTSP` and `RTMP` streaming and that the higher the resolution, bitrate, and framerate of your streams, the more load they will incur on your server.
4. Choose a datacenter region (select the region closest to where you will be testing)
5. VPC - DEFAULT VPC is recommended for testing
6. Additional options: all are optional; select as needed
7. Authentication: **Recommended - use SSH keys**: if you have already uploaded an SSH key, you can choose that here. If you haven't, then click on **New SSH Key** to copy the contents of the public key of your SSH keypair. Note that you can include multiple keys on an instance if you like. (See [this autoscaling doc](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/create-ec2-ssh-rsa-keypair/) for instructions on creating an ssh2 keypair). If you prefer to use a root password for connecting, then select that option.
8. Finalize and create. You can create multiple droplets at the same time (up to 10) if you like. The default name generated will describe the droplet properties (e.g. `ubuntu-c-2-4gib-nyc3-01` - Ubuntu OS on a CPU-optimized 2CPU / 4G instance in the NYC3 region); you can use that or modify the instance name (note: the name can be changed at any time).
9. Add tags - optional, but if you plan to use tags to assign Firewall rules, then add one now.
10. Select Project - if you have multiple projects, then select which one you want to run your server in; otherwise it will be assigned to the default project (the droplet can be moved to another project after it is created as well).
11. When the droplet has finished being created, you will see its IP address. ![dropletprogress](/_images/installation/server/do-install/inprogress.png).

## Floating IP address

Unlike some other cloud providers, if you stop and restart a Digital Ocean droplet, it will retain its ipv4 IP address (*Digital Ocean also charges for droplets whether they are running or stopped*). A floating IP address is helpful if you might delete the instance, but want to maintain the IP for a DNS name.

To add a floating IP address to your droplet:

1. click on the instance name to see the detailed page. Near the top, click on **Floating IP:**`Enable now` ![enablenow](/_images/installation/server/do-install/enablefloat.png). This will take you to the Netowrking page.
2. From the Networking page, click on the **Assign Floating IP** button ![enablenow](/_images/installation/server/do-install/assignfloat.png)

## Optional - Firewall

By default, all inbound ports are open on Digital Ocean droplets. You will probably wish to define a Firewall to restrict port access to your server. To create a firewall:

1. From the left-hand menu, select Networking, and then select the Firewalls tab ![firewalls](/_images/installation/server/do-install/firewalls.png)
2. Click on Create Firewall. Give your firewall a name, and add the following Inbound Rules as needed for your use case:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro; Websockets for WebRTC | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 6262 | websockets for HLS  | TCP |
| 40000-65535 | TURN/STUN/ICE port range | UDP |

3._Apply To Droplets - you can either select the droplet you just created, or use a tag to add multiple droplets ![applyfw](/_images/installation/server/do-install/applyfw.png)

__You can now SSH into it and continue the installation of required software.__

## Red5 Pro Installation

### Copy Red5 Pro Server to the Instance

_In following along with the next several steps, please replace occurances of `yoursshkey` and `ip-address` with the SSH key you defined on instance setup and the ip address of your instance, respectively. Also note, your ssh login credentials will be root_

To install the Red5 Pro Server:

1. Download the server .zip distribution to your local machine. Make sure to log in with your account on [https://account.red5.net/login](https://account.red5.net/login) and download the server from [https://account.red5.net/login](https://account.red5.net/login).
2. SFTP the server .zip distribution into the _/tmp_ directory of your server. If you have a password associated with your SSH key, you will need that:
    ```sh
    sftp -i yoursshkey root@ip-address
    sftp>  put red5pro-server-xxx-release.zip /tmp/
    quit
    ```
3. SSH into the instance using the same credentials:
    ```sh
    ssh -i yoursshkey root@ip-address
    ```

### Install Red5 Pro Server and Dependencies

Follow directions for [installing Red5 Pro server on linux](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/)
