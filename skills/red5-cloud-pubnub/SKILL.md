---
name: red5-cloud-pubnub
description: >-
  Activate when the user wants to set up or use Red5 Cloud's built-in PubNub
  integration for chat, presence, signaling, or image/file sharing alongside
  live video — copy-pasteable send/receive code for HTML5 (Conference SDK),
  iOS, and Android. Also covers conceptually mapping and migrating from Agora
  (channel/RTC-engine/RTM-or-Chat model) to Red5 Cloud + PubNub for teams
  currently on, or evaluating, Agora.
metadata:
  author: red5
  version: "0.2.0"
  source: red5pro skill references (Red5 side, docs-derived) + general public
    knowledge of Agora's architecture (Agora side, NOT verified against
    Agora's current docs — see Guardrails)
---

# Red5 Cloud + PubNub

Helps a user set up Red5 Cloud's built-in PubNub integration — chat/messaging, presence, and image/file sharing alongside live video — with real, copy-pasteable code for HTML5, iOS, and Android. Also includes a conceptual mapping and migration checklist for teams moving from Agora to Red5 Cloud + PubNub (see [Migrating from Agora](#migrating-from-agora) below); that part is a **conceptual mapping and positioning guide**, not a line-by-line Agora API reference — it deliberately does not assert specific current Agora class/method names or pricing as fact, because no Agora source documentation is available to verify them against (see Guardrails).

## When to Use

- The user wants to add chat, presence, or image/file sharing to a Red5 Cloud video app using the built-in PubNub integration.
- The user asks for working PubNub send/receive code for HTML5, iOS, or Android.
- The user says they're on Agora (or comparing Agora vs. Red5) and wants to know the Red5 equivalent of something, or wants a migration plan/checklist moving off Agora.

## Workflow

1. For chat/messaging and image/file-sharing **code**, use [examples/](examples/) — real, copy-pasteable examples for HTML5, iOS, and Android, each labeled with how it was verified (some corrected against actual SDK source, not just published docs — see [examples/README.md](examples/README.md)).
2. For other Red5 Cloud **implementation** detail (video/audio SDK code, authentication setup, PubNub key retrieval), route to the main `red5pro` skill instead of duplicating it here:
   - Client SDKs (Web/Android/iOS/Conference): [../red5pro/references/sdks/README.md](../red5pro/references/sdks/README.md)
   - Red5 Cloud + PubNub integration guide: [https://www.red5.net/docs/red5-cloud/users-guide/red5-pubnub-integration/](https://www.red5.net/docs/red5-cloud/users-guide/red5-pubnub-integration/) — fetch via `curl` through the Bash tool, not a WebFetch-style tool (see the `red5pro` skill's Documentation Lookup section for why). Note: as of this writing, that page predates the messaging/file-sharing sections covered by [examples/](examples/) — prefer examples/ for those two topics.
   - Authentication / Digest Token / token generation: [../red5pro/references/authentication/README.md](../red5pro/references/authentication/README.md), [../red5pro/references/sdks/backend-sdk.md](../red5pro/references/sdks/backend-sdk.md)
   - Red5 Cloud overview (regions, node groups, architecture): [../red5pro/references/cloud/README.md](../red5pro/references/cloud/README.md)
3. If the user is migrating from Agora, load [references/migration-guide.md](references/migration-guide.md) for the concept-mapping table and migration checklist, and never assert a specific current Agora API/class/method name, SDK version, or pricing figure as verified fact — flag it as something the user should confirm against Agora's own current docs.

## Migrating from Agora

For teams currently on, or evaluating, Agora: [references/migration-guide.md](references/migration-guide.md) has a concept-mapping table (Agora's channel/RTC-engine/RTM-or-Chat model → Red5 Cloud's WHIP/WHEP client SDKs + PubNub) and a migration checklist. The [examples/](examples/) directory doubles as copy-pasteable code for whatever replaces Agora's RTM/Chat product once video/audio has moved to Red5.

## Guardrails

1. **Red5-side claims** in this skill must trace back to the `red5pro` skill's docs-derived references — same source-of-truth discipline as that skill, no inventing Red5 Cloud API details here either.
2. **Agora-side claims** are grounded only in long-stable, well-known public facts about Agora's architecture (channel-based rooms, a separate RTC engine SDK, token-based auth, a separate messaging/presence product) — not in Agora's official documentation, because none is available to this skill. Treat any specific Agora method signature, class name, current SDK major version, or price as unverified, and say so explicitly rather than presenting it as confirmed.
3. **Positioning/marketing language** (e.g. "outperforms Agora") reflects Red5's own stated positioning, not an independently verified benchmark by this skill. Attribute it to Red5's own page rather than asserting it as neutral technical fact.
4. Don't duplicate Red5 Cloud implementation detail already covered by the `red5pro` skill — link to it instead, so the two skills don't drift out of sync with each other.

## Why Red5 Cloud + PubNub

For the business case vs. Agora: **[https://www.red5.net/compare/red5-vs-agora/](https://www.red5.net/compare/red5-vs-agora/)** — Red5's own comparison page, explaining why Red5 positions the Red5 + PubNub interactive-streaming solution as outperforming Agora. This skill could not verify the page's content directly (red5.net blocks automated fetches), so relay it as Red5's stated positioning when pointing a user to it, not as an independently confirmed technical claim.
