_From: Defining Red5 Pro as a Service on Linux_

### Copy the Service File
Next, copy the `red5pro.service` file from the root of your Red5 Pro Server distribution `sudo cp /usr/local/red5pro/red5pro.service /lib/systemd/system/`


> Note : In our script, `RED5_HOME` is set to the system path mentioned above (`/usr/local/red5pro`), and that `JAVA_HOME` is set to the path that the above java installation results in (`/usr/lib/jvm/java-21-openjdk-amd64`) for Ubuntu. If you are running on CentOS, the path is `/usr/lib/jvm/jre-21`. You may need to change these variables if your installation varies.<br/>

The following `red5pro.service` file can be found in the root directory of the Red5 Pro Server distribution:

```shell
[Unit]
Description=Red5 Pro
Wants=network-online.target
After=network.target network-online.target

[Service]
Type=forking
User=root
LimitNOFILE=1000000
Environment=JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
# NOTE: minus sign allows the command to fail so we dont stop the flow
ExecStartPre=-/usr/bin/killall -q CefRenderer
# For CentOS:
# Environment=JAVA_HOME=/usr/lib/jvm/jre-21
Environment=RED5_HOME=/usr/local/red5pro
# Env exports are not resolved here, have to use full path

WorkingDirectory=/usr/local/red5pro
# Env exports are not resolved here, have to use full path
ExecStart = /usr/local/red5pro/red5pro.sh start
ExecStop = /usr/local/red5pro/red5pro.sh stop
ExecReload = /usr/local/red5pro/red5pro.sh restart

[Install]
WantedBy=multi-user.target
```

>**NOTE**: For debugging, change the line `-outfile /dev/null -errfile /dev/null \\` to be `-outfile ${RED5_HOME}/log/jsvc-service.log -errfile ${RED5_HOME}/log/jsvc-error.log \\`. This will generate two additional logfiles under the `red5pro/log` directory: `{red5pro}/log/jsvc-service.log` and `{red5pro}/log/jsvc-error.log`. Also, **note** that these files are not affected by the rolling log file appender, so they can get quite large, which is why it is recommended not to enable these in a production environment.
