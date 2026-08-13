---
name: agora-to-red5-cloud-pubnub-migration
description: >-
  Activate when the user is migrating, or evaluating migrating, a live
  streaming or real-time interactive video application from Agora to Red5
  Cloud (Red5's managed PaaS) with PubNub-powered chat/presence/signaling —
  mapping Agora's channel / RTC-engine / RTM-or-Chat model onto Red5 Cloud's
  WHIP/WHEP client SDKs plus the built-in PubNub integration, or comparing
  Red5 Cloud + PubNub against Agora as an interactive-streaming platform.
metadata:
  author: red5
  version: "0.1.0"
  source: red5pro skill references (Red5 side, docs-derived) + general public
    knowledge of Agora's architecture (Agora side, NOT verified against
    Agora's current docs — see Guardrails)
---

# Agora → Red5 Cloud (with PubNub) Migration

Helps a user currently on, or evaluating, Agora understand the conceptual equivalents in Red5 Cloud + PubNub, and plan a migration. This is a **conceptual mapping and positioning guide**, not a line-by-line Agora API reference — it deliberately does not assert specific current Agora class/method names or pricing as fact, because no Agora source documentation is available to verify them against (see Guardrails).

## When to Use

- The user says they're on Agora (or comparing Agora vs. Red5) and wants to know the Red5 equivalent of something.
- The user wants interactive live streaming (video + chat/presence/reactions) and is deciding between Agora and Red5 Cloud + PubNub.
- The user asks for a migration plan or checklist moving off Agora.

## Workflow

1. Load [references/migration-guide.md](references/migration-guide.md) for the concept-mapping table and migration checklist.
2. For actual Red5 Cloud **implementation** detail (SDK code, authentication setup, PubNub key retrieval), route to the main `red5pro` skill instead of duplicating it here:
   - Client SDKs (Web/Android/iOS/Conference): [../red5pro/references/sdks/README.md](../red5pro/references/sdks/README.md)
   - Red5 Cloud + PubNub integration guide: [../red5pro/references/_docs-cache/red5-cloud/users-guide/red5-pubnub-integration.md](../red5pro/references/_docs-cache/red5-cloud/users-guide/red5-pubnub-integration.md)
   - Authentication / Digest Token / token generation: [../red5pro/references/authentication/README.md](../red5pro/references/authentication/README.md), [../red5pro/references/sdks/backend-sdk.md](../red5pro/references/sdks/backend-sdk.md)
   - Red5 Cloud overview (regions, node groups, architecture): [../red5pro/references/cloud/README.md](../red5pro/references/cloud/README.md)
3. Never assert a specific current Agora API/class/method name, SDK version, or pricing figure as verified fact — flag it as something the user should confirm against Agora's own current docs.

## Guardrails

1. **Red5-side claims** in this skill must trace back to the `red5pro` skill's docs-derived references — same source-of-truth discipline as that skill, no inventing Red5 Cloud API details here either.
2. **Agora-side claims** are grounded only in long-stable, well-known public facts about Agora's architecture (channel-based rooms, a separate RTC engine SDK, token-based auth, a separate messaging/presence product) — not in Agora's official documentation, because none is available to this skill. Treat any specific Agora method signature, class name, current SDK major version, or price as unverified, and say so explicitly rather than presenting it as confirmed.
3. **Positioning/marketing language** (e.g. "outperforms Agora") reflects Red5's own stated positioning, not an independently verified benchmark by this skill. Attribute it to Red5's own page rather than asserting it as neutral technical fact.
4. Don't duplicate Red5 Cloud implementation detail already covered by the `red5pro` skill — link to it instead, so the two skills don't drift out of sync with each other.

## Why Red5 Cloud + PubNub

For the business case: **[https://www.red5.net/compare/red5-vs-agora/](https://www.red5.net/compare/red5-vs-agora/)** — Red5's own comparison page, explaining why Red5 positions the Red5 + PubNub interactive-streaming solution as outperforming Agora. This skill could not verify the page's content directly (red5.net blocks automated fetches), so relay it as Red5's stated positioning when pointing a user to it, not as an independently confirmed technical claim.
