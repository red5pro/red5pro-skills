---
title: Restreamer
menu_order: 60
---

The Restreamer Plugin provides an API to control various kinds of streaming integration. Users interact with the Restreamer by POSTing provisions, which are JSON documents containing the necessary information, which varies by restreamer type.

The Restreamer servlet and all restreamer types are enabled by default.

See also [Restreamer Plugin User's Guide](/docs/red5-pro/users-guide/restreamer/).
See [Stream Manager 2.0 Restreamer Migration doc](/docs/red5-pro/users-guide/stream-manager-2.0/migration-guide/stream-manager-2-migration-restreamer/) for for Stream Manager 2.0 migration notes.
See [Stream Manager 2.0 Restreamer Examples](/docs/red5-pro/development/api/stream-manager-2-0/restreamer/) for Stream Manager 2.0 examples.

## Create

To register a restremer provision and possibly begin restreaming (depending on the specific restreamer, available streams, and other conditions), you will POST a JSON provision to the Restreamer servlet, which is typically register under the `live` webapp.

The body of your request will vary depending on the type of restreamer you use and its restreaming mode.

Part of the request object parameters is an `action` which is always `create` in this case.

## Update

Some restreamers can be updated while restreaming, or certain parameters can be changed.

The body of your request will contain a modified copy of your original request. If successful, the changes will be applied. See specific doc for details.

Part of the request object parameters is an `action` which is always `update` in this case.

## List

Each type of restreamer can return a list of provisions.

Part of the request object parameters is an `action` which is always `list` in this case. However, `list` is also the default action if none is provided.

The restreamer `type` is also required.

## Kill

A restreamer provision is identified by its quid.

To remove a persistent provision from the disk store, include `persist=true`. Otherwise the provision will be killed on request but will reappear on restart.



