---
title: Troubleshooting GCP Autoscale Deployment
description: ""
menu_order: 14
---

1. You can see the role of a node in the Custom metadata on an instance's property page ![custommeta](/_images/troubleshooting/server/autoscalgooglecloud/custommeta.png)

## Using GCP Preemptible Instances

[Preemptible instances](https://cloud.google.com/solutions/spot-vms) are low-cost, short-lived virtual machines that can be very useful in reducing operation costs provided the system utilizing them has good built-in fault tolerance.

Using preemptible instances can be useful for short-lived sessions or test environments, where you do not want to pay the cost of actual vm types. To know more about preemptible instances check out the [official GCP documentation](https://cloud.google.com/compute/docs/instances/preemptible).

**IMPORTANT:** Since preemptible instances are volatile in nature, you should not use them in mission-critical deployments where service quality, downtime, etc matter.

## Set preemptibility instance flag via launch configuration

If preemptive instances are desired, then this setting needs to be specified in the launch configuration schema via a special `preemptible` property with an appropriate `boolean` `value`for it, indicating whether to enable or disable preemptibility. The property targets the preemptibility flag on GCP. The property can be used to target all nodes or specific node types (`origin`, `edge` etc).

**Example 1: Enabling preemptibility for all nodes**

To make instances preemptible, ensure that the `preemptible` property is specified in the launch configuration along with a value of boolean `true`. 

```json

{
    "launchconfig": {
        "name": "test",
        "description": "Sample launch config for preemptible compute instances",
        "image": "node-image",
        "version": "0.0.3",

        "targets": {
            "target": [{
                    "role": "origin",
                    "instanceType": "n1-standard-1",
                    "connectionCapacity": "100"
                },
                {
                    "role": "edge",
                    "instanceType": "n1-standard-1",
                    "connectionCapacity": "300"
                }
            ]
        },
        "properties": {
            "property": [
            {
              "name": "preemptible",
              "value": "true"
            }
            ]
        },
        "metadata": {
            "meta": []
        }
    }
}

```

**Example 2: Enabling preemptibility for edges only**

On the other hand, to target specific node types you must specify the node type as a namespace along with the `preemptible` in the launch config property name.

```json

{
    "launchconfig": {
        "name": "test",
        "description": "Sample launch config for preemptible compute instances",
        "image": "node-image",
        "version": "0.0.3",

        "targets": {
            "target": [{
                    "role": "origin",
                    "instanceType": "n1-standard-1",
                    "connectionCapacity": "100"
                },
                {
                    "role": "edge",
                    "instanceType": "n1-standard-1",
                    "connectionCapacity": "300"
                }
            ]
        },
        "properties": {
            "property": [
            {
              "name": "edge:preemptible",
              "value": "true"
            }
            ]
        },
        "metadata": {
            "meta": []
        }
    }
}

```