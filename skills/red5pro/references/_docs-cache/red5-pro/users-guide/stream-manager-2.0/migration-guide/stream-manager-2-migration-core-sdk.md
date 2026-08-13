---
title: Stream Manager 2.0 Migration Guide - Core SDK
menu_order: 5
---

## Red5 CoreSDK SDK Migration for Stream Manager 2.0 Release

The intent of this document is to provide information for developers using the [Red5 Core SDK](/docs/red5-pro/development/sdks/red5-core-sdk/) on migrating from Stream Manager 1.0 integration to Stream Manager 2.0 integration for Core SDK clients.

## General Overview

When using either Stream Manager 1.0 you used the r5::core::Red5ProStreamManager class to interact with the Stream Manager for tasks such as getting a publishing or subscribing node.  In Stream Manager 2.0 you use the r5::core::StreamManagerAPI class to interact with the Stream Manager for the same tasks. In the case of the latter, you would need to first get an instance of the StreamManagerAPI class and then request the node. The change is related to the difference in authentication methodologies between the two version of Stream Manager. Stream Manager 1.0 used a static token, where Stream Manager 2.0 use rotating JSON Web Tokens (JWT). Once the connection is established with the Stream Manager using the methods above, the calls to get nodes are similar, with Stream Manager 2.0 offering additional functionality around accessing node groups, and listing/updating provisions.

## Examples

In the `examples` directory of the Core SDK, you will find examples for both Stream Manager 1.0 and Stream Manager 2.0. The examples for Stream Manager 1.0 are prefixed with `old_stream_manager_` and the examples for Stream Manager 2.0 are prefixed with `stream_manager_`.
