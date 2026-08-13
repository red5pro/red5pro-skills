---
title: Stream Manager 2.0 Expressions
menu_order: 4
---


## Introduction

In programming, expressions are fundamental building blocks. They consist of variables, constants, and operators arranged according to the rules of the language. These elements work together to produce a single value. Expressions can be simple, like a single variable referring to a stored number, or complex, involving calculations, comparisons, or function calls.

In the Stream Manager 2.0 API, several kinds of expressions have been defined to allow for flexible configuration to control the dynamic behavior of the system.


## Capacity Expressions

Capacity expressions are used to rank cluster nodes (Red5Pro Servers) to find the "best" server for a given request, to find a least-used server to scale in (Capacity Ranking Expression), and to limit the number of publishers and subscribers directed to a given node (Capacity Limit Expression).

Capacity expressions combine metrics for a given node and evaluate to a numeric value.

Example capacity expressions:
```
"capacityRankingExpression": "connections.publisher * 10 + connections.subscriber",
"capacityLimitExpression": "200"
```


## Scale Expressions

Scale expressions are used to determine when scaling should occur. Every ScaleRule has two scale expressions: the `inExpression` and the `outExpression`. A ScaleRule is associated with a SubGroup-Role -- for example, "origin servers in ashburn-1". The [Stream Manager 2.0 Autoscale service](/docs/red5-pro/users-guide/stream-manager-2.0/stream-manager-2-services/) continually aggregates node metrics per SubGroup-Role and then periodically evaluates scale expressions to determine whether nodes should be scaled in, scaled out, or if no scaling should occur.

Scale expressions combine metrics for all nodes in a SubGroup-Role using **aggregation functions** (such as average, minimum, maximum, etc), and evaluate to a Boolean value.

Example scale expressions:
```
"outExpression": "avg(connections.publisher) > 15",
"inExpression": "avg(connections.publisher) < 2",
```


## Shuffle Size Expressions

**Shuffle** is an important concept when balancing load during rapid ingest/egress. When publishing or subscribing begins, it can take a small amount of time until the node metrics are reported and aggregated. During this time window, reported capacity does not yet match actual capacity. Therefore, although we use capacity expressions to rank servers and find the least used, during times of rapid publish and subscribe requests the [Stream Manager 2.0 Streams service](/docs/red5-pro/users-guide/stream-manager-2.0/stream-manager-2-services/) may overload a server that was initially considered "best".

The **shuffle** mechanism allows you to distribute load among several "best" servers instead of always using the single top best result. When many requests arrive rapidly, the top `shuffleSize` number of best servers will be found. That short list of servers is then shuffled (ie, the order is randomized) before the top server is returned.

Shuffle size expressions only use one variable, the `nodeCount` -- this is the total number of matching available servers found to match the publish or subscribe request -- and they evaluate to an integer value.

```
"shuffleSizeExpression": "1",
"shuffleSizeExpression": "max(min(nodeCount*0.1, 2), 5)",
```
