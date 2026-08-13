---
title: Preemptive VMs Option
description: ""
menu_order: 9
---

If you want to reduce some costs, you can specify `preemptive` instances for your nodes. These VM types can be taken down by GCP after 24 hours (the stream manager will replace them per the scaling policy). This is a good option if you have bursts of traffic and want to scale up quickly for less money. The preemptive flag is added as a `property` in the launch configuration json data, and can be set for each node type separately.

```json
    "properties": {
            "property": [
                {
                    "name": "edge:preemptible",
                    "value": "true"
                }
        ]
```
