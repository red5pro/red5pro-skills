---
title: Defining Red5 Pro as a Service on Linux
description: For Server Version >= 9.0.0, with JDK 11 Support
---

To allow for ease of startup/shutdown of Red5 Pro, in addition to automatically starting the service on server reboot, you will want to add a `systemd` unit file for Red5 Pro. The [Apache jsvc](https://commons.apache.org/proper/commons-daemon/jsvc.html) application is required to run Red5 Pro as a service on Linux.

>**IMPORTANT**: If you had previously defined the `/etc/init.d/red5pro` service, you will need to remove that before configuring the `systemd` service.  Run: `sudo systemctl disable red5pro.service`.

On Ubuntu or Debian run:

`$ sudo apt-get install -y jsvc`

On CentOS/Fedora/Redhat:

`$ sudo yum -y install jsvc`

Next, copy the `red5pro.service` file from the root of your Red5 Pro Server distribution `sudo cp /usr/local/red5pro/red5pro.service /lib/systemd/system/`


>Note that in our script, `RED5_HOME` is set to the system path mentioned above (`/usr/local/red5pro`), and that `JAVA_HOME` is set to the path that the above java installation results in (`/usr/lib/jvm/java-11-openjdk-amd64`) for Ubuntu. <!--If you are running on Centos, the path is `/usr/lib/jvm/jre-1.8.0-openjdk`.--> You may need to change these variables if your installation varies.
>NOTE 2: You should increase the memory allocation by editing the line `-Xms2g -Xmx2g -Xverify:none` and making each value equal to approximately 80% of your total system memory.

The following `red5pro.service` file can be found in the root directory of the Red5 Pro Server distribution:

```sh
[Unit]
Description=Red5 Pro
Wants=network-online.target
After=network.target network-online.target

[Service]
Type=forking
User=root
LimitNOFILE=1000000
Environment=JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
WorkingDirectory=/usr/local/red5pro
# Env exports are not resolved here, have to use full path
ExecStart = /usr/local/red5pro/red5pro.sh start
ExecStop = /usr/local/red5pro/red5pro.sh stop
ExecReload = /usr/local/red5pro/red5pro.sh restart

[Install]
WantedBy=multi-user.target
```

>**NOTE**: This service configuration utilizes the `red5pro.sh` script located at `/usr/local/red5pro` for managing the Red5 Pro server. The script handles the `start`, `stop`, and `restart` operations. Also, you can manually set JVM memory parameters in the `red5pro.sh` script. Adjust these settings directly in the script as needed.

Make the file read/write for root and read-only for everyone else:

```sh
sudo chmod 644 /lib/systemd/system/red5pro.service
```

Reload the daemon:

`sudo systemctl daemon-reload`

Enable Red5 Pro Service:

`sudo systemctl enable red5pro.service`

## Starting / Stopping

The Red5 Pro Server can now be started by issuing:

`$ sudo systemctl start red5pro`

>**Note**: There will be no console logging if you start Red5 Pro this way. Red5 Pro server logging will be written to the `/log/red5.log` file. Consequently, you may want to create a `startred5pro.sh` script as per the following (make the file executable by typing `chmod +x startred5pro.sh`:

```sh
#!/bin/bash
sudo systemctl start red5pro
tail -f /usr/local/red5pro/log/red5.log
```

>The Red5 Pro process will be running under `jsvc`

```sh
PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
9664 root      20   0 4724212 419736  19728 S  10.0 11.6   0:35.54 jsvc
```

**Also note** that this will result in two red5pro PIDs.

To stop the Red5 Pro Server from running (note, it can take up to 30 seconds for the server to fully shut down):

`sudo systemctl stop red5pro`

Additionally, you can restart the Red5 Pro Server by issuing:

`sudo systemctl restart red5pro`

### Service Removal

To disable and remove the service, execute the following two steps in a terminal:

```sh
sudo systemctl disable red5pro.service
sudo rm /lib/systemd/system/red5pro.service
```

### Checking Service Status

To check the status of the Red5 Pro service, issue this command:

`sudo systemctl status red5pro`

The result should appear similar to this:

```sh
● red5pro.service - Red5 Pro
     Loaded: loaded (/lib/systemd/system/red5pro.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2021-06-22 15:18:30 UTC; 47min ago
    Process: 7733 ExecStart=/usr/bin/sudo ${RED5_HOME}/jsvc -home ${JAVA_HOME} -cwd ${RED5_HOME} -cp ${RED5_HOME}/commons-daemon-1.2.4.jar:${RED5_HOME}/red5-service.ja>
   Main PID: 7748 (jsvc)
      Tasks: 81 (limit: 4682)
     Memory: 2.2G
     CGroup: /system.slice/red5pro.service
             ├─7748 jsvc.exec -home /usr/lib/jvm/java-11-openjdk-amd64 -cwd /usr/local/red5pro -cp /usr/local/red5pro/commons-daemon-1.2.4.jar:/usr/local/red5pro/red5->
             └─7750 jsvc.exec -home /usr/lib/jvm/java-11-openjdk-amd64 -cwd /usr/local/red5pro -cp /usr/local/red5pro/commons-daemon-1.2.4.jar:/usr/local/red5pro/red5->

Jun 22 15:18:22 ubuntu20-host systemd[1]: Starting Red5 Pro...
Jun 22 15:18:22 ubuntu20-host sudo[7733]:     root : TTY=unknown ; PWD=/usr/local/red5pro ; USER=root ; COMMAND=/usr/local/red5pro/jsvc -home /usr/lib/j>
Jun 22 15:18:22 ubuntu20-host sudo[7733]: pam_unix(sudo:session): session opened for user root by (uid=0)
Jun 22 15:18:22 ubuntu20-host sudo[7748]: NOTICE: jsvc umask of 011 allows write permission to group and/or other
Jun 22 15:18:30 ubuntu20-host sudo[7733]: pam_unix(sudo:session): session closed for user root
Jun 22 15:18:30 ubuntu20-host systemd[1]: Started Red5 Pro.
```

## Verifying Red5 Pro is Running

Once you have started the Red5 Pro Server, you can verify that it is running and available by visiting your instance at port __5080__.

Open a web browser and navigate to `http://__your server ip__:5080` (like `http://127.0.0.0:5080`)

# Rolling Log Files

There are a number of options for rolling logs, utilizing the Logback [RollingFileAppender](https://logback.qos.ch/manual/appenders.html#RollingFileAppender). To implement logging rollover, add the options that you want in your `{red5pro}\conf\logback.xml` files after the `<appender class="ch.qos.logback.core.FileAppender" name="FILE">` section. Displayed below are two of the rolling styles available:

### Change FileAppender output filename

The rolling logfile needs to use a different output than the default, so you should change the default (**note:** this will result in an empty placeholder `red5_blank.log` file).

change from

```xml
  <appender class="ch.qos.logback.core.FileAppender" name="FILE">
    <file>log/red5.log</file>
    <append>true</append>
    <encoder>
      <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>
```

to:

```xml
  <appender class="ch.qos.logback.core.FileAppender" name="FILE">
    <file>log/red5_blank.log</file>
    <append>true</append>
    <encoder>
      <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>
```

### Size-based rolling policy

As configured below, the log will roll-over at or just over 200 Mb with a maximum log file count of 20.

```xml
<appender class="ch.qos.logback.core.rolling.RollingFileAppender" name="ROLLING_LOG">
    <File>log/red5.log</File>
    <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
        <fileNamePattern>log/red5.%i.log</fileNamePattern>
        <minIndex>1</minIndex>
        <maxIndex>20</maxIndex>
    </rollingPolicy>
    <triggeringPolicy
        class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
        <maxFileSize>200MB</maxFileSize>
    </triggeringPolicy>
    <encoder>
        <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
</appender>
```

### Time-based rolling policy

As configured below, the log will roll-over daily for a maximum of 30 days.

```xml
<appender class="ch.qos.logback.core.rolling.RollingFileAppender" name="ROLLING_LOG">
    <File>log/red5.log</File>
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>log/red5.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
    <encoder>
        <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
</appender>
```

### Modify root level Definition

change from

```xml
<root level="INFO">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="FILE"/>
  </root>
```

to:

```xml
<root level="INFO">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="ROLLING_LOG"/>
  </root>
```

## How to modify default ports

Some firewalls or even service providers may block some of the Red5 Pro default ports, so you may want to modify those. There are two files that allow you to define the ports that Red5 Pro uses: `{red5pro}/conf/red5.properties`, and `{red5pro}/conf/red5pro-activation.xml`

### red5.properties file : RTMP, HTTP

To modify the default RTMP port, edit `{red5pro}/conf/red5.properties` RTMP section:

```properties
# RTMP
rtmp.host=0.0.0.0
rtmp.port=1935
```

To modify the default HTTP (or HTTPS) port, edit the HTTP section:

```properties
# HTTP
http.host=0.0.0.0
http.port=5080
https.port=5443
```

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

1. Some hosting facilities' virtual servers may not be able to transmit their public/private IP addresses to Red5 Pro server. This information is necessary for the [ICE negotiation in WebRTC](https://www.avaya.com/blogs/archives/2014/08/understanding-webrtc-media-connections-ice-stun-and-turn.html). In some cases you may need to give the Red5 Pro server a little help by "forcing" these IP assignments. To do so, modify the `{red5pro}/conf/webrtc-plugin.properties` file. Uncomment the following lines and modify with your server's public and private IP addresses.

```xml
# Forcing a public IP address
force.public.ip=server-public-ip-address

# Forcing a private IP address
force.local.ip=erver-private-ip-address
```

If you are still having ICE failures, you may also need to enabled port availability checking by uncommenting:

```xml
# Configure port availability checking
check.port.availability=true
```
