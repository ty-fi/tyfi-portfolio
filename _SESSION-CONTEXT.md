# Tyler Fitch Portfolio — Session Context

## At a Glance
**Objective:** Build a charming, professional portfolio website for Tyler Fitch (energy researcher) that serves as a queryable repository of his published works and a polished public face for professional audiences.
**Status:** ✅ LIVE at `https://ty-fi.github.io/tyfi-portfolio/` — site is live, all 4 templates working, 13 works + 8 press entries seeded.
**Last session:** Created standalone `ty-fi/tyfi-content` Obsidian vault as the canonical content management layer; updated README and AGENT.md to point here for content authoring.
**Next:** Set up automated sync from tyfi-content → this repo (git submodule or GitHub Action), or leave as manual copy for now.
**User Actions Needed:** (1) DNS: add CNAME for `tyfi.computer` → `ty-fi.github.io`. (2) Decide on submodule vs manual sync for tyfi-content. (3) Template choice at your leisure.
**Repo:** https://github.com/ty-fi/tyfi-portfolio.git
**Last machine:** TY_FI

---

## Tech Stack
- **Framework**: Astro 4.x (static site generation)
- **Content**: Markdown/MDX with content collections (Zod schemas)
- **Styling**: Plain CSS with design tokens (4 themes/templates)
- **Hosting**: GitHub Pages, custom domain `tyfi.computer`
- **Content source**: `ty-fi/tyfi-content` (Obsidian vault) → synced manually to `src/content/`

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

## Next Steps
1. **DNS**: Point `tyfi.computer` → `ty-fi.github.io` (add CNAME at registrar)
2. **Content sync**: Decide between git submodule vs GitHub Action to auto-pull from tyfi-content
3. **Use tyfi-content**: Add new works/press there going forward; copy `.md` files here to publish
4. **Template choice**: Pick a default template for the live site (currently A)

## Key Decisions / Gotchas
- **Two-repo content flow**: tyfi-content is canonical; tyfi-portfolio `src/content/` is a build-time copy. Frontmatter schemas are intentionally identical across both repos.
- **QuickAdd 2.x uses `"path"` not `"scriptPath"`** in `data.json` for UserScript commands
- **Obsidian renderer `require()`**: `require('./core.js')` fails in QuickAdd scripts — `__dirname` resolves to Obsidian's Electron install dir. All QuickAdd scripts must be self-contained (core functions inlined).
- **Template switcher**: Uses inline JS in `<head>` reading `?tpl=` from `window.location.search`; one-frame flash of Template A on initial load is acceptable trade-off.
- **Zod validation is the build gate**: missing required fields fail the build. Add `.optional()` or a default before adding new required fields.
- **Wikilinks**: `[[slug]]` parsed at build time in `[slug].astro` for backlinks; NOT rendered inline in body text.

## Next Session Notes
- [2026-06-15] User approved plan; chose `tyfi.computer` domain, Astro stack, editorial/warm minimalist aesthetic with alt templates for workshop, RMI/Vote Solar photos as placeholder headshot, GitHub account `ty-fi`.
- [2026-06-16] User iterated on design: add MDX, masonry grid, backlinks, 4th template inspired by Maggie Appleton + triangle-shows palette. Renamed /works → /work. Added categories field. Created scraper-plan.md. All 4 templates now working, backlinks verified on /work/carbon-stranding-briefing-2021.
- [2026-06-19] Spun up `ty-fi/tyfi-content` as standalone Obsidian vault + git repo for content management. Content is now authored there (QuickAdd / CLI) and manually synced to this repo's `src/content/`. Consider setting up git submodule or CI sync action next session.
