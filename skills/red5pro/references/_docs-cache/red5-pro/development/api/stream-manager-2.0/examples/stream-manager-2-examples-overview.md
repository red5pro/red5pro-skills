---
title: Stream Manager 2.0 NodeGroupConfig Examples
menu_order: 1
---

# About NodeGroupConfig Examples

There are two main categories of examples. The first category is **cluster topology**, where each example demonstrates a particular arrangement of servers and server relationships. The second category consists of `propertyOverrides` examples to dynamically configure various features as Red5Pro servers are deployed. A third, **miscellaneous** category shows nodes-in-Docker and scheduled use cases.

Note that NodeGroupConfig is documented in the **SM 2.0 Admin Service** doc, where you will find information about its fields and child objects.


## Cluster Topology Examples

These examples demonstrate how NodeGroupConfigs can be defined to acheive various cluster topologies.


### All-in-One

![All-in-One topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-all-in-one.png)

[Example](../stream-manager-2-all-in-one)

This example shows how single role can be defined to handle all traffic. This is useful for development and some test cases, where most testbed functionality can be used with a very small cluster.


### Origin-Edge

![Origin-Edge topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-origin-edge.png)

[Example](../stream-manager-2-origin-edge)

This example shows a basic production-ready topology. The most important thing is the roles.


### Transcoder-Origin-Edge

![Origin-Edge-Transcoder topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-transcoder-origin-edge.png)

[Example](../stream-manager-2-transcoder-origin-edge)

This example adds a transcoder role with the TRANSCODE capability. Note that the transcoder role does not define any parent role.


### Mixer-Origin-Edge

![Origin-Edge-Mixer topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-mixer-origin-edge.png)

[Example](../stream-manager-2-mixer-origin-edge)

This example adds a mixer role with the MIX capability. Note that the mixer role does not define any parent role. The mixer pulls source streams from their cluster origins, and forwards its output stream to some origin.


### Mixer-Transcoder-Origin-Edge

![Origin-Edge-Mixer-Transcoder topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-mixer-transcoder-origin-edge.png)

[Example](../stream-manager-2-mixer-transcoder-origin-edge)

This example combines mixing and transcoding.


### Origin-Relay-Edge

![Origin-Edge-Relay topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-origin-relay-edge.png)

[Example](../stream-manager-2-origin-relay-edge)

To support larger numbers of subscribers, relay nodes can be used. Each relay is the parent of a dedicated group of edges. This is known as "fan-out".


### Transcoder-Origin-Relay-Edge

![Origin-Edge-Relay-Transcoder topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-transcoder-origin-relay-edge.png)

[Example](../stream-manager-2-transcoder-origin-relay-edge)

This combines transcoding with the relay topology.


### Mixer-Origin-Relay-Edge

![Origin-Relay-Edge-Mixer topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-mixer-origin-relay-edge.png)

[Example](../stream-manager-2-mixer-origin-relay-edge)

This combines mixing with the relay topology.


### Mixer-Transcoder-Origin-Relay-Edge

![Origin-Relay-Edge-Mixer-Transcoder topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-mixer-transcoder-origin-relay-edge.png)

[Example](../stream-manager-2-mixer-transcoder-origin-relay-edge)

This example combines mixing and transcoding with the relay topology.


### Multiple Regions

![Multi-region topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-multiple-regions.png)

[Example](../stream-manager-2-multiple-regions)

SubGroups can be used to model regions.


### Multiple Regions, Origin in One Region

![Multi-region 1O topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-multiple-regions-one-origin.png)

[Example](../stream-manager-2-multiple-regions-one-origin)

This example shows how to place nodes of a given role in only one region.


### Multiple Regions in a Hierarchy of GeoZones

![GeoZone topology diagram](/_images/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-multiple-regions-geozones.png)

[Example](../stream-manager-2-multiple-regions-geo-zones)

SubGroups can represent any kind of hierarchical grouping, not just regions. Here we group regions together into "geo zones".


## `propertyOverrides` Examples

These examples demonstrate how to configure various features on the Red5Pro cluster nodes. Configuration is modified when new cluster nodes are created.


### Cluster Reporting Speed

[Example](../stream-manager-2-cluster-reporting-speed)

The Red5Pro Server nodes report status periodically. The default value is 1000 milliseconds, but this can be changed.


### Interstitial

[Example](../stream-manager-2-interstitial)

Enable the Interstitial API.

See also [Interstitial Media Insertion API](/docs/development/interstitial/rest-api/)


### Max Publishers/Subscribers

[Example](../stream-manager-2-max-publishers-subscribers)

Limit the total max publishers and subscribers per NodeGroup.


### Pre-Processor

[Example](/docs/red5-pro/development/api/stream-manager-2-0/examples/stream-manager-2-pre-processor/)

Pre-processing can be used to normalize the stream to Baseline for WebRTC delivery, as well as to scale or otherwise reencode the input stream.

See also [Preprocessor](/docs/red5-pro/users-guide/red5-pro-preprocessor/)


### Cloud Storage/DVR

[Example](../stream-manager-2-cloud-storage-dvr)

Post-processing for cloud storage/DVR functionality using Amazon S3.

See also [VOD via Cloud Storage](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/red5-pro-cloud-storage-overview/)


### Round-Trip Authentication

[Example](../stream-manager-2-round-trip-auth)

Enable round-trip authentication using a third-party remote host.

See also [Simple Authentication Plugin](/docs/special/authplugin/simple-auth/).


### Social Media Pusher

[Example](../stream-manager-2-social-media-push)

Enable Social Media Pusher API.

See also [Social Media Pusher](/docs/special/social-media-plugin/overview/)


### WebHooks

[Example](../stream-manager-2-web-hooks)

Enable and configure WebHooks.

See also [Social Media Pusher](/docs/special/webhooks/overview/)


## Miscellaneous Examples

These examples show other cases not demonstrated above.


### Transcoder with Pre-Processing

[Example](../stream-manager-2-transcoder-with-pre-processing)

This example shows how `propertyOverrides` can be used at the role level to define preprocessing only for transcoder nodes.


### Scheduled NodeGroup

[Example](../stream-manager-2-scheduled-node-group)

A scheduled NodeGroup that is only active on weekends.


### Scheduled Overlay

[Example](../stream-manager-2-scheduled-overlay)

This example shows how a given NodeGroup's configuration can be modified on a schedule, where more nodes are available on weekends.


