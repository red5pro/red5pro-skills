---
title: Authentication
description: ""
menu_order: 9
---

The following sections detail the authentication options available for Red5 Cloud:

* [Round Trip Authentication on Red5 Cloud](/docs/red5-cloud/users-guide/authentication/red5-cloud-round-trip-authentication/)
* [Digest Token Authentication on Red5 Cloud](/docs/red5-cloud/users-guide/authentication/red5-cloud-digest-token-authentication/)

Both are configured per node group through the Red5 Cloud UI. Round Trip Authentication forwards each publish or subscribe request to your own validation server for a live decision, while Digest Token Authentication validates a self-contained signed token locally against a shared secret.
