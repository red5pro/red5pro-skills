---
title: Create Optimized Disk Image
description: ""
menu_order: 5
---

For the autoscaling infrastructure, we will be configuring three or four diffferent droplets. For the purpose of avoiding duplicate work, it is recommended that you start by creating an optimized droplet and then taking a snapshot of that to use as the base for your Stream Manager, Terraform, and nodes.

## Linode Instance

* Click on Create and select Linode from the Linodes section.
* Choose Image – 20.04 Ubuntu LTS.
* Select Region from the drop-down list.
* Use dedicated CPU 8GB Plan (You can also use 4 GB depending upon your load)
* Provide a Linode Label as per your choice For Example – red5-optimized-disk-image-instance
* Add tags, For Example – red5-optimized-disk-image.
* Enter a Strong root password and select the SSH key added in the previous step.
* Click on Create Linode in right.

## Optimize Linode Instance

1. Once the droplet is available, ssh into the IP address as root user with the ssh key you created (`ssh -i ssh-key root@ipaddress`)
2. Type `apt-get update` to update the system
3. Follow [the linux file system optimization guide](/docs/red5-pro/users-guide/optimization/red5-pro-server-optimization/)

* modify `/etc/sysctl.conf`, adding the following lines to the bottom: 

```conf
fs.file-max = 1000000
kernel.pid_max = 999999
kernel.threads-max = 999999
vm.max_map_count = 1999999
```

* modify `/etc/security/limits.conf`, adding the following lines to the bottom (if your process is running as a different user than root, then you will want to add the same for that user)

```conf
root soft nofile 1000000
root hard nofile 1000000
```

* modify `/etc/pam.d/common-session`, adding the following to the bottom

```conf
session required pam_limits.so
```

* then run `ulimit -n 1000000`
* And finally, `sysctl -p`, which will reload the user sessions with your updated settings
* **OPTIONAL** if you want to be able to view memory and other advanced metrics from the Digital Ocean dashboard, then install the metrics agent by typing `curl -sSL https://repos.insights.digitalocean.com/install.sh | sudo bash`

## Create Linode Image(snapshot) from Optimized Instance

* Type `exit` to log out of the instance. 
* Click on the image in the left panel on Linode Cloud.
* Select the Create Image option from the top right.

![newsshkey](/_images/installation/server/linode/diskimage01.png)




