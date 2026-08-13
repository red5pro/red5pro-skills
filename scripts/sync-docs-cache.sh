#!/usr/bin/env bash
# Mirrors the specific red5pro-docs pages this skill links to into
# skills/red5pro/references/_docs-cache/, so headless/automated consumers
# of the published skill (no browser, no access to red5.net past its
# Cloudflare bot check) have local content instead of a dead link.
#
# Source of truth stays red5pro-docs — this script re-copies from it, it
# never hand-edits the cache. Re-run whenever red5pro-docs content changes
# or scripts/docs-cache-manifest.txt gains new entries.
#
# Usage:
#   scripts/sync-docs-cache.sh [path-to-red5pro-docs-checkout]
#
# Resolution order for the source checkout:
#   1. First CLI argument
#   2. $RED5PRO_DOCS_REPO env var
#   3. ../red5pro-docs relative to this repo's root (sibling checkout)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$REPO_ROOT/scripts/docs-cache-manifest.txt"
DEST_ROOT="$REPO_ROOT/skills/red5pro/references/_docs-cache"

DOCS_REPO="${1:-${RED5PRO_DOCS_REPO:-"$(dirname "$REPO_ROOT")/red5pro-docs"}}"
SRC_ROOT="$DOCS_REPO/website/docs"

if [ ! -d "$SRC_ROOT" ]; then
  echo "error: docs source not found at $SRC_ROOT" >&2
  echo "       pass the red5pro-docs checkout path as an argument, or set RED5PRO_DOCS_REPO" >&2
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "error: rsync is required but not found on PATH" >&2
  exit 1
fi

echo "Source: $SRC_ROOT"
echo "Dest:   $DEST_ROOT"
echo

rm -rf "$DEST_ROOT"
mkdir -p "$DEST_ROOT"

missing=()
copied=0

while IFS= read -r line || [ -n "$line" ]; do
  line="${line%%#*}"
  line="$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
  [ -z "$line" ] && continue

  src="$SRC_ROOT/$line"
  dest="$DEST_ROOT/$line"

  if [ -d "$src" ]; then
    mkdir -p "$dest"
    rsync -a --exclude='*.oldmd' --exclude='folderindex.txt' "$src/" "$dest/"
    copied=$((copied + 1))
  elif [ -f "$src" ]; then
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    copied=$((copied + 1))
  else
    missing+=("$line")
  fi
done < "$MANIFEST"

if [ ${#missing[@]} -gt 0 ]; then
  echo "error: ${#missing[@]} manifest entr$([ ${#missing[@]} -eq 1 ] && echo y || echo ies) not found under $SRC_ROOT:" >&2
  for m in "${missing[@]}"; do
    echo "  - $m" >&2
  done
  echo "The docs likely restructured — update docs-cache-manifest.txt and the matching red5.net/docs links in skills/red5pro/references/." >&2
  exit 1
fi

echo
python3 "$REPO_ROOT/scripts/split_large_docs.py" "$DEST_ROOT"

commit=""
if git -C "$DOCS_REPO" rev-parse HEAD >/dev/null 2>&1; then
  commit="$(git -C "$DOCS_REPO" rev-parse --short HEAD)"
fi

file_count="$(find "$DEST_ROOT" -type f | wc -l | tr -d ' ')"

cat > "$DEST_ROOT/PROVENANCE.md" <<EOF
# Docs cache provenance

GENERATED FILE — do not hand-edit. Regenerate with \`scripts/sync-docs-cache.sh\`.

- Synced from: \`red5pro-docs\`${commit:+ @ \`$commit\`}
- Synced at: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
- Source subtree: \`website/docs/\`
- Files mirrored: $file_count
- Manifest: \`scripts/docs-cache-manifest.txt\`

Each cached path corresponds to a \`https://www.red5.net/docs/...\` link
referenced from \`skills/red5pro/references/**/*.md\`. This cache exists so
headless/automated consumers of the published skill (no browser, so no way
past red5.net's Cloudflare bot check) still get real content instead of a
dead link. Human users following the live links get the current version;
this cache may lag until the next sync.

Pages over 400 lines with several independent sections are split by
\`scripts/split_large_docs.py\` into a directory of small per-section files
plus an \`index.md\`, so a lookup pulls in one topic instead of the whole
page — start at that directory's \`index.md\`.
EOF

echo
echo "Synced $copied manifest entr$([ "$copied" -eq 1 ] && echo y || echo ies) ($file_count files)$([ -n "$commit" ] && echo " from red5pro-docs@$commit" || echo "")."
