---
name: red5pro
description: >-
  Activate when the user wants to build live streaming or real-time video
  applications with Red5 Pro or Red5 Cloud — WebRTC/WHIP/WHEP publish and
  subscribe, RTMP/ERTMP/RTSP/HLS ingest and playback, restreaming (RTMP, SRT,
  Zixi, IP cameras, file sources), transcoding/ABR, server-side mixing (Brew
  Mixer), recording and VOD, stream authentication (Round Trip, JWT, Simple),
  clustering and autoscaling (Stream Manager 2.0), or client SDK integration
  for Web, Android, iOS, native (Core SDK), conferencing (Conference SDK), or
  backend token generation (Node/Java/Go).
metadata:
  author: red5
  version: "0.1.0"
  source: https://www.red5.net/docs/
---

# Red5 Pro / Red5 Cloud

Top-level workflow for selecting the right Red5 path and loading only the references needed for the task.

## Workflow

1. Identify whether the user is targeting **Red5 Pro** (self-hosted/on-prem/cloud-installed server they control) or **Red5 Cloud** (Red5's fully managed PaaS at `*.cloud.red5.net`). Many tasks apply to both — the client SDKs and protocols are shared.
2. Choose exactly one primary route first from **Route Selection** below.
3. Load only the primary reference's `README.md` first (Layer 3). Go to a topic file (Layer 4) only when the task needs that level of detail.
4. If the task spans multiple areas (e.g., "build an Android app that publishes to an autoscaled cluster"), load the client SDK reference first, then add the supporting server-side reference (Stream Manager, Authentication) only as needed.
5. Ask at most one focused clarification if the route is still ambiguous after checking the cues in **Ambiguity Handling**.

## Route Selection

- **Server setup / installation / upgrade**: install Red5 Pro standalone, on Linux/macOS/Windows, as a static cluster, via Terraform on cloud infra, or configure SSL for WebRTC
  Route to **[references/server/README.md](references/server/README.md)**.
- **Streaming protocols**: WebRTC, WHIP/WHEP, RTMP/ERTMP, RTSP, HLS, converting recordings to MP4, connection URLs for OBS/FFmpeg/IP cameras, **a WebRTC session that won't connect at all** (SSL, ICE/NAT, TURN)
  Route to **[references/protocols/README.md](references/protocols/README.md)**.
- **Authentication / access control**: Round Trip Auth, JWT Auth, Simple Auth (username/password), stream-bombing prevention
  Route to **[references/authentication/README.md](references/authentication/README.md)**.
- **Streaming features**: restreaming (RTMP/SRT/Zixi/IP cam/file), transcoding/ABR, Brew Mixer (server-side compositing), recording & VOD, stream name aliasing, single-port muxing, webhooks, thumbnails, DRM/watermarking
  Route to **[references/streaming-features/README.md](references/streaming-features/README.md)**.
- **Clustering / autoscaling / Stream Manager**: origin/edge/relay/transcoder/mixer node roles, static clustering vs. autoscaling, Stream Manager 2.0 APIs (Admin, Auth, Proxy, Streams, Provision, Mixer, Scheduling)
  Route to **[references/stream-manager/README.md](references/stream-manager/README.md)**.
- **Red5 Cloud (managed PaaS)**: account/deployment setup, regions, architecture, RTMP proxy, transcoding, quick starts
  Route to **[references/cloud/README.md](references/cloud/README.md)**.
- **Client SDK integration**: building a publisher/subscriber app on a specific platform
  Route to **[references/sdks/README.md](references/sdks/README.md)** first, which points to the platform file (Web, Android, iOS, Conference, Backend, Core/native).
- **Server-side / management REST APIs**: server stats, mixer, restreamer, transcoder, authentication, Stream Manager 2.0
  Route to **[references/api/README.md](references/api/README.md)**.
- **Troubleshooting / capacity planning**: connection *load* and scaling math (origin/edge/restreamer counts) — **not** a connection that fails to establish at all; that's Streaming Protocols above
  Route to **[references/troubleshooting.md](references/troubleshooting.md)**.

## Common Combinations

- New mobile live-streaming app on Red5 Cloud → **[sdks/README.md](references/sdks/README.md)** (Android or iOS) → **[cloud/README.md](references/cloud/README.md)** for the Stream Manager host/node-group concepts it needs.
- Multi-party video conferencing app → **[sdks/conference-sdk.md](references/sdks/conference-sdk.md)** (web) or the Android/iOS SDK's conferencing section, plus **[sdks/backend-sdk.md](references/sdks/backend-sdk.md)** for server-side token generation.
- Self-hosted server that needs to scale → **[server/README.md](references/server/README.md)** for install, then **[stream-manager/README.md](references/stream-manager/README.md)** for autoscaling.
- Pushing an existing RTMP/SRT/Zixi feed into Red5, or pushing Red5 out to social platforms → **[streaming-features/README.md](references/streaming-features/README.md)** (Restreamer).
- Locking down who can publish/subscribe → **[authentication/README.md](references/authentication/README.md)**.

## Ambiguity Handling

Ask at most one focused clarification when the route is still unclear.

- "Publish" almost always means WebRTC (WHIP) from a browser or the Core/mobile SDKs over RTSP — confirm which client platform before writing code.
- "Recording" could mean **VOD** (playback of a recorded stream) or **DVR** (rewind on a live stream) — these are different features; ask if unclear.
- If the user says "Red5" without qualifying Pro vs. Cloud, and they mention a `cloud.red5.net` host, a Stream Manager, node groups, or "no server to manage," treat it as **Red5 Cloud**. If they mention installing/upgrading a server, treat it as **Red5 Pro**.

## Guardrails

1. **This skill's reference files are the single source of truth**, derived directly from the official docs at [red5.net/docs](https://www.red5.net/docs/). Do not invent REST endpoints, SDK method names, class names, or configuration file paths — if a detail is not covered in the references, fetch the live page at [red5.net/docs](https://www.red5.net/docs/) (see Documentation Lookup below for how) before telling the user to check it themselves, rather than guessing.
2. **SDK version awareness**: The Red5 Pro WebRTC SDK `15.0.0` is a full TypeScript rewrite; `WHIPClient`/`WHEPClient` are the current publisher/subscriber classes. The older WebSocket-based `RTCPublisher`/`RTCSubscriber` classes still work (`WHIPClient`/`WHEPClient` extend them) but should not be used in new code.
3. **Cloud vs. standalone config differs mainly in one place**: client SDKs target either a direct server host/IP (standalone) or a Stream Manager host plus a node group (Red5 Cloud). Don't mix the two configuration styles in one client.
4. **Licensing**: the native SDKs (Core SDK, Android SDK, iOS SDK) require a Red5 Pro SDK license key set at client-build time; publishing/subscribing will fail license validation without one.

## Documentation Lookup

Local references are Layer 1–4 content derived from the official docs. Each reference file's "When to Fetch More" section names the exact live path under [https://www.red5.net/docs/](https://www.red5.net/docs/) to check for detail beyond what's inline here (exact REST parameter lists, latest release notes, archived/legacy API versions, or anything not covered inline).

**Fetch live docs with `curl`, not a WebFetch-style tool.** `red5.net` sits behind a Cloudflare bot check that returns `403 Forbidden` to WebFetch and similar automated-fetch tools, even on a plain content page. A direct `curl` request from a shell (with a normal browser-like `User-Agent`) gets through and returns real content — e.g. `curl -sL -A "Mozilla/5.0" https://www.red5.net/docs/red5-pro/users-guide/authentication/`. If only a WebFetch-style tool is available (no shell access), say so and point the user to the URL to open themselves rather than reporting the 403 as "no content" or guessing at what the page says.
