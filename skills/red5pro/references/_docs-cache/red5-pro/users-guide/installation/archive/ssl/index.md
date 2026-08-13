---
title: Setup SSL
description: Red5 Pro with SSL
menu_order: 6
---

For WebRTC publishing, a valid SSL certificate is required for your streaming server. In addition, a secure websocket port must be defined, and Tomcat must be specified to run in secure mode.

This document covers the use of SSL in Red5 Pro, primarily focused on free certificates from [Let’s Encrypt](https://letsencrypt.org/) on a Debian-based operating system (Ubuntu). Additionally, we've included the steps to configure Red5 Pro with other certificate providers including:

* [GoDaddy](https://www.godaddy.com/en-in)
* [Comodo](https://ssl.comodoca.com/dv-ssl-certificate)
* [DigiCert](https://www.digicert.com/kb/csr-ssl-installation/tomcat-keytool.htm)

Most other ssl certificate providers will provide documentation on how to use their certs to create the necessary keystore and truststore files; look for guides which specify Tomcat or other JEE container servers.

For information on setting up Red5 Pro with SSL on Windows based system, please refer to the [Red5 Pro SSL Windows Guide](../installation/red5prosslwin)

__Let’s Encrypt__ is a free, automated and open certificate authority brought to you by the Internet Security Research Group (ISRG). ISRG is a California public benefit corporation, and is recognized by the IRS as a tax-exempt organization under Section 501(c)(3) of the Internal Revenue Code. Find them online at: [https://letsencrypt.org/](https://letsencrypt.org/). Please note that Let's Encrypt certificates need to be renewed every 90 days.
