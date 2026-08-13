---
title: Red5 Server Properties
description: ""
---

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