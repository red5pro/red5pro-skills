---
title: Create the Truststore
description: ""
menu_order: 5
---

A truststore contains certificates from other parties that you expect to communicate with, or from Certificate Authorities that you trust to identify other parties.

The first step is to export the certificate that we’ll be trusting (don’t forget to substitute your password and domain name):

```sh
sudo keytool -export -alias tomcat \\
  -file /etc/letsencrypt/live/ssl.example.com/tomcat.cer \\
  -keystore /etc/letsencrypt/live/ssl.example.com/keystore.jks \\
  -storepass changeit -noprompt
```

_The command has been separated by `\` and a carriage return for clarity._

A successful response will be: `Certificate stored in file </etc/letsencrypt/live/ssl.example.com/tomcat.cer>`

After we have the exported certificate, import it into the truststore:

```sh
sudo keytool -import -trustcacerts -alias tomcat \\
  -file /etc/letsencrypt/live/ssl.example.com/tomcat.cer \\
  -keystore /etc/letsencrypt/live/ssl.example.com/truststore.jks \\
  -storepass changeit -noprompt
```

A successful response will be: `Certificate was added to keystore.`

As a verification step, your __letsencrypt__ directory (/etc/letsencrypt/live/ssl.example.com/) should contain these files:

```sh
sudo ls /etc/letsencrypt/live/ssl.example.com/
cert.pem   fullchain_and_key.p12  keystore.jks  tomcat.cer
chain.pem  fullchain.pem          privkey.pem   truststore.jks
```

**the `keystore.jks` and `truststore.jks` are used by Red5 Pro.**