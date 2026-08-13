_From: Defining Red5 Pro as a Service on Linux_

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

Open a web browser and navigate to `http://<host>:5080` (like `http://127.0.0.1:5080`)

# Rolling Log Files

There are a number of options for rolling logs, utilizing the Logback [RollingFileAppender](https://logback.qos.ch/manual/appenders.html#RollingFileAppender). To implement logging rollover, add the options that you want in your `{red5pro}/conf/logback.xml` files after the `<appender class="ch.qos.logback.core.FileAppender" name="FILE">` section. Displayed below are two of the rolling styles available:
