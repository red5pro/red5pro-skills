---
title: Installing
description: ""
---

_If not using Let’s Encrypt, this section may be skipped._

To create our certificate and chain, we first clone the letsencrypt project repository:

```sh
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
```

To prepare our environment and see the available options, execute the following command:

```sh
./letsencrypt-auto --help
```

System dependencies will be downloaded and installed; you may also see some warnings like this, which may be disregarded:

```sh
InsecurePlatformWarning
./root/.local/share/letsencrypt/local/lib/python2.7/site-packages/pip/_vendor/requests/packages/urllib3/util/ssl_.py:90: InsecurePlatformWarning: A true SSLContext object is not available. This prevents urllib3 from configuring SSL appropriately and may cause certain SSL connections to fail. For more information, see https://urllib3.readthedocs.org/en/latest/security.html#insecureplatformwarning.
```

__If Red5 Pro is running at this point, shut it down.__## Installing

To create our certificate and chain, we first clone the letsencrypt project repository:

```sh
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
```

To prepare our environment and see the available options, execute the following command:

```sh
./letsencrypt-auto --help
```

System dependencies will be downloaded and installed; you may also see some warnings like this, which may be disregarded:

```sh
InsecurePlatformWarning
./root/.local/share/letsencrypt/local/lib/python2.7/site-packages/pip/_vendor/requests/packages/urllib3/util/ssl_.py:90: InsecurePlatformWarning: A true SSLContext object is not available. This prevents urllib3 from configuring SSL appropriately and may cause certain SSL connections to fail. For more information, see https://urllib3.readthedocs.org/en/latest/security.html#insecureplatformwarning.
```

__If Red5 Pro is running at this point, shut it down.__