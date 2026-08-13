---
title: Using NFS on Oracle Cloud
description: ""
menu_order: 15
---

You may want to set up an NFS mount for your OCI instances. This is especially helpful if you have multiple origins and want to use the `append` record functionality, as it allows the client to republish against any origin and resume the same stream recording. For more information on Oracle NFS, refer to the [OCI File Storage](https://docs.oracle.com/en-us/iaas/Content/File/Concepts/filestorageoverview.htm) documentation.

> Mount target limitations ([reference](https://docs.oracle.com/en-us/iaas/Content/File/Concepts/filestorageoverview.htm)):<br/>
Each mount target can accept up to 100,000 NFS client connections.<br/>
If you use in-transit encryption, each mount target can accept up to 64 NFS/SSL client connections. See Using In-transit Encryption for more information.<br/>
By default, you can create two mount targets per account per availability domain. See Service Limits for a list of applicable limits and instructions for requesting a limit increase.<br/>

## Network Security Group for NFS

Before mounting a file system, you must configure security rules to allow network traffic to and from the mount target. You can set up security rules in subnet security lists, network security groups, or by using a combination of both. It's easiest to create the Network Security Group first and choose that for the Mount Target when you create the FileSystem.

>Stateful ingress to TCP ports 111, 2048, 2049, and 2050, and UDP ports 111 and 2048.<br/>
>Stateful egress for TCP source ports 111, 2048, 2049, and 2050, and UDP source port 111.

## Configure a File System

1. From the OCI dashboard, select Storage, File Storage, and then File Systems.
2. Make sure to select the Compartment where your autoscale environment is configured.
3. Click on **Create File System**
4. Give your filesystem a name that helps you organize it. For example, if you are setting this for a specific autoscale environment use that environment name as a reference. The default properties are fine, and a mount target will be created in conjunction with the new filesystem. ![create-filesystem](/_images/installation/autooci/oci-filesystem.png)
5. Select the subnet where your autoscale nodes and stream manager reside, and choose the network security group that you created above. ![nsg](/_images/installation/autooci/mount-nsg.png)
6. Click on the **Create** button. It will take a few minutes for the new filesystem and mount target to be generated.

## Add NFS to your VM

1. Install NFS `sudo apt-get install nfs-common` (this may already be installed on your Ubuntu image)
2. Create the mount point directory. In most cases, you'll want to mount the NFS drive on the `streams` directory of the webapp you're using, for example, `sudo mkdir -p /usr/local/red5pro/webapps/live/streams`
3. Mount the filesystem: `sudo mount 10.0.0.39:/AutoScaleTestFileSystem /usr/local/red5pro/webapps/live/streams`
4. To verify the mount is present, type `df -h` to list out all of the mounted filesystems. You should see something like this: 

```shell
10.0.0.39:/AutoScaleTestFileSystem  8.0E     0  8.0E   0% /usr/local/red5pro/webapps/live/streams
```

## Mounting The NFS Drive on Server Startup

After you've verified that you can mount the drive from your instance, create a script to execute the mount, and then a cron job to run on startup. If you want to remove the NFS mount to test the below script, use the `umount` command.

```shell
umount 10.0.0.39:/AutoScaleTestFileSystem
```

### Mount Script

Replace the mount point value below with yours:

```shell
#! /bin/bash
nfs_mount_point=10.0.0.39:/AutoScaleTestFileSystem
nfs_directory=/usr/local/red5pro/webapps/live/streams

sudo mount $nfs_mount_point $nfs_directory
```

Save the above script as `nfsmount.sh` and make executable `chmod +x nfsmount.sh`

### Cron Job

Type `crontab -e` to bring up the cron editor, then select the editor of your choice.
Add to the bottom of the cron file: `@reboot  /home/ubuntu/nfsmount.sh`

Try rebooting (`sudo restart -n`) to verify that the cron job and script work. After the server restarts, log back in and run `df -h` to list the filesystem mounts.