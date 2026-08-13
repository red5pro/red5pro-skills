#!/usr/bin/env python3
"""Splits large multi-section pages in the docs cache into small per-section
files plus an index.md, so consumers reading "the reference for X" pull in
one topic instead of an entire 1000+ line page.

Run by sync-docs-cache.sh as a post-processing step over the freshly-mirrored
cache. Not meant to be run by hand against hand-edited content — it deletes
the file it splits.

A file is split only if it exceeds LINE_THRESHOLD *and* has at least
MIN_HEADINGS headings at the shallowest heading level that appears often
enough (H2 preferred, falling back to H3). Headings inside fenced code
blocks are ignored. Files that don't meet this bar are left alone.
"""

import os
import re
import sys

LINE_THRESHOLD = 400
MIN_HEADINGS = 4

TOC_LINE_RE = re.compile(r"^\s*[-*]\s+\[.*\]\(#.*\)\s*$")
ANCHOR_SUFFIX_RE = re.compile(r"\s*\{#[^}]*\}\s*$")


def is_fence_toggle(line):
    """True if this line opens or closes a fenced code block. A line that
    both opens and closes on itself (an inline ` ``` code ``` ` span) is not
    a toggle."""
    stripped = line.strip()
    for token in ("```", "~~~"):
        if stripped.startswith(token):
            return stripped.count(token) % 2 == 1
    return False


def heading_regex(level):
    return re.compile(r"^#{%d}(?!#)\s+(.*)$" % level)


def find_frontmatter_end(lines):
    if not lines or lines[0].strip() != "---":
        return 0
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            return i + 1
    return 0


def heading_indices(lines, level, body_start):
    rx = heading_regex(level)
    in_code = False
    out = []
    for i in range(body_start, len(lines)):
        line = lines[i]
        if is_fence_toggle(line):
            in_code = not in_code
            continue
        if in_code:
            continue
        m = rx.match(line)
        if m:
            out.append((i, m.group(1).strip()))
    return out


def slugify(text, seen):
    text = ANCHOR_SUFFIX_RE.sub("", text)
    slug = text.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug).strip("-")
    slug = re.sub(r"-{2,}", "-", slug)
    if not slug:
        slug = "section"
    base = slug
    n = 2
    while slug in seen:
        slug = "%s-%d" % (base, n)
        n += 1
    seen.add(slug)
    return slug


def clean_title(text):
    return ANCHOR_SUFFIX_RE.sub("", text).strip()


def split_file(path, protected):
    if os.path.abspath(path) in protected:
        return False
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.splitlines()
    if len(lines) <= LINE_THRESHOLD:
        return False

    body_start = find_frontmatter_end(lines)
    frontmatter = lines[:body_start]

    headings = heading_indices(lines, 2, body_start)
    if len(headings) < MIN_HEADINGS:
        headings = heading_indices(lines, 3, body_start)
    if len(headings) < MIN_HEADINGS:
        return False

    intro_lines = lines[body_start:headings[0][0]]
    intro_lines = [ln for ln in intro_lines if not TOC_LINE_RE.match(ln)]
    while intro_lines and intro_lines[-1].strip() == "":
        intro_lines.pop()

    parent_dir = os.path.dirname(path)
    base = os.path.splitext(os.path.basename(path))[0]
    split_dir = os.path.join(parent_dir, base)

    if os.path.exists(split_dir):
        print("warning: split target already exists, skipping: %s" % split_dir, file=sys.stderr)
        return False

    title_match = re.search(r'^title:\s*"?(.*?)"?\s*$', "\n".join(frontmatter), re.MULTILINE)
    doc_title = title_match.group(1) if title_match else base

    os.makedirs(split_dir)
    seen_slugs = set()
    toc_entries = []

    for idx, (line_no, heading_text) in enumerate(headings):
        end = headings[idx + 1][0] if idx + 1 < len(headings) else len(lines)
        section_lines = lines[line_no:end]
        while section_lines and section_lines[-1].strip() == "":
            section_lines.pop()
        slug = slugify(heading_text, seen_slugs)
        section_path = os.path.join(split_dir, slug + ".md")
        title = clean_title(heading_text)
        with open(section_path, "w", encoding="utf-8") as f:
            f.write("_From: %s_\n\n" % doc_title)
            f.write("\n".join(section_lines))
            f.write("\n")
        toc_entries.append((title, slug + ".md"))

    index_lines = list(frontmatter)
    if intro_lines:
        index_lines += intro_lines
    if index_lines and index_lines[-1].strip() != "":
        index_lines.append("")
    index_lines.append("## Contents")
    index_lines.append("")
    for title, fname in toc_entries:
        index_lines.append("- [%s](%s)" % (title, fname))

    with open(os.path.join(split_dir, "index.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(index_lines))
        f.write("\n")

    os.remove(path)
    return True


LINK_RE = re.compile(r"_docs-cache/([A-Za-z0-9._/-]+?\.md)")


def find_protected_paths(root):
    """Cache paths referenced by exact filename from the reference layer
    (the skill's *.md files, i.e. root's parent tree minus the cache itself)
    must stay flat files — splitting them would break the link. `root` must
    already be an absolute path."""
    references_root = os.path.dirname(root)
    protected = set()
    for dirpath, dirnames, filenames in os.walk(references_root):
        if dirpath == root:
            dirnames[:] = []
            continue
        for name in filenames:
            if not name.endswith(".md"):
                continue
            with open(os.path.join(dirpath, name), "r", encoding="utf-8") as f:
                content = f.read()
            for rel in LINK_RE.findall(content):
                protected.add(os.path.normpath(os.path.join(root, rel)))
    return protected


def main():
    if len(sys.argv) != 2:
        print("usage: split_large_docs.py <docs-cache-root>", file=sys.stderr)
        sys.exit(1)

    root = os.path.abspath(sys.argv[1])
    protected = find_protected_paths(root)
    split_count = 0
    for dirpath, _dirnames, filenames in os.walk(root):
        for name in filenames:
            if not name.endswith(".md") or name == "PROVENANCE.md":
                continue
            path = os.path.join(dirpath, name)
            try:
                if split_file(path, protected):
                    split_count += 1
            except Exception as exc:  # keep going — a bad file shouldn't fail the whole sync
                print("warning: failed to split %s: %s" % (path, exc), file=sys.stderr)

    print("Split %d large file(s) into per-section directories." % split_count)


if __name__ == "__main__":
    main()
