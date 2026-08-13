---
title: Testing the Configuration
description: ""
menu_order: 11
---

To perform a quick test of your SSL configuration, you can use [SSLLabs](https://www.ssllabs.com/) free service by substituting your domain in the uri below:

`https://www.ssllabs.com/ssltest/analyze.html?d=ssl.example.com`

The OpenSSL client can also be used to test the configuration with this command:

```sh
openssl s_client -connect ssl.example.com:443
```