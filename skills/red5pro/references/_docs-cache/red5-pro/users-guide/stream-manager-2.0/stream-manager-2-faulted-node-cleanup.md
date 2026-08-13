---
title: Stream Manager 2.0 Faulted Node Cleanup
menu_order: 80
---

## Introduction

Stream Manager 2.0 monitors the health and state of cluster nodes to ensure high availability and performance. When nodes fail to transition between expected states or stop communicating, they are marked as `FAULT` and subject to automated cleanup. This page explains how nodes are considered faulted, what configuration is available, and how cleanup works. Information on node states and their transitions can be found in the [Stream Manager 2.0 Node Scaling States](../stream-manager-2-node-scaling-states/) documentation.

## Faulted Nodes and Max Nodes

Faulted nodes do not count towards the maximum number of nodes allowed in a SubGroup-Role. This allows the SubGroup to scale to the appropriate maximum level ensuring the system can support the required load without being hindered by nodes that are not functioning correctly. If a node is created, but never transitions all the way to `INSERVICE`, it is considered a valid node and will count towards the maximum number of nodes allowed in the SubGroup-Role. This behavior helps prevent runaway scaling due to nodes that cannot be created correctly, while still allowing the system to scale appropriately when nodes are healthy.

## Node Fault Criteria

A node is considered **faulted** under the following conditions:

- **State Timeouts:** If a node remains in a particular state longer than its configured timeout, it is automatically marked as faulted.
- **Missed Checkins:** If a node stops sending status events within a defined time window, it is also marked as faulted.

## Configuration

Several environment variables customize fault detection and handling:

### Node Fault Timeout

- **`R5AS_NODE_FAULT_TIMEOUT`**
  Maximum time (in milliseconds) a node can remain in a faulted state before it is cleaned up. The default is -1 which means the node will not be automatically cleaned up. If set to a positive value, the node will be cleaned up after that many milliseconds.

### State Timeouts

Each node state has a configurable timeout (in milliseconds). If a node does not transition out of a state before the timeout elapses, it is considered faulted.

| Environment Variable                | Description                                            | Default (ms) |
| ----------------------------------- | ------------------------------------------------------ | ------------ |
| `R5AS_NODE_REQUEST_TIMEOUT`         | Max time allowed for node to respond to a request      | 2400000      |
| `R5AS_NODE_CREATED_TIMEOUT`         | Max time allowed in the “CREATED” state                | 2400000      |
| `R5AS_NODE_CREATING_TIMEOUT`        | Max time allowed in the “CREATING” state               | 2400000      |
| `R5AS_NODE_STARTED_TIMEOUT`         | Max time allowed in the “STARTED” state                | 2400000      |
| `R5AS_NODE_SUNSET_TIMEOUT`          | Max time allowed in the “SUNSET” state                 | 2400000      |
| `R5AS_NODE_DOOMED_TIMEOUT`          | Max time allowed in the “DOOMED” state                 | 2400000      |

### Checkin Timeout

- **`R5AS_NODE_STATUS`**
  Maximum time (in milliseconds) since the last `ClusterNodeEvent` before the node is marked faulted. The default is 60 seconds (60000 ms).

### Failed Node Threshold

- **`R5AS_FAILED_NODE_THRESHOLD`**
  Specifies the number of faulted nodes allowed within a SubGroup-Role before autoscaling is halted for that group.
  Once the number of faulted nodes meets or exceeds this threshold, scale rules are temporarily suspended to prevent further impact. The default is 100. This settings helps prevent excessive scaling actions when multiple nodes are failing simultaneously and provides a pause for investigation and remediation. In cases where experimentation or testing, this settings can be lowered to a smaller number, such as 1 or 2, to quickly identify issues without impacting the entire scaling process.

## Cleanup Process

1. **Detection:**
   Stream Manager continually monitors node states and checkins.
2. **Mark as Faulted:**
   If a node exceeds its configured timeout or misses too many checkins, its status is set to `FAULT`.
3. **Autoscaling Paused (if threshold met):**
   If the number of faulted nodes in a SubGroup-Role equals or exceeds `R5AS_FAILED_NODE_THRESHOLD`, no new scale actions will be evaluated for that group until the failure count drops below the threshold.
4. **Node Cleanup:**
   Faulted nodes are subject to automated cleanup to ensure they do not affect future scaling or load balancing decisions.
