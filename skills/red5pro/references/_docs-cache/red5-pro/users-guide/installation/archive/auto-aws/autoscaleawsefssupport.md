---
title: 9. AWS Elastic File System
description: Integrating Autoscaling with Amazon Elastic File System
menu_order: 10
---

You may want to mount an EFS drive if you are recording files, instead of using Amazon S3 for storage. This option is a little cleaner, as you can bypass the post-process step involved in using S3 storage. The only limitation currently is that EFS is VPC-based, so you would need a different EFS created for each region.

## Create A New Elastic File System

Access the [EFS Dashboard here](https://console.aws.amazon.com/efs/home?), and click on the **Create file system** button.

1. Configure file system access: Select the VPC that you are using for your autoscaling nodegroups from the dropdown list.
2. Create mount targets: The subnets that you created should be automatically selected. Under `security groups` locate the policy that you set up for your nodes and add that. Click on **Next Step**
3. Configure optional settings: at this time we suggest keeping the defaults (General Purpose performance mode and no encryption added)
4. Review and create: click on **Create File System** after reviewing the values.
5. Make note of the `File system ID` and `DNS name` of your EFS. You will need this information for the connection.

**It is necessary to keep the following in mind while creating a new `File System`:**

* EFS is VPC-based, so make sure to select the correct VPC (the one you are going to use for autoscaling).
* The VPC should have a subnet in each availability zone and each subnet should be selected as a `mount target` for the File System. This will ensure that the EFS will be mountable in any of the availability zones for that region.
* Ensure that the security group for the EFS is properly configured to allow access from EC2 instances.
* In the `Configure optional settings` screen, select General Purpose (default) as the performance mode.
* Do not select `Enable encryption of data at rest`.

**General Settings for EFS Security Group**

* Inbound:  Add a `Custom TCP Rule` for port `2049` allowing NFS read/write. For a simple but less secure configuration use `0.0.0.0/0` for `Source`. If you know the addressing scheme and IP ranges for your VPC you can try specifying that as well.
* Outbound:  Allow all traffic for all port ranges and any `destination`(defaults).

## Modifying the Node AMI to use EFS via NFS

### Install the NFS client

`sudo apt-get install nfs-common`

## Testing EFS mount manually

Once you have installed the NFS client and your EFS is configured with proper access security, you should test the connection.

```sh
sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport <File-System-DNS-Name>:/ <Mount-Destination-Path>
```

**Example**

```sh
sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport fs-de56fa55.efs.us-east-2.amazonaws.com:/ /usr/local/red5pro/webapps/live/streams
```

To verify that the filesystem is mounted, run `df -h` and you should see the path listed at the bottom, for example:

```list
Filesystem                                 Size  Used Avail Use% Mounted on
udev                                       1.9G     0  1.9G   0% /dev
tmpfs                                      372M  5.2M  367M   2% /run
/dev/nvme0n1p1                              16G  1.5G   14G  10% /
tmpfs                                      1.9G     0  1.9G   0% /dev/shm
tmpfs                                      5.0M     0  5.0M   0% /run/lock
tmpfs                                      1.9G     0  1.9G   0% /sys/fs/cgroup
tmpfs                                      372M     0  372M   0% /run/user/1000
fs-de56fa55.efs.us-east-2.amazonaws.com:/  8.0E     0  8.0E   0% /usr/local/red5pro/webapps/live/streams
```

## Providing EFS Mount Script Via *User Data* to an Autoscale Node from Stream Manager

To have an auto-scaled Red5 Pro node auto-mount the EFS on startup, use a simple configuration style script:

Reference: [https://docs.aws.amazon.com/efs/latest/ug/mount-fs-auto-mount-onreboot.html](https://docs.aws.amazon.com/efs/latest/ug/mount-fs-auto-mount-onreboot.html)

**EFS Auto-Mount Sample Script:**

```sh
#!/bin/bash
file_system_dns=fs-4302e15a.efs.us-west-1.amazonaws.com
efs_directory=/usr/local/red5pro/webapps/live/streams

mkdir -p $efs_directory
sudo mount -t nfs -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 $file_system_dns:/ $efs_directory
```

**Parameters**

`file_system_dns`: The DNS name of the File System.

`efs_directory`: The absolute path of the mount location on the EC2 filesystem

Using the above script, when the EC2 instance starts up from an AMI, it will automatically mount the file system represented by DNS `fs-de68fa38.efs.us-east-2.amazonaws.com` at `/usr/local/red5pro/webapps/live/streams`.

You can provide this to Stream Manager via the launch configuration schema using the base64 embedded syntax.

>**IMPORTANT NOTE**: Once you have used a [base-64 encoder](https://www.base64encode.org/) on the above script, pre-pend the encoded text with `base64:` in the properties JSON.

**Example**

**Configuration Example**

```json
{
  "launchconfig": {
    "name": "default-v2",
    "description": "This is a sample version launch configuration for development",
    "image": "{red5pro-ami}",
  "version": "0.0.2",

  "targets": {
      "target": [
    {
      "role": "origin",
      "instanceType": "c5.large",
      "connectionCapacity": "500"
    },
    {
      "role": "edge",
      "instanceType": "c5.large",
      "connectionCapacity": "500"
    }
     ]
    },

    "properties": {
      "property": [
        {
          "name": "UserData",
          "value": "base64:I2Nsb3VkLWNvbmZpZw0KcmVwb191cGRhdGU6IHRydWUNCnJlcG9fdXBncmFkZTogYWxsDQoNCnBhY2thZ2VzOg0KLSBhbWF6b24tZWZzLXV0aWxzDQoNCnJ1bmNtZDoNCi0gZmlsZV9zeXN0ZW1fZG5zPWZzLWRlNThmYTg2LmVmcy51cy1lYXN0LTEuYW1hem9uYXdzLmNvbQ0KLSBlZnNfZGlyZWN0b3J5PS91c3IvbG9jYWwvcmVkNXByby93ZWJhcHBzL2xpdmUvc3RyZWFtcw0KDQotIG1rZGlyIC1wICRlZnNfZGlyZWN0b3J5DQotIHN1ZG8gbW91bnQgLXQgbmZzIC1vIG5mc3ZlcnM9NC4xLHJzaXplPTEwNDg1NzYsd3NpemU9MTA0ODU3NixoYXJkLHRpbWVvPTYwMCxyZXRyYW5zPTIgJGZpbGVfc3lzdGVtX2RuczovICRlZnNfZGlyZWN0b3J5"
        }
      ]
    },
    "metadata": {
      "meta": [
        {
          "key": "meta-name",
          "value": "meta-value"
        }
      ]
    }
  }
}
```