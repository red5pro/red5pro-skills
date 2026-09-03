# Eval Cases

Prompt → expected route → facts the response must get right, covering every
skill in this repo (organized in sections by skill below). There's no
automated harness yet — walk each case by hand against a fresh agent session
with the skill active and confirm the three columns hold.

When adding a new topic to an existing skill, per
[AGENTS.md](../AGENTS.md#adding-a-new-producttopic), add at least one case
here in the same format. When adding a brand-new skill, per
[AGENTS.md](../AGENTS.md#adding-a-new-skill), add its own `## <skill-name>`
section with at least one case. Always: a prompt a real user would send, the
reference file(s) it should load, and the facts a correct answer must
include (traceable to that reference file — don't invent must-mention facts
that aren't actually written there).

## Format

```
### <short id>
**Prompt:** "<user message>"
**Expected route:** <reference file(s)>
**Must mention:**
- <fact 1, traceable to the reference file>
- <fact 2>
**Must NOT:**
- <failure mode this case guards against, if any>
```

---

## `red5pro` skill

### Primary routes

(one case per Route Selection entry)

#### server-install
**Prompt:** "How do I set up Red5 Pro as a static cluster instead of a single server?"
**Expected route:** `references/server/README.md` → `references/server/installation.md`, `references/server/clustering.md`
**Must mention:**
- A stand-alone server is both origin and edge; clustering splits those roles across nodes.
- The Clustering Plugin supports basic (subscriber-only) and advanced (publisher + subscriber) clustering.
- WebRTC publishing needs a valid SSL certificate on a non-localhost host.
**Must NOT:**
- Invent specific shell/package-manager commands — those should be deferred to `_docs-cache`/live docs per "When to Fetch More".

#### protocols-whip
**Prompt:** "What's the difference between WHIP and plain RTMP for publishing to Red5 Pro?"
**Expected route:** `references/protocols/README.md`
**Must mention:**
- WHIP/WHEP are HTTP/S-negotiated WebRTC (no WebSocket round trip), the recommended path since SDK 11.0.0.
- `WHIPClient`/`WHEPClient` extend the older `RTCPublisher`/`RTCSubscriber`.
- RTMP is the original TCP protocol; ERTMP v2 (14.0+) adds codecs like H.265.

#### auth-role-split
**Prompt:** "I want anyone to be able to watch my stream, but only my backend-issued clients should be able to publish."
**Expected route:** `references/authentication/README.md`
**Must mention:**
- Round Trip Auth authenticates by role (publisher vs. subscriber) distinctly, so subscribe can be allowed while publish is denied.
- Production guidance: issue subscriber-role-only credentials to audience clients to prevent stream-bombing.

#### streaming-features-restream
**Prompt:** "I want to take an RTMP feed from my Red5 Pro server and push it out to YouTube."
**Expected route:** `references/streaming-features/README.md`
**Must mention:**
- This is the Restreamer Plugin, controlled via REST provisioning (`create`/`update`/`list`).
- Social Pusher is deprecated (14.1.0+) in favor of the RTMP Push Restreamer for this exact use case.
**Must NOT:**
- Recommend Social Pusher as the primary path.

#### stream-manager-autoscale
**Prompt:** "How does Red5 Pro add and remove server capacity automatically as viewers come and go?"
**Expected route:** `references/stream-manager/README.md`
**Must mention:**
- Stream Manager 2.0 automates node create/delete based on scale-policy and launch-configuration.
- A nodegroup is a cluster of nodes (e.g. origin/edge) created per that policy.
- Autoscaling reacts to publisher count specifically (see also `troubleshooting.md`).

#### cloud-managed
**Prompt:** "We don't want to run or patch our own servers — can Red5 just host this for us?"
**Expected route:** `references/cloud/README.md`
**Must mention:**
- Red5 Cloud is Red5's own managed PaaS, running Red5 Pro + Stream Manager 2.0 for the customer.
- Client SDKs target a Stream Manager host of the form `<deployment>.cloud.red5.net` plus a node group, not a raw server IP.
**Must NOT:**
- Conflate this with the self-hosted Terraform cloud-deployment path in `server/installation.md`.

#### sdk-android
**Prompt:** "I'm building an Android app that needs to publish and subscribe to a live stream."
**Expected route:** `references/sdks/README.md` → `references/sdks/android-sdk.md`
**Must mention:**
- Works against both standalone Red5 Pro and Red5 Cloud with the same client class, different builder config.
- Requires a Red5 Pro SDK license key at build time or publish/subscribe fails license validation.

#### api-server-stats
**Prompt:** "What REST call do I make to pull live stats for a server's connected clients?"
**Expected route:** `references/api/README.md`
**Must mention:**
- The Server API covers server/application/client/stream statistics over REST.
- Exact endpoint paths and JSON schemas are not fabricated — deferred to `_docs-cache/red5-pro/development/api/` or the live docs.
**Must NOT:**
- Invent a specific endpoint path or field name not present in the reference file.

#### troubleshooting-capacity
**Prompt:** "We have 1 origin, 100 edges, and 3 streams. How many restreamer connections should the origin expect?"
**Expected route:** `references/troubleshooting.md`
**Must mention:**
- Restreamer connections = (number of streams) × (edge-proxy connections) → 300 in this example.
- "Total count" (direct publishers) stays 3 even though restreamer load is 300 — autoscaling only reacts to publisher count.

---

### Ambiguity handling (SKILL.md § Ambiguity Handling)

#### ambiguity-recording-vs-dvr
**Prompt:** "I want to add recording so viewers can rewind while the stream is still live."
**Expected behavior:** Recognize this describes **DVR** (rewind within an in-progress stream), not VOD (playback of a completed recording) — ask one clarifying question if genuinely ambiguous, per SKILL.md.
**Must NOT:**
- Silently route to VOD guidance in `streaming-features/README.md#recording--vod` without flagging the DVR/VOD distinction.

#### ambiguity-cloud-vs-pro
**Prompt:** "I want to publish to Red5."
**Expected behavior:** Route is genuinely ambiguous (no `cloud.red5.net`, Stream Manager, or "no server to manage" cue, and no mention of installing/upgrading a server) — ask at most one focused clarification per SKILL.md § Ambiguity Handling rather than guessing Pro vs. Cloud.

### Common combinations (SKILL.md § Common Combinations)

#### combo-mobile-autoscale
**Prompt:** "Build an Android app that publishes to an autoscaled cluster on Red5 Cloud."
**Expected route:** `references/sdks/README.md` → `references/sdks/android-sdk.md` first, then `references/cloud/README.md` for the Stream Manager host/node-group concepts.
**Must mention:**
- The client SDK config needs a Stream Manager host + node group (Red5 Cloud), not a raw server IP.
**Must NOT:**
- Load only one of the two reference areas when the task genuinely spans both, per SKILL.md § Workflow step 4.

---

### Regressions (found by manual testing, 2026-08-01)

#### regression-android-nodegroup
**Prompt:** "My Android app publishes fine to a standalone server, but I can't get it to target the right node group on Red5 Cloud."
**Expected route:** `references/sdks/android-sdk.md`
**Must mention:**
- `.setNodeGroup(YOUR_NODE_GROUP)` on the `IRed5WebrtcClient` builder, alongside `.setStreamManagerHost(...)`.
**Must NOT:**
- Omit `setNodeGroup` from the builder chain — it's a real method (confirmed in the Android API reference) and was previously missing from this file's Cloud example.

#### regression-conferencing-cloud-requirement
**Prompt:** "Can I run multi-party conferencing on a standalone Red5 Pro server, or do I need Red5 Cloud?"
**Expected route:** `references/sdks/README.md` (Cross-Cutting Notes) plus whichever platform file (android/ios/conference-sdk) the user's platform is.
**Must mention:**
- The source docs disagree by platform: Android SDK docs explicitly say Cloud-only; iOS and the web Conference SDK docs don't state the restriction and even describe `nodeGroup` as optional.
- The skill's guidance is to treat conferencing as Cloud-only until confirmed otherwise, not to assert standalone works.
**Must NOT:**
- State flatly that conferencing "requires Red5 Cloud" as an uncontested fact, or flatly state standalone conferencing works — both overclaim beyond what the source docs actually support.

#### regression-connection-urls
**Prompt:** "What URL do I put in OBS to publish to my Red5 Pro server?"
**Expected route:** `references/protocols/README.md#connection-urls`
**Must mention:**
- `rtmp://<host>:1935/<app>` as the OBS "Custom Streaming Server" URL, with the stream name as the separate "Stream key" field (not appended to the URL).
**Must NOT:**
- Say the skill has no way to answer this — the file previously had zero connection-URL content for any protocol.

#### regression-whip-auth
**Prompt:** "How do I secure my WHIP publisher so random people can't stream to it?"
**Expected route:** `references/authentication/README.md`
**Must mention:**
- For standalone Red5 Pro: any of Round Trip/JWT/Simple Auth, passed via the WHIP/WHEP client's `connectionParams: { username, password, token }`.
- For Red5 Cloud: Digest Token Authentication (colon-separated `stream:user:role:key=value:app:expiration:digest`, SHA-256, configured per node group) as an alternative to Cloud Round Trip Auth.
**Must NOT:**
- Answer "there's no documented way to do this" — this was a real content gap before Digest Token Auth and the `connectionParams` pattern were added.

#### regression-recording-not-automatic
**Prompt:** "If I just publish a stream, does Red5 record it automatically, or do I have to do something?"
**Expected route:** `references/streaming-features/README.md#recording--vod`
**Must mention:**
- Recording is opt-in per publish session (`streamMode: 'record'` for WebRTC, `R5RecordTypeRecord`/`R5Stream.RecordType.Record` for iOS/Android) — a stream being live does not mean it's being recorded.
**Must NOT:**
- Say or imply recording "works by default" in the sense of happening automatically — that phrase (from an earlier version of this file) described VOD *playback* config, not recording being automatic, and was misread as the latter during testing.

#### regression-webrtc-not-connecting-routing
**Prompt:** "WebRTC isn't connecting, what's wrong?"
**Expected route:** `references/protocols/README.md#debugging-a-failed-webrtc-connection`
**Must mention:**
- Check, in order: missing/invalid SSL cert, firewall/NAT blocking the UDP media path (need TURN), wrong WHIP/WHEP endpoint construction, or auth silently rejecting the connection.
**Must NOT:**
- Route this to `references/troubleshooting.md` — that file is capacity/connection-*load* planning only (origin/edge/restreamer math) and has no content about a connection failing to establish in the first place. SKILL.md's Route Selection previously listed "WebRTC issues" under both entries, which caused this misroute.

---

## `red5-cloud-pubnub` skill

#### agora-concept-mapping
**Prompt:** "We're on Agora today and want to know what the Red5 equivalent of Agora RTM is for chat."
**Expected route:** `references/migration-guide.md` (Conceptual Mapping table)
**Must mention:**
- PubNub is the Red5 Cloud equivalent, integrated directly — API keys auto-provisioned with the Red5 Cloud account, no separate PubNub account needed.
- The Agora side of the mapping is explicitly flagged as unverified against Agora's current docs, not asserted as confirmed fact.
**Must NOT:**
- State a specific current Agora RTM/Chat class name, method signature, or version as verified fact — this skill has no Agora source to verify it against (see SKILL.md Guardrails).

#### agora-why-switch
**Prompt:** "Why would we switch from Agora to Red5 + PubNub?"
**Expected route:** `SKILL.md` § Why Red5 Cloud + PubNub
**Must mention:**
- Points to [https://www.red5.net/compare/red5-vs-agora/](https://www.red5.net/compare/red5-vs-agora/) for the business case.
**Must NOT:**
- Present the "outperforms Agora" claim as an independently verified technical benchmark — it's Red5's own stated positioning (the skill could not fetch/verify the comparison page's actual content; red5.net blocks automated fetches).
