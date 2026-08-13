---
title: Migrating from `5.4.0` to `5.5.0`
description: ""
menu_order: 55
---

# Migrating from `5.4.0` to `5.5.0`

The `5.5.0` release of the Red5 Pro WebRTC SDK including some modifications to `SharedObjects` to allow for "decoupling" the managament and communication API from the underlying connections for Publishers and Subscribers. In the `5.5.0` release, `SharedObjects` can now be used by themselves without requiring an already established connection to the server.

* The `SharedObject` API has been decoupled from requiring previously established stream clients (Publisher and/or Subscriber).
  * By decoupling the previous *requirement* to use a established stream client, `SharedObjects` can now be used with establishing a  `WebSocket` connection and providing that as the connection to communicate over `SharedObjects`.
  * The Red5 Pro WebRTC SDK provides a `Red5ProSharedObjectSocket` class to serve as a proxy to an underlying `WebSocket` and convenience in communicating to and from the Red5 Pro Server when using `SharedObjects`.
  * The `SharedObject` API can still be employed using a stream client connection as was possible in previous SDK versions.

Additionally, notification support for latest browser vendor restictions on the `autoplay` policy have been included.

* Utilize the `muteOnAutoplayRestriction` initialization configuration property for Subscriber clients in order to attempt auto-muting of subscribers to allow - at least - video auto-playback when browsers enforce the muted autoplay policy.
* Listen for events related to `autoplay` restictions in order to provide a better User Experience for your customers.
* Please refer to the `Autoplay Restictions` section from the *Subscriber* documentation.
