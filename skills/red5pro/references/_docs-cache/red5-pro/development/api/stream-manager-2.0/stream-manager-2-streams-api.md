---
title: Stream Manager 2.0 Streams API
menu_order: 5
---

## Streams Service (Streams)


### List All Streams

Retrieve a summary of all streams within a NodeGroup, on INSERVICE nodes.

This is complicated by stats (subscriber counts) and aggregation.
| stats | aggregate |                                                                                                     |
|-------|-----------|-----------------------------------------------------------------------------------------------------|
| false | false     | return a list of all streams on every node                                                          |
| false | true      | return a list of all origin streams (ingest streams)                                                |
| true  | false     | return a list of of all streams on every node and the subscriber count for each stream on that node |
| true  | true      | return a list of all origin streams and the total subscriber count across all nodes for each stream |

#### List All Streams Request

GET `https://<host>/as/v1/streams/stream/<nodeGroupName>?stats=true&aggregate=false`

`stats`: Optional, default `false`. If `true`, the response should include stream statistics (ie, subscriber counts).

`aggregate`: Optional, default `true`. Report only publishing servers. If responding with stats, aggregate the stream stats.

#### List All Streams Response

**On success:**

HTTP 200: OK

With stats but not aggregation:

GET `https://<host>/as/v1/streams/stream/nodeGroup-X2NK6?stats=true&aggregate=false`

```json
[
  {
    "streamGuid": "live/stream1",
    "serverAddress": "10.0.0.1",
    "nodeRole": "origin",
    "subGroup": "subGroup-g9ToU",
    "nodeState": "INSERVICE",
    "subscribers": 0,
    "durationMs": 600000
  },
  {
    "streamGuid": "live/stream1",
    "serverAddress": "10.0.0.150",
    "nodeRole": "relay",
    "subGroup": "subGroup-g9ToU",
    "nodeState": "INSERVICE",
    "subscribers": 0,
    "durationMs": 600000
  },
  {
    "streamGuid": "live/stream1",
    "serverAddress": "10.0.0.51",
    "nodeRole": "transcoder",
    "subGroup": "subGroup-g9ToU",
    "nodeState": "INSERVICE",
    "subscribers": 0,
    "durationMs": 600000
  },
  {
    "streamGuid": "live/stream1",
    "serverAddress": "10.0.0.101",
    "nodeRole": "edge",
    "subGroup": "subGroup-g9ToU",
    "nodeState": "INSERVICE",
    "subscribers": 25,
    "durationMs": 600000
  }
]
```

**On error:**
HTTP 404: Node group not found for `<nodeGroupName>`.

Body:

```json
{
  "error" : "<error description>"
}
```


### Get Stream Stats

Get the subscriber count for a given stream.

**Without aggregation**, return a list of every node hosting the stream and the subscriber count on that node.

**With aggregation**, return only the originating node and the total subscriber count across all nodes for the  stream.

#### Get Stream Stats Request

GET `https://<host>/as/v1/streams/stream/<nodeGroupName>/stream/<streamGuid>?aggregate=true`

`aggregate`: Optional, default `true`. Report only the publishing server, aggregating the stream stats (ie, all subscribers on all edges are included in the publishing server's subscriber count).


### Get Server for Publish

Find a server to publish a stream (aka, "get origin").

Note that if a matching Provision is found (a Provision containing a matching `streamGuid`), this request forwards the provision to the chosen server(s).

The "best" server is chosen as follows:

Without `subGroup`, find all nodes belonging to roles with PUBLISH capability. Sort nodes by evaluating the `capacityRankingExpression` for each subGrop-role pair. Collect the set of best nodes (those with equal, lowest value). Shuffle the best node set, return the top node`endpoints` nodes.

With `subGroup`, find all nodes belonging to roles with PUBLISH capability. Sort nodes by `subGroup` and by evaluating the `capacityRankingExpression` for each subGrop-role pair. Sort by SubGroup first (matching specified to the top). Fail if `strict` but no match. Shuffle the best node set, return the top `endpoints` nodes.

If `shuffleSizeExpression` is set in `NodeGroupConfig`, it is evaluated and determines what portion of the best node set will be shuffled.

#### Get Server for Publish Request
GET `https://<host>/as/v1/streams/stream/<nodeGroupName>/publish/<streamGuid>?subgroup=us-east&strict=false&transcode=false&endpoints=1`

`nodeGroupName`: Required. The name of the NodeGroup. If running a system with only one NodeGroup, you may use `default` as an alias (the name `default` matches any NodeGroup's name as long as there is only one NodeGroup defined).

`subgroup`: Optional, default `null` meaning "all". The name of the subgroup (the immediate parent) of candidate nodes. May be a comma-separated list, in order of preference.

`strict`: Optional, default false. Return only the specified `endpoints` number of servers from the specified `subgroup` (or fail). If not strict, other regions or fewer servers may be returned.

`endpoints`: Optional, default `1`. The number of endpoints to return. If not `strict`, this is the max -- "up to" this many endpoints will be returned. If `strict`, this is both the max and min and exactly this number of endpoints will be returned, or else fail.

`transcode`: Optional, default `false` If true, there must be a valid provision (previously created with a Create Provision request), such that the `Provision.streamGuid` matches this publish request `streamGuid`.

#### Get Server for Publish Response

The response is a list of one or more servers. You should always publish to the first server in the list.

In the case that an ABR Provision has previously been created, and transcoding requested, the response will include both the chosen Transcoder (first, this is where you should publish) as well as the Transcoder's destination Origin to indicate the servers that received the Provision.

**On success:**

HTTP 200: OK

Body:

```json
[
  {
    "streamGuid": "live/stream1",
    "serverAddress": "132.226.54.176",
    "nodeRole": "allinone",
    "subGroup": "ashburn",
    "nodeState": "INSERVICE",
    "subscribers": 0
  }
]
```

**On error:**

HTTP 400: `endpoints` greater than one but `transcode` is true.

HTTP 400: `endpoints` was explicitly specified but is less than one.

HTTP 404: Node group not found for `<nodeGroupName>`, or restrictions could not be met, or no servers found, or transcode requested but no matching provision found.


### Get Server for Subscribe

Find one or more servers to subscribe to a stream (aka, "get edge").

The "best" server is chosen as follows. This is very similar to Publish except that all candidate nodes must also be publishing the requested stream:

Without `subgroup`, find all nodes publishing the requested stream belonging to roles with `SUBSCRIBE` capability. Sort nodes by evaluating the `capacityRankingExpression` for each subGrop-role pair. Collect the set of best nodes (those with equal, lowest value). Shuffle the best node set, return the top node`endpoints` nodes.

With `subgroup`, find all nodes publishing the requested stream belonging to roles with `SUBSCRIBE` capability. Sort nodes by `subGroup` and by evaluating the `capacityRankingExpression` for each subGrop-role pair. Sort by SubGroup first (matching specified to the top). Fail if `strict` but no match. Shuffle the best node set, return the top `endpoints` nodes.

#### Get Server for Subscribe Request
GET `https://<host>/as/v1/streams/stream/<nodeGroupName>/subscribe/<streamGuid>?subGroup=us-east&strict=false&endpoints=1`

`nodeGroupName`: Required. The name of the NodeGroup. If running a system with only one NodeGroup, you may use `default` as an alias (the name `default` matches any NodeGroup's name as long as there is only one NodeGroup defined).

`subGroup`: Optional, default all. The name of the subgroup (the immediate parent? or at any level? maybe redefine strict for this sense?) of candidate nodes.

`endpoints`: Optional, default `1`. The number of endpoints to return. If not `strict`, this is the max -- "up to" this many endpoints will be returned. If `strict`, this is both the max and min and exactly this number of endpoints will be returned, or else fail.

`strict`: Optional, default false. Fail if either `subGroup` or `endpoints` restrictions cannot be met. (Otherwise return best effort).

No body.

#### Get Server for Subscribe Response

**On success:**

HTTP 200: OK

Body:

```json
[
  {
    "streamGuid": "live/stream1",
    "serverAddress": "132.226.54.176",
    "nodeRole": "allinone",
    "subGroup": "ashburn",
    "nodeState": "INSERVICE",
    "subscribers": 0
  }
]
```

**On error:**

HTTP 400: `endpoints` was explicitly specified but is less than one.

HTTP 404: Node group not found for `<nodeGroupName>`, or restrictions could not be met, or no servers found.
