---
title: Server Optimization
description: Optimizing Red5 Pro Server
menu_order: 2
---

> The following document assumes that you are running Red5 Pro on a Debian/Ubuntu instance.

# Memory allocation

In general, it is recommended to allocate 80% (rounded down) of your total memory [to the JVM process](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/#modify-maximum-java-heap-size-for-red5-pro-java-process). However, if you are running any processes other than Red5 Pro on your server, then you will need to allow for their memory consumption as well. On a Linux system, before starting the Red5 Pro service, run `cat /proc/meminfo` to see the `MemTotal`, `MemFree`, and `MemAvailable`, and base your memory allocation on the **MemFree** value.

For example, a VM with 4GB memory may display:

```shell
MemTotal:        4026028 kB
MemFree:         2541440 kB
MemAvailable:    3015708 kB
```

And, based on the **MemFree** value of 2541440 kB, it should be safe to allocate 2G to JVM.

# Linux File System Optimizations

* **IMPORTANT** You will first want to run `cat /proc/sys/fs/file-max` to make sure that the file-max can support the value we are setting below. If it can't, then adjust accordingly
* Run `ulimit -n` to check the open file limits (default is `1024` - we want to increase this).

To maximize the open file settings, you will need to modify the following files:

* `/etc/sysctl.conf` - add the following lines:

```sh
fs.file-max = 1000000
kernel.pid_max = 999999
kernel.threads-max = 999999
vm.max_map_count = 1999999
```

* `/etc/security/limits.conf` - add the following four lines. If your process is running as a different user than `root`, you will want to add the same lines for that user, for example:

```sh
root soft nofile 1000000
root hard nofile 1000000
ubuntu soft nofile 1000000
ubuntu hard nofile 1000000
```

* `/etc/pam.d/common-session` - add the following line: `session required pam_limits.so`

Then run:

```sh
ulimit -n 1000000
```

And finally `sysctl -p` will reload the user sessions with your updated settings.

# Red5 Pro Optimizations

## jee-container.xml and red5.properties - tomcat settings

*Modifying these settings is especially useful on a Stream Manager, which processes a lot of HTTP requests.*

Modify the following values in `red5pro/conf/red5.properties`:

* `http.max_threads=20` -  The maximum number of request processing threads to be created by this Connector, which therefore determines the maximum number of simultaneous requests that can be handled. If not specified, this attribute is set to 200. If an executor is associated with this connector, this attribute is ignored as the connector will execute tasks using the executor rather than an internal thread pool. Note that if an executor is configured, any value set for this attribute will be recorded correctly but it will be reported (e.g. via JMX) as -1 to make clear that it is not used.
* `http.acceptor_thread_count=10` - The number of threads to be used to accept connections. Increase this value on a multi-CPU machine, although you should never really need more than 2. Also, with a lot of non keep-alive connections, you might want to increase this value as well.
* `http.processor_cache=20` - The protocol handler caches Processor objects to speed up performance. This setting dictates how many of these objects get cached. -1 means unlimited, default is 200. If not using Servlet 3.0 asynchronous processing, a good default is to use the same as the maxThreads setting. If using Servlet 3.0 asynchronous processing, a good default is to use the larger of maxThreads and the maximum number of expected concurrent requests (synchronous and asynchronous).

Modify the `<map>` section of the `red5pro/conf/jee-container.xml`, adding the following:

```sh
 <map>
            <entry key="port" value="${http.port}" />
            <entry key="redirectPort" value="${https.port}" />
            <entry key="maxHttpHeaderSize" value="${http.max_headers_size}"/>
            <entry key="maxKeepAliveRequests" value="${http.max_keep_alive_requests}"/>
            <entry key="keepAliveTimout" value="-1"/>
            <entry key="useExecutor" value="true"/>
            <!-- Maximum number of request processing threads to be created by this Connector -->
            <entry key="maxThreads" value="${http.max_threads}"/>
            <!-- Backlog of connections waiting to be accepted -->
            <entry key="acceptCount" value="1000"/>
            <!-- Number of threads to be used to accept connections -->
            <entry key="acceptorThreadCount" value="${http.acceptor_thread_count}"/>
            <!-- Protocol handler caches Processor objects to speed up performance -->
            <entry key="processorCache" value="${http.processor_cache}"/>
            <!-- Connection timeout alloting 20s for an accepted connection to present its request -->
            <entry key="connectionTimeout" value="20000"/>
            <!-- Negative one prevents connections from being counted -->
            <entry key="maxConnections" value="-1"/>
        </map>
```

## Removing unnecessary plugins and webapps

Removing unnecessary plugins and web apps will always improve performance. The only web apps (in `red5pro/webapps` that are critical for normal Red5Pro operations are `live` and `root` (unless the instance is a Stream Manager, in which case `streammanager` is required). The `webrtcexamples` web app contains the [streaming html5 examples](https://github.com/red5pro/streaming-html5), and is useful for testing.

The following plugins can be removed (from `red5pro/plugins`) if you are not using them in your solution:

* `red5pro-mpegts-plugin-*.jar` - necessary for HLS streaming and recording
* `red5pro-restreamer-plugin-*.jar` - necessary for mpegts restreaming
* `red5pro-webrtc-plugin-*.jar` - necessary for WebRTC publishing and subscribing
* `red5pro-autoscale-plugin-*.jar` - necessary for Red5 Pro Autoscaling nodes
* `red5pro-whip-plugin-*.jar` - necessary for Red5 Pro WHIP and WHEP

Note: if you remove the `inspector` web app, you must also remove the `inspector.jar` from the `red5pro/plugins` directory

## Increase Red5 Pro Service Open Files Setting

In the base configuration, the jsvc service open file limit is set to `65535`. If you are increasing your open file limits, you should do the same for the Red5 Pro service (`/lib/systemd/system/red5pro.service`). Modify the

```sh
LimitNOFILE=
```

definition, from `LimitNOFILE=65536` to `LimitNOFILE=1000000`, for example. **Note**: you will need to run `sudo systemctl daemon-reload` after you make any changes to the service file.
