---
title: AWS Installation
description: ""
---

**We recommend using the public [Terraform Modules](/docs/red5-pro/users-guide/installation/archive/installation/terraforminstall/) to install Red5 Pro on cloud platforms.**

# Installing Red5 Pro on an AWS EC2 Instance

The following describes the steps in setting up a new EC2 instance. We recommend running Red5 Pro on Ubuntu Linux.

These instructions cover how to install Red5 Pro as single server.  To install an autoscale cluster, refer to the [AWS Autoscale Installation Instructions](/docs/red5-pro/users-guide/installation/archive/auto-aws/overview/).

## EC2 Instance Setup

**Prerequisite information is available on the [Technical Prerequisites](/docs/red5-pro/users-guide/installation/archive/aws-concepts/technical-prerequisites/) page.**

Create your VPC, Subnet and Security Group:  
[VPC, Subnet, and Security Group Creation](/docs/red5-pro/users-guide/installation/archive/auto-aws/create-vpcs-and-security-groups/)

1. In the AWS Console, Select _EC2 Dashboard_
2. Click _Launch Instance_ to create a new EC2 instance
3. Select the latest __Ubuntu 20.04 LTS Server (x86)__ from the AMI quickstart list  *(Note: we suggest that you choose ubuntu over the Amazon Linux AMI because the latter does not support all of the libraries needed for some Red5 Pro functionality).*

Continue through the setup options with most of the default settings, and these specifics:

1. _Instance Type_: The t2.medium VM type will be able to support minimal testing - however, because they do not have dedicated CPUs, you may see issues. The c5.xlarge (suggested both for number of CPUs and network performance) will support most live production streaming implementations.
  * In choosing the instance type, note that `WebRTC` uses more memory and CPU than `RTSP` and `RTMP` streaming and that higher the resolution, bitrate and framerate of your streams, they more load they will incur on your server.
2. _Security Group_: Create a new security group with the following __Inbound__ ports open:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro; Websockets for WebRTC | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range | UDP |

__Once the EC2 instance is setup and available, you can now SSH into it and continue the installation of required software.__

## Red5 Pro Installation

### Copy Red5 Pro Server to the Instance

_In following along with the next several steps, please replace occurances of `yourpemkey.pem` and `ubuntu@xxx.compute-1.amazonaws.com` with the .pem file you defined on instance setup and the Public DNS value for your instance, respectively. Also note, your ssh login credentials may be ec2-user intead of ubuntu if you set up an alternate *nix flavor image_

To install the Red5 Pro Server:

1. Download the server .zip distribution to your local machine. Make sure to login with your account on [https://account.red5.net/login](https://account.red5.net/login) and download the server from [https://account.red5.net/login](https://account.red5.net/login).
2. SFTP the server .zip distribution into the _/tmp_ directory of your server:
    ```sh
    sftp -i yourpemkey.pem ubuntu@xxx.compute-1.amazonaws.com
    sftp>  put red5pro-server-xxx-release.zip /tmp/
    quit
    ```
3. SSH into the instance using the AWS credentials:
    ```sh
    ssh -i yourpemkey.pem ubuntu@xxx.compute-1.amazonaws.com
    ```

### Install Red5 Pro Server and Dependencies

Follow directions for [installing Red5 Pro server on linux](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/)
