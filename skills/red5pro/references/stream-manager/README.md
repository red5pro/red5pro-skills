# Stream Manager 2.0

Source: live docs at [https://www.red5.net/docs/red5-pro/users-guide/stream-manager-2.0/](https://www.red5.net/docs/red5-pro/users-guide/stream-manager-2.0/), [https://www.red5.net/docs/red5-pro/development/api/stream-manager-2.0/](https://www.red5.net/docs/red5-pro/development/api/stream-manager-2.0/)

The Stream Manager is Red5 Pro's streaming-architecture management and orchestration service. It automates creating/deleting Red5 Pro server instances and coordinates broadcasters/subscribers to the right server nodes. It is also the backbone of **Red5 Cloud** — see [../cloud/README.md](../cloud/README.md).

## What It Manages

- **Node deployment/lifecycle** for Origin, Edge, Relay, Transcoder, Mixer, and **Video Packager** nodes (see [../server/clustering.md](../server/clustering.md) for role definitions). Video Packager is a distinct SM2.0 node role that transcodes RTMP from origin nodes to HLS for CDN delivery (S3/CloudFront) or local-storage HLS serving — separate from the Transcoder node's ABR job.
- **Dynamic scaling & load balancing** — monitors traffic and node performance to add/remove nodes in real time based on a **NodeGroupConfig** (scaling rules, capacity limits, node configuration — the SM2.0 replacement for the older Scale Policy + Launch Config model), avoiding both over- and under-provisioning.
- **Monitoring/analytics** — latency, bandwidth, viewer engagement, node health.
- **Multi-region deployment** — placing infrastructure closer to viewers to cut latency.
- **Security** — token-based authentication, encryption, access control.
- **Failover** — reroutes traffic away from unhealthy nodes and replaces them automatically.

## Key Terms

- **Node** — a server instance performing a defined role (origin, edge, relay, transcoder, mixer, video packager).
- **NodeGroup** — a cluster of nodes (e.g. origin/edge, origin/relay/edge, transcoder/origin/edge) created per a **NodeGroupConfig**. Client SDKs targeting Red5 Cloud must specify which node group they're publishing/subscribing against.
- **Stream Provisioning** — the setup of a stream by a broadcaster client, via the Stream Manager's API.

## APIs

Stream Manager 2.0 exposes the following REST services:

- **Admin API** — deploy/manage Red5 Pro nodes; scales nodes in/out per scaling and capacity expressions and current load.
- **Auth API** — authenticates clients and issues JWTs for use with the other Stream Manager services.
- **Proxy API** — securely routes client requests to the appropriate node based on capacity/limit expressions and current load. This is what client SDKs hit when they configure an `endpoint` (e.g. `.../as/v1/proxy/whip/live/{streamName}` or `.../as/v1/proxy/whep/live/{streamName}`) — see [../sdks/web-webrtc-sdk.md](../sdks/web-webrtc-sdk.md).
- **Scheduling NodeGroups API** — schedule node groups to scale in/out on a time schedule.
- **Streams API** — handles publish/subscribe requests and reports node-group load.
- **Streams Provision API** — provisions streams for publishing/subscribing based on request parameters.
- **Streams Mixer API** — create and control Brew Mixer video mixes in an autoscaled deployment (counterpart to the standalone [Mixer API](../api/README.md#mixer)).

An OpenAPI/Swagger UI and a CURL cheat-sheet are documented for exploring/testing these APIs directly.

## When to Fetch More

Exact request/response schemas for each Stream Manager 2.0 API, and the restreamer migration notes for moving from Stream Manager 1 to 2.0, should be pulled from the live docs at [https://www.red5.net/docs/red5-pro/development/api/stream-manager-2.0/](https://www.red5.net/docs/red5-pro/development/api/stream-manager-2.0/) — don't guess at field names or endpoint paths.
