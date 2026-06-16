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

## Adding a new work (testimony, report, article, etc.)

1. Drop the PDF into `public/files/` (e.g. `my-testimony.pdf`).
2. Copy the template:
   ```powershell
   Copy-Item src\content\work\_template.mdx src\content\work\my-testimony.mdx
   ```
3. Open the new file and fill in the YAML frontmatter. Required fields:
   - `title` — full title of the work
   - `type` — one of: `testimony`, `report`, `white-paper`, `brief`, `article`, `thesis`, `comment`
   - `date` — date filed / published
   - `summary` — 2-3 sentence abstract
4. Optional fields: `employer`, `client`, `jurisdiction`, `docket_no`, `topics`, `categories`, `coauthors`, `pdf_url`, `canonical_url`, `featured`
5. Write the body in Markdown or MDX (optional — most entries can have an empty body if the summary is enough).
6. Reference other works with the wikilink syntax `[[other-slug]]` or `[[display text|other-slug]]`. The target work's page will automatically list this work as a backlink.
7. Commit and push:
   ```powershell
   git add .
   git commit -m "Add: [title]"
   git push
   ```
8. GitHub Actions rebuilds and deploys automatically.

### What is "categories"?

`categories` is a free-form array of short labels used for filtering on the
work index page. Use it however makes sense to you — some overlap with
`type` is fine, and you can add topical or thematic categories as well.
Example:

```yaml
type: testimony             # structured field, used for top-level tabs
categories:                 # free-form tags, used for filter chips
  - testimony
  - north-carolina
  - duke-energy
  - carbon-risk
```

## Adding a press / media appearance

1. Copy the template:
   ```powershell
   Copy-Item src\content\press\_template.md src\content\press\my-article.md
   ```
2. Fill the frontmatter. Required: `title`, `outlet`, `date`, `kind`, `url`.
3. `kind` is one of: `citation`, `interview`, `conference-talk`, `podcast`, `video`.
4. Optional: `quote` (pull-quote), `related_work` (slug of a related works entry), `summary`.
5. Commit and push.

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
