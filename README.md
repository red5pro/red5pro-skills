# Red5 AI Skills

AI agent skills for building with [Red5](https://www.red5.net) — Red5 Pro (self-hosted) and Red5 Cloud (managed PaaS). Point a skill-aware AI coding assistant (e.g. [Claude Code](https://claude.com/claude-code)) at this repo and it can answer questions about Red5 setup, streaming protocols, authentication, SDKs, and more without guessing — every technical claim in the primary skill traces back to Red5's own documentation.

## Skills in this repo

| Skill | What it covers |
|---|---|
| [`red5pro`](skills/red5pro/SKILL.md) | The primary technical reference: server setup/clustering, streaming protocols (WebRTC/WHIP/WHEP, RTMP/ERTMP, RTSP, HLS), authentication, streaming features (restreaming, transcoding, mixing, recording), Stream Manager 2.0, Red5 Cloud, and client/backend SDKs (Web, Android, iOS, Conference, Backend, Core). |
| [`agora-to-red5-cloud-pubnub-migration`](skills/agora-to-red5-cloud-pubnub-migration/SKILL.md) | Migration and positioning guidance for teams moving from Agora to Red5 Cloud + PubNub. Conceptual mapping only — see that skill's Guardrails for what is and isn't verified. |

## Quick Install With npx (Claude Code, Codex)

```bash
npx red5pro-skills
```

The wizard detects which tool you're using (Claude Code, Codex), lets you pick user- or project-level install, downloads this repo's `skills/` directory straight from GitHub, and installs both skills into the right location. Pass `--target <name>` to skip the prompt or `--list-targets` to see the full list. Source: [`bin/cli.js`](bin/cli.js).

Only tools with a folder-based skills convention (`SKILL.md` + `references/` subdirectories) are supported here — Cursor, Windsurf, and GitHub Copilot use a single flat instructions file instead, so use the manual copy method below for those.

## Using a skill manually

Copy the skill directory you want (e.g. `skills/red5pro/`) into wherever your AI tool loads skills from — for Claude Code, typically a project's `.claude/skills/` directory or your global `~/.claude/skills/` — or clone this whole repo and point your tool at it. Each skill is self-contained: `SKILL.md` is the entry point, `references/` holds the actual content the skill loads on demand.

## How this repo is organized

- **[AGENTS.md](AGENTS.md)** — repository structure, the source-of-truth/freeze-forever rule, naming conventions, and the process for adding a new topic or a whole new skill. Read this before contributing.
- **[ARCHITECTURE.md](ARCHITECTURE.md)** — the `red5pro` skill's internal 4-layer progressive-disclosure design (why content is split the way it is).
- **`scripts/`** — `validate-skills.sh` (static checks: frontmatter, broken links, leaked local paths, blocklisted terms) and `sync-docs-cache.sh` (mirrors the specific `red5pro-docs` pages the `red5pro` skill references into a local cache, so the skill works for headless/automated consumers without live network access).
- **`tests/eval-cases.md`** — prompt → expected-route eval cases for manually verifying skill behavior; no automated harness yet.
- **`bin/`, `src/`** — `red5pro-skills` npx installer sources.

## Contributing

See [AGENTS.md](AGENTS.md) for the full process. In short: every claim in the `red5pro` skill must trace back to an actual page in Red5's documentation — no invented API names, endpoints, or config. Run `bash scripts/validate-skills.sh` before opening a PR; it also runs in CI on every push and pull request.

## License

[Apache License 2.0](LICENSE).
