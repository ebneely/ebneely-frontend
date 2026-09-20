# DevTools AI prompt pack — motion extraction

For the **Chrome DevTools → AI assistance (Elements panel)**. Workflow:
open the page, right-click the element → **Inspect**, then in the AI assistance
panel the highlighted node is already the context. Paste one prompt per element.

Run **Phase 1 once per section**, then **Phase 2** on each component it names.
Paste the raw output back to me — values only, no code needed.

---

## Phase 0 — page-level setup (run once)

> You are inspecting this page for a motion audit. Report only measured facts, no
> opinions and no code. Tell me: (1) which animation libraries are present on
> `window` (check for `Motion`, `framerMotion`, `gsap`, `ScrollTrigger`, `Lenis`,
> `locomotive`, `anime`, `Swiper`, `Splide`, `Lottie`, `three`); (2) whether a
> smooth-scroll wrapper exists — look for a `<div>` with `transform: translate3d`
> on the scroll container, `data-lenis`, `[data-scroll-container]`, or `html.lenis`;
> (3) the value of `html`/`body` `scroll-behavior`; (4) whether any
> `prefers-reduced-motion` media query is defined in the stylesheets; (5) the
> `will-change` values in use across the document. Answer as a plain list.

---

## Phase 1 — component inventory (run per section)

Inspect the **section wrapper**, then:

> Inspect the highlighted subtree. Produce a component inventory as a flat table,
> no code. For each visually distinct repeated or interactive part, give me:
> a short name I choose to describe it; its tag and depth path relative to the
> highlighted node; how many instances exist; its `display` / `position` /
> `overflow` / `aspect-ratio` / `border-radius`; the grid or flex declaration of
> its parent including `gap` and `grid-template-columns`; its own
> padding/margin; its font-family, font-size, font-weight, line-height and
> letter-spacing; and whether it has any `transition`, `animation`,
> `@keyframes`, `transform`, `filter`, `clip-path` or `will-change` set. Mark
> every part that has motion with `MOTION: yes` so I know what to drill into
> next. Report computed values in px.

Run this on, at minimum:
- the hero section
- the sticky header
- the template/work grid
- a single card inside the grid
- the pricing block
- the footer

---

## Phase 2 — motion per component

One prompt per component. All of them end with the same output contract, so the
results are comparable. Inspect the exact node that moves, not its parent.

### 2.1 Hero type reveal

> The highlighted element animates in on load. Report measured values only, no
> code. Give me: the exact properties animated and their from/to values; duration
> in ms; easing as a `cubic-bezier()` or, if it is spring-based, the stiffness,
> damping and mass; delay before it starts in ms; if the text is split into
> lines/words/chars, the per-item stagger in ms and the stagger direction; whether
> it animates `transform`+`opacity` only or also layout properties; any
> `clip-path` or `overflow: hidden` mask used to wipe the text; and whether the
> animation is driven by CSS `animation`, the Web Animations API, or a JS library.
> If you can read it from the Animations panel timeline, give me the raw keyframe
> offsets as percentages.

### 2.2 Scroll-triggered section reveal

> The highlighted element reveals as it scrolls into view. Report measured values
> only, no code. Give me: the trigger threshold — at what viewport position it
> starts and ends (as `start end` / `end start` style offsets, or the
> IntersectionObserver `rootMargin` and `threshold` if one is attached); whether
> it is a one-shot trigger or scroll-linked (scrubbed); the properties animated
> with from/to values; duration in ms and easing as `cubic-bezier()` or spring
> params; the stagger in ms between sibling children and the order they fire in;
> and whether it replays on scroll-up.

### 2.3 Card hover and press

> The highlighted card responds to pointer hover and mousedown. Report measured
> values only, no code. Give me, separately for **hover-in**, **hover-out** and
> **press**: properties animated with from/to values (translate in px, scale as a
> ratio, rotate in deg, opacity, box-shadow, filter, background-color); duration
> in ms; easing as `cubic-bezier()` or spring stiffness/damping/mass; and delay.
> Also: does the inner image scale independently of the card, and if so by how
> much and with what easing; is there a cursor-position-dependent tilt or
> translate, and if so the maximum deflection in px or deg and the smoothing
> factor; and is `transform-origin` non-default.

### 2.4 Sticky header shrink

> The highlighted header changes as the page scrolls. Report measured values only,
> no code. Give me: the scroll distance in px at which each change begins and
> completes; every property that changes with from/to values (height, padding,
> background-color including alpha, backdrop-filter, border, box-shadow, logo
> scale or translate, font-size); duration in ms and easing per property; whether
> the change is scroll-linked or a class toggle at a threshold; whether the header
> hides on scroll-down and reappears on scroll-up, and if so the translate
> distance, the threshold in px and the timing; and the `z-index` and `position`
> values.

### 2.5 Horizontal marquee / template strip

> The highlighted strip scrolls horizontally on its own. Report measured values
> only, no code. Give me: total translate distance and whether it is expressed in
> `%` or px; the loop duration in ms for one full cycle and the resulting px/second
> speed; the easing (confirm whether it is `linear`); how the seamless loop is
> achieved (duplicated track, modulo reset, or `steps()`); whether it pauses on
> hover and the ramp-down duration and easing if so; whether scroll velocity
> modulates the speed or direction, and if so the multiplier and the smoothing
> time constant; and the `gap` between items in px.

### 2.6 Page-to-page transition

> A navigation on this site plays a transition between pages. Report measured
> values only, no code. Tell me: whether it uses the View Transitions API
> (`document.startViewTransition`, `::view-transition-*` rules,
> `view-transition-name` on any element), a framework router animation, or a
> full-page overlay element. Then give me: the outgoing animation's properties,
> from/to values, duration in ms and easing; the same for the incoming animation;
> the overlap between them in ms; the total perceived duration; any covering
> element's color, `clip-path` or `transform` keyframes; and whether scroll
> position is restored or reset.

### 2.7 Pricing card focus

> Hovering one card in the highlighted pricing group changes the sibling cards.
> Report measured values only, no code. Give me: what changes on the hovered card
> (translate, scale, border-color, box-shadow, background) with from/to values;
> what changes on the non-hovered siblings (opacity, scale, filter, blur) with
> from/to values; duration in ms and easing for the hovered card and for the
> siblings separately; any stagger between siblings in ms; and the
> reset-on-pointerleave duration and easing.

### 2.8 Menu overlay open

> The highlighted overlay opens from a button. Report measured values only, no
> code. Give me: the overlay's entry animation — properties, from/to values,
> duration in ms, easing or spring params; any `clip-path` or mask keyframes with
> their exact values; the per-link stagger in ms, the start delay in ms, and the
> per-link properties and distances; the burger icon's own morph — which lines
> translate/rotate, by how many px and deg, over how many ms, with what easing;
> the close animation's values where they differ from the open; and how scroll
> is locked while open (`overflow: hidden`, `position: fixed`, or a JS
> scroll-lock).

### 2.9 Cursor follower

> A custom cursor element follows the pointer on this page. Report measured values
> only, no code. Give me: the element's size, border-radius, background,
> `mix-blend-mode` and `z-index`; the follow smoothing — either the lerp factor
> per frame or the spring stiffness/damping/mass; the lag in ms between pointer
> and element at rest; the hover state over links and cards — target size, scale,
> opacity and the transition duration and easing; whether any text is injected
> into it; whether it is disabled on touch devices; and whether it is driven by
> `requestAnimationFrame` or CSS transitions.

### 2.10 Image parallax

> The highlighted image moves at a different rate than the page as it scrolls.
> Report measured values only, no code. Give me: the property used (`translate3d`
> on the image, `object-position`, `background-position`, or `scale`); the total
> travel distance in px across the full scroll range; the scroll range the effect
> is mapped over, as start and end viewport offsets; the resulting parallax factor
> as a ratio of image movement to page movement; the overscale applied to prevent
> edge gaps, as a percentage; the easing (confirm whether it is `linear`); whether
> any smoothing or spring is applied to the scroll value, and if so its params;
> and the `will-change` and containing-block `overflow` values.

---

## What I do with the output

I tune the Ebneely build to the same physics — duration, easing curve, spring
constants, stagger, scroll offsets, overscale — while the layout, type and
components stay Ebneely's own. Paste the output for any component and I will
apply the values.

Current defaults in the build, so you can see what changes:

| Behaviour | Current value |
|---|---|
| Primary easing | `cubic-bezier(.32,.72,0,1)` |
| Secondary easing | `cubic-bezier(.28,.11,.32,1)` |
| Hero headline | per-line mask, y 112%→0, 1150 ms, 85 ms stagger, 80 ms start delay |
| Hero subhead | per-word, y 14→0, 850 ms, 16 ms stagger, 420 ms start delay |
| Hero CTA | spring 260 · 30 · 0.8, scale 0.965→1, 620 ms delay, 70 ms stagger |
| Hero scrub | scroll-linked, y 0→−96 px, scale 1→0.945, opacity 1→0.08 over 80 vh, curve `p²` |
| Section heading | block mask, y 106%→0, 1150 ms |
| Body reveal | y 26→0, scale 0.985→1, 1000 ms, 75 ms sibling stagger |
| Reveal trigger | `margin: 0 0 -12% 0`, one-shot, plus force-fire at 94% viewport |
| Card hover lift | spring 200 · 24 · 0.9, y −8 |
| Card image | scale 1.1→1.16, 900 ms (second rate) |
| Card press | spring 600 · 32 · 0.7, scale 0.982 |
| Nav | scroll-**linked** over 0–110 px: blur 0→20 px, alpha 0→0.86, pad 22→11 px |
| Marquee | 34 s per cycle, linear, speed ×1→×3.6 on scroll velocity, 0.08 follow / 0.06 decay |
| Pricing focus | hovered spring 200 · 24, siblings opacity 0.52 · scale 0.985, 500 ms |
| Menu | overlay 550 ms, links y 22→0 over 950 ms, 60 ms stagger, 100 ms start delay |
| Parallax | y −18→18 px, overscale 1.1, linear, scroll-linked |
| Smooth scroll | Lenis, 1.15 s, `1 − (1−t)^3.4`, native touch momentum |
