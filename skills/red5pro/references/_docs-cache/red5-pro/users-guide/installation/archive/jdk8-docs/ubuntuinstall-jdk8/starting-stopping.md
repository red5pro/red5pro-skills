_From: Linux Install - JDK 8_

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

**Also note** that this will result in two red5pro PIDs. There will also be two log files created in `/usr/local/red5pro/log`: `jsvc-error.log` and `jsvc-service.log`. If there are any issues with the service, these logs will be helpful in debugging.

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
   Active: active (running) since Tue 2017-05-09 19:49:15 UTC; 27s ago
  Process: 6952 ExecStop=/usr/bin/jsvc -stop -pidfile ${PID} org.red5.daemon.EngineLauncher 9999 (code=exited, status=0/SUCCESS)
  Process: 6974 ExecStart=/usr/bin/jsvc -debug -home ${JAVA_HOME} -cwd ${RED5_HOME} -cp ${RED5_HOME}/commons-daemon-1.0.15.jar:${RED5_HOME}/red5-service.jar:${RED5_HOME}/conf -Dred5.root=${R
 Main PID: 6976 (jsvc)
    Tasks: 94
   Memory: 375.5M
      CPU: 10.911s
   CGroup: /system.slice/red5pro.service
           ├─6976 jsvc.exec -debug -home /usr/lib/jvm/java-8-openjdk-amd64 -cwd /usr/local/red5pro -cp /usr/local/red5pro/commons-daemon-1.0.15.jar:/usr/local/red5pro/red5-service.jar:/usr/l
           └─6977 jsvc.exec -debug -home /usr/lib/jvm/java-8-openjdk-amd64 -cwd /usr/local/red5pro -cp /usr/local/red5pro/commons-daemon-1.0.15.jar:/usr/local/red5pro/red5-service.jar:/usr/l

May 09 19:49:01 ip-172-31-19-47 jsvc[6974]: get_pidf: 5 in /var/run/red5pro.pid
May 09 19:49:01 ip-172-31-19-47 jsvc[6974]: get_pidf: pid 6977
May 09 19:49:01 ip-172-31-19-47 jsvc[6974]: check_tmp_file: /tmp/6977.jsvc_up
May 09 19:49:08 ip-172-31-19-47 jsvc[6974]: get_pidf: 5 in /var/run/red5pro.pid
May 09 19:49:08 ip-172-31-19-47 jsvc[6974]: get_pidf: pid 6977
May 09 19:49:08 ip-172-31-19-47 jsvc[6974]: check_tmp_file: /tmp/6977.jsvc_up
May 09 19:49:15 ip-172-31-19-47 jsvc[6974]: get_pidf: 5 in /var/run/red5pro.pid
May 09 19:49:15 ip-172-31-19-47 jsvc[6974]: get_pidf: pid 6977
May 09 19:49:15 ip-172-31-19-47 jsvc[6974]: check_tmp_file: /tmp/6977.jsvc_up
May 09 19:49:15 ip-172-31-19-47 systemd[1]: Started Red5 Pro.
```
