#!/usr/bin/env bash
# Static validation for every skill under skills/, as documented in AGENTS.md.
#
# Checks:
#   1. Frontmatter on every frontmatter-bearing markdown file (name + description present)
#   2. No duplicate `name:` across SKILL.md files under skills/
#   3. No broken relative links between files under skills/*/
#   4. No absolute local paths (e.g. /Users/...) leaked into content
#   5. No blocklisted terms (scripts/blocklist-terms.txt)
#
# Usage: bash scripts/validate-skills.sh

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_ROOT="$REPO_ROOT/skills"
BLOCKLIST_FILE="$REPO_ROOT/scripts/blocklist-terms.txt"

fail_count=0
warn_count=0

fail() { echo "FAIL: $1"; fail_count=$((fail_count + 1)); }
warn() { echo "WARN: $1"; warn_count=$((warn_count + 1)); }

# Markdown files to police for path/link/term hygiene: everything under
# skills/.
content_files() {
  find "$SKILLS_ROOT" -name '*.md'
}

echo "== 1. Frontmatter checks =="
frontmatter_checked=0
while IFS= read -r f; do
  first_line="$(head -n 1 "$f")"
  [ "$first_line" != "---" ] && continue
  frontmatter_checked=$((frontmatter_checked + 1))

  # Block between the first two '---' lines.
  block="$(awk '/^---$/{c++; next} c==1{print} c==2{exit}' "$f")"

  echo "$block" | grep -qE '^name:' || fail "$f: frontmatter missing 'name'"
  echo "$block" | grep -qE '^description:' || fail "$f: frontmatter missing 'description'"
done < <(content_files)
echo "  checked $frontmatter_checked file(s) with frontmatter"

echo
echo "== 2. Duplicate skill names =="
skill_names="$(find "$SKILLS_ROOT" -name 'SKILL.md' -exec awk '/^---$/{c++; next} c==1 && /^name:/{print; exit}' {} \; | sed -E 's/^name:[[:space:]]*//')"
dupes="$(echo "$skill_names" | sort | uniq -d)"
if [ -n "$dupes" ]; then
  while IFS= read -r d; do
    fail "duplicate skill name across SKILL.md files: '$d'"
  done <<< "$dupes"
else
  echo "  no duplicates among: $(echo "$skill_names" | tr '\n' ' ')"
fi

echo
echo "== 3. Broken relative links =="
link_checked=0
while IFS= read -r f; do
  dir="$(dirname "$f")"
  while IFS= read -r link; do
    [ -z "$link" ] && continue
    case "$link" in
      http://*|https://*|mailto:*) continue ;;
      '#'*) continue ;;  # same-file anchor
      *'{'*) continue ;;  # illustrative brace-expansion path in prose, not a literal target
    esac
    target="${link%%#*}"  # strip fragment
    [ -z "$target" ] && continue
    link_checked=$((link_checked + 1))
    resolved="$dir/$target"
    if [ ! -e "$resolved" ]; then
      fail "$f: broken link '$link' (resolved: $resolved)"
    fi
  done < <(grep -oE '\]\([^)]+\)' "$f" | sed -E 's/^\]\(//; s/\)$//')
done < <(content_files)
echo "  checked $link_checked link(s)"

echo
echo "== 4. Absolute local path leakage =="
leaks="$(grep -rnE '(/Users/|/home/[a-zA-Z0-9_-]+/)' $(content_files) 2>/dev/null)"
if [ -n "$leaks" ]; then
  while IFS= read -r l; do
    fail "absolute local path leaked: $l"
  done <<< "$leaks"
else
  echo "  none found"
fi

echo
echo "== 5. Blocklisted terms =="
if [ -f "$BLOCKLIST_FILE" ]; then
  while IFS= read -r term; do
    term="${term%%#*}"
    term="$(echo "$term" | sed -E 's/^[[:space:]]*//; s/[[:space:]]*$//')"
    [ -z "$term" ] && continue
    hits="$(grep -rniF "$term" $(content_files) 2>/dev/null)"
    if [ -n "$hits" ]; then
      while IFS= read -r h; do
        fail "blocklisted term '$term': $h"
      done <<< "$hits"
    fi
  done < "$BLOCKLIST_FILE"
  echo "  checked against $BLOCKLIST_FILE"
else
  warn "blocklist file not found at $BLOCKLIST_FILE, skipping"
fi

echo
if [ "$fail_count" -gt 0 ]; then
  echo "RESULT: $fail_count failure(s), $warn_count warning(s)"
  exit 1
else
  echo "RESULT: pass ($warn_count warning(s))"
  exit 0
fi
