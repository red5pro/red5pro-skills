---
title: Stream Manager 2.0 Migration Guide - SM API
menu_order: 2
---

## API Migration Overview

The Stream Manager API has been redesigned. Here we'll provide helpful pointers from the previous design's conceprts.

### Authentication

Authentication in the Stream Manager 2.0 API is a two-step process. First, you authenticate by providing credentials (username and password) in a call to the Auth service to recieve a crytpographically signed token (a JWT). The JWT will remain valid for a few hours (configurable). Second, make the authenticated REST request of some other service providing the JWT as a bearer token.

Read about [authentication here](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-auth-api/)

### Scale Policy and Launch Config

Scale Policy and Launch Config have been replaced with a new, combined document called NodeGroupConfig. Related functions are part of the Admin service.

Several features are exposed through NodeGroupConfig, including scaling rules, publisher and subscriber limits, access to and control of the cluster password, the Red5Pro API password, node configuration changes, and more.

Read about [NodeGroupConfig here](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-admin-api/#NodeGroupConfig)

### Event Scheduling

Event scheduling is now about the creation or modification of NodeGroupConfig. Related functions are part of the Admin service.

Refer to [Stream Manager 2.0 Scheduling NodeGroups API](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-scheduling-nodegroups-api/)

### Node Group 

Node Group status and related functions are part of the Admin service.

Refer to the [Admin API here](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-admin-api)

### Node 

Nodes in a NodeGroup can be queried with Get NodeGroup Status in the Admin service.

Read more in the [Admin service doc](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-admin-api/#ReadNodeGroupStatus).

### Stream Provisioning

Stream Provisioning is part of the Streams service.

Read about the [Provisioning API here.](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-provision-api/)

#### Streams 

Streams functions reside in the Streams service. A "broadcast" request is now Get Server for Publish.

Read more about [Streams in the Streams service](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-api/).

#### Alarms 

"Alarms" were essentially thresholds that could be set to influence autoscaling. This has been replaced with ScaleRule Expressions which are part of NodeGroupConfig.

Read more about [ScaleRule Expressions here](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-admin-api/#ScaleRuleExpressions).

#### VOD 

Queries to list cloud storage content will be coming soon to SM 2.0.

#### Log Access 

In Stream Manager 2.0, log access is provided by Grafana.

Read [Grafana documentation here.](https://grafana.com/docs/grafana/latest/)

#### Short-Term Stream Usage Statistics 

Stream stats can be queried for all streams in a NodeGroup or only for one stream. Stats including publisher and subscriber count can be aggregated or reported per node.

See the Streams service doc for [List All Streams](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-api/#ListAllStreams) and also for [Get Stream Stats](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-api/#GetStreamStats).

#### Proxy 

Most proxy connections are ephemeral; only RTC WebSocket clients are long lived. The new API does not support query or removal of proxy clients.

Read more about the [Proxy service here] (https://www.red5.net/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-proxy-api/)

