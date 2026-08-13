---
title: Recommended Instance Types
description: ""
menu_order: 2
---

# Autoscale Infrastructure

> IMPORTANT: make sure that you are using VMs with dedicated (not shared) CPUs

## Stream Manager

The stream manager role is memory-intensive, and as such should run on a memory-optimized instance type.

## Terraform

The Terraform server does not have much overhead but needs to be reliable for scaling the nodegroups up and down. You can use a basic server with 2 CPUs and 2GB memory.

## Database

Database load will vary depending on how much traffic you have and how many nodes are in your nodegroup. The stream manager requires 2 open DB connections for every node in a group, and one connection for each concurrent publish or subscribe query.

If your use case requires a lot of connections during a small period of time (for example, scheduled events with a specific start time) then you will need **more CPU, memory, and IOPS** than a use case where a few people come and go over the course of the day (for example, an app like Periscope).

# Nodes

> IMPORTANT: make sure that you are using VMs with dedicated (not shared) CPUs

## Origin and Edge nodes

For simple publishing and subscribing, use the latest [Server Performance Metrics](/docs/red5-pro/resources/release-notes/archive/red5pro-server-releasenotes/Release-10.0.0-performance-metrics/) to determine the best VM choices to use based on the resolution/bitrate of your streams. Those tests are run on the minimum-suggested server specifications (2 CPUs, 4GB memory with 2G allocated to JVM) and mostly scale as expected (twice as many subscribers or publishers if you double the CPU and Memory allocation). So these can be used to determine the instance type and capacity of your `origins` and `edges`.

## Relay nodes

Relays play basically the same role as edges, (but the subscribers are the edge nodes, not clients). As such, the instance type and capacity should be set to the same as your edge nodes.

## Transcoder nodes

Transcoding uses more CPU than straight publishing. It is generally recommended to expect half the capacity for the same stream quality between a transcoder and an origin. For example, if your high-level stream is 1080p, where we were able to get 20 publishers on a c5.large origin, we can support about 10 total on a transcoder (or three 3-level transcodes, as each stream variant counts as a stream/connection).

## Mixer nodes

Mixer node utilization will depend on three factors:

1. Source quality of incoming streams
2. Number of streams in a composition
3. Quality of the outgoing mixed stream

In our load tests, we saw that a 4CPU/8G memory VM could support the following (numbers reflect the maximum streams in a composition to keep CPU usage < 70-80% and have a good user experience - tested with highly dynamic video source):

| Source stream input quality | Mixed stream output quality | Number of streams in composition |
| --- | --- | --- |
| 360p | 720p | 20 |
| 720p | 720p | 15 |
| 720p | 1080p | 7 |

Testing the same on an 8CPU/16G memory VM:

| Source stream input quality | Mixed stream output quality | Number of streams in composition |
| --- | --- | --- |
| 360p | 720p | 60 |
| 720p | 720p | 35 |
| 720p | 1080p | 15 |

### All server instances should be optimized per [these specifications](/docs/red5-pro/users-guide/optimization/red5-pro-server-optimization/)
