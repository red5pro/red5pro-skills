# AGENTS.md

This repository contains AI agent skills for building with [Red5](https://www.red5.net) — Red5 Pro (self-hosted) and Red5 Cloud (managed PaaS) — covering server setup/clustering, streaming protocols, authentication, streaming features, Stream Manager 2.0, and client/backend SDKs. Content is derived from the official docs at [red5.net/docs](https://www.red5.net/docs/).

Multiple skills live side by side under `skills/`:

- **`red5pro`** — the primary technical reference skill; every claim traces back to an actual page at [red5.net/docs](https://www.red5.net/docs/) (see Source-of-Truth rule below).
- **`red5-cloud-pubnub`** — a narrower skill covering Red5 Cloud's built-in PubNub integration (chat/presence/image-file-sharing, with copy-pasteable HTML5/iOS/Android code), plus positioning-flavored Agora → Red5 Cloud + PubNub migration guidance for the PubNub campaign. Its Red5-side claims link into `red5pro`'s references rather than duplicating them; its Agora-side claims are explicitly *not* verified against Agora's own docs (no Agora source is available in this repo) and are flagged as such in that skill's Guardrails — hold new skills of this kind to the same "trace every claim to a source, or say you can't" bar even when part of the topic is competitive positioning rather than pure technical reference.

## Repository Structure

```
scripts/
├── validate-skills.sh              # Static validation (targets every skill under skills/)
└── blocklist-terms.txt             # Terms validate-skills.sh flags if found under skills/
skills/
├── red5pro/                        # Primary technical reference skill — published plugin
│   ├── SKILL.md                    # Entry point, route index
│   └── references/
│       ├── server/                 # Install modes, clustering (origin/edge/relay/transcoder/mixer)
│       ├── protocols/              # WebRTC/WHIP/WHEP, RTMP/ERTMP, RTSP, HLS
│       ├── authentication/         # Round Trip, JWT, Simple Auth
│       ├── streaming-features/     # Restreamer, Transcoder/ABR, Brew Mixer, Recording/VOD, webhooks, DRM
│       ├── stream-manager/         # Stream Manager 2.0 concepts + APIs
│       ├── cloud/                  # Red5 Cloud PaaS
│       ├── sdks/                   # Web, Android, iOS, Conference, Backend (Node/Java/Go), Core (native)
│       └── api/                    # REST API surface index
└── red5-cloud-pubnub/               # Red5 Cloud + PubNub setup skill, plus Agora migration/positioning
    ├── SKILL.md
    ├── examples/                   # Copy-pasteable chat/presence/file-sharing code: HTML5, iOS, Android
    └── references/
        └── migration-guide.md      # Agora concept mapping + migration checklist; links into red5pro/ rather than duplicating it
tests/
└── eval-cases.md                   # Prompt → expected route eval cases, one per topic area
```

## 4-Layer Progressive Disclosure

| Layer | What | Size | When Loaded |
|-------|------|------|-------------|
| **1 — Description** | Trigger keywords in `SKILL.md` frontmatter | ~100 words | Always (skill index) |
| **2 — SKILL.md body** | Route index, guardrails, ambiguity rules | ~75 lines | On activation |
| **3 — Reference README** | Overview, critical rules, topic links | 20–100 lines | Per topic area |
| **4 — Topic files** | Implementation detail, code examples | 25–135 lines | Per platform/feature |

## Source-of-Truth / Freeze-Forever Rule

Ask: **will this still be correct in 6 months without any updates?** If yes, put it inline (stable SDK method names, protocol concepts, node-role definitions). If no, mark it "When to Fetch More" and point at the exact live `https://www.red5.net/docs/...` URL rather than inventing details. Every claim must trace back to an actual page at [red5.net/docs](https://www.red5.net/docs/) — see [ARCHITECTURE.md](ARCHITECTURE.md#link-first-vs-inline-strategy) for the content-type table.

There is no local docs mirror in this repo — "When to Fetch More" always means a live fetch. `red5.net` sits behind a Cloudflare bot check that 403s WebFetch-style tools; fetch with `curl` (a normal browser-like `User-Agent`) through a shell instead. See `red5pro/SKILL.md`'s Documentation Lookup section for the exact pattern.

## Naming Conventions

- Directory names: lowercase `kebab-case`
- Use `red5pro-`/`red5-` prefixes only where a new top-level product directory is genuinely needed — the existing `references/` layout (server, protocols, authentication, streaming-features, stream-manager, cloud, sdks, api) should cover most additions as topic files

## Adding a New Product/Topic

1. Create `skills/red5pro/references/{topic}/README.md` (Layer 3 — 20–100 lines) or add a topic file to an existing area
2. Add an entry to the **Route Selection** section of `skills/red5pro/SKILL.md`
3. Apply the freeze-forever test to all inline content
4. Add at least one eval case to `tests/eval-cases.md`

## Adding a New Skill

For a distinct topic that doesn't fit as a `red5pro` topic area — a different product, a campaign/positioning skill, etc.:

1. Create `skills/{skill-name}/SKILL.md` with valid frontmatter (`name` matching the directory, `description` with concrete trigger keywords, `metadata.author`/`version`/`source`). `skill-name` follows the same lowercase-`kebab-case` convention as everything else in this repo.
2. Add `skills/{skill-name}/references/` for the actual content if it's more than a couple paragraphs — keep `SKILL.md` itself short (routing + guardrails), per the 4-layer split above. A single skill doesn't need the full multi-directory `red5pro` layout if the topic is narrow; one `references/{topic}.md` file is fine.
3. State the skill's **source-of-truth explicitly** in its frontmatter and Guardrails section — which claims trace back to a real doc source (and which one), and which don't. If a skill covers something this repo has no source documentation for (a competitor's product, for example), say so explicitly rather than presenting unverified claims as fact — same bar as the freeze-forever rule above, just applied to a topic that isn't derived from [red5.net/docs](https://www.red5.net/docs/). Prefer linking into `red5pro`'s references for anything already covered there instead of duplicating it.
4. Add a `## {skill-name}` section to `tests/eval-cases.md` with at least one case.
5. Add a line to this file's skill list at the top, and to `README.md`'s skill list.
6. Run `bash scripts/validate-skills.sh` — it covers every skill under `skills/`, not just `red5pro`.

## Validation

```bash
bash scripts/validate-skills.sh
```

Validation covers:

- frontmatter checks for all frontmatter-bearing markdown files under `skills/`
- duplicate skill names (across all skills in the repo)
- broken relative links
- absolute local path leakage (`/Users/...`)
- blocklisted internal terms

Runs automatically in CI on every push/PR — see `.github/workflows/validate-skills.yml`.
