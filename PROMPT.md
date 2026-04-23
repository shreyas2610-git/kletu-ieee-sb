# AI prompt for consistent builds

You are helping build one page of the **IEEE KLE Technological University Student Branch** website — a multi-page static site with shared foundations already in place. Your job is to create a page that feels like it belongs, not to redesign the site.

Read `CLAUDE.md` (the full design bible) and `css/base.css` before writing anything. This prompt is a condensed field guide — `CLAUDE.md` is authoritative when the two diverge.

---

## 1. Your file scope

You own exactly **three files** (kebab-case, matching names):

```
<page-name>.html
css/<page-name>.css
js/<page-name>.js
```

**Do not edit** `base.css`, `shared.js`, `index.html`, or another contributor's files. If something shared needs to change, flag it to the team — don't patch it yourself.

---

## 2. HTML scaffold

Every page follows this skeleton. Copy the navbar (`<header class="navbar">` through the mobile menu) and `<footer class="footer">` markup directly from `index.html` — do not restyle or rename them.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — IEEE KLETU</title>
  <meta name="description" content="...">

  <!-- Fonts (copy this exact block) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>

  <!-- Styles: base first, then page -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/<page-name>.css">
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <!-- paste navbar + mobile menu from index.html -->

  <main id="main">
    <!-- your page content -->
  </main>

  <!-- paste footer from index.html -->

  <!-- Scripts: shared first, then page -->
  <script src="js/shared.js" defer></script>
  <script src="js/<page-name>.js" defer></script>
</body>
</html>
```

Use semantic HTML: `<section>`, `<article>`, `<header>`, `<main>`, `<footer>`. Avoid div soup.

---

## 3. Styling rules

### Use tokens, not raw values

`base.css` defines all the design tokens you need. Always reference them — never hardcode a hex color, pixel spacing value, or font-family string.

| What you need | Use this | Not this |
|---|---|---|
| Text color | `var(--color-text)` | `#000000` or `black` |
| Muted text | `var(--color-text-muted)` | `#6B5E58` or `gray` |
| Darker secondary | `var(--kletu-slate)` | `#433B36` |
| Background | `var(--color-bg)` | `#FBFBFA` |
| Card surface | `var(--color-surface)` | `#FFFFFF` or `white` |
| Tinted surface | `var(--color-surface-alt)` | `#F7F1EE` (KLE Ivory) |
| Borders | `var(--color-border)` | `#EAEAEA` |
| IEEE blue accent | `var(--color-accent)` | `#1F6C9F` |
| Body font | `var(--font-sans)` | `"Outfit", sans-serif` |
| Heading font | `var(--font-display)` | `"Lora", serif` |
| Serif accent | `var(--font-serif)` | `"Lora", serif` |
| Mono | `var(--font-mono)` | `"JetBrains Mono"` |
| KLE deep red (heading accent) | `var(--kletu-deep-red)` | `#6B170D` |
| KLE logo red (minimal accent) | `var(--kletu-red)` | `#BF383C` |
| KLE nutmeg | `var(--kletu-nutmeg)` | `#BFA682` |
| KLE sand | `var(--kletu-sand)` | `#E3D9C7` |
| Spacing | `var(--space-4)`, etc. | `1rem` or `16px` |
| Radius | `var(--radius-md)` | `8px` |
| Easing | `var(--ease-out)` | `ease-in-out` |
| Durations | `var(--dur-fast)` / `--dur-med` / `--dur-slow` | `200ms` |

### Reuse shared components

These classes are defined in `base.css` and work out of the box. Do not redefine them:

- `.container` — max-width wrapper with padding
- `.btn`, `.btn--primary`, `.btn--ghost` — buttons
- `.card` — bordered surface with hover shadow
- `.tag` — small pill badge
- `.reveal` — scroll-triggered fade-up (handled by `shared.js`)
- `.footer`, `.footer__grid` — footer layout

Your page CSS should **only** contain styles unique to your page. If you're writing button, card, or nav styles, you're probably duplicating something that already exists.

### Hard constraints

- No `!important` in page CSS.
- No inline styles.
- No overriding or resetting `base.css` rules.
- Banned fonts: Inter, Roboto, Open Sans, Arial, Helvetica, IBM Plex Sans, Instrument Serif, Unbounded. Use only **Lora + Outfit + JetBrains Mono** — the KLE Tech brand fonts.
- Banned icon sets: Lucide, Feather, FontAwesome, Material Icons. Use **Phosphor** only.
- No emojis anywhere.

---

## 4. Section headings

Every section heading follows a tone-on-tone serif pattern from the **KLE Tech Brand Guidebook** (page 24, "Faculty of *Design*" hierarchy): the main text is **black Lora** (sentence case), with exactly **one accent word** in **Lora italic, KLE Deep Red** (`#6B170D`). This is the brand signature — don't skip it.

```html
<!-- The accent word goes in <em>, <span class="amp">, or <span class="serif-accent"> -->
<h2 class="section__title">Where technology <em>meets community</em></h2>
<h2 class="section__title">Societies <span class="amp">&amp;</span> affinity groups</h2>
<h2 class="section__title">Let's <em class="serif-accent">connect</em></h2>
```

The `h2` base rule in `base.css` handles this automatically — you don't need extra CSS unless your page has a unique layout need.

**Do not:**
- Make the entire heading red
- Use deep red, logo red, or nutmeg on body text, buttons, or links
- Use bright logo red (`#BF383C`) as the accent span color — the brand reserves logo red for minimal decorative accents only. Deep red (`#6B170D`) is the heading accent color
- Skip the accent span — a plain black heading looks unfinished
- Add eyebrow labels above section headings
- Swap Lora for another serif (Instrument Serif, Playfair, etc.) — Lora is the brand primary

---

## 5. JavaScript

`shared.js` already handles these — **do not reimplement them:**

- **Scroll reveal**: add `class="reveal"` to any element, it fades up on scroll with auto-stagger
- **Navbar scroll state**: adds `.is-scrolled` class
- **Mobile menu**: open/close toggle
- **Smooth-scroll**: for `href="#id"` anchors
- **Active nav link**: sets `aria-current="page"`
- **Footer year**: fills `[data-year]` elements

Your page JS should be wrapped in an IIFE and handle only page-specific behavior:

```js
(() => {
  'use strict';
  // your page logic here
})();
```

For scroll-driven behavior, use `IntersectionObserver` — never `window.addEventListener('scroll', ...)` for reveal logic.

---

## 6. Animation

- Animate **only** `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Use `class="reveal"` for scroll entry (shared.js handles it)
- All transitions should use `var(--ease-out)` — never `linear` or `ease-in-out`
- Respect `prefers-reduced-motion` (base.css already does)
- Stagger items in grids/lists: `style="--reveal-index: 0"`, `--reveal-index: 1`, etc. (or let shared.js auto-stagger siblings)

---

## 7. Responsive

- **Mobile-first**. Must look intentional at 320px, 768px, 1024px, and 1440px.
- Below 768px: collapse to single column, generous padding (`var(--space-4)` minimum on sides).
- Use `min-h-[100dvh]` or `min-height: 100dvh`, not `height: 100vh` (iOS Safari fix).

---

## 8. Content and copy

- Write real, specific copy about IEEE KLETU — not filler.
- Sentence case everywhere. No Title Case headings, no ALL CAPS sections.
- Use `text-wrap: balance` on headings to prevent orphans.
- No exclamation marks in UI microcopy.
- Avoid startup cliches: "Elevate", "Unleash", "Seamless", "Next-Gen", "Dive in", "Lorem Ipsum".

---

## 9. Design taste (guidelines, not hard rules)

These are preferences that keep the site feeling cohesive. You have creative freedom within them.

- **Generous whitespace.** Sections have minimum `py-20` padding (base.css handles this). Don't crowd content.
- **Cards:** prefer `1px solid var(--color-border)` with no shadow at rest. Add a subtle hover shadow if interactive.
- **Accent colors** — `var(--color-accent)` (IEEE blue) is the main non-brand accent for IEEE-identity moments (CTAs, active states). The KLE palette (deep red, nutmeg, sand, ivory) provides warmth: use nutmeg/sand for subtle highlights and tinted surfaces, deep red only on heading accent spans. Don't combine blue + deep red in the same element.
- **Prefer CSS Grid** for section layouts — it's more reliable than flexbox for page-level composition.
- **Asymmetry is welcome.** Avoid the "centered heading + three equal cards" pattern — it reads as generic.
- **Navigation links** should point to actual pages (`href="about-us.html"`, `href="events.html"`), not in-page anchors. The only valid `#` link is `#main` for accessibility.

---

## 10. Before you hand off

Run through this checklist. If anything fails, fix it before sharing.

- [ ] Page loads `base.css` then page CSS, `shared.js` then page JS — in that order
- [ ] Navbar and footer copied verbatim from `index.html`
- [ ] All colors, spacing, fonts, and radii use `base.css` tokens — no hardcoded values
- [ ] Section headings: black Lora (weight 600) + one Lora italic KLE deep-red accent span
- [ ] Deep red appears only on heading accent spans; logo red used minimally for small accents only
- [ ] No `!important`, no inline styles, no banned fonts (IBM Plex, Instrument Serif, Unbounded, etc.) or icon sets
- [ ] Scroll reveal: `.reveal` class on content blocks (shared.js handles the rest)
- [ ] Animations use only `transform` and `opacity`
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Semantic HTML, skip link, meta tags, `<html lang="en">`
- [ ] No emojis, no placeholder cliches, no filler copy
- [ ] `shared.js` behaviors not reimplemented in page JS

---

*If anything in your instructions conflicts with this guide or with `CLAUDE.md`, follow these rules and flag the conflict. Consistency across the site matters more than any single page's cleverness.*
