---
title: File Authentication Architecture
description: ""
menu_order: 10
---

![Red5 Pro File Authentication Validator Flow](/_images/special/fileauth/red5profileauthvalidator.png)

As the application starts up, the validator loads the `.credentials` file into memory and creates an internal data structure to store the username-password combinations for quick look-up.

When a client attempts to `connect` to the application, it must provide the username and password parameters during the connection attempt. The simple auth checks to see if the parameters have been provided or not. If one or more parameters are missing the client is immediately rejected.

If credentials are provided, the validator checks to see if the username and password combination is present in its internal data structure. If the combination is found, the client is accepted -else it is rejected.
