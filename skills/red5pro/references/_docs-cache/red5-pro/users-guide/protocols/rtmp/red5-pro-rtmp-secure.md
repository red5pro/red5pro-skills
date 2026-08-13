---
title: Secure RTMP and ERTMP
description: ""
menu_order: 3
---

Red5 Pro supports `RTMPS` (RTMP over a secure TLS/SSL connection), `RTMPE` support has been deprecated and removed. RTMPE should not be confused with ERTMP which is the enhanced version of RTMP that supports additional codecs and features.

RTMPS requires configuring Red5 Pro with an [SSL certificate](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-configure-to-run-with-ssl/#secure-rtmp), and by default uses port 8443. RTMPE does not require any modified configuration, and uses port 1935.
