---
title: Prepare Red5 Pro Node VM
description: ""
menu_order: 9
---

Connect to vSphere using a Web browser or vSphere client, and create a new Ubuntu 20.04 VM to use as your node image.

## VM Updates and Optimizations

1. Once the VM is available, ssh in.
2. Type `sudo apt-get update` to update the system
3. Follow [the Linux file system optimization guide](/docs/red5-pro/users-guide/optimization/red5-pro-server-optimization/), as detailed below:

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


## Install Red5 Pro on the Instance

* Connect to your instance over ssh as the ubuntu account.
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [Red5 Pro](https://account.red5.net/login).

#  Configure Autoscaling on the Instance

Navigate to the location where you extracted the red5pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

* Change the active value from “false” to “*true*”
* Replace `http://0.0.0.0:5080` with `https://your-streammanager-url`
* Save and close the file

example:

```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="true"/>

        <!--Stream manager hosted uri. use the host of your stream manager.  -->
                <property name="cloudWatchHost" value="https://red5autoscale.red5pro.com/streammanager/cloudwatch"/>
```

## Set a Unique Cluster Password

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to sometime unique. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

## Remove Unnecessary Webapps and Plugins

To ensure a faster startup time for your server, we suggest deleting any web apps that you will not be using from the `{red5prohome}/webapps` directory (for example: `bandwidthdetection, template, streammanager`).

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) that you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming

## Verifying Red5 Pro on Instance

Start the Red5 Pro service

`systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.
