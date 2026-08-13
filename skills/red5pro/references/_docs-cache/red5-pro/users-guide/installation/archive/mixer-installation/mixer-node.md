---
title: Autoscale Mixer Node Configuration
description: ""
menu_order: 4
---

1 - [Download](https://account.red5.net/login) the Red5 Pro Mixer artifacts. These artifacts includes the required libraries and `mixer` webapp, and can **not** be used for other node types.

2 - [Install Red5 Pro server](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/).

3 - Configure Autoscaling on the Mixer node instance. [Example configuration for AWS node deployment](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/prepare-red5-pro-ami-for-nodes/#configure-autoscaling-on-the-instance).

4 - Install the following CEF Mixer dependencies on the instance (*note: you may need to run the following commands as sudo*):

```shell
sudo apt-get update
sudo apt-get install -y build-essential autoconf automake \\
gdb git libffi-dev zlib1g-dev libssl-dev pkg-config \\
cmake maven libgtk2.0-dev libgtkglext1-dev \\
libgtkglext1 python-dev python-numpy libtbb2 libtbb-dev \\
libjpeg-dev libpng-dev libtiff-dev libdc1394-22-dev \\
libxkbcommon-dev libxkbcommon-x11-0 libgbm-dev
sudo apt-get install libatk-bridge2.0-0
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install gcc-4.9
sudo apt-get upgrade libstdc++6
```

5 - Unzip `red5pro-mixer-server-{version}.zip`, copy mixer artifacts for `red5pro` server and move `CefRenderer` to the `/usr/local/` directory of your mixer node.

```shell
unzip red5pro-mixer-server-{version}-release.zip
cd red5pro-mixer-server-{version}-release
sudo cp -R red5pro/* /usr/local/red5pro/
sudo mv CefRenderer /usr/local/CefRenderer
```

6 - Configure the password/digest for the Mixer (this **must** match the stream manager access token)

Edit the `/usr/local/red5pro/webapps/mixer/WEB-INF/red5-web.xml` file, setting the `web.handler` password value to that of the Stream Manager Access Token. 

```xml
<bean id="web.handler" class="com.red5pro.cef.Application">
	<property name="password" value="sm-access-token" />        
</bean>
```

7 - Restart the Red5 Pro service:

```sh
sudo systemctl restart red5pro.service
```

8 - Verify the mixer is running by opening the page: `http://server-ip:5080/mixer/controller.html`. If testing compositions with this page, make sure the digest/password is set to the stream manager access token. Example: `sm-access-token` 

9 - Create image from this Mixer node instance. Name of this image will be used in Launch config for node group creation with Mixer nodes (API calls to Stream Manager)
