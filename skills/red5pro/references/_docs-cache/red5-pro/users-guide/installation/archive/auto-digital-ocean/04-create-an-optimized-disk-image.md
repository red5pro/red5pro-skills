---
title: Create Optimized Disk Image
description: ""
menu_order: 5
---

For the autoscaling infrastructure, we will be configuring three or four different droplets. For the purpose of avoiding duplicate work, it is recommended that you start by creating an optimized droplet and then taking a snapshot of that to use as the base for your Stream Manager, Terraform, and nodes.

## Create Droplet

1. Click on the green Create button in the top left, and select Droplets.
2. *Choose an image* - Select Ubuntu, then drop down to select **20.04 (LTS) x64**
3. *Choose a plan* - click on **CPU-Optimized** and select the `4 GB/2 CPUs` (note - these are the minimum suggested server specs to run Red5 Pro; *if you need to, you can create a larger instance type from a smaller instance image, but not the reverse*), with the default `1x SSD`
4. Skip *Add block storage*
5. *Choose a datacenter region* - select the region which is closest to your target user base. Some regions have multiple options (e.g. New York 1 or 3). Make a note of the region selected.
6. *VPC Network* - as of this document, Red5 Pro autoscaling does not support targeting by Digital Ocean VPC, so you must leave this as the default VPC.
7. *Authentication* - select **SSH keys** and add a check next to the ssh key that you added in the previous step.
8. *Finalize and create* - choose the default `1 droplet` and modify the name to identify the droplet (note: this hostname is only a label, it is not a DNS name)
9. If you have multiple projects, select the one you want to use for this environment, and click on **Create Droplet**

## Optimize Droplet

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

## Create Disk Snapshot

1. Type `exit` to log out of the droplet. From the Digital Ocean dashboard, click on the droplet you just created, and change the state from **ON** to **OFF** by toggling the switch in the top right (confirm when prompted).
2. To the left of the screen, in the column under the ipv4 of the droplet, click on **Snapshots**
3. Enter snapshot name - you can use the default, or modify to make a more descriptive name for example `ubuntu-20-optimized-with-monitoring-c2`, then click on Take Snapshot. **Note**: the snapshot will only be created in the datacenter region where your droplet was created. If you want to use the same image in a different region, then from the *Droplet snapshots* list, click on the *More* drop-down and select "add to region".


