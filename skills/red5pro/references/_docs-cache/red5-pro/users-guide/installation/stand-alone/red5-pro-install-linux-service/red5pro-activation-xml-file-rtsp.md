_From: Defining Red5 Pro as a Service on Linux_

### red5pro-activation.xml file: RTSP

Modify the `configuration` bean if you wish to modify any of the default ports for RSTP, WebSockets for HLS, or Second Screen:

```xml
<bean name="configuration" id="configuration" class="com.red5pro.activation.Red5ProConfiguration">
<property name="rtsp" value="true"/>
<property name="rtspPort" value="8554"/>
```

---

# Legacy - Stop/Start Red5 Pro Service Via /etc/init.d

While init.d is being phased out of Linux distributions, launching Red5 Pro using `/etc/init.d/red5pro` is still an option on some systems. The one advantage to using this method is that you can view the console output when launching this way.

>NOTE: If you want Red5 Pro service defined in both the `init.d` and `systemd`, you will need to choose a different name for one of them.

To begin, create a _red5pro_ file in __init.d__:

`sudo touch /etc/init.d/red5pro`

You can copy and paste the following into the _red5pro_ file using your editor of choice:

```sh
#!/bin/sh
### BEGIN INIT INFO
# chkconfig: 2345 85 85
# description: Red5 Pro streaming server
# Provides:          Red5 Pro
# Required-Start:    $local_fs $network
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Red5Pro
# processname: red5
### END INIT INFO

PROG=red5
RED5_HOME=/usr/local/red5pro
DAEMON=$RED5_HOME/$PROG.sh
PIDFILE=/var/run/$PROG.pid

start() {
  # check to see if the server is already running
  if netstat -an | grep ':5080'; then
    echo "Red5 is already started..."
    while netstat -an | grep ':5080'; do
      # wait 5 seconds and test again
      sleep 5
    done
  fi
  cd ${RED5_HOME} && ./red5.sh &
}

stop() {
  cd ${RED5_HOME} && ./red5-shutdown.sh
}

case "$1" in
  start)
    start
    exit 1
  ;;
  stop)
    stop
    exit 1
  ;;
  restart)
    stop
    start
    exit 1
  ;;
  **)
    echo "Usage: $0 {start|stop|restart}" 1>&2
    exit 1
  ;;

esac
```

Make the file executable:

`sudo chmod 777 /etc/init.d/red5pro`

<u>**Configure Red5 Pro to Automatically Start on Boot/Reboot**</u>

Run the following commands to configure the Red5 Pro init.d service to start on server startup (**IMPORTANT**: do NOT run these if you have already set up `systemd` to start red5pro on restart of server):

```sh
sudo /usr/sbin/update-rc.d red5pro defaults
sudo /usr/sbin/update-rc.d red5pro enable
```

For CentOS:

```sh
sudo systemctl daemon-reload
sudo systemctl enable red5pro.service
```

<u>**Starting / Stopping**</u>

The Red5 Pro Server can now be started by issuing:

`sudo /etc/init.d/red5pro start`

To stop the Red5 Pro Server from running (note, it takes approximately 30 seconds for the server to fully shut down):

`sudo /etc/init.d/red5pro stop`

Additionally, you can restart the Red5 Pro Server by issuing:

`sudo /etc/init.d/red5pro restart`

# Troubleshooting

1. Some hosting facilities' virtual servers may not be able to transmit their public/private IP addresses to Red5 Pro server. This information is necessary for the [ICE negotiation in WebRTC](https://www.avaya.com/blogs/archives/2014/08/understanding-webrtc-media-connections-ice-stun-and-turn.html). In some cases you may need to give the Red5 Pro server a little help by "forcing" these IP assignments. To do so, modify the `{red5pro}/conf/network.properties` file. Uncomment the following lines and modify them with your server's public and private IP addresses.

```xml
# Forcing a public IP address
force.public.ip=server-public-ip-address

# Forcing a private IP address
force.local.ip=erver-private-ip-address
```

If you are still having ICE failures, you may also need to enable port availability checking by uncommenting:

```xml
# Configure port availability checking
check.port.availability=true
```
