# Sewing School — V1 Design Spec

**Date:** 2026-05-19
**Status:** Approved (brainstorm)
**Repo:** `~/Desktop/claude/sewing-school`

## 1. Purpose & Audience

A warm, project-first learning website for sewing-machine beginners that also serves as a reference for returning users. The hero feature is an interactive stitch simulator that visualizes how each stitch forms — both top-down (what you see on the fabric) and as a cross-section (what's happening underneath with the bobbin loop).

**Primary user:** A total beginner who just got a sewing machine and is intimidated by it.
**Secondary user:** An advanced beginner returning to look up which needle to use for denim, or how to insert a zipper.

## 2. V1 Scope

Eleven content units plus the simulator. Everything outside this list appears in the IA as "Coming soon" tiles on a public roadmap, so the site looks intentionally phased rather than incomplete.

**Setup walkthroughs (2):**
- Threading the machine (top thread + bobbin)
- Tension & stitch length

**Reference guides (4):**
- Needles — sizes/types matched to fabric
- Threads — cotton, poly, silk; when and why
- Fabrics — weight, stretch, recommended needle + thread combos
- Troubleshooting — skipped stitches, puckering, thread breakage

**Stitches with simulator (3):**
- Straight stitch
- Zigzag
- Buttonhole

**Projects (2):**
- Hem jeans (keep the original hem technique)
- Ruffle skirt

## 3. Out of Scope for V1

User accounts, progress tracking, comments, search, dark mode, video hosting, the other 13 content units from the full menu (machine anatomy tour, maintenance, 5 additional stitches, 6 additional projects). All appear as labeled "Coming soon" tiles so the IA is already in place.

## 4. Information Architecture

**Top navigation (in this order):** Projects · Stitches · Setup · Reference · About

**Homepage (project-first):**
- Hero: "What do you want to make today?" with 2 active project cards + "Coming soon" tiles for the future 6
- Secondary band: "New to the machine? Start with Threading →" linking to the setup walkthrough
- Footer band: link to all stitches, all reference

**Project page structure:**
1. Goal photo and one-line description
2. Difficulty + estimated time + required materials (needle, thread, fabric — each linked to its reference entry)
3. Required stitches (linked to stitch pages with embedded simulator preview)
4. Numbered steps with photos and inline simulator embeds where relevant

**Stitch page structure:**
1. Simulator (hero, top of page)
2. When to use this stitch
3. Recommended fabric / needle / thread (linked to reference)
4. "Used in these projects" — auto-generated cross-links

**Reference page structure:**
- Filterable/sortable tables (e.g., on Fabrics: pick "denim" and see recommended needle size, thread type, suggested stitch)

**Setup page structure:**
- Linear numbered walkthrough with photos and short explanatory text

## 5. Visual Design

Direction: **Crafty & warm** — feels like a friendly zine, inviting for nervous beginners.

**Palette:**
- Background cream: `#faf6ee`
- Ink (primary text): `#3a2e22`
- Brown accent: `#7a4a2b`
- Blush accent: `#e8a5a0`
- Border/divider: `#c9a87a` (dashed style)
- Paper-grain dot: `#e8dfc8` on cream

All combinations must pass WCAG 2.1 AA contrast. Where pastels don't meet contrast against cream, a darker companion (`#a85e58` for blush text, `#5a3a20` for brown text) is used.

**Typography:**
- Display / headlines: **Fraunces** (serif, warm)
- Body / UI: **Inter** (sans-serif, neutral and legible)
- Accent / labels / numeric: **JetBrains Mono** (monospace, gives the "handmade label" feel)

**Decorative motifs:**
- Subtle paper-grain background (radial-gradient dot pattern, `aria-hidden`)
- Dashed borders on cards and dividers (SVG-based so they scale crisply)
- Hand-drawn-style step number badges (rounded circles in blush)

## 6. Accessibility (Hard Requirements)

- WCAG 2.1 AA contrast verified for every text/background combination
- Visible focus rings on every interactive element (never `outline: none` without replacement)
- All interactive elements ≥ 44×44 px touch target
- Semantic HTML throughout: `<main>`, `<nav>`, `<article>`, properly ordered `<h1>`–`<h6>`
- Meaningful alt text on every content image; decorative imagery uses `aria-hidden="true"`
- **Simulator a11y:**
  - Keyboard-operable: Space toggles play/pause, ←/→ steps backward/forward, R resets, V toggles view
  - ARIA live region announces state changes ("Stitch 3 of 8. Needle entering fabric.")
  - Full text-equivalent description available via "Describe in words" toggle
  - Respects `prefers-reduced-motion`: shows an annotated static diagram instead of animation, with a "Play anyway" override
- Skip-to-content link
- Lighthouse accessibility target: ≥ 95

## 7. Technical Architecture

**Stack:**
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS with custom theme
- MDX for content authoring
- Deployed to Vercel (Hobby tier, free)
- GitHub repo (auto-deploy on push to `main`)

**No database, no auth, no backend.** Everything is static-rendered at build time. The simulator runs client-side.

**Content model:** MDX files in `content/` with YAML frontmatter declaring relationships. Example:

```yaml
---
title: Hem jeans (keep original hem)
slug: hem-jeans
difficulty: beginner
timeMinutes: 30
stitches: [straight]
materials:
  needle: denim-90-14
  thread: all-purpose-poly
  fabric: denim
heroImage: /img/projects/hem-jeans.jpg
status: published
---
```

A build-time script in `lib/cross-links.ts` reads all frontmatter and generates the reverse-lookup data (which projects use each stitch, which fabrics call for each needle) so cross-links don't need to be hand-maintained.

**Stitch Simulator component:**
- Single React component, HTML Canvas rendering
- Engine is parameterized: each stitch is a config object describing needle lateral offset over time, dwell points (e.g., buttonhole bartacks), stitch length, feed direction
- Two view modes share fabric + thread state; only the renderer differs
  - Top-down: looking at fabric, see needle bobbing and stitch pattern emerging
  - Cross-section: see needle pierce fabric, bobbin hook catch top thread loop, lockstitch form below
- Controls: Play, Pause, Step Forward, Step Backward, Speed (0.5x / 1x / 2x), Reset, View toggle
- State is plain React (`useReducer`); no external state library

## 8. File Structure

```
sewing-school/
├── app/
│   ├── layout.tsx                  # root layout (fonts, nav, footer)
│   ├── page.tsx                    # homepage (project-first)
│   ├── projects/
│   │   ├── page.tsx                # project index
│   │   └── [slug]/page.tsx         # individual project
│   ├── stitches/
│   │   ├── page.tsx                # stitch index
│   │   └── [slug]/page.tsx         # individual stitch
│   ├── setup/
│   │   ├── page.tsx                # setup index
│   │   └── [slug]/page.tsx         # individual setup walkthrough
│   ├── reference/
│   │   ├── page.tsx                # reference index
│   │   └── [topic]/page.tsx        # needles / threads / fabrics / troubleshooting
│   └── about/page.tsx
├── components/
│   ├── Simulator/
│   │   ├── index.tsx               # component shell, controls, a11y
│   │   ├── engine.ts               # parameterized stitch engine
│   │   ├── renderers/
│   │   │   ├── topDown.ts
│   │   │   └── crossSection.ts
│   │   ├── stitches/
│   │   │   ├── straight.ts
│   │   │   ├── zigzag.ts
│   │   │   └── buttonhole.ts
│   │   └── ReducedMotionFallback.tsx
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── StitchCard.tsx
│   ├── MaterialsTable.tsx
│   ├── StepList.tsx
│   ├── DashedDivider.tsx
│   └── PaperBackground.tsx
├── content/
│   ├── projects/
│   │   ├── hem-jeans.mdx
│   │   └── ruffle-skirt.mdx
│   ├── stitches/
│   │   ├── straight.mdx
│   │   ├── zigzag.mdx
│   │   └── buttonhole.mdx
│   ├── setup/
│   │   ├── threading.mdx
│   │   └── tension-and-stitch-length.mdx
│   └── reference/
│       ├── needles.mdx
│       ├── threads.mdx
│       ├── fabrics.mdx
│       └── troubleshooting.mdx
├── lib/
│   ├── content.ts                  # MDX loader, frontmatter parsing
│   └── cross-links.ts              # reverse-lookup generator
├── public/
│   └── img/                        # photos for projects, setup, etc.
├── tailwind.config.ts              # custom theme
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## 9. Component Boundaries

Each component should answer: *what does it do, how do you use it, what does it depend on?*

- **`<Simulator stitch="straight" />`** — Renders the canvas, controls, and a11y machinery. Depends on the engine and the named stitch config. No knowledge of MDX or content; usable anywhere.
- **`<MaterialsTable materials={...} />`** — Renders a row of linked material chips (needle, thread, fabric). Depends on reference content existing.
- **`<StepList>`** with `<Step n={1}>` children — Numbered step layout. No content awareness.
- **`<ProjectCard>`** — Hero image, title, difficulty, time. Used on homepage and project index.
- **`<Nav>`, `<Footer>`** — Layout primitives, no content awareness.
- **`lib/content.ts`** — The only module that knows about the filesystem and MDX. Returns typed data to pages.

## 10. Build Phases

1. **Skeleton:** Repo init, Next.js + Tailwind setup, custom theme, root layout, nav, footer, one empty placeholder page per route type. Deploy to Vercel.
2. **Content infrastructure:** MDX loader, frontmatter types, cross-link builder, MaterialsTable, StepList, ProjectCard, StitchCard.
3. **Simulator MVP:** Engine + top-down renderer + straight stitch. Controls + keyboard a11y + reduced-motion fallback.
4. **Simulator expansion:** Cross-section renderer + view toggle. Add zigzag and buttonhole configs.
5. **Content authoring:** Write all 11 MDX files. Source / shoot photos for projects and setup.
6. **Accessibility pass:** Contrast audit, keyboard walkthrough, screen-reader pass, Lighthouse polish to ≥ 95.
7. **Launch:** Final deploy, share URL.

## 11. Success Criteria

- A total beginner can land on the homepage and reach a finished hemmed pair of jeans by following links, without needing external resources.
- The simulator clearly conveys *how* a lockstitch forms (cross-section view) — this is testable by asking a user "where does the bobbin thread come from?" after they've played the simulator.
- Lighthouse scores: Accessibility ≥ 95, Performance ≥ 90, Best Practices ≥ 95, SEO ≥ 95.
- All 11 content pages reachable in ≤ 2 clicks from the homepage.
- Site loads to interactive in < 2 seconds on a cold cache, 4G connection.

## 12. Cost

**Total: $0** for V1.
- Vercel Hobby tier: free (100 GB bandwidth/month)
- GitHub: free
- Fonts (Google Fonts), Tailwind, Next.js: free / open source
- Stock photos: Unsplash (free) or original photography
- No database, no auth, no external APIs

Optional future cost: a custom domain (~$12/year) if/when desired.
