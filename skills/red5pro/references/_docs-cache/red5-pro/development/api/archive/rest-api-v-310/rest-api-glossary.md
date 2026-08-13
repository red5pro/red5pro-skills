---
title: REST API Glossary
description: ""
menu_order: 15
---

The following glossary explains the Request and Response Parameters provided in the examples above.

* [group-min-connections](#group-min-connections)
* [min-origin-connections](#min-origin-connections)
<!-- * [compute-region-code]FIXME-DOM(#compute-region-code) -->
<!-- * [origin-compute-region-code]FIXME-DOM(#origin-compute-region-code) -->
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
<!-- * [alarm-metric-unit]FIXME-DOM(#alarm-metric-unit) -->
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
* [policy-name](#policy-name)
<!-- * [policy-description]FIXME-DOM(#policy-description) -->
* [policy-type](#policy-version)
* [min-node-count](#policy-version)
* [max-node-count](#max-node-count)
* [node-scale-adjustment](#node-scale-adjustment)
* [configuration-name](#configuration-name)
* [configuration-description](#configuration-description)
* [red5pro-image](#red5pro-image)
* [instance-type](#instance-type)
<!-- * [instance-capacity]FIXME-DOM(#instance-capacity) -->
* [property-name](#property-name)
* [property-value](#property-value)
* [meta-name](#meta-name)
* [meta-value](#meta-value)
* [publish-start-time](#publish-start-time)
* [publish-stop-time](#publish-stop-time)
* [session-duration](#session-duration)
* [last-known-active-subscribers](#last-known-active-subscribers)
* [last-known-peak-subscribers](#last-known-peak-subscribers)
* [last-known-disconnected-subscribers](#last-known-disconnected-subscribers)
<!-- * [last-known-total-subscribers]FIXME-DOM(#last-known-total-subscribers) -->
* [geozone-name](#geozone-name)
* [geozone-code](#geozone-code)

### group-min-connections

Minimum subscriber connections that this group should support. This parameter helps the scale-in process decide when to scale down an edge.

### min-origin-connections

Minimum connections at origin. This should always be zero (0) for the current version of Stream Manager.

### launch-config-name

Name of the launch configuration to be used for launching a new instance. Usually this implies the consistent machine configuration for a group. A launch configuration defines your compute machine type, max connections, etc., for an instance.

### scale-policy-name

Name of the scale policy to be used by Autoscaler to launch new edges when load conditions occur. A scale policy defines details such as min-max edges allowed etc.

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

Total available connection capacity of the given node role. This is a cumulative total of individual node capacities belonging to same node role.

### total-connection-load

Total available connection load (count) of the given node role. This is a cumulative total of individual node capacities belonging to same node role. You can calculate the net percentage using the values of total-available-capacity and total-connection-load.

### policy-name

The name of the scale policy

### policy-version

The version of the scale policy policy format. Currently Red5 Pro autoscaling supports two versions of the scale policy - standard (identified by version `0.0.2`) and region focused (identified by `0.0.3`)

### policy-type

A string representing the policy class used for representing the current policy.  Version `0.0.3` uses `type` string `com.red5pro.services.autoscaling.model.ScalePolicyMaster`.

### min-node-count

The minimum number of nodes to have for the specified node role.

### max-node-count

The maximum number of nodes to have for the specified node role.

### node-scale-adjustment

This property is currently not active. 
<!-- See [scale policy concepts]FIXME-DOM-DEAD-LINK(#/docs/autoscale/streammanagerug.html#scale-policy-properties) -->

### configuration-name

The name of the launch configuration.

### configuration-description

The description of the launch configuration.

### red5pro-image

The image name/id of the Red5 Pro image created fort autoscaling the cloud platform. For simulated cloud platforms this value in not important.

### instance-type

The instance type of the VM/hardware which is used to identify the machine configuration to be used for running the Red5 Pro instance.

### property-name

The arbitrary name of a property used in a launch configuration or scale policy.

### property-value

The arbitrary value of a property used in a launch configuration or scale policy.

### meta-name

The arbitrary name of a meta tag used in a launch configuration or scale policy. Meta tags are used to add meta data to instances.

### meta-value

The arbitrary value for a meta tag used in a launch configuration or scale policy. Meta tags are used to to add meta data to instances.

### publish-start-time

The publish start timestamp of the stream as UTC milliseconds

### publish-stop-time

The unpublish timestamp of the stream as UTC milliseconds

### session-duration

The total duration of the broadcast session in milliseconds

### last-known-active-subscribers

The last known number of active subscribers for the stream

### last-known-peak-subscribers

The last known maximum number of simultaneous subscribers for the stream

### last-known-disconnected-subscribers

The last known total number of subscribers for the stream. The value is calculated using the `last-known-active-subscribers` and `last-known-disconnected-subscribers` values.

### geozone-name

The alphabetic string representing the geozone name.

### geozone-code

The unique alphabetic string representing the geozone. The code is a single word that must not contain space.

### autogen-event-id

A auto generated id used to represent a scheduled event internally.

### event-name

A unique string identifier used to identify and operate on a `scheduled event` using the streammanager `scheduling api`.

### proxy-client-id

Auto-generated client ID representing the proxy connection

### proxy-target-host

The destination Host/IP of the target server that the proxy connection is connected to

### proxy-client-state

The `Boolean` connected state of the browser client participating in the proxy connection

### proxy-state

The `Boolean` connected state of the server side proxy client participating in the proxy connection

### proxy-client-useragent

The user agent string of the client participating in the proxy connection

### proxy-client-address

The remote IP of the client participating in the proxy connection

### proxy-client-secure-access

The `Boolean` value denoting whether the client of the proxy connection connected over SSL or not

### proxy-client-creationtime

The proxy connection creation time in UTC milliseconds
