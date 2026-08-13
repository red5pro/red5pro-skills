---
title: Create the Keystore
description: ""
menu_order: 4
---

A keystore contains private keys and certificates with their corresponding public keys.

To create a keystore for [Red5 Pro](https://red5pro.net)’s embedded Tomcat, we expect to have our full certificate chain in PEM format; if you have your certificate, root, and intermediate certificates in some other format or in separate files, you’ll need to convert and consolidate them per your certificate authorities instructions.

The first step is to export our keys and certs into a PKCS12 formatted file:

> When prompted for a password, enter one and make note of it since it will be needed throughout this process.

```sh
sudo openssl pkcs12 -export \\
  -in /etc/letsencrypt/live/ssl.example.com/fullchain.pem \\
  -inkey /etc/letsencrypt/live/ssl.example.com/privkey.pem \\
  -out /etc/letsencrypt/live/ssl.example.com/fullchain_and_key.p12 \\
  -name tomcat
```

_The command has been separated by `\` and a carriage return for clarity._

__It is important to note that the `tomcat` alias must be provided as-is.__

Now we create the Java Keystore (don’t forget to substitute your password and domain name):

```sh
sudo keytool -importkeystore \\
  -deststorepass changeit \\
  -destkeypass changeit \\
  -destkeystore /etc/letsencrypt/live/ssl.example.com/keystore.jks \\
  -srckeystore /etc/letsencrypt/live/ssl.example.com/fullchain_and_key.p12 \\
  -srcstoretype PKCS12 \\
  -srcstorepass changeit \\
  -alias tomcat
```