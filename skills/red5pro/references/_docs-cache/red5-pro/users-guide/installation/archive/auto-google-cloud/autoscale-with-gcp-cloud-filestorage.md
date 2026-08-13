---
title: GCP Cloud Filestore
description: ""
---



# Integrating Autoscaling with GCP Cloud Filestore (NFS)

You may want to mount an NFS drive if you are recording files, so that multiple origins can share the same storage target.

# Create a Filestore Instance

Navigate to [Google Cloud Filestore](https://console.cloud.google.com/filestore) dashboard. You may need to enable the API [from the API dashboard](https://console.cloud.google.com/apis/dashboard) if you haven't already.

* Click on **Create an instance**
* Give the instance a unique ID (lowercase letters, numbers and hyphens - max 63 characters)
* Choose instance tier, based on your performance needs
* Select the VPC network where your autoscaling solution is going to be running
* **Location:** select the region where your nodes will be located
* **Fileshare properties:** create a **fileshare name** to use for your directory (lower case letters, numbers and underscores - max 16 characters)
* **Fileshare capacity:** choose between 1 and up to 63.9 TB of space (note - pricing is based on the number of TB reserved)
* Click on **create**
* Once the instance has been created, click on it to get the IP address to use for connecting.

## Modifying the Node image to use Cloud Filestore NFS

### Install the NFS client

`sudo apt-get install nfs-common`

## Testing NFS mount manually

Once you have installed the NFS service, you should test the connection.

```sh
sudo mount 10.126.192.250:/red5profileshare /usr/local/red5pro/webapps/live/streams
```

Where `10.126.192.250` is the IP address of your Filestore instance, and `red5profileshare` is the fileshare name that you configured above.

To verify that the filesystem is mounted, run `df -h` and you should see the path listed at the bottom, for example:

```list
Filesystem                        Size  Used Avail Use% Mounted on
udev                              3.7G     0  3.7G   0% /dev
tmpfs                             748M  8.6M  739M   2% /run
/dev/sda1                          16G  2.1G   14G  14% /
tmpfs                             3.7G     0  3.7G   0% /dev/shm
tmpfs                             5.0M     0  5.0M   0% /run/lock
tmpfs                             3.7G     0  3.7G   0% /sys/fs/cgroup
tmpfs                             748M     0  748M   0% /run/user/1001
10.126.192.250:/red5profileshare 1007G   76M  956G   1% /usr/local/red5pro/webapps/live/streams
```

## Add NFS mount to startup via Crontab

GCP doesn't seem to have the same `user_data` option as AWS, but you can add the NFS mount to your node image via CronTab.

### Create a mount script

Create a script (`nfsmount.sh`) in a root-owned directory to reference via the crontab. For example:

**NFS Startup Mount Sample Script:**

```sh
#!/bin/bash
sudo mkdir /usr/local/red5pro/webapps/live/streams
sudo mount 10.126.192.250:/red5profileshare /usr/local/red5pro/webapps/live/streams
sudo chmod go+rw /usr/local/red5pro/webapps/live/streams
```

Make the script executable: `sudo chmod +x /usr/local/nfsmount.sh`

Now edit the crontab `sudo crontab -e`

And add the following line:

`@reboot /usr/local/nfsmount.sh`

You can test this script by rebooting the VM (`sudo reboot`). Then ssh into the instance after it restarts to verify that the drive is mounted.

After you have verified, create an image from this node [as per these steps](/docs/red5-pro/users-guide/installation/archive/auto-google-cloud/create-red5-pro-disk-image/)