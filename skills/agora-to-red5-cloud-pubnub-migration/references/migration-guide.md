# Agora → Red5 Cloud + PubNub: Concept Mapping & Migration Guide

## Scope and Confidence

Two different confidence levels in this file, deliberately kept distinct:

- **Red5 Cloud + PubNub side** — grounded in the `red5pro` skill's docs-derived references, same rigor as that skill.
- **Agora side** — general, long-stable public knowledge of Agora's product architecture, **not verified against Agora's current documentation** (no Agora source is available to this skill). Agora has changed SDK major versions and product naming before (e.g. RTC SDK v2→v3→v4, standalone RTM vs. newer Chat/Signaling products) — confirm current names, method signatures, and versions against Agora's own docs before writing migration code.

## Conceptual Mapping

| Concern | Agora (conceptual, unverified) | Red5 Cloud + PubNub (verified via `red5pro` skill) |
|---|---|---|
| Video/audio transport | RTC Engine SDK, publish/subscribe to a **Channel** | Client SDKs (Web/Android/iOS) publish/subscribe via **WHIP/WHEP** to a stream on a **node group** — [../../red5pro/references/sdks/README.md](../../red5pro/references/sdks/README.md) |
| Joining a session | `join(channel, token, uid)`-style call on the RTC engine | `.join(roomId, userId, token, role, ...)` on the Conference SDK / native SDK conferencing API, or a plain WHIP publish / WHEP subscribe for non-conferencing streams — [../../red5pro/references/sdks/conference-sdk.md](../../red5pro/references/sdks/conference-sdk.md) |
| Access control / tokens | A token server mints a channel token from an App ID + App Certificate | Round Trip Auth, JWT Auth, or Simple Auth (standalone Red5 Pro); Round Trip Auth or **Digest Token Authentication** (Red5 Cloud, configured per node group) — [../../red5pro/references/authentication/README.md](../../red5pro/references/authentication/README.md) |
| Chat / messaging / signaling | A separate real-time messaging/chat product from the RTC engine | **PubNub**, integrated directly into Red5 Cloud — API keys auto-provisioned with your Red5 Cloud account, no separate PubNub account needed — [../../red5pro/references/_docs-cache/red5-cloud/users-guide/red5-pubnub-integration.md](../../red5pro/references/_docs-cache/red5-cloud/users-guide/red5-pubnub-integration.md) |
| Presence (who's online) | RTM/Chat presence events | PubNub presence, wired directly into Red5's SDKs — same doc as above |
| Backend token generation | Your own token server using the vendor's server SDK | Red5 Backend SDKs (Node/Java/Go) for conference + chat tokens — [../../red5pro/references/sdks/backend-sdk.md](../../red5pro/references/sdks/backend-sdk.md) |
| Managed/PaaS hosting | Managed global network | Red5 Cloud — managed Red5 Pro + Stream Manager 2.0, `<deployment>.cloud.red5.net` + node group — [../../red5pro/references/cloud/README.md](../../red5pro/references/cloud/README.md) |
| Ready-made conferencing app | Sample apps / low-code starting points | **TrueTime Meetings™** — Red5's ready-to-deploy conferencing app with built-in PubNub chat/presence/signaling, deployable from the Red5 Cloud dashboard |

## Migration Checklist (Conceptual)

Not a step-by-step API-call guide — a list of what to inventory and re-map:

1. **Inventory current Agora usage**: which channels/rooms, publish/subscribe patterns, token-generation approach, and which chat/presence/signaling features are actually in use.
2. **Map video/audio**: replace the RTC engine's join/publish/subscribe calls with the Red5 Cloud client SDK for the target platform — see [../../red5pro/references/sdks/README.md](../../red5pro/references/sdks/README.md) for platform-specific quick starts (Web, Android, iOS, Conference).
3. **Map auth/tokens**: replace the existing token server with a Red5 auth mechanism. Digest Token Authentication is the closest conceptual analog on Red5 Cloud (self-contained signed tokens, no callback server) if the current setup mints tokens ahead of time; Round Trip Auth if the current setup already calls out to a live validation server per request.
4. **Map chat/presence/signaling**: re-platform onto PubNub. Red5 Cloud auto-provisions PubNub keys per account, so this is largely swapping SDK calls rather than standing up new infrastructure. Best practice: use the Red5 `streamName` as the PubNub channel name so viewers of a given stream land in the matching chat room automatically.
5. **Re-test connection, auth, and chat flows end to end** before cutting over production traffic.

## Guardrails

- Do not state a specific current Agora class name, method signature, SDK version, or price as fact in this skill or in generated migration code — say "typically" / "conceptually" and point the user to Agora's own current docs to confirm before they write code against it.
- All Red5-side claims must trace back to the `red5pro` skill's references (same rule as that skill) — don't invent Red5 Cloud API details here either.
- For the business/positioning case, defer to [https://www.red5.net/compare/red5-vs-agora/](https://www.red5.net/compare/red5-vs-agora/) rather than asserting comparative performance claims as independently verified.
