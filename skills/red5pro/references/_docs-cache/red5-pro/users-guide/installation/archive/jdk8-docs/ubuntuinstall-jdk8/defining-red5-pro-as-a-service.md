_From: Linux Install - JDK 8_

## Defining Red5 Pro as a Service

To allow for ease of startup/shutdown of Red5 Pro, in addition to automatically starting the service on server reboot, you will want to add a `systemd` unit file for Red5 Pro. The [Apache jsvc](https://commons.apache.org/proper/commons-daemon/jsvc.html) application is required to run Red5 Pro as a service on Linux.

>**IMPORTANT**: If you had previously defined the `/etc/init.d/red5pro` service, you will need to remove that before configuring the `systemd` service.  Run: `sudo systemctl disable red5pro.service`.

On Ubuntu or Debian run:

`$ sudo apt-get install -y jsvc`

On CentOS/Fedora/Redhat:

`$ sudo yum -y install jsvc`

Next, create a _red5pro.service_ file in the __/lib/systemd/system__ directory:

`$ sudo touch /lib/systemd/system/red5pro.service`

You can copy and paste the following into the _red5pro.service_ file using your editor of choice.
>Note that in our script, `RED5_HOME` is set to the system path mentioned above (`/usr/local/red5pro`), and that `JAVA_HOME` is set to the path that the above java installation results in (`/usr/lib/jvm/java-8-openjdk-amd64`) for Ubuntu. If you are running on Centos, the path is `/usr/lib/jvm/jre-1.8.0-openjdk`. You may need to change these variables if your installation varies.
>NOTE 2: You should increase the memory allocation by editing the line `-Xms2g -Xmx2g -Xverify:none` and making each value equal to 1 to 2G less than your total system memory.

**IMPORTANT:** This file has been modified with the 5.6.0 server release (the line `-cp ${RED5_HOME}/commons-daemon-`1.1.0.jar`:${RED5_HOME}/red5-service.jar:${RED5_HOME}/conf \` has been modified from `-cp ${RED5_HOME}/commons-daemon-`1.0.15.jar`:${RED5_HOME}/red5-service.jar:${RED5_HOME}/conf \` in previous releases)

```sh
[Unit]
Description=Red5 Pro
After=syslog.target network.target

[Service]
Type=forking
Environment=PID=/var/run/red5pro.pid
Environment=JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
LimitNOFILE=65536
# for Centos:
# Environment=JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
Environment=RED5_HOME=/usr/local/red5pro
WorkingDirectory=/usr/local/red5pro
ExecStart=/usr/bin/jsvc -debug \\
    -home ${JAVA_HOME} \\
    -cwd ${RED5_HOME} \\
    -cp ${RED5_HOME}/commons-daemon-1.1.0.jar:${RED5_HOME}/red5-service.jar:${RED5_HOME}/conf \\
    -Dred5.root=${RED5_HOME} \\
    -Djava.library.path=${RED5_HOME}/lib/amd64-Linux-gpp/jni \\
    -Djava.security.debug=failure -Djava.security.egd=file:/dev/./urandom \\
    -Dcatalina.home=${RED5_HOME} -Dcatalina.useNaming=true \\
    -Dorg.terracotta.quartz.skipUpdateCheck=true \\
    -Xms2g -Xmx2g -Xverify:none \\
    -XX:+TieredCompilation -XX:+UseBiasedLocking \\
    -XX:MaxMetaspaceSize=128m -XX:+UseParNewGC -XX:+UseConcMarkSweepGC \\
    -XX:InitialCodeCacheSize=8m -XX:ReservedCodeCacheSize=32m \\
    -XX:CMSInitiatingOccupancyFraction=60 \\
    -outfile /dev/null -errfile /dev/null \\
    -wait 60 \\
    -umask 011 \\
    -pidfile ${PID} org.red5.daemon.EngineLauncher 9999

ExecStop=/usr/bin/jsvc -stop -pidfile ${PID} org.red5.daemon.EngineLauncher 9999

[Install]
WantedBy=multi-user.target
```

>**NOTE**: For debugging, change the line `-outfile /dev/null -errfile /dev/null \` to be `-outfile ${RED5_HOME}/log/jsvc-service.log -errfile ${RED5_HOME}/log/jsvc-error.log \`. This will generate two additional logiles under the `red5pro/log` directory: `{red5pro}/log/jsvc-service.log` and `{red5pro}/log/jsvc-error.log`. Also **note** that these files are not affected by the rolling logfile appender, so they can get quite large, which is why it is recommended not to enable these in a production environment.

Make the file read/write for root and read-only for everyone else:

```sh
sudo chmod 644 /lib/systemd/system/red5pro.service
```

Reload the daemon:

`sudo systemctl daemon-reload`

Enable Red5 Pro Service:

`sudo systemctl enable red5pro.service`
