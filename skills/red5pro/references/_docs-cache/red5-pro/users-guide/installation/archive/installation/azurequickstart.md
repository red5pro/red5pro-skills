---
title: Microsoft Azure Installation
description: ""
---

# Installing Red5 Pro on an Azure Virtual Machine

The following describes the steps in setting up a new Azure Virtual Machine. This document assumes that you have an Azure account, or a [trial account](https://learn.microsoft.com/en-us/azure/app-service/overview).

The following instructions are paraphrased from [Azure's Virtual Machine setup tutorial](https://learn.microsoft.com/en-us/archive/blogs/umits/windows-azure-from-zero-to-hero-online-series):

# Create Virtual Instance

1. From the [Azure portal](https://portal.azure.com/) pull-down menu on the left, choose *Virtual Machines**.
2. Click on **+Create** and then **+Virtual Machine**
3. Choose your Subscription and Resource Group (or create a new one)
4. Assign a server name ("name must be 1-15 characters long and it cannot contain special characters.")
5. Select your region and zone.
6. For Image, click on **See all images** and search for `Ubuntu Server 20.04 Minimal`
7. Select a VM size. The B2s VM type will be able to support minimal testing - however, because they do not have dedicated CPUs you may see issues. The F4s_v2 (suggested both for the number of CPUs and network performance) will support most live production streaming implementations.
  * In choosing the instance type, note that `WebRTC` uses more memory and CPU than `RTSP` and `RTMP` streaming and that the higher the resolution, bitrate, and framerate of your streams, the more load they will incur on your server.
8. You can either generate a new key pair, use an existing key pair, or choose to log in with a username and password (not recommended for production environments).
9. Select inbound ports - you can leave the default port 22 for the initialization. Later you will want to create a network ruleset. Click on Next to select the disk type.
10. Disk type: Premium SSD is recommended for production; standard SSD is fine for development. Select the default encryption type.
11. Networking - create a new Virtual Network and Public IP; accept other defaults
12. You can accept other defaults for the next steps unless you have specific relevant requirements.
13. Review and Create.

It takes a few minutes for a VM to be available on Azure. After the instance has been created, go to the Overview page to get the IP address. Then choose Networking from the left-hand menu and add the following to the Inbound Port rules.

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range | UDP |


Note: each rule needs to have a different priority number (ssh port 22 is priority 1000 by default; for this example we made Red5 Port 5080 100, RTMP port 1935 200, etc).

Click OK to accept the new security group, OK again to accept all custom settings, and then OK again to create the virtual instance (right to left on the OKs, collapsing the expanded menu).

## Log into the Virtual Machine

Using the login method selected in creating the machine, first SSH into your server via the public IP assigned and the username that you assigned:

```sh
ssh -i yourprivatekeyname username@<public-ip-address>
```

### Copy Red5 Pro Distribution to Server

Exit back to your desktop, then change to the directory where you have downloaded the latest Red5 Pro server distribution. You should then sftp the zip file up to your Azure VM instance:

```sh
sftp -i yourprivatekeyname username@<public-ip-address>
sftp> put red5pro-server-version.zip /tmp/
sftp> quit  (after file has been loaded)
```

## Red5 Pro Installation

Refer to the [Ubuntu Server Install document](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/) to install Red5 Pro server on your Virtual Machine instance.

After installation, navigate to port 5080 of the public IP address of your VM to validate that Red5 Pro has successfully been started.

---

# Installing Red5 Pro on an Azure Windows VM

If you wish to install on Windows, repeat the above with the following modifications:

Add a new security group with the Red5 Pro ports in addition to port 3389 (for Remote Desktop).  You will need to configure a username and password, (you will use these to connect to the server via Remote Desktop), and add the Red5 Pro ports to the Inbound Firewall rules on the server.

You can connect to your Windows virtual machine by clicking on the connect icon. This will download a .rdp file, which you can run with Microsoft Remote Desktop to connect to the virtual machine.

You will want to "Enable folder redirection" from your local machine to the remote machine, so that you can copy the the Red5 Pro Server distribution to the virtual machine.

Once you have logged into the Windows virtual machine, you need to open the Windows Firewall and add inbound rules for the Red5 Pro ports:

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 40000-65535 | TURN/STUN/ICE port range | UDP |


[Refer to Installing Red5 Pro on Windows here](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-windows/).
