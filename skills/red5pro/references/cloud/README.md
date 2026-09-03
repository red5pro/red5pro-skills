# Red5 Cloud

Source: live docs at [https://www.red5.net/docs/red5-cloud/](https://www.red5.net/docs/red5-cloud/) — `users-guide/`, `introduction/`, `troubleshooting/`, and `development/sdks/` subtrees

Red5 Cloud extends Red5 Pro through a **Platform-as-a-Service (PaaS)** model: Red5 fully manages the infrastructure (deployment, scaling, security, performance) so users focus on building applications and content rather than server operations. It is Red5's own managed offering — different from a self-hosted Red5 Pro cluster you deploy yourself via Terraform (see [../server/installation.md#cloud-terraform](../server/installation.md#cloud-terraform)).

Deciding Cloud vs. Pro comes down to who manages the infrastructure: Cloud trades the ability to run your own servers for a fully managed environment (no server/scaling management, faster time-to-market, built-in monitoring). Typical fits: one-to-one (private calls), one-to-many (broadcasts/webinars), many-to-many (virtual classrooms/collaboration), many-to-few (security/monitoring feeds), and fan-engagement (interactive live events) scenarios.

## What It Is, Concretely

Red5 Cloud deploys and manages **Red5 Pro + Stream Manager 2.0** for you (see [../stream-manager/README.md](../stream-manager/README.md)). Client SDKs connect to a Stream Manager host of the form `<deployment>.cloud.red5.net`, targeting a specific **node group**, rather than a raw server IP.

## Key Features

- Streaming protocols: **WebRTC**, **RTMP**, **SRT**, **Zixi** (all with dedicated quick-start guides — see Getting Started below), and **HLS** (playback, GA as of Cloud v1.14.0). RTSP push/pull is also supported, but as a Streams UI capability, not documented as client-SDK RTSP support specifically.
- **Auto-scaling** — resources adjust to demand automatically.
- **Isolated service** — other customers' traffic/load does not affect your stream performance.
- **Global network of data centers** for low-latency delivery worldwide.
- Built-in security to protect streams and data integrity.

## Regions

Red5 Cloud spans 10 regions (as documented): Australia East (Sydney), Singapore, Europe Central (Frankfurt), Europe West (London), Middle East West (Jeddah), Canada East (Toronto), Mexico Central (Querétaro), United States East (Ashburn), United States West (San Jose), Brazil South (São Paulo).

Your account's **default region** is where your Stream Manager is initially deployed — chosen for proximity to your primary audience (latency), though you can expand to additional regions for scalability, redundancy, and regulatory/data-residency needs.

## Management Console

The primary interface for creating/managing deployments, regions, and node groups; monitoring performance and analytics; and managing account/billing.

## Getting Started

Red5 Cloud's Quick Start Guide covers, as distinct step-by-step paths depending on your ingest protocol:

- General live streaming, start to finish (account creation → broadcasting).
- **Zixi** streaming setup.
- **RTMP** streaming setup (e.g. for platforms like YouTube/Facebook or custom encoders).
- **SRT** streaming setup.

## Other Documented Capabilities

- **RTMP Proxy** — a documented Red5 Cloud capability for proxying RTMP traffic (see [https://www.red5.net/docs/red5-cloud/users-guide/red5-cloud-rtmp-proxy/](https://www.red5.net/docs/red5-cloud/users-guide/red5-cloud-rtmp-proxy/) for specifics before implementing).
- **Transcoding** — ABR/transcoding as a managed feature of the platform (see [https://www.red5.net/docs/red5-cloud/users-guide/red5-cloud-transcoding/](https://www.red5.net/docs/red5-cloud/users-guide/red5-cloud-transcoding/)).
- **TrueTime Meetings** — a Red5 Cloud feature documented at [https://www.red5.net/docs/red5-cloud/users-guide/truetime-meetings/](https://www.red5.net/docs/red5-cloud/users-guide/truetime-meetings/).
- **PubNub Integration** — chat/presence/interactivity via PubNub, with HTML5/iOS/Android SDK snippets, documented at [https://www.red5.net/docs/red5-cloud/users-guide/red5-pubnub-integration/](https://www.red5.net/docs/red5-cloud/users-guide/red5-pubnub-integration/).

## Troubleshooting

Thin — mostly redirects to Red5 support rather than self-serve content. See [https://www.red5.net/docs/red5-cloud/troubleshooting/](https://www.red5.net/docs/red5-cloud/troubleshooting/) (FAQs + support-portal pointer) before telling a user there's no documented path for a Cloud-specific problem.

## When to Fetch More

Exact account/billing flows, the RTMP proxy configuration, and transcoding-profile specifics are managed-service details that can change without a client-side release — verify against the live docs at [https://www.red5.net/docs/red5-cloud/users-guide/](https://www.red5.net/docs/red5-cloud/users-guide/) before giving step-by-step instructions. For version-specific changes (new regions, protocol GA status, scaling-algorithm changes), check [https://www.red5.net/docs/red5-cloud/resources/release-notes/](https://www.red5.net/docs/red5-cloud/resources/release-notes/) rather than assuming this file's claims are current — release notes are inherently point-in-time.
