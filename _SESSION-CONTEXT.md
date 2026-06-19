# Tyler Fitch Portfolio — Session Context

## At a Glance
**Objective:** Build a charming, professional portfolio website for Tyler Fitch (energy researcher) that serves as a queryable repository of his published works and a polished public face for professional audiences.
**Status:** ✅ LIVE at `https://ty-fi.github.io/tyfi-portfolio/` — site is live, all 4 templates working, 13 works + 8 press entries seeded.
**Last session:** Added `sync-content.yml` GitHub Action that auto-syncs content from `ty-fi/tyfi-content` into this repo (opens a PR every 6h, on `workflow_dispatch`, or on a `repository_dispatch` event). Switched `site` in `astro.config.mjs` to `https://ty-fi.github.io` (the `tyfi.computer` CNAME is not yet wired in DNS). Documented the new flow in README and AGENT.md.
**Next:** (1) DNS: point `tyfi.computer` → `ty-fi.github.io` (or revert `site` to tyfi.computer once DNS is live). (2) Trigger the first sync to clear the ~22 works / ~25 press entries backlog in tyfi-content. (3) Optionally add a `repository_dispatch` trigger in tyfi-content's workflow for instant sync on push.
**User Actions Needed:** (1) Run the first sync from the Actions tab to clear backlog. (2) Wire up the cross-repo trigger in tyfi-content if instant sync is wanted. (3) Template choice at your leisure.
**Repo:** https://github.com/ty-fi/tyfi-portfolio.git
**Last machine:** TY_FI

---

## Tech Stack
- **Framework**: Astro 4.x (static site generation)
- **Content**: Markdown/MDX with content collections (Zod schemas)
- **Styling**: Plain CSS with design tokens (4 themes/templates)
- **Hosting**: GitHub Pages (project page at `ty-fi.github.io/tyfi-portfolio/`); custom domain `tyfi.computer` in `public/CNAME` but DNS not yet pointed
- **Content source**: `ty-fi/tyfi-content` (Obsidian vault) → auto-synced via `sync-content.yml` to `src/content/`

## Quick-Start Commands
```powershell
npm install
npm run dev        # localhost:4321
npm run build
npm run preview
```

## Content Locations
- Works (build source): `src/content/work/*.md(x)` — synced from `ty-fi/tyfi-content/works/`
- Press (build source): `src/content/press/*.md` — synced from `ty-fi/tyfi-content/press/`
- Author/about: `src/content/author/tyler.json`
- Static assets (PDFs, images): `public/files/` and `public/images/`
- **Canonical content repo**: `C:\Users\fitch\dev-projects\tyfi-content` / `ty-fi/tyfi-content`

## Current State
- 13 works, 8 press entries seeded; all building cleanly
- 4 style templates (A/B/C/D) — flip with `/?tpl=a` etc.
  - A — Editorial Magazine (default)
  - B — Warm Tech Blog
  - C — Scholarly CV
  - D — Amber Terminal (Maggie masonry + triangle-shows palette)
- Backlinks working: `[[slug]]` references in work bodies generate backlinks on detail pages
- MDX support installed (`@astrojs/mdx@3.1.9`)
- Categories field added to work schema (free-form tags for filtering)
- `/work` routes (renamed from `/works`)
- GitHub Actions deploy + check workflows in `.github/workflows/`
- Custom domain `tyfi.computer` configured in `public/CNAME`

## What we did this session
- Created `ty-fi/tyfi-content` — standalone Obsidian vault repo for all content
  - QuickAdd scripts (`add.js`, `reindex.js`) with self-contained core logic
  - Node.js CLI (`cli.js`) for batch import and interactive use
  - Auto-managed `_INDEX.md` tables in each collection folder
  - Pre-commit hook that rebuilds indexes on every commit
  - Native OS PDF file picker in the Add Work QuickAdd flow (DOM `<input type=file>` + `FileReader`)
  - Fixed QuickAdd config (`"path"` not `"scriptPath"`) so commands work correctly
  - Added obsidian-git plugin to community-plugins.json
- Updated tyfi-portfolio README and AGENT.md to reference tyfi-content as canonical content source
- Switched `site` in `astro.config.mjs` from `https://tyfi.computer` to `https://ty-fi.github.io`
- Prefixed internal links with `import.meta.env.BASE_URL` (and `base: process.env.PAGES_BASE ?? '/tyfi-portfolio'`) so the site works on both the project page and a future custom-domain root
- Added `.github/workflows/sync-content.yml`:
  - Triggers: every 6h, `workflow_dispatch`, `repository_dispatch:content-updated`
  - Checks out both repos, diffs `works/`, `press/`, `pdfs/` against the corresponding `src/content/work/`, `src/content/press/`, `public/files/`
  - Skips `_*` files; adds/updates only (no deletions propagated)
  - Opens a PR labeled `content-sync`; `check.yml` validates, merging triggers `deploy.yml`
  - Concurrency group `sync-content` with `cancel-in-progress: false` so runs queue
- Updated README, AGENT.md, and this session context to document the sync workflow

## Next Steps
1. **First sync**: Trigger `sync-content.yml` from the Actions tab to clear the ~22 works / ~25 press entries that exist in tyfi-content but not yet here. The PR will need review/merge; check.yml will catch any Zod schema violations from the new content.
2. **Instant sync (optional)**: Add a workflow in `ty-fi/tyfi-content` that calls `gh api repos/ty-fi/tyfi-portfolio/dispatches` with event type `content-updated` (requires a PAT as a secret in that repo).
3. **DNS**: Point `tyfi.computer` → `ty-fi.github.io` (add CNAME at registrar). Once live, can switch `site` in `astro.config.mjs` back to `https://tyfi.computer` and set `PAGES_BASE=""` (or `/`) at build time.
4. **Template choice**: Pick a default template for the live site (currently A).

## Key Decisions / Gotchas
- **Two-repo content flow**: tyfi-content is canonical; tyfi-portfolio `src/content/` is a build-time copy. `sync-content.yml` keeps them aligned by opening a PR; the PR is the human review gate.
- **Sync is add/update only**: deletions in tyfi-content are NOT propagated to tyfi-portfolio. Stale files must be removed here directly. This prevents a typo/accident in tyfi-content from breaking the live site.
- **`_*` files are preserved**: tyfi-content skips them on read (they're repo internals like `_INDEX.md` and `_template.md`); this repo's own `_*` files (`_template.mdx`, `_example-mdx.mdx`) are not in the sync map so they're never touched.
- **QuickAdd 2.x uses `"path"` not `"scriptPath"`** in `data.json` for UserScript commands
- **Obsidian renderer `require()`**: `require('./core.js')` fails in QuickAdd scripts — `__dirname` resolves to Obsidian's Electron install dir. All QuickAdd scripts must be self-contained (core functions inlined).
- **Template switcher**: Uses inline JS in `<head>` reading `?tpl=` from `window.location.search`; one-frame flash of Template A on initial load is acceptable trade-off.
- **Zod validation is the build gate**: missing required fields fail the build. Add `.optional()` or a default before adding new required fields.
- **Wikilinks**: `[[slug]]` parsed at build time in `[slug].astro` for backlinks; NOT rendered inline in body text.
- **`BASE_URL` has a trailing slash**: `${BASE_URL}/work` produces `/tyfi-portfolio//work`. Browsers tolerate it but the idiomatic pattern is `${BASE_URL}work` (no leading slash). Currently the code has the double-slash everywhere; worth fixing as a follow-up.

## Next Session Notes
- [2026-06-15] User approved plan; chose `tyfi.computer` domain, Astro stack, editorial/warm minimalist aesthetic with alt templates for workshop, RMI/Vote Solar photos as placeholder headshot, GitHub account `ty-fi`.
- [2026-06-16] User iterated on design: add MDX, masonry grid, backlinks, 4th template inspired by Maggie Appleton + triangle-shows palette. Renamed /works → /work. Added categories field. Created scraper-plan.md. All 4 templates now working, backlinks verified on /work/carbon-stranding-briefing-2021.
- [2026-06-19] Spun up `ty-fi/tyfi-content` as standalone Obsidian vault + git repo for content management. Content is now authored there (QuickAdd / CLI) and manually synced to this repo's `src/content/`. Consider setting up git submodule or CI sync action next session.
