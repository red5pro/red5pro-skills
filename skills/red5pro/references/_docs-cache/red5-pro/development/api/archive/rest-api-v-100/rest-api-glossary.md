---
title: REST API Glossary
description: ""
---

The following glossary explains the Request and Response Parameters provided in the examples above.

> * [group-min-connections](#group-min-connections)
> * [min-origin-connections](#min-origin-connections)
> * [compute-region-code](#compute-region-code)
> * [origin-compute-region-code](#origin-compute-region-code)
> * [launch-config-name](#launch-config-name)
> * [scale-policy-name](#scale-policy-name)
> * [stream-name](#stream-name)
> * [stream-scope](#stream-scope)
> * [origin-host-address](#origin-host-address)
> * [stream-description](#stream-description)
> * [subscriber-count](#subscriber-count)
> * [start-timestamp](#start-timestamp)
> * [node-identifier](#node-identifier)
> * [role](#role)
> * [host](#host)
> * [node-state](#node-state)
> * [connection-capacity](#connection-capacity)
> * [group-identifier](#group-identifier)
> * [error-message-string](#error-message-string)
> * [error-timestamp](#error-timestamp)

### group-min-connections

Minimum subscriber connections that this group should support. This param helps the scale-in process decide when to scale down an edge.

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

Description information about the stream (optional).

### compute-region-code

Google Compute availability zone code - [https://cloud.google.com/compute/docs/zones?hl=en#available](https://cloud.google.com/compute/docs/regions-zones?hl=en#available)).

### origin-compute-region-code

Google Compute availability zone code for origin - [https://cloud.google.com/compute/docs/zones?hl=en#available](https://cloud.google.com/compute/docs/regions-zones?hl=en#available)).

### subscriber-count

Total active subscribers count for this stream.

### start-timestamp

Stream start timestamp.

### node-identifier

Unique Identifier of a node. _Directly translates as compute instance name_.

### role

Role of the instance in the system: Origin or Edge.

### host

Instance host name/address.

### node-state

Instance state: `RUNNING`, `TERMINATING`, `INSERVICE`, `PENDING`, etc.

### connection-capacity

Max connection capacity of this instance as per launch configuration information.

### group-identifier

Group name identifier.

### error-message-string

Human friendly error message string.

### error-timestamp

Timestamp for when the error message was generated.
