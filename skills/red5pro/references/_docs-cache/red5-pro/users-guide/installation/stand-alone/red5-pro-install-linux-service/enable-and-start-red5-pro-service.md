_From: Defining Red5 Pro as a Service on Linux_

### Enable and Start Red5 Pro Service
Make the file read/write for root and read-only for everyone else:

```shell
sudo chmod 644 /lib/systemd/system/red5pro.service
```

Reload the daemon:

`sudo systemctl daemon-reload`

Enable Red5 Pro Service:

`sudo systemctl enable red5pro.service`

## Starting / Stopping

The Red5 Pro Server can now be started by issuing:

`$ sudo systemctl start red5pro`

To stop Red5 Pro:

`$ sudo systemctl stop red5pro`

To restart Red5 Pro:

`$ sudo systemctl restart red5pro`


>**Note**: There will be no console logging if you start Red5 Pro this way. Red5 Pro server logging will be written to the `/log/red5.log` file. Consequently, you may want to create a `startred5pro.sh` script as per the following (make the file executable by typing `chmod +x startred5pro.sh`:

```shell
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
