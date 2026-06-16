# Tyler Fitch Portfolio — Build Plan

## Objective
Build a charming, professional portfolio website for Tyler Fitch (energy researcher) that serves as both (a) a reliable, queryable repository of his published works and (b) a polished public face for professional audiences.

## Status
In progress — Phase 0/1 (scaffold + content schema)

## Last session
Plan finalized. Plan mode exited. Starting build.

## Next
Scaffold Astro project, define content collections for `works` and `press`, create base layout, seed with the 5 RMI-authored works plus bios.

## User Actions Needed
- Confirm GitHub repo name (default proposed: `ty-fi/tyfi-portfolio`) — can correct later via rename
- Provide DNS access for `tyfi.computer` when we reach the deploy step
- At final review: pick among style templates A/B/C and confirm accuracy of seed corpus

---

## Decisions locked

| Question | Decision |
|---|---|
| Domain | `tyfi.computer` |
| Tech stack | Astro + Markdown content collections |
| Aesthetic | Editorial / warm minimalist (primary); build 2 alt templates to workshop |
| Seed | Use what's findable online (RMI, Synapse, Vote Solar, public dockets) |
| Press scope | News citations, interviews/quotes, conference talks/panels |
| Update flow | Edit Markdown + git commit |
| Research | Proactive — research now |
| Headshot | Use RMI/Vote Solar photos as placeholder |
| GitHub account | `ty-fi` |

## Site architecture

```
/              Home (bio snippet + featured works + recent)
/about         Long bio, education, experience timeline
/works         Tabbed: By Type · By Jurisdiction · By Employer
   /works/[slug]   Detail (PDF embed, abstract, citation, related)
/press         Filterable list (citation, interview, talk)
/contact       Email, LinkedIn, GitHub
```

## Data model

### Work entry
- `title`, `type` (testimony | report | white-paper | brief | article | thesis)
- `date`, `client_or_employer`, `jurisdiction` (for testimony), `docket_no`
- `topic` tags (resource-planning, rate-design, climate-risk, …)
- `summary` (2-3 sentences), `pdf_url` (canonical)
- `coauthors`, `press_url`

### Press entry
- `date`, `outlet`, `title`, `url`
- `kind` (citation | interview | conference-talk)
- `quote` excerpt, `related_work` (slug link)

## Style templates (build all 3, user picks)

| ID | Name | Vibe | Quick read |
|---|---|---|---|
| A | Editorial Magazine | New Yorker profile | Serif body, cream paper bg, forest-green or terracotta accent, footnoted meta, drop caps |
| B | Warm Tech Blog | swyx.io + warmth | Sans throughout, white bg, accent as link color, dense ruled lists, post-feed home |
| C | Scholarly CV | Academic reading list | All serif, near-white bg, small caps for headings, italics for emphasis, citation-forward |

All three render the same content so they're directly comparable.

## Implementation phases

1. **Phase 0 — Repo + domain**: Init GitHub repo `ty-fi/tyfi-portfolio`, scaffold Astro, point `tyfi.computer` at GitHub Pages
2. **Phase 1 — Schema + seed**: Content collections, transcribe RMI's 5 works + Synapse resume + testimony findings
3. **Phase 2 — Press research**: NCUC/SC PSC/VA SCC/GA PSC dockets, Google News citations, social media, conference proceedings
4. **Phase 3 — Three style templates**: A/B/C with same content
5. **Phase 4 — Pick & polish**: Apply choice, tighten typography, print-friendly detail, RSS
6. **Phase 5 — Hand-off**: README + `_SESSION-CONTEXT.md` documenting how to add a new work

## Next Session Notes
- [2026-06-15] User approved plan; chose `tyfi.computer` domain, Astro stack, editorial/warm minimalist aesthetic with alt templates for workshop, RMI/Vote Solar photos as placeholder headshot, GitHub account `ty-fi`.
