---
title: Prerequisites
description: ""
menu_order: 2
---

These prerequisites are only for the examples provided; they are not meant to be the only platform on which Red5 Pro will work using SSL.

* Debian based OS
* Java
* [OpenSSL](https://www.openssl.org/)
* Git client
* [Red5 Pro Server](https://account.red5.net/login)
* DNS resolvable hostname

__The last item is very important and will prevent certificate creation, if not configured properly.__

## Examples

In the following examples the values used should be replaced with your own values to match your installation:

* Fully qualified domain name: `ssl.example.com`
* Password: `changeit`
* Email address: `yourname@example.com`

The `alias` for your domain certificate, specified as `tomcat` should remain as-is or you will need to modify the steps and server configuration to recognize your selected alternate alias value.
