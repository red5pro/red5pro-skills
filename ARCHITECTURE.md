# Architecture

This file documents the internal design of the **`red5pro`** skill specifically — its 4-layer content split and link-first vs. inline strategy. Other skills in this repo (see [AGENTS.md](AGENTS.md) for the full list, e.g. `agora-to-red5-cloud-pubnub-migration`) are smaller and don't necessarily follow this exact layering, but should still apply the same underlying principle: state explicitly what's verified against a real source and what isn't, and don't duplicate content `red5pro` already covers — link to it instead. See [AGENTS.md § Adding a New Skill](AGENTS.md#adding-a-new-skill) for that bar applied to a new skill.

## 4-Layer Progressive Disclosure

LLM context windows are finite. Load the minimum needed, go deeper only when required.

| Layer | What | Size | When Loaded |
|-------|------|------|-------------|
| **1 — Description** | Trigger keywords in `SKILL.md` frontmatter | ~100 words | Always (skill index) |
| **2 — SKILL.md body** | Route index, guardrails, ambiguity rules | ~75 lines | On activation |
| **3 — Reference README** | Overview, critical rules, topic links | 20–100 lines | Per topic area |
| **4 — Topic files** | Implementation detail, code examples | 25–135 lines | Per platform/feature |

Navigation: `SKILL.md` → topic area `README.md` → topic file (e.g., `android-sdk.md`, `clustering.md`).

## Link-First vs. Inline Strategy

Not all content belongs inline. The skill uses two strategies depending on how fast the underlying `red5pro-docs` content moves and how well it documents implementation detail:

| Area | Strategy | Why |
|---|---|---|
| **Client/Backend SDKs** (Web, Android, iOS, Conference, Backend, Core) | Inline code examples | SDK builder patterns, method names, and event callbacks are stable per major version and `red5pro-docs` doesn't always show them concisely |
| **Protocols, Authentication, Clustering** | Inline concepts | Stable concepts (WebRTC/RTMP/RTSP/HLS behavior, node roles, auth mechanism trade-offs) that rarely change |
| **REST APIs** (`api/`, Stream Manager 2.0) | TOC + "When to Fetch More" pointers | Exact request/response schemas are release-specific and best read directly from `red5pro-docs/website/docs/red5-pro/development/api/` |
| **Server Installation** | TOC + pointers | OS-specific commands, license activation, and upgrade steps change per release |

Every reference file that isn't fully inline ends with a **"When to Fetch More"** section naming the exact `red5pro-docs` path to check instead of guessing.

## File Structure

```
skills/
└── red5pro/                          Skill root
    ├── SKILL.md                      Entry point, route index
    └── references/
        ├── server/                   Red5 Pro server
        │   ├── README.md             Distribution modes, requirements, critical rules
        │   ├── installation.md       Stand-alone, static cluster, Terraform cloud, SSL
        │   └── clustering.md         Origin/edge/relay/transcoder/mixer roles, capacity notes
        ├── protocols/                 Streaming protocols
        │   └── README.md              WebRTC/WHIP/WHEP, RTMP/ERTMP, RTSP, HLS, third-party publishers
        ├── authentication/            Access control
        │   └── README.md              Round Trip, JWT, Simple Auth
        ├── streaming-features/        Server-side features
        │   └── README.md              Restreamer, Transcoder/ABR, Brew Mixer, Recording & VOD,
        │                              stream aliasing, single-port muxing, webhooks, thumbnails, DRM
        ├── stream-manager/            Orchestration & autoscaling
        │   └── README.md              Stream Manager 2.0 concepts + Admin/Auth/Proxy/Streams/
        │                              Provision/Mixer/Scheduling APIs
        ├── cloud/                     Red5 Cloud (managed PaaS)
        │   └── README.md              Overview, regions, architecture, quick starts, RTMP proxy
        ├── sdks/                      Client & backend SDKs
        │   ├── README.md              Platform index, cross-cutting notes (license keys, PubNub, conferencing)
        │   ├── web-webrtc-sdk.md      red5pro-webrtc-sdk: WHIPClient/WHEPClient
        │   ├── android-sdk.md         IRed5WebrtcClient builder: publish/subscribe/chat/conferencing/stats
        │   ├── ios-sdk.md             Red5WebrtcClientBuilder: publish/subscribe/chat/conferencing
        │   ├── conference-sdk.md      red5pro-conference-sdk: room-based web conferencing
        │   ├── backend-sdk.md         Node/Java/Go: conference & chat token generation
        │   └── core-sdk.md            Native C++ SDK (r5core, r5webrtc, r5device, r5ffmpeg, r5net)
        ├── api/                       Server & management REST APIs
        │   └── README.md              Server, mixer, restreamer, transcoder, auth, Stream Manager 2.0
        └── troubleshooting.md          Capacity planning, connection-stats math
```

## Maintaining and Extending

### Adding a New Topic Area

1. Create `references/{topic}/README.md` (Layer 3)
2. Add an entry to the **Route Selection** section of `SKILL.md`
3. Create topic files as needed (Layer 4)

### Adding a New SDK Platform

1. Create `references/sdks/{platform}.md` (Layer 4)
2. Add a link in `references/sdks/README.md`

### Updating Content

- Edit the specific Layer 4 file
- **Inline files** (SDKs, protocols, authentication, clustering): keep code examples and mechanism descriptions current
- **Link-first files** (api/, server installation): update the "When to Fetch More" pointer if `red5pro-docs` restructures
- Don't duplicate content that lives in `red5pro-docs` verbatim beyond what's needed for routing and stable code patterns — link to the specific page instead

### Verifying URLs

```bash
grep -roh 'https://[^ )]*' skills/red5pro/ | sort -u | while read url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "$url")
  echo "$code $url"
done
```
