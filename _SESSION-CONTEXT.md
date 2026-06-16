# Tyler Fitch Portfolio — Session Context

## At a Glance
**Objective:** Build a charming, professional portfolio website for Tyler Fitch (energy researcher) that serves as a queryable repository of his published works and a polished public face for professional audiences.
**Status:** ✅ LIVE at `https://ty-fi.github.io/tyfi-portfolio/` — repo created, all commits pushed, deploy workflow passing.
**Last session:** Created GitHub repo at `ty-fi/tyfi-portfolio` via `gh`, enabled GitHub Pages, fixed a missing file (template-switcher.css) that wasn't committed earlier, pushed, and the site is now serving all 4 templates with working backlinks.
**Next:** User to point `tyfi.computer` DNS at `ty-fi.github.io` to use the custom domain (or keep using the github.io URL). The `public/CNAME` file already contains `tyfi.computer`.
**User Actions Needed:** (1) DNS: add a CNAME for `tyfi.computer` → `ty-fi.github.io`. (2) In repo Settings → Pages → Custom domain: type `tyfi.computer` to wire it up. (3) Any template choice / content review at your leisure.

---

## Project Type
Static portfolio site for an energy policy professional.

## Tech Stack
- **Framework**: Astro 4.x (static site generation)
- **Content**: Markdown with content collections
- **Styling**: Plain CSS with design tokens (3 themes/templates)
- **Hosting**: GitHub Pages, custom domain `tyfi.computer`
- **Repo**: `ty-fi/tyfi-portfolio` (GitHub)

## Working Directory
`C:\Users\fitch\claude-projects\tyfi-portfolio`

## Quick-Start Commands
```powershell
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy (after GitHub Pages is set up)
npm run deploy
```

## Content Locations
- Works: `src/content/works/*.md`
- Press: `src/content/press/*.md`
- Author/about: `src/content/author/*`
- Static assets (PDFs, images): `public/files/` and `public/images/`

## How to Add a New Work
1. Drop PDF into `public/files/`
2. Copy `src/content/works/_template.md` to `src/content/works/[slug].md`
3. Fill YAML frontmatter and body
4. `git add . && git commit -m "Add: [title]" && git push`
5. Site rebuilds automatically

## Style Template Files
- Template A (Editorial Magazine): `src/styles/a-editorial.css`
- Template B (Warm Tech Blog): `src/styles/b-warmblog.css`
- Template C (Scholarly CV): `src/styles/c-scholarly.css`
- Switch via `<link>` tag in `src/layouts/Base.astro` (commented selector at top of each)

## Decisions

### Confirmed
- Domain: `tyfi.computer`
- Stack: Astro + Markdown
- Aesthetic: Editorial/warm minimalist primary, 2 alts for workshop
- Seed source: Public web (RMI, Synapse, Vote Solar, dockets)
- Press scope: Citations, interviews/quotes, conference talks (not video testimony)
- Update flow: Markdown + git commit
- Research approach: Proactive, build corpus from public sources
- Headshot: RMI/Vote Solar photos as placeholder
- GitHub: `ty-fi`

## Current State (end of last build session)

- 18 pages built cleanly with `npm run build`
- 4 style templates (A/B/C/D) — flip with `/?tpl=a`, `/?tpl=b`, `/?tpl=c`, `/?tpl=d`
  - A — Editorial Magazine (default)
  - B — Warm Tech Blog (swyx.io inspired)
  - C — Scholarly CV (all serif)
  - D — Amber Terminal (Maggie masonry + triangle-shows.net palette)
- 13 works seeded, 8 press entries seeded, all in `src/content/work/` and `src/content/press/`
- Backlinks working: scan for `[[slug]]` references in body + frontmatter, render at bottom of detail page
- MDX support installed (`@astrojs/mdx@3.1.9`) — `.mdx` files now work, `.md` files still work
- Categories field added to work schema (free-form tags for filtering, complements topics)
- All work files now have `categories` populated and most have `[[wikilink]]` references to other works
- `/works` renamed to `/work` everywhere
- `_scraper-plan.md` created with full design for auto-population
- Headshot placeholder, GitHub Actions deploy workflow, README all up to date
- Dev server running at :4322

## Deferred Questions / Permission Asks

1. **Masonry grid on Templates A/B/C?** Currently only Template D uses the masonry layout (per the user's instruction "Implement the masonry-grid design" — singular). Should A/B/C also get masonry, or keep it unique to D?
2. **MDX components in work body?** The MDX integration is enabled and `_example-mdx.mdx` shows how to import components. Should I add an interactive component like a dockets-table or press-mentions-block? Or leave MDX as just a future option?
3. **Default template** — A is currently default. The user can pick any of A/B/C/D as the new default by editing one line in `Base.astro`.
4. **Wikilink rendering inside body** — currently `[[slug]]` is just left as raw text in the rendered page (only the backlink sidebar uses it). Should I add a remark/rehype plugin to convert `[[slug]]` into actual links inline? (Maggie does this.)
5. **Categories free-form vs controlled** — categories is currently free-form (Tyler can put anything). If a controlled vocabulary is preferred, I can add an enum to the schema.
6. **GitHub repo still not created** — `git init` was run, files staged, but the remote repo at `github.com/ty-fi/tyfi-portfolio` doesn't exist yet, so no push has happened. Awaiting user.
7. **DNS for `tyfi.computer`** — still pointing at the old Tumblr site. Awaiting registrar update.

## Bugs found and fixed during iteration

### Template switch not rendering (FIXED in commit c7eef48)
- **Symptom**: Visiting `/?tpl=d` rendered Template A (cream paper, serif), not Template D (Amber Terminal, dark, monospace, masonry).
- **Root cause**: Astro's dev server (and static SSG) drops the query string from the request URL before passing it to the page's frontmatter. The `Astro.request.url` and `new URLSearchParams(...)` calls were always reading the bare path (e.g., `/`), not `/?tpl=d`. Debug log proved this: every request logged `request URL: http://localhost:4321/` regardless of query string.
- **Fix**: Moved template detection to a synchronous inline `<script is:inline>` in the head of `Base.astro`. The script reads `?tpl=` from `window.location.search` and sets the body class. CSS rules in `src/styles/template-switcher.css` show/hide the appropriate content blocks based on the body class.
- **Trade-off**: There's a one-frame flash of Template A's styles before the script runs and switches. Acceptable for a workshop tool. To eliminate it, would need a server-rendered approach.
- **Affected files**: `Base.astro` (inline script, removed `template` prop), `index.astro` (rendered both A/B/C content variants and D masonry block), `work/index.astro` / `work/[slug].astro` / `press.astro` / `about.astro` (removed `template` prop and `Astro.request.url` logic), `template-switcher.css` (new file with show/hide rules).

## Last Task Completed
GitHub Actions deploy + check workflows added; session context updated; site builds clean.

## File Structure (target)
```
tyfi-portfolio/
├── public/
│   ├── files/          # PDFs of works
│   └── images/         # headshots, decorative
├── src/
│   ├── content/
│   │   ├── works/      # Testimony, reports, white papers
│   │   ├── press/      # Press appearances
│   │   └── author/     # Bio data
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── works/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── press.astro
│   │   └── contact.astro
│   ├── styles/
│   │   ├── a-editorial.css
│   │   ├── b-warmblog.css
│   │   └── c-scholarly.css
│   └── components/
├── package.json
├── astro.config.mjs
└── README.md
```

## Outstanding Questions / Blockers
None currently.

## Last Task Completed
Plan and session context files created; environment check initiated.

## Next Session Notes
- [2026-06-15] User approved plan; chose `tyfi.computer` domain, Astro stack, editorial/warm minimalist aesthetic with alt templates for workshop, RMI/Vote Solar photos as placeholder headshot, GitHub account `ty-fi`.
- [2026-06-16] User iterated on design: add MDX, masonry grid, backlinks, 4th template inspired by Maggie Appleton + triangle-shows palette. Renamed /works → /work. Added categories field. Created scraper-plan.md. All 4 templates now working, backlinks verified on /work/carbon-stranding-briefing-2021.
