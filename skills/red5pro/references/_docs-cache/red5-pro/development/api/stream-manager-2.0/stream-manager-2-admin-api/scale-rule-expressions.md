_From: Stream Manager 2.0 Admin API_

## Scale Rule Expressions

ScaleRule Expressions allow users to specify scaling thresholds of nearly arbitrary complexity (limited in overall length to 4096 characters, and limited to the metrics actually provided by the cluster nodes.) This allows you to control when nodes are added to the cluster, when they are removed, and how the system decides which nodes will be removed as well as which nodes are best to receive traffic requests.


### Metrics

Metrics organized hierarchically in categories. Nodes report metrics periodically -- the rate is controlled by the Autoscale Plugin configuration on the cluster nodes (in the the Red5Pro server image).

Here we will use a dot-based notation where `.` denotes a parent-child relationship.

`cpu.processors` :  Long, count. Total effective CPU cores.

`cpu.system.load` : Double. System load average. The precise meaning and averaging period are operating system-dependent.

`cpu.process.load` : Double. Process load average. Again, precise meaning and averaging period are operating system-dependent.

`cpu.process.time` : Long. Process time, in milliseconds.

`cpu.loadavg.1min` : Double. System load average, 1 minute window. Derived from `/proc/loadavg`.

`cpu.loadavg.5min` : Double. System load average, 5 minute window. Derived from `/proc/loadavg`.

`cpu.loadavg.15min` : Double. System load average, 15 minute window. Derived from `/proc/loadavg`.

`memory.vm.free` : Long. VM free space, in bytes.

`memory.vm.max` : Long. VM max allocated, in bytes.

`memory.vm.total` : Long. VM total allocated, in bytes.

`memory.system.committedvirtual` : Long. Total allocated memory, in bytes.

`disk.freeswap` : Long. Free swap space, in bytes.

`disk.totalswap` : Long. Total swap space, in bytes.

`disk.maxfiledescriptorcount` : Long. Maximum number of open files.

`disk.openfiledescriptorcount` : Long. The number of currently open file descriptors.

`connections.publisher` : Long. Publisher connection count.

`connections.subscriber` : Long. Subscriber connection count.

`connections.client` : Long. Total number of client connections (including publishers, subscribers, cluster connections, restreamers, etc).

`connections.lastpubsubms` : Long. Initially null. Total time since last publish or subscribe initiated on this node, in milliseconds. 

`connections.lastidlems` : Long. Initially `0`. Time without any active publisher or subscriber connection on this node, in milliseconds.

#### Network metrics 

Network metrics are derived from 'iftop'. The server nodes will periodically run the `iftop` command and report the results. Metrics also include `iftopduration` which is the configured sampling duration.

`network.iftopduration` : Duration of network sampling in seconds. Minimum 1, maximum 30.

`network.ingress` : Network receive rate average for the last 2 seconds, in kilobits per second. 

`network.egress` : Network send rate average for the last 2 seconds, in kilobits per second.

`network.peakratereceived` : Network peak received rate for the last `iftopduration` seconds, in kilobits per second.

`network.peakratesent` : Network peak send rate for the last `iftopduration` seconds, in kilobits per second.

`network.cumulativereceived` : Network cumulative bytes received for the last `iftopduration` seconds, in kilobytes.

`network.cumulativesent` : Network cumulative bytes sent for the last `iftopduration` seconds, in kilobytes.

When iftop duration is greater than 2, metrics include a second set of data points, `ingress10` and `egress10`. If iftop duration is less than 10, the label will reflect the number of seconds. Example : `ingress6`  

`network.ingress10` : Network receive rate average for the last 10 seconds, in kilobits per second. 

`network.egress10` : Network send rate average for the last 10 seconds, in kilobits per second.

When `iftopduration` is greater than 10 seconds, metrics include a third set of data points, `ingress30` and `egress30`. If iftop duration is less than 30, the label will reflect the number of seconds. Example : `ingress20`

`network.ingress30` : Network receive rate average for the last 30 seconds, in kilobits per second. 

`network.egress30` : Network send rate average for the last 30 seconds, in kilobits per second.


### Capacity Expressions

A **Capacity Expression** is an arithmetic expression that evaluate to a **numeric** value. A `ScaleRule` defines two different Capacity Expressions: the `capacityRankingExpression`, and the `capacityLimitExpression`. See `ScaleRule` above.

Capacity Expresions combine metrics for a given node. Therefore, there is no aggregation and all metrics are singular. **Any of the above metrics** are allowed in a Capacity Expression.

Internally, a `capacityRankingExpression` is evaluated at 64-bit floating point (`double`) precision. In the AS-Autoscale service, the `double` value is used to sort nodes to decide which node(s) to scale in. Meanwhile, in the AS-Streams service, the resulting value (after evalutation) is then truncated to a 32-bit `integer` before it is used to compare against the `capacityLimitExpression` to determine whether the node is or is not under capacity (available).

Also allowed are the **operators** `+`, `-`, `*`, and `/`, with conventional precedence. As well as parentheses `(` and `)` to specify order of precedence.

**Numeric values** may also be specified, either with or without a decimal.

#### Example Capactiy Expressions

**Expression:** `2.12`
**Result:** `2`

**Expression:** `2 + 2.12`
**Result:** `4`

**Expression:** `(5 - 3.14159) * 2`
**Result:** `3`

**Expression:** `cpu.processors`
**Result:** `20`

**Expression:** `cpu.system.load * 10`
**Result:** `4`

**Expression:** `cpu.system.load * 10 + cpu.process.load * 20`
**Result:** `5`

**Expression:** `cpu.system.load * 10 + cpu.process.load * 20 + 27.93 * (memory.system.committedvirtual / (1024 * 1024 * 1024) + disk.freeswap / (20 * 1024 * 1024 * 1024))`
**Result:** `85`

#### Metric values for above examples

`cpu.processors` : 20

`cpu.system.load` : 0.43

`cpu.process.load` : 0.058589355798315125

`cpu.process.time` : 26546875000

`memory.vm.free` : 1786280192

`memory.vm.max` : 2147483648

`memory.vm.total` : 2147483648

`memory.system.committedvirtual` : 2479390720

`memory.system.freephysical` : 2266726400

`memory.system.totalphysical` : 34276769792

`disk.freeswap` : 11859357696

`disk.totalswap` : 79887192064

`connections.publisher` : 0

`connections.subscriber` : 0

`connections.client` : 0

### Scale Expressions

**Scale Expressions** are different than Capacity Expressions in two ways. First, Scale Expressions evaluate to a Boolean value to indicate if scaling should occur. Second, Scale Expressions are used to evaluate all of the nodes of a given Role in a given SubGroup together -- therefore Scale Expressions act on **aggregate values**.

Internally, Scale Expressions are evaluated as 64-bit floating point (`double`) precision or as Boolean values. The result must always be a Boolean value.

Scale expressions consist of aggregates and numeric values combined with the following operators.

The **operators** `+`, `-`, `*`, and `/` are allowed, with conventional precedence. As well as parentheses `(` and `)` to specify order of precedence.

Additionally, the **comparison operators** `>` and `<` are included. These operators compare numeric expresions and produce a Boolean result.

Further, the **Boolean operators** `&&` (AND), `||` (OR), and the unary negation operator `!` (NOT) are used to combine Boolean expressions.

#### Aggregation

In a Scale Expression, any metric must be wrapped in an **aggregation function** to indicate how the server will aggregate the metric values for all nodes belonging to the given `NodeRole` within the given `SubGroup`.

The available aggregation functions are:

`avg`: average

`count`: count (number of contributing nodes)

`min`: minimum value

`max`: maxmium value

`sum`: total value

#### Example Scale Expressions

**Expression:** `2 < 1.0`
**Result:** `false`

**Expression:** `3.14 > 3`
**Result:** `true`

**Expression:** `1 * 2 * 3 + 4 > 3.333 * (2 / 0.14)`
**Result:** `false`

**Expression:** `avg(cpu.process.load) < 1.0 && avg(cpu.system.load) < 2.0`
**Result:** `true`

**Expression:** `count(cpu.processors) < 10 && avg(cpu.system.load) > 2.0`
**Result:** `false`

**Expression:** `min(cpu.system.load) < 0.5`
**Result:** `true`

**Expression:** `max(cpu.system.load) > 0.5`
**Result:** `true`

**Expression:** `avg(cpu.system.load) > 0.52 && avg(cpu.system.load) < 0.54`
**Result:** `true`

#### Metric values for above examples

**Node: `node1`**

`cpu.processors` : 20

`cpu.system.load` : 0.43

`cpu.process.load` : 0.05

`cpu.process.time` : 26546875000

`memory.vm.free` : 1000000000

`memory.vm.max` : 2000000000

`memory.vm.total` : 2400000000

`memory.system.committedvirtual` : 25000000000

`memory.system.freephysical` : 7000000000

`memory.system.totalphysical` : 35000000000

`disk.freeswap` : 10000000000

`disk.totalswap` : 80000000000

`connections.publisher` : 12

`connections.subscriber` : 37

`connections.client` : 80

**Node: `node2`**

`cpu.processors` : 20

`cpu.system.load` : 0.63

`cpu.process.load` : 0.158

`cpu.process.time` : 24546875000

`memory.vm.free` : 400000000

`memory.vm.max` : 2000000000

`memory.vm.total` : 2400000000

`memory.system.committedvirtual` : 29000000000

`memory.system.freephysical` : 3000000000

`memory.system.totalphysical` : 35000000000

`disk.freeswap` : 5000000000

`disk.totalswap` : 80000000000

`connections.publisher` : 26

`connections.subscriber` : 97

`connections.client` : 140
