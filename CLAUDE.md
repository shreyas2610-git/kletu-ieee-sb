# IEEE Student Branch Website — Design & Build Guide

## Project Overview

Static landing page for a college IEEE Student Branch. The design must feel **clean, minimal, professional, and elegant** — not like a generic template or AI-generated site. Cool, purposeful animations should add polish without overwhelming.

**Nav sections:** About | Societies | Affinity Groups | Events Conducted | Upcoming Events | Contact Us

> Home page (`index.html`) shows only Hero, About, and a merged **Societies & Affinity Groups** chapter carousel, then Contact. Events Conducted and Upcoming Events live on their own pages (`events.html`, etc.) and are reachable via the navbar only — do not re-add those sections to the home page.

---

## Branch Information (Real Data)

- **Full name:** IEEE KLE Technological University Student Branch
- **College:** KLE Technological University (BVB campus)
- **IEEE Section:** Bangalore Section
- **Subsection:** North Karnataka SubSection

### Societies (Student Branch Chapters)
| Society | Abbreviation | Status |
|---------|-------------|--------|
| Computer Society | CS | Approved (04/12/2026) |
| Power Electronics Society | PES | Petition in approval stage |
| Robotics and Automation Society | RAS | Petition in approval stage |

### Affinity Groups
| Group | Abbreviation | Status |
|-------|-------------|--------|
| Women in Engineering | WIE | Petition in approval stage |
| Communications Society | ComSoc / COM-CHMDS | Active (membership promo ongoing) |

### Hero Section
- Full-width college building image (`assets/images/bvb.jpg`) with overlay
- IEEE logo (`assets/images/logo.png`) displayed on the hero
- Reference style: IEEE Bangalore Section hero (building image + bold text overlay)
- Execute in our minimal/elegant aesthetic — not dark/generic

### Dummy Data (to be replaced later)
- Total members: ~150+
- Events conducted: ~20+
- Use realistic but clearly placeholder numbers

---

## Design Philosophy

Blend of **minimalist-editorial** and **soft-premium** aesthetics. Think Notion meets Linear meets a high-end agency portfolio. Every pixel should feel intentional.

### The Three Dials (calibrated for this project)

| Dial | Value | Meaning |
|------|-------|---------|
| DESIGN_VARIANCE | 5 | Slight asymmetry, not wild — professional org site |
| MOTION_INTENSITY | 5-6 | Tasteful scroll reveals, hover feedback, subtle ambient motion |
| VISUAL_DENSITY | 3-4 | Generous whitespace, airy, gallery-like breathing room |

---

## Typography Rules

Typography follows the **KLE Tech University Brand Guidebook** (ch. 4): **Lora** (primary, serif) for headings, **Outfit** (secondary, sans) for body and UI. The KLE guidebook is authoritative — IEEE KLETU SB is a sub-brand and inherits the parent university's typographic system.

### Allowed Fonts
- **Section titles (`h2`, `.section__title`) and hero headline:** `Lora` weight **600** via the `--font-display` token, in sentence case, rendered in **pure black** (`var(--color-text)`). Lora is the brand primary — a contemporary serif with calligraphic roots, moderate contrast, well-suited for headers. Do not swap it for a sans-serif.
- **Heading accents (`em`, `.amp`, `.serif-accent` inside an `h2`):** `Lora` **italic**, weight **400**, colored **KLE Deep Red** (`var(--kletu-deep-red)` / `#6B170D`). This matches the brand's "Faculty of *Design*" hierarchy (guidebook page 24) and the `Leveraging *Knowledge*` tagline treatment. The effect is tone-on-tone serif (upright Lora + italic Lora in deep red) — a subtle editorial brand moment, not a high-contrast tricolor. Do not style accent spans any other way (no outlines, no gold, no sans-serif accents, no bright logo red, no full-red headings).
- **Body, h3/h4, buttons, nav, tags, UI labels:** `Outfit`. Commit to this sans for everything outside h2/hero and monospace.
- **In-line titles / small uppercase labels:** `Outfit` Medium or Semibold, uppercase, `letter-spacing: 0.05em–0.1em` (per guidebook hierarchy page 24).
- **Monospace (dates, chapter meta, footer hierarchy):** `JetBrains Mono`.

### Banned Fonts
Inter, Roboto, Open Sans, Arial, Helvetica, IBM Plex Sans, Instrument Serif, Unbounded — use only **Lora + Outfit + JetBrains Mono**.

### Typography Specs
- Hero headline: `Lora` weight 600, tight tracking (`letter-spacing: -0.02em` to `-0.03em`), line-height `1.1`. The hero is the first brand moment — let Lora carry it.
- Body text: **pure black `#000000`** via the `--color-text` / `--text-primary` tokens. Do not hardcode `#111111` or `#1a1a1a` — always reference the token.
- Body line-height: `1.6` for legibility.
- Secondary/muted text: `var(--color-text-muted)` = `#6B5E58` (**KLE Quicksand**, warm neutral) — preserve for hierarchy; do not flip muted text to pure black.
- Darker secondary text (card captions, meta): `var(--kletu-slate)` / `#433B36`.
- Section titles: `clamp(2rem, 5.2vw, 3.5rem)`, `font-family: Lora`, `font-weight: 600`, `letter-spacing: -0.01em`, `line-height: 1.15`, `text-align: center`, `text-wrap: balance`. Main heading fills with `var(--color-text)` (black). Accent spans switch to `Lora` italic weight 400 in `var(--kletu-deep-red)`.
- Max body text width: ~65 characters (`max-w-prose` or `max-w-3xl`).
- Use `text-wrap: balance` on headings to prevent orphans.
- Sentence case everywhere — no unnecessary Title Case or ALL CAPS (uppercase is reserved for small in-line labels and tag pills).
- **No eyebrow pills** above section headings. The Lora h2 with its italic deep-red accent carries the section identity on its own — do not re-introduce `<span class="eyebrow">` labels in new sections.
- **Every section `h2` should include an accent span.** Wrap the key word (or the `&` between two nouns) in `<em>`, `<span class="amp">`, or `<span class="serif-accent">` so the italic deep-red treatment has something to land on. A heading with no accent span loses the brand moment and looks incomplete.

---

## Color Palette

The palette is the **KLE Tech University Brand Guidebook** palette (ch. 3). Every color used on the site must come from a token in `base.css` — never hardcode a hex. Deep Red is the primary "star" color; logo red is minimal; nutmeg and the pastel neutrals ground the warm-premium feel.

### Primary (Warm Monochrome)
- **Background/Canvas:** `#FBFBFA` (near-white) via `--color-bg`.
- **Card surfaces:** `var(--color-surface)` = `#FFFFFF` (brand white).
- **Secondary surface / tinted sections:** `var(--color-surface-alt)` = `#F7F1EE` (**KLE Ivory**).
- **Text primary:** `var(--color-text)` / `var(--text-primary)` = **`#000000`** (pure black).
- **Text secondary (muted):** `var(--color-text-muted)` = `#6B5E58` (**KLE Quicksand**, warm neutral).
- **Text darker secondary:** `var(--kletu-slate)` = `#433B36` — for card captions, meta, tighter hierarchy contrast.
- **Borders/Dividers:** `var(--color-border)` = `#EAEAEA` — always `1px solid`.

### KLE Tech Brand Colors (use per guidebook proportions)
| Token | Hex | Name | Usage |
|---|---|---|---|
| `--kletu-deep-red` | `#6B170D` | **Deep Red** | **Primary brand color** — heading accent spans (`em` / `.amp` / `.serif-accent`), occasional bold-color section backgrounds, featured brand moments. Pair with ivory/sand. |
| `--kletu-red` | `#BF383C` | Logo Red | **Minimal** — only for small accent elements (bullet dots, the `section-tag` square, decorative underlines). Never on text, CTAs, or backgrounds. |
| `--kletu-nutmeg` | `#BFA682` | Nutmeg | Secondary accent — pairs with deep red. Good for highlight backgrounds, CTA underlines, italic pull-quote color on dark backgrounds. |
| `--kletu-ivory` | `#F7F1EE` | Ivory | Surface/background tint — tertiary sections, tinted cards. |
| `--kletu-sand` | `#E3D9C7` | Sand | Subtle warm accent for dividers, chart fills, decorative shapes. |
| `--kletu-quicksand` | `#6B5E58` | Quicksand | Muted body/meta text. |
| `--kletu-slate` | `#433B36` | Slate | Secondary text, captions, darker footer text. |
| `--kletu-gold` | `#D4A84B` | Gold | Reserved — legacy token, do not use without design approval. |

### Color Proportions (from guidebook ch. 3, page 20)
- **Deep Red** is the star — use as primary branded color.
- **Nutmeg** complements and highlights — works well for CTAs and adding warmth.
- **White** dominates backgrounds; **Black/Slate** dominates text.
- **Pastel neutrals** (Ivory, Sand, Quicksand) are quiet supporting tones for backgrounds and decoration.
- **Logo red is used minimally** — only as accent to highlight elements, never as CTA or primary text color.

### Accent (ONE only — IEEE blue, sub-brand identity)
- `var(--color-accent)` = `#1F6C9F` (desaturated IEEE blue), pastel tint `var(--color-accent-soft-bg)` = `#E1F3FE`.
- Saturation stays below 80%.
- Use sparingly: CTAs, active nav states, tags, small highlights that reference IEEE identity. Never combine with KLE red/deep-red in the same element.

### Banned Colors
- Hardcoded hex values for text/background/borders — always reference tokens from `base.css`.
- Neon anything, purple AI gradients, oversaturated accents.
- Gradient text.
- Bright colored hero section backgrounds.
- Logo red (`#BF383C`) used as text color, CTA fill, or any large background.
- Deep red used anywhere outside heading accent spans and occasional large branded sections (get design approval first).

---

## Layout Principles

### Structure
- **CSS Grid over Flexbox** for section layouts — more reliable, more versatile
- **Max-width container:** `1200px`-`1400px` with auto margins and `px-6` side padding
- **Section padding:** minimum `py-20` to `py-28` — let the design breathe
- **Mobile-first:** always use `min-h-[100dvh]` not `h-screen` (iOS Safari fix)
- **Below 768px:** aggressively collapse to single column, `w-full`, `px-4`

### Banned Layouts
- Centered hero + three equal cards underneath (the most generic AI pattern)
- Symmetrical everything — introduce subtle asymmetry
- Edge-to-edge sticky navbars glued to the top — prefer floating pill or inset nav

### Encouraged Patterns
- **Floating pill navbar** — detached from top edge, rounded, glass-effect blur on scroll
- **Asymmetric bento grids** for event showcases or feature sections
- **Split-screen hero** — text on one side, visual on the other (not centered text over image)
- **Stacked scroll sections** with generous whitespace between
- **Section headers** — a centered black Lora `h2` with exactly one Lora italic deep-red accent span (`em` / `.amp` / `.serif-accent`), optionally followed by a centered `.section__subtitle` paragraph. No eyebrow label above it.

---

## Component Design

### Cards (use sparingly)
- Never use the generic `border + shadow + white bg` combo
- Prefer: `1px solid #EAEAEA` border, no shadow, generous internal padding (`p-6` to `p-10`)
- Border-radius: `8px` to `12px` — crisp, not bubbly. Never `rounded-full` on cards
- On hover: ultra-subtle shadow shift `0 2px 8px rgba(0,0,0,0.04)` over `200ms`
- Consider the **double-bezel technique** for featured cards: outer shell with inner core

### Buttons
- Primary: `background: var(--color-text)` (pure black) with `color: #fff`, border-radius `4px`-`6px`, no box-shadow.
- Hover: subtle lift to `#333333` or `scale(0.98)` on active.
- Generous padding: `px-6 py-3`.
- Consider **button-in-button** pattern: trailing arrow icon nested in its own circular wrapper.
- Do not introduce red-filled buttons — red is reserved for section headings.

### Tags/Badges (for event categories, dates)
- Pill-shaped (`rounded-full`)
- `text-xs uppercase tracking-[0.05em] font-medium`
- Muted pastel background with darker text

### Navigation
- **Floating glass pill** style — rounded, centered, slightly detached from top
- `backdrop-blur` + semi-transparent background
- Smooth hamburger-to-X morph on mobile
- Staggered link reveals in mobile menu
- Active link visually distinct

### Icons
- Use **Phosphor Icons** (Light or Regular weight) or **Radix UI Icons**
- Never use Lucide, Feather, FontAwesome, or Material Icons
- Standardize stroke width across all icons
- No emojis anywhere — ever

---

## Animation & Motion

### Scroll Entry Animations
- Elements fade up: `translateY(12px)` + `opacity: 0` resolving over `600ms`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — smooth deceleration
- Use `IntersectionObserver` — never `window.addEventListener('scroll')`
- **Stagger grid/list items:** `animation-delay: calc(var(--index) * 80ms)` — never mount everything at once

### Hover & Interactive States
- Cards: ultra-subtle shadow shift on hover
- Buttons: `scale(0.98)` on `:active` for tactile press feel
- Links: smooth underline transitions or color shifts
- All transitions: `200ms`-`300ms`, custom cubic-bezier (never `linear` or `ease-in-out`)

### Ambient Motion (optional, subtle)
- Very slow-moving radial gradient blob in background
- `animation-duration: 20s+`, `opacity: 0.02-0.04`
- `position: fixed; pointer-events: none` — decorative layer only

### Performance Rules (non-negotiable)
- Animate ONLY `transform` and `opacity` — never `top`, `left`, `width`, `height`
- `will-change: transform` sparingly, only on actively animating elements
- `backdrop-blur` only on `fixed`/`sticky` elements (navbar) — never on scrolling content
- Grain/noise overlays: `position: fixed; pointer-events: none` only
- Target 60fps always

---

## Content Rules (Anti-Generic)

### Banned Placeholder Content
- "John Doe", "Jane Smith", "Acme Corp", "Lorem Ipsum"
- Round numbers like "99.99%", "10,000+ members"
- Startup clichés: "Elevate", "Unleash", "Seamless", "Next-Gen", "Game-changer", "Delve"
- Exclamation marks in success messages
- Filler phrases: "In the world of...", "Let's dive in..."

### Content Guidelines
- Write real, specific copy — even if placeholder, make it contextual to IEEE
- Use active voice, direct language
- Be specific with numbers when available
- Keep microcopy (button labels, tooltips) concise and clear
- Error messages: direct and helpful, no generic alerts

---

## Technical Stack (Static Site)

### Recommended
- **HTML5** with semantic elements: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **CSS** — vanilla CSS with custom properties (CSS variables) for theming, or Tailwind CSS if preferred
- **Vanilla JavaScript** for animations and interactions
- **Google Fonts** for typography loading
- **Phosphor Icons** via CDN or SVG sprites

### Animation Options (pick one, don't mix)
- **Vanilla JS + IntersectionObserver + CSS transitions** — lightest, best for static site
- **GSAP** (GreenSock) — if more complex scroll-driven animations are needed
- **Framer Motion** — only if using React (not recommended for a simple static site)

### Code Quality
- Semantic HTML throughout — no div soup
- Relative units (`rem`, `em`, `%`, `max-width`) — avoid hardcoded px where possible
- Proper `alt` text on all images — descriptive, never empty
- Meta tags: `<title>`, `description`, `og:image`, social sharing tags
- Responsive: test at 320px, 768px, 1024px, 1440px breakpoints
- Include `<link rel="icon">` favicon
- Add skip-to-content link for accessibility
- `scroll-behavior: smooth` for anchor navigation

### File Structure (multi-page, page-per-feature)

This is a **multi-page static site**, not a single-page app. Each top-level nav section is its own HTML page with its own CSS and JS file.

```
/
├── index.html                 # home (hero + overview)
├── about-us.html              # one file per page
├── societies.html
├── events.html
├── ...
├── css/
│   ├── base.css               # SHARED — tokens, resets, nav, footer, card, btn, tag, .reveal
│   ├── style.css              # legacy home-page styles (being migrated)
│   └── <page-name>.css        # one file per page, page-specific styles only
├── js/
│   ├── shared.js              # SHARED — scroll reveal, nav scroll state, mobile menu, smooth-scroll, footer year
│   ├── main.js                # legacy home-page script
│   └── <page-name>.js         # one file per page, page-specific behavior only
├── assets/
│   ├── images/
│   └── icons/
├── GITHUB_GUIDE.md
└── CLAUDE.md
```

### Contributor workflow (5 people, mixed experience)

Each page is owned by one contributor. Ownership is obvious from filenames.

**When building a new page:**
1. Create three files with matching kebab-case names: `<page>.html`, `css/<page>.css`, `js/<page>.js`.
2. Load in this order (base first, page second):
   ```html
   <link rel="stylesheet" href="css/base.css">
   <link rel="stylesheet" href="css/<page>.css">
   <script src="js/shared.js" defer></script>
   <script src="js/<page>.js" defer></script>
   ```
3. Copy the `<nav class="nav">` and `<footer class="footer">` markup verbatim from `index.html`. Do not restyle or rename.
4. Use shared tokens and components only — never hardcode colors/spacing/fonts.

**Never edit `base.css`, `shared.js`, or another contributor's page files.** If something shared needs to change, flag it — don't patch it locally.

### Shared foundations — what lives where

**`css/base.css`** provides:
- Design tokens as CSS variables: `--color-bg`, `--color-surface`, `--color-surface-alt` (Ivory), `--color-text` (pure black), `--color-text-muted` (Quicksand), `--color-border`, `--color-accent` (IEEE blue), `--color-accent-soft-bg`, `--color-accent-soft-text`, full KLE palette (`--kletu-red`, `--kletu-deep-red`, `--kletu-nutmeg`, `--kletu-ivory`, `--kletu-sand`, `--kletu-quicksand`, `--kletu-slate`, `--kletu-gold`), `--font-sans` (Outfit), `--font-mono` (JetBrains Mono), `--font-serif` (Lora — used for italic heading accents), `--font-display` (Lora — section titles and hero), spacing scale (`--space-1` … `--space-28`), `--radius-sm/md/lg/pill`, motion (`--ease-out`, `--dur-fast/med/slow`), layout (`--container-max`, `--container-pad`).
- Reset, base typography (h1-h4, p, `.eyebrow`, `.text-muted`, `.mono`).
- Shared classes: `.container`, `.skip-link`, `.nav` (+ `.nav__brand`, `.nav__links`, `.nav__toggle`, `.is-scrolled`, `.is-open`), `.btn` + `.btn--primary` / `.btn--ghost`, `.card`, `.tag`, `.footer` + `.footer__grid`, `.reveal` (+ `prefers-reduced-motion` handling).

**`js/shared.js`** provides:
- Scroll reveal via IntersectionObserver for any `.reveal` element (auto-stagger across siblings — override with `style="--reveal-index: N"`).
- Navbar scroll state (toggles `.is-scrolled` past 8px).
- Mobile menu open/close with `.is-open`.
- Smooth-scroll for in-page `href="#id"` anchors (ignores bare `#`).
- `aria-current="page"` applied to nav link matching the current filename.
- Auto-fills any element with `data-year` to the current year.

Do not reimplement any of these in a page file.

### Cross-page navigation rules

Because the site is multi-page, in-page section anchors (`href="#about"`, `href="#societies"`, etc.) are **disabled**. Use real page URLs instead (`href="about-us.html"`, `href="societies.html"`). The only legitimate `href="#id"` is the accessibility skip link (`#main`).

---

## Pre-Output Checklist

Before considering any section complete, verify:

- [ ] No banned fonts (Inter, Roboto, IBM Plex Sans, Instrument Serif, Unbounded, etc.) present — only Lora + Outfit + JetBrains Mono
- [ ] Section titles use `Lora` weight 600 in black (`var(--color-text)`) — no outline, no strip, no eyebrow above
- [ ] Every section `h2` contains exactly one accent span (`em` / `.amp` / `.serif-accent`) rendered in **Lora italic weight 400 in KLE Deep Red** (`var(--kletu-deep-red)` / `#6B170D`)
- [ ] Primary text references `var(--color-text)` / `var(--text-primary)` (resolves to `#000000`) — no hardcoded `#111111` or `#1a1a1a`
- [ ] Muted text kept as `var(--color-text-muted)` (Quicksand `#6B5E58`) — not flipped to black
- [ ] Deep red appears ONLY on heading accent spans (or on rare approved branded sections) — never on body copy, buttons, links, full headings
- [ ] Logo red (`#BF383C`) used minimally — small decorative accents only, never as text/CTA/background
- [ ] Only ONE accent color used, saturation < 80%
- [ ] Section padding minimum `py-20` equivalent
- [ ] All cards use `1px solid #EAEAEA` or similar — no generic shadow+border combo
- [ ] All transitions use custom cubic-bezier — no `linear` or `ease-in-out`
- [ ] Scroll entry animations on all major content blocks using IntersectionObserver
- [ ] Staggered reveals on lists/grids
- [ ] Hover states on all interactive elements
- [ ] Layout collapses cleanly below 768px
- [ ] Semantic HTML used (`nav`, `main`, `section`, `footer`)
- [ ] No emojis anywhere
- [ ] No placeholder clichés in copy
- [ ] Animations use only `transform` and `opacity`
- [ ] `min-h-[100dvh]` used instead of `height: 100vh`
- [ ] Floating/glass navbar, not edge-to-edge sticky bar
- [ ] No three-equal-column card layout
- [ ] Footer includes relevant links (privacy, social, contact)
- [ ] Meta tags and favicon present
- [ ] Real, contextual copy — not generic filler
- [ ] Page loads `css/base.css` before `css/<page>.css`, and `js/shared.js` before `js/<page>.js`
- [ ] Nav and footer markup copied verbatim from `index.html`
- [ ] No hardcoded colors, spacing, or font-families — all values come from `base.css` tokens
- [ ] No reimplementation of scroll reveal, navbar behavior, or mobile menu (shared.js owns these)
- [ ] No `href="#section"` anchors — use real page URLs (only `#main` skip link allowed)

---

## References

Design principles distilled from [taste-skill](https://github.com/Leonxlnx/taste-skill):
- `taste-skill` — core design system with variance dials
- `minimalist-skill` — editorial monochrome, bento grids, flat architecture
- `soft-skill` — premium depth, double-bezel, spring physics, cinematic motion
- `redesign-skill` — audit checklist, fix priority, anti-pattern catalog
- `output-skill` — complete output enforcement, no lazy shortcuts
