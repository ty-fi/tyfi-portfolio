# Tyler Fitch — Portfolio Site

A charming, professional portfolio website for Tyler Fitch, energy researcher
and expert witness. Built with [Astro](https://astro.build) and hosted on
GitHub Pages at `tyfi.computer`.

## Quick start

```powershell
npm install        # one-time
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # preview the production build locally
```

## Content management

Content (works and press entries) is managed in a separate repo:
**[`ty-fi/tyfi-content`](https://github.com/ty-fi/tyfi-content)** — an Obsidian vault with
git version control. To add new content:

1. Open `tyfi-content` in Obsidian and use **QuickAdd → Add Content**, or run
   `node scripts/cli.js` from that repo's root.
2. Commit and push there.

The rest is automated. A scheduled GitHub Action (`.github/workflows/sync-content.yml`)
runs every 6 hours, diffs the two repos, and opens a PR here with any new or
updated files. Merge the PR to publish via `deploy.yml`. You can also trigger a
sync on demand from the Actions tab.

**File mapping:**

| tyfi-content | → | this repo |
|---|---|---|
| `works/*.md` | → | `src/content/work/` |
| `press/*.md` | → | `src/content/press/` |
| `pdfs/*` | → | `public/files/` |

`_*` files in tyfi-content (`_INDEX.md`, `_template.md`) are skipped, and the
matching portfolio files (`_template.mdx`, `_example-mdx.mdx`) are preserved.
Deletions are **not** propagated — to remove a published entry, delete it in
this repo directly.

### Adding directly in this repo (fallback)

If you need to add content without going through tyfi-content:

**New work:** Copy `src/content/work/_template.mdx` to a new file, fill
required frontmatter (`title`, `type`, `date`, `summary`), commit and push.

**New press entry:** Copy `src/content/press/_template.md`, fill required
fields (`title`, `outlet`, `date`, `kind`, `url`), commit and push.

The frontmatter schemas in `src/content/config.ts` are intentionally identical
to tyfi-content's format — files are interchangeable between repos.

## Updating your bio

Edit `src/content/author/tyler.json`. The site reads the bio text directly
from this file and renders it on the About page.

## Choosing a style template

Four style templates are wired up:

| Template | File | URL switch | Inspired by |
|---|---|---|---|
| A — Editorial Magazine (default) | `src/styles/a-editorial.css` | `/?tpl=a` | New Yorker / literary quarterly |
| B — Warm Tech Blog | `src/styles/b-warmblog.css` | `/?tpl=b` | swyx.io + warmth |
| C — Scholarly CV | `src/styles/c-scholarly.css` | `/?tpl=c` | Academic reading list |
| D — Amber Terminal | `src/styles/d-amber-terminal.css` | `/?tpl=d` | Maggie Appleton (masonry) + triangle-shows.net (palette) |

All four render the same content. Template D is the only one that uses a
masonry-grid layout for the work index. The default is template A. To change
the default, edit `Base.astro` (line ~14) where `template = 'a'`.

## MDX

Content files can be either `.md` (plain Markdown) or `.mdx` (Markdown with
embedded Astro components). Both work — pick whichever is more convenient.
The included `_template.mdx` and `_example-mdx.mdx` show how to use MDX.

## Backlinks

The work detail page automatically lists any other work that references it
using the wikilink syntax `[[slug]]`. The backlinks are computed at build
time by scanning all `work/*.md(x)` files for matching references.

This means as you add more work over time, the network of cross-references
grows automatically — every work becomes a node in a small graph of related
material.

## Deployment

The site is configured for GitHub Pages with a custom domain (`tyfi.computer`).
On push to `main`, GitHub Actions builds and deploys automatically. The
`public/CNAME` file contains `tyfi.computer`.

### Custom domain setup

1. In your DNS provider, add a CNAME record for `tyfi.computer` pointing to `ty-fi.github.io`.
2. The `public/CNAME` file already declares it so GitHub Pages knows what to serve.

## Project structure

```
.
├── public/
│   ├── files/                # PDFs of works (drop new ones here)
│   ├── images/               # headshot, etc.
│   ├── favicon.svg
│   └── CNAME                 # for custom domain
├── src/
│   ├── content/
│   │   ├── author/tyler.json     # bio data
│   │   ├── work/                 # testimony, reports, etc. (.md or .mdx)
│   │   └── press/                # media appearances
│   ├── layouts/
│   │   └── Base.astro            # main layout with template switcher
│   ├── pages/
│   │   ├── index.astro           # home
│   │   ├── about.astro
│   │   ├── press.astro
│   │   ├── contact.astro
│   │   └── work/
│   │       ├── index.astro       # filterable list
│   │       └── [slug].astro      # detail page (with backlinks)
│   └── styles/
│       ├── a-editorial.css       # template A (default)
│       ├── b-warmblog.css        # template B
│       ├── c-scholarly.css       # template C
│       └── d-amber-terminal.css  # template D
├── _PLAN.md                      # build plan
├── _SESSION-CONTEXT.md           # resume context
├── _scraper-plan.md              # auto-population scraper design
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Where things came from

- **Bio**: Synthesized from RMI, Vote Solar, and Synapse public bios
- **Headshot**: Placeholder from RMI's public bio page
- **Works corpus**: Initially seeded from RMI's "Authored Works" section, then expanded via public regulatory docket searches (NCUC, SC PSC, VA SCC, GA PSC) and Synapse's author archive
- **Press corpus**: Aggregated from WFAE, Canary Media, Charlotte Business Journal, Triangle Business Journal, Energy Nerd Show, and direct Facebook testimony video
- **Color palette** (Template D): triangle-shows.net `frontend/css/styles.css` (Amber palette)
- **Masonry + botanical** feel (Template D): Maggie Appleton's V3 site

## License

Code: MIT. Content: Yours.
