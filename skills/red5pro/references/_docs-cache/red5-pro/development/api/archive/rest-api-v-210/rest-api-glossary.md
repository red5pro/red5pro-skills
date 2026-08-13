---
title: REST API Glossary
description: ""
---

The following glossary explains the Request and Response Parameters provided in the examples above.

* [group-min-connections](#group-min-connections)
* [min-origin-connections](#min-origin-connections)

{/* [compute-region-code]FIXME-DOM(#compute-region-code) [origin-compute-region-code]FIXME-DOM(#origin-compute-region-code) */}

* [launch-config-name](#launch-config-name)
* [scale-policy-name](#scale-policy-name)
* [stream-name](#stream-name)
* [stream-scope](#stream-scope)
* [origin-host-address](#origin-host-address)
* [stream-description](#stream-description)
* [subscriber-count](#subscriber-count)
* [start-timestamp](#start-timestamp)
* [node-identifier](#node-identifier)
* [role](#role)
* [host](#host)
* [node-state](#node-state)
* [connection-capacity](#connection-capacity)
* [group-identifier](#group-identifier)
* [alarm-id](#alarm-id)
* [alarm-type](#alarm-type)
* [alarm-metric](#alarm-metric)

{/* [alarm-metric-unit]FIXME-DOM(#alarm-metric-unit) */}

* [alarm-threshold](#alarm-threshold)
* [alarm-threshold-comparator](#alarm-threshold-comparator)
* [alarm-target-type](#alarm-target-type)
* [playlist-name](#playlist-name)
* [media-file-name](#media-file-name)
* [vod-duration](#vod-duration)
* [last-modified](#last-modified)
* [playlist-url](#playlist-url)
* [media-url](#media-url)
* [error-message-string](#error-message-string)
* [error-timestamp](#error-timestamp)

### group-min-connections

Minimum subscriber connections that this group should support. This parameter helps the scale-in process decide when to scale down an edge.

### min-origin-connections

Minimum connections at origin. This should always be zero (0) for the current version of Stream Manager.

### launch-config-name

Name of the launch configuration to be used for launching a new instance. Usually this implies the consistent machine configuration for a group. A launch configuration defines your compute machine type, max connections, etc., for an instance.

### scale-policy-name

Name of the scale policy to be used by Autoscaler to launch new edges when load conditions occur. A scale policy defines details such as min-max edges allowed, instances warm up time, cooldown period, etc.

### stream-name

Name of the stream for publishing or subscription.

### stream-scope

Red5 scope where the stream exists. This usually determined by the RTMP connection URL.

### origin-host-address

Host address of an available Red5 Pro origin server.

### stream-description

Descriptive information about the stream (optional).

### region-code

A region code representing the region as suuported by your cloud platform provider.Regions codes generally map your cloud providers's data center(s) at a region.

* [Google compute](https://cloud.google.com/compute/docs/regions-zones)
* [AWS](https://docs.aws.amazon.com/general/latest/gr/rande.html)

### subscriber-count

Total active subscribers count for this stream.

### start-timestamp

Stream start timestamp.

### node-identifier

Unique Identifier of a node. _Directly translates as virtual machine instance name_.

### role

Role of the instance in the system: Origin or Edge.

### host

Instance host name/address.

### node-state

Instance state: `RUNNING`, `TERMINATING`, `INSERVICE`, `PENDING`, etc.

### connection-capacity

Maximum connection capacity of this instance as per launch configuration information.

### group-identifier

Group name identifier.

### alarm-id

Id of an alarm.

### alarm-type

Alarm type. Generally the type will be either scale-out or scale-in.

### alarm-metric

Metric that the alarm is set to monitor.

### alarm-threshold

Threshold value for the alarm.

### alarm-threshold-comparator

The comparator enum for threshold evaluation on this alarm. Comparators are comparision operators used to evaluate conditions at runtime using the threshold values and current value of the targeted metric.

### alarm-target-type

Target type enum of the alarm. This is always set to GROUP, In current versions of Stream Manager alarms are meant for groups only.

### playlist-name

Name of the VOD m3u8 playlist on cloud storage.

### media-file-name

Name of the VOD mp4/flv media on cloud storage.

### vod-duration

Time duration of the VOD content (in seconds).

### last-modified

Last modified timestamp of the VOD content on cloud.

### playlist-url

The absolute HTTP(s) url of the m3u8 playlist.

### media-url

The url of the flv/mp4 media file.

### error-message-string

Human friendly error message string.

### error-timestamp

Timestamp for when the error message was generated.

### total-group-connections

Total connections on observed on the node group.

### total-node-count

Total nodes in the group. This includes nodes in different states.

### total-active-nodes

Total active nodes in the group. This includes nodes in active state (INSERVICE) only.

### total-available-capacity

Total available connection capacity of the given node role. This is a cumulative total of invidual node capacities belonging to same node role.

### total-connection-load

Total available connection load (count) of the given node role. This is a cumulative total of invidual node capacities belonging to same node role. You can calculate the net percentage using the values of total-available-capacity and total-connection-load.
