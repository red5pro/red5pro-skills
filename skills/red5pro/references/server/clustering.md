# Clustering

Source: local cache [`../_docs-cache/red5-pro-basics/streaming-glossary.md`](../_docs-cache/red5-pro-basics/streaming-glossary.md), [`../_docs-cache/red5-pro/users-guide/clustering/`](../_docs-cache/red5-pro/users-guide/clustering/) — mirrors [https://www.red5.net/docs/red5-pro-basics/streaming-glossary](https://www.red5.net/docs/red5-pro-basics/streaming-glossary), [https://www.red5.net/docs/red5-pro/users-guide/clustering/](https://www.red5.net/docs/red5-pro/users-guide/clustering/)

A **cluster** is a set of active servers that together make real-time streams available, used when a single server can't handle the number of connections/streams required. A stand-alone server is an origin and an edge combined; clustering splits those responsibilities across nodes.

## Node Roles

- **Origin** — accepts publishers (encoders). In a non-autoscaling cluster, an origin can also be configured to accept subscribers directly, or run in hybrid mode repeating streams from another origin.
- **Edge** — delivers streams to subscribers. An edge requires at least one origin to repeat content from, and can be configured to talk to more than one origin.
- **Relay** — an intermediary between an origin and an edge. Relays let a cluster scale into the tens of millions of subscribers by fanning out beyond what direct origin→edge connections could handle.
- **Transcoder node** — runs Cauldron (Red5's media engine) dedicated to transcoding; sits in front of an origin and pushes data to it. See [../streaming-features/README.md](../streaming-features/README.md#transcoder--abr).
- **Mixer node** — runs Cauldron dedicated to mixing streams; also sits in front of an origin. See [../streaming-features/README.md](../streaming-features/README.md#mixer-brew-mixer).

## Static Clustering vs. Autoscaling

- **Static clustering** (Clustering Plugin): you hand-configure a fixed set of origin/edge nodes (the `cluster.xml` config exposes `origins`/`password`/`publicIp`/`publicPort`/`privateInstance`/`retryDuration` — no direct relay setting; relay is more of an autoscaling-cluster concept per the streaming glossary, so don't assume a `cluster.xml` relay knob exists). **Requires a paid license** — not supported on Trial or Developer license types.
  - *Basic clustering*: multiple subscriber endpoints for a broadcast stream.
  - *Advanced clustering*: multiple endpoints for both publishers and subscribers.
- **Autoscaling** (Stream Manager): nodes and node groups are created/destroyed dynamically based on a **NodeGroupConfig** (scaling/capacity expressions, publisher/subscriber limits — the SM2.0 replacement for the older Scale Policy + Launch Config model), coordinated by the Stream Manager via a Cloud Controller talking to the cloud provider's API. See [../stream-manager/README.md](../stream-manager/README.md). A **NodeGroup** is a cluster of any number of origin/edge, origin/relay/edge, or transcoder/origin/edge nodes.

## Capacity Planning Notes

On an origin node, connection logs report `edge-proxy`, `re-streamers`, and `total count`:

- **total count** — direct publishers/subscribers on that origin; this is what drives autoscaling decisions (scaling is based on publisher count).
- **edge-proxy** — number of child connections (edge servers, or relays if present).
- **re-streamers** — number of cluster-restreamer connections, equal to (number of streams) × (edge-proxy connections). Origin↔edge communication is over RTMP, so RTMP subscriber capacity numbers are a reasonable guideline for origin restreamer capacity.

Example: 1 origin, 1 edge, 1 stream → total count 1, edge-proxy 1, restreamers 1. But 1 origin with 100 edges and 3 streams → 300 restreamer connections + 100 edge-proxy connections on the origin, even though total count (publishers) is only 3. See [../troubleshooting.md](../troubleshooting.md) for the full capacity-planning discussion.

## When to Fetch More

Exact `cluster.xml` field-level config, NodeGroupConfig JSON schemas, and license-type details change per release — check the local cache at [`../_docs-cache/red5-pro/users-guide/clustering/`](../_docs-cache/red5-pro/users-guide/clustering/) (or [https://www.red5.net/docs/red5-pro/users-guide/clustering/](https://www.red5.net/docs/red5-pro/users-guide/clustering/) for the current version) rather than reconstructing config syntax from memory.
