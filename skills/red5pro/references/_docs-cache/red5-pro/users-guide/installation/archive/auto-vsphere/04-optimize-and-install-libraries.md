---
title: Optimization and Prerequisite Libraries
description: ""
menu_order: 5
---

## VM Updates and Optimizations


Once the VM is available, ssh in. Type `sudo apt-get update` to update the system.

Follow [the Linux file system optimization guide](/docs/red5-pro/users-guide/optimization/red5-pro-server-optimization/), as detailed below:

* modify `/etc/sysctl.conf`, adding the following lines to the bottom: 

```conf
fs.file-max = 1000000
kernel.pid_max = 999999
kernel.threads-max = 999999
vm.max_map_count = 1999999
```

* modify `/etc/security/limits.conf`, adding the following lines to the bottom (if your process is running as a different user than root, then you will want to add the same for that user, for example, `ubuntu`)

```conf
root soft nofile 1000000
root hard nofile 1000000
ubuntu soft nofile 1000000
ubuntu hard nofile 1000000
```

* modify `/etc/pam.d/common-session`, adding the following to the bottom

```conf
session required pam_limits.so
```

* then run `ulimit -n 1000000`
* And finally, `sudo sysctl -p`, which will reload the user sessions with your updated settings

## Install Required Libraries

Refer to the [Software Dependencies - Ubuntu instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/#software-dependencies---ubuntu) for the Red5 Pro server requirements for the Stream Manager. Terraform only requires java, which is included in the above.
