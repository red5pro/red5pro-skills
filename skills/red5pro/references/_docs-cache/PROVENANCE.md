# Docs cache provenance

GENERATED FILE — do not hand-edit. Regenerate with `scripts/sync-docs-cache.sh`.

- Synced from: `red5pro-docs` @ `9c460c13`
- Synced at: 2026-08-01T11:38:09Z
- Source subtree: `website/docs/`
- Files mirrored: 831 (1204 after splitting large pages, see below)
- Manifest: `scripts/docs-cache-manifest.txt`

Each cached path corresponds to a `https://www.red5.net/docs/...` link
referenced from `skills/red5pro/references/**/*.md`. This cache exists so
headless/automated consumers of the published skill (no browser, so no way
past red5.net's Cloudflare bot check) still get real content instead of a
dead link. Human users following the live links get the current version;
this cache may lag until the next sync.

Pages over 400 lines with several independent sections are split by
`scripts/split_large_docs.py` into a directory of small per-section files
plus an `index.md`, so a lookup pulls in one topic instead of the whole
page — start at that directory's `index.md`. Pages linked directly by
filename from the reference layer are left flat so the link keeps working.
