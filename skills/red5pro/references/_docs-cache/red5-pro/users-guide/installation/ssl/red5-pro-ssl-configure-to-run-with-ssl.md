---
title: Configure Red5 Pro to run with SSL
description: ""
menu_order: 10
---

This configuration of [Red5 Pro](https://red5pro.net) will make the assumption that you want to handle __HTTPS__ on the standard port of `443`; by default the Red5 server is configured to use `5080` and `5443` for __HTTP__ and __HTTPS__.

The port configuration used in the examples are not the only available option and any open ports may be used, but using standard port prevents the need to specify alternatives when making __HTTPS__ connections.

## Red5 Server Properties

The `red5.properties` file is located in the conf directory where you installed Red5 Pro.

### Define the HTTP and HTTPS ports

1. Open the file and change the `https.port` as shown below (note: you can modify the default http port if you wish, but we recommend leaving it as the default `5080`, as there is generally no reason to access Red5 Pro via HTTP:

    _Original_:

    ```aconf
    http.port=5080
    https.port=5443
    ```

    _Modified:_

    ```aconf
    http.port=5080
    https.port=443
    ```

### Modify location and password for your keystore and truststore files

1. Scroll down and locate the `rtmps.keystorepass` property. Modify the following four properties as shown to match your selected password and paths to your `keystore.jks` and `truststore.jks` files:

_Original:_

```aconf
rtmps.keystorepass=password
rtmps.keystorefile=conf/keystore.jks
rtmps.truststorepass=password
rtmps.truststorefile=conf/truststore.jks
```

_Modified:_

```aconf
rtmps.keystorepass=changeit
rtmps.keystorefile=/etc/letsencrypt/live/ssl.example.com/keystore.jks
rtmps.truststorepass=changeit
rtmps.truststorefile=/etc/letsencrypt/live/ssl.example.com/truststore.jks
```

#### Windows SSL Configuration

**NOTE:** for Windows, you must still use the linux path syntax, so the configuration should look like this:

```aconf
rtmps.keystorepass=changeit
rtmps.keystorefile=C:/Users/letsencrypt/live/ssl.example.com/keystore.jks
rtmps.truststorepass=changeit
rtmps.truststorefile=C:/Users/letsencrypt/live/ssl.example.com/truststore.jks
```

### Define secure WebSocket port (for builds before version 5.4.0)

**If you are running a version of Red5 Pro earlier than 5.4.0, then you must define the secure websocket port.**

**As of release 5.4.0, `websockets` automatically use the same ports as http/https, so they do not need to be defined separately in the `red5.properties` file.**

1. The first step is to decide which port you’ll be using for your wss connections. We suggest using 8083 if you’re using 8081 for regular WebSocket connections (if you are using a build earlier than 5.4.0, then port 8081/80083 are hard coded into the front end). This is also a suggestion as there is no “standard” or IETF specified port that must be used at this time. Scroll down to locate the `WebSocket` section:

    ```aconf
    # WebSocket
    ws.host=0.0.0.0
    ws.port=8081
    ```

    Add the two lines for wss as shown and then save the file:

    ```aconf
    # WebSocket
    ws.host=0.0.0.0
    ws.port=8081
    wss.host=0.0.0.0
    wss.port=8083
    ```

2. Save and close the `red5.properties` file.

---

## JEE Container Configuration

- For builds 14.0.0 and later

Starting from version 14.0.0, enabling SSL no longer requires modifying `jee-container.xml`. Instead, update the following properties in `conf/red5.properties`:
```
secure.enabled=true  
websocket.enabled=true
```
Restart Red5 Pro after making these changes.

- For builds before 14.0.0

Versions before 14.0.0 required modifying `conf/jee-container.xml`. If you are using a version older than 14.0.0, follow these steps:

The `jee-container.xml` file is also located in the conf directory along with the `red5.properties` file.

1. Comment out the `<!-- Non-secured transports for HTTP and WS -->` section (Tomcat without SSL enabled).
2. Uncomment the `<!-- Secure transports for HTTPS and WSS -->` section.
3. Start or restart Red5 Pro.

## Secure RTMP

### RTMPS

> **NOTE: NOT necessary for WebRTC**

To enable `RTMPS`, we need to first open the `red5-core.xml` located in the `red5pro/conf` directory. Once you’ve got it in your editor, scroll down to the section shown below and uncomment out the `rtmpsMinaIoHandler` and `rtmpsTransport` beans:

```xml
 <!-- RTMPS -->
<!--
    <bean id="rtmpsMinaIoHandler" class="org.red5.server.net.rtmps.RTMPSMinaIoHandler">
        <property name="handler" ref="rtmpHandler" />
        <property name="keystorePassword" value="${rtmps.keystorepass}" />
        <property name="keystorePath" value="${rtmps.keystorefile}" />
        <property name="truststorePassword" value="${rtmps.truststorepass}" />
        <property name="truststorePath" value="${rtmps.truststorefile}" />
    </bean>
    
    <bean id="rtmpsTransport" class="org.red5.server.net.rtmp.RTMPMinaTransport" init-method="start" destroy-method="stop">
        <property name="ioHandler" ref="rtmpsMinaIoHandler" />
        <property name="addresses">
            <list>
                 <value>${rtmps.host}:${rtmps.port}</value>
            </list>
        </property>
        <property name="ioThreads" value="${rtmp.io_threads}" />
        <property name="tcpNoDelay" value="${rtmp.tcp_nodelay}" />
    </bean>
-->
```

Any properties that you may want to change are once again located in the `red5.properties` file in the RTMPS labeled section. RTMPS will be available on 8443 if you are using the defaults.

__The final step is to start or restart your Red5 Pro server.__

[Here are some more details on RTMPS and Red5 (open source).](https://github.com/Red5/red5-server/blob/master/RTMPS.md#server)

### RTMPE

RTMPE does not require any server modification and runs on the default RTMP port 1935.
