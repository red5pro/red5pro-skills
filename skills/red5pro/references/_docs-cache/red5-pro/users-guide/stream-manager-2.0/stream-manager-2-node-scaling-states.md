---
title: Stream Manager 2.0 Node Scaling States
menu_order: 6
---

As Red5 Pro nodes are scaled in and out, they automatically transition through a series of states. These states are used by the Stream Manager to determine the current state of the node and to make decisions on how to scale the node group. The states and their flow are as follows:

- **REQUESTED**: Node was requested by Autoscaling Service
- **CREATING**: Node is being created by Terraform Service
- **CREATED**: Node was created by Terraform Service
- **STARTED**: Node is up, but not configured yet. Set when node was in the CREATED state, and we received ClusterNodeEvent message. If node is required further configuration, it will be set to INSERVICE.
- **INSERVICE**: Node is up and fully configured
- **SOFT_SUNSET**: Autoscale Service expects Stream Service to stop sending new streams to the node.
- **HARD_SUNSET**: Node is still has clients, but we can't wait anymore until they go away by themselves, so now we asked node to kick out all clients (sent RemoveSubscribers node command).
- **DESTRUCTION_REQUESTED**: Autoscale Service sent destruction request to the Terraform Service
- **DESTROYING**: Node is being destroyed by Terraform Service
- **DESTROYED**: Node hsa been removed by Terraform Service
- **FAILED**: Node somehow failed

The following diagram shows the flow of the states:
![Diagram of the Node Group Scaling States and Flow](/_images/red5-pro/users-guide/architecture/NodeScalingState.png)

## Manual Node State Change

Node state transitions can be performed manually in either of two cases:
* if autoscaling is paused for the entire NodeGroup by setting `isScalingPaused` to true
* if the node's role's `lifecycle` is set to `MANUAL` (affecting only that NodeRole)

When automatic scaling is disabled (in either case), then only the Terraform state changes occur automatically.

Nodes will not be created automatically -- node creation must be requested by REST. Once REQUESTED, however, the Terraform service works with the cloud provider to create a node of a given state and the node will proceed through these changes until it reaches INSERVICE -- or if there was some kind of failure and the node either was not created or is not communicating with the Stream Manager, it will transition to FAULT.

From there, the administrator can freely transition the node state between INSERVICE, FAULT, and SUNSET states. The Streams service directs traffic based on the node state -- only INSERVICE nodes will be returned for Get Server for Publish/Subscribe requests.

The administrator can also transition to the state DOOMED after which no further manual control is possible. The DOOMED state prompts the Terraform service to tear down the node; it is not possible to interrupt the teardown process. It will proceed until the node is DESTROYED, although it is possible in certain exceptional cases that Terraform does not succeed in destroying a node as expected, in which case that node will return to FAULT state.

### How to Pause Autoscaling for a NodeGroup

You can pause autoscaling for a NodeGroup in two ways:

1. Set `"isScalingPaused": true` in the `NodeGroupConfig` when creating or updating the NodeGroup.
2. Use the dedicated REST API commands to toggle this flag without modifying the entire `NodeGroupConfig`.

For more details, see the [Admin Service documentation](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-admin-api/).

### How to Use `lifecycle: "MANUAL"`

Set a NodeRole's `"lifecycle": "MANUAL"` in `NodeGroupConfig` for cases where you need precise control over node creation and state changes, such as with BrewMixer.

This can be set when creating or updating a NodeGroup.

For more details, see the [Admin Service documentation](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-admin-api/).





