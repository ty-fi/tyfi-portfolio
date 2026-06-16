# AGENT.md — tyfi-portfolio

Professional portfolio for Tyler Fitch (energy researcher, expert witness). Built with **Astro 4** (static SSG), deployed to GitHub Pages at `tyfi.computer`. No CMS, no backend — everything is Markdown/MDX files and GitHub Actions.

---

## Stack

| Layer | Tool |
|-------|------|
| Framework | Astro 4.16 (ESM, static output) |
| Content | Astro content collections + MDX |
| Styling | Vanilla CSS (4 template files) |
| Types | TypeScript strict + Zod schemas |
| Interactivity | Inline vanilla JS (no framework) |
| Deploy | GitHub Pages via `deploy.yml` on push to `main` |

```
npm run dev      # localhost:4321
npm run build    # ./dist (static)
npm run preview  # preview dist
```

---

## Directory Map

```
src/
  content/
    config.ts          # Zod schemas — source of truth for all field types
    author/tyler.json  # Bio, links, experience (single source of truth)
    work/              # .md/.mdx — testimony, reports, articles, etc.
    press/             # .md — citations, interviews, podcasts
  layouts/
    Base.astro         # Master layout: nav, header, footer, template-switcher
  pages/
    index.astro        # Home: featured works + recent press
    about.astro        # Bio (from tyler.json), experience, education
    work/
      index.astro      # Filterable work list
      [slug].astro     # Dynamic detail page + backlinks
    press.astro        # Filterable press list
    contact.astro      # Email, LinkedIn, GitHub, Bluesky
  styles/
    a-editorial.css    # Template A — New Yorker / literary (default)
    b-warmblog.css     # Template B — warm tech blog
    c-scholarly.css    # Template C — academic CV
    d-amber-terminal.css # Template D — amber terminal + masonry
    template-switcher.css # Shared switcher UI
public/
  CNAME              # tyfi.computer
  files/             # Drop PDFs here; reference as /files/name.pdf
  images/            # headshot.jpg etc.
```

---

## Content Collections

### Works (`src/content/work/`)

Key frontmatter fields (defined in `config.ts`):

| Field | Type | Required |
|-------|------|----------|
| `title` | string | yes |
| `type` | `testimony \| report \| white-paper \| brief \| article \| thesis \| comment` | yes |
| `date` | date | yes |
| `summary` | string | yes |
| `employer` | string | no |
| `client` | string | no |
| `jurisdiction` | string | no (`NC \| SC \| VA \| GA` etc.) |
| `docket_no` | string | no |
| `topics` | string[] | no |
| `categories` | string[] | no — used for client-side filtering |
| `coauthors` | string[] | no |
| `pdf_url` | url | no |
| `canonical_url` | url | no |
| `featured` | boolean | default false — shows on home page |

**Wikilinks**: Body can contain `[[slug]]` or `[[Display Text|slug]]` to cross-reference other works. These are parsed at build time in `[slug].astro` to generate backlinks. Pattern: `/\[\[([^\]]+)\]\]/g`.

### Press (`src/content/press/`)

| Field | Type | Required |
|-------|------|----------|
| `title` | string | yes |
| `outlet` | string | yes |
| `date` | date | yes |
| `kind` | `citation \| interview \| conference-talk \| podcast \| video` | yes |
| `url` | url | yes |
| `quote` | string | no |
| `related_work` | string | no (slug of a work entry) |
| `summary` | string | no |

### Author (`src/content/author/tyler.json`)

Single JSON file. Contains `name`, `headline`, `location`, `current_role`, `bio_short`, `bio_long` (split on `\n\n` for paragraphs), `education[]`, `experience[]`, `contact`, `photo`. Edit directly to update bio.

---

## Template System

Four visual templates share all content. Switch via URL: `?tpl=a`, `?tpl=b`, `?tpl=c`, `?tpl=d`.

**How it works:**
1. `Base.astro` imports all four CSS files
2. Inline `<head>` script reads `?tpl=` param and sets `document.documentElement.dataset.tpl`
3. Body gets class `.template-a-page` (or b/c/d)
4. Each CSS file scopes rules to its own class (`.template-a-page .some-element`)
5. Pages include template-specific markup variants (e.g., `<h1 class="tpl-h1-a">`) — CSS hides non-matching variants

Template D is the only one with a radically different layout (masonry grid, monospace, ASCII art).

To change the default template: edit the fallback in the inline script in `Base.astro` (currently `'a'`).

---

## Routing & Data Flow

- **Static routes**: `index.astro`, `about.astro`, `press.astro`, `contact.astro`
- **Dynamic route**: `work/[slug].astro` — calls `getStaticPaths()` which fetches all works and generates one page per entry. Each page also receives `allWork` to compute backlinks.
- **Filtering**: Work and press list pages use `data-*` attributes on list items + client-side JS (no API). Filter state lives in URL query params or DOM only — no persistence.
- **Date formatting**: `fmt(date)` → `toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })`

---

## How to Add Content

**New work entry:**
1. Add PDF to `public/files/`
2. Copy `src/content/work/_template.mdx` → `src/content/work/my-slug.md(x)`
3. Fill required frontmatter (`title`, `type`, `date`, `summary`)
4. Commit & push → auto-deploys

**New press entry:**
1. Copy `src/content/press/_template.md` → new file
2. Fill required frontmatter (`title`, `outlet`, `date`, `kind`, `url`)
3. Commit & push

**Update bio / experience:** Edit `src/content/author/tyler.json` directly.

---

## Deployment

Push to `main` → `.github/workflows/deploy.yml` runs:
1. `npm install`
2. `npm run build` → `./dist`
3. Uploads `dist` to GitHub Pages → live at `tyfi.computer`

No staging environment. The `check.yml` workflow runs a build check on PRs.

---

## Schema Changes

To add a new field to works or press: edit the Zod schema in `src/content/config.ts`, then update:
- `src/pages/work/[slug].astro` (display the field on detail pages)
- `src/pages/work/index.astro` (expose for filtering if needed)
- `src/content/work/_template.mdx` (add to template for future entries)

Build will fail if existing entries violate the new schema — add `.optional()` or a default.

---

## Key Conventions

- **No comments** in source unless the why is non-obvious
- **Vanilla JS only** — no React, Vue, or Alpine
- **CSS variables** scoped per template (e.g., `--a-bg`, `--b-accent`) — don't mix across templates
- **Markdown-first content** — MDX is available but plain `.md` is preferred unless components are needed
- **Zod validation** is the build gate — a missing required field fails the build, not silently
- **No CMS** — content is in git; treat the `src/content/` files as the database
