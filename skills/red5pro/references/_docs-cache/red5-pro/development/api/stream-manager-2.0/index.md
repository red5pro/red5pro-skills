---
title: Stream Manager 2.0
menu_order: 100
---

The **Stream Manager 2.0** has the following APIs:

[**Admin API**](./stream-manager-2-admin-api/): manage the Red5 Pro nodes. It is used to deploy and manage the Red5 Pro nodes. It scales the nodes in and out based on the scaling expressions, capacity expressions and the current load of the nodes in the node group.
[**Auth API**](./stream-manager-2-auth-api/): authenticate clients and provide JW Tokens for use with the other Stream Manager services.
[**Proxy API**](./stream-manager-2-proxy-api/): securely route client requests to an appropriate Red5 Pro node based on the capacity ranking expressions, limit expressions and the current load of the nodesr in the node group.
[**Scheduling NodeGroups API**](./stream-manager-2-scheduling-nodegroups-api/): schedule node groups for scaling in and out based on schedules.
[**Streams API**](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-api/): handle publishing and subscribing requests from clients and for understanding the current load of the nodes in the node group.
[**Streams Provision API**](./stream-manager-2-streams-provision-api/): provision streams for publishing and subscribing based on the parameters passed in the provision request.
[**Streams Mixer API**](./stream-manager-2-streams-mixer-api/): create and control video mixers.

Stream Manager 2.0 includes an [OpenAPI/Swagger UI](./stream-manager-2-openapi-api/).

Stream Manager 2.0 can be used from the command line from a tool such as CURL, a [cheat sheet](./stream-manager-2-curl-cheat-sheet/) is available to help you get started.
