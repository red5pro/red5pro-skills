_From: Stream Manager 2.0 Admin API_

## Read NodeGroup Status

Return the status of all cluster nodes in the NodeGroup.

### Read NodeGroup Status Request

GET `https://<host>/as/v1/admin/nodegroup/status/<nodeGroupName>?subGroup=<subGroupName>&role=<nodeRoleName>&state=<scalingState>&metrics=false&includeScaling=true&includeNode=true`

`nodeGroupName`: Required. String. The name of an active NodeGroup.

`subGroup`: Optional. String. The name of the desired SubGroup (filter results).

`role`: Optional. String. The name of the desired NodeRole (filter results).

`state`: Optional. String. The desired scaling state (filter results). Valid states are (CAPITALIZED): `REQUESTED`, `CREATING`, `CREATED`, `STARTED`, `INSERVICE`, `SOFT_SUNSET`, `HARD_SUNSET`, `DESTRUCTION_REQUESTED`, `DESTROYING`, and `FAULT`. Not that there is no "destroyed" state: destroyed nodes disappear completely.

`metrics`: Optional. Boolean. Default: false. Include metrics with ClusterNodeEvents.

`includeNode`: Optional. Boolean. Default: true. Include NodeEvents in response.

`includeScaling`: Optional. Boolean. Default: true. Include ScalingEvents in response.

### Read NodeGroup Status Response

For a detailed list of Node Metrics, see **Scale Rule Expressions -- Metrics and Aggregation** below

**On success:**

HTTP 200: OK

```json
[
    {
        "nodeEvent": {
            "clientCount": 0,
            "metrics": [
                {
                    "children": [
                        {
                            "name": "processors",
                            "value": 2
                        },
                        {
                            "children": [
                                {
                                    "name": "load",
                                    "value": 0.2314453125
                                }
                            ],
                            "name": "system"
                        },
                        {
                            "children": [
                                {
                                    "name": "load",
                                    "value": 0.00995024875621891
                                },
                                {
                                    "name": "time",
                                    "value": 16110000000
                                }
                            ],
                            "name": "process"
                        },
                        {
                            "children": [
                                {
                                    "name": "1min",
                                    "value": 0.27
                                },
                                {
                                    "name": "5min",
                                    "value": 0.18
                                },
                                {
                                    "name": "15min",
                                    "value": 0.07
                                }
                            ],
                            "name": "loadavg"
                        }
                    ],
                    "name": "cpu"
                },
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "name": "free",
                                    "value": 2013265920
                                },
                                {
                                    "name": "max",
                                    "value": 2147483648
                                },
                                {
                                    "name": "total",
                                    "value": 2147483648
                                }
                            ],
                            "name": "vm"
                        },
                        {
                            "children": [
                                {
                                    "name": "committedvirtual",
                                    "value": 18693186949120
                                }
                            ],
                            "name": "system"
                        }
                    ],
                    "name": "memory"
                },
                {
                    "children": [
                        {
                            "name": "freeswap",
                            "value": 0
                        },
                        {
                            "name": "totalswap",
                            "value": 0
                        },
                        {
                            "name": "maxfiledescriptorcount",
                            "value": 1000000
                        },
                        {
                            "name": "openfiledescriptorcount",
                            "value": 183
                        }
                    ],
                    "name": "disk"
                },
                {
                    "children": [
                        {
                            "name": "publisher",
                            "value": 0
                        },
                        {
                            "name": "subscriber",
                            "value": 0
                        },
                        {
                            "name": "client",
                            "value": 0
                        },
                        {
                            "name": "lastidlems",
                            "value": 88955
                        }
                    ],
                    "name": "connections"
                },
                {
                    "children": [
                        {
                            "name": "iftopduration",
                            "value": 5
                        },
                        {
                            "name": "egress",
                            "value": 37.5
                        },
                        {
                            "name": "egress5",
                            "value": 163
                        },
                        {
                            "name": "ingress",
                            "value": 9.88
                        },
                        {
                            "name": "ingress5",
                            "value": 22.9
                        },
                        {
                            "name": "peakratesent",
                            "value": 432
                        },
                        {
                            "name": "peakratereceived",
                            "value": 53.8
                        },
                        {
                            "name": "cumulativesent",
                            "value": 122
                        },
                        {
                            "name": "cumulativereceived",
                            "value": 17.2
                        }
                    ],
                    "name": "network"
                }
            ],
            "nodeGroupName": "ci-nate199-sm2-ng-o",
            "nodeId": "OGApVXeaqv",
            "nodeRoleName": "allinone",
            "parents": [],
            "postProcessorCount": 0,
            "privateIp": "10.7.46.113",
            "publicIp": "129.213.202.68",
            "publisherCount": 0,
            "restreamerCount": 0,
            "subGroupName": "ashburn",
            "subscriberCount": 0,
            "timestamp": 1717521788509
        },
        "scalingEvent": {
            "nodeGroupName": "ci-nate199-sm2-ng-o",
            "nodeId": "OGApVXeaqv",
            "nodeRoleName": "allinone",
            "state": "INSERVICE",
            "subGroupName": "ashburn",
            "timestamp": 1717521702349
        }
    }
]
```

Note that for each node in the cluster, the report includes the most recent `nodeEvent`, with metrics and statistics as well as the most recent `scalingEvent` with server state.

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No master NodeGroupConfig found for `nodeGroupName`
