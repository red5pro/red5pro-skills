_From: Linux Install - JDK 8_

## Add execute permissions to the following files

* red5.sh
* red5-shutdown.sh
* red5-debug.sh

`sudo chmod +x *.sh` will do the job.

# Modify Maximum Java Heap Size For Red5 Pro Java Process

You can modify the maximum Java heap size by modifying `red5.sh`. Increasing the maximum heap size will allow the server to assign as much memory from what is available to Red5 Pro when necessary.

The default maximum heap size is 2 gigabytes (`-Xmx2g`).

```sh
# JAVA options
# You can set JVM additional options here if you want
if [ -z "$JVM_OPTS" ]; then
    JVM_OPTS="-Xms256m -Xmx2g -Xverify:none -Djava.net.preferIPv4Stack=true -XX:+TieredCompilation -XX:+UseBiasedLocking -XX:InitialCodeCacheSize=8m -XX:ReservedCodeCacheSize=32m -Dorg.terracotta.quartz.skipUpdateCheck=true -XX:MaxMetaspaceSize=128m -XX:+UseParNewGC -XX:+UseConcMarkSweepGC"
fi
```

> If you want to launch Red5 Pro manually, you can do so now by running `sudo ./red5.sh`. Note that the process will stop when you close your terminal session. If you want to keep it running, then run `sudo ./red5.sh &`. To ensure that Red5 Pro starts if your instance reboots, set it up as a service.
