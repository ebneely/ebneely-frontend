# ebneely-frontend

The Ebneely marketing site — a Next.js 16 (App Router) frontend ported
pixel-for-pixel from the Claude design prototype.

## Pages

| Route           | Prototype source                  |
| --------------- | --------------------------------- |
| `/`             | `Ebneely - Home.dc.html`          |
| `/work`         | `Ebneely - Work.dc.html`          |
| `/work/minirue` | `Ebneely - Case MiniRue.dc.html`  |
| `/contact`      | `Ebneely - Contact.dc.html`       |

The prototype itself is kept in `# Slidddo UI Clone for Ebneely/` as the
reference the build is checked against.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## How the port stays faithful

The prototype writes every rule as an inline CSS string. Re-typing those as
JSX style objects is where a "pixel perfect" port quietly stops being pixel
perfect, so instead:

- **`lib/style.ts`** keeps each declaration string exactly as authored and
  parses it into a React style object once, cached by string. The values in
  the components are the prototype's own values, character for character.
- **`app/globals.css`** copies the prototype's `<style>` block verbatim, and
  re-expresses its `style-hover` / `style-focus` attributes as classes. Those
  carry `!important` because the prototype's runtime applied them *over* the
  inline style, and a stylesheet otherwise loses to it. The generic `a:hover`
  rule is deliberately left un-`!important`, matching the original cascade.
- **`lib/motion.ts`** ports `ebn-motion.js` with its measured physics intact:

  | Behaviour     | Value                                                  |
  | ------------- | ------------------------------------------------------ |
  | Appear        | opacity .001 → 1, y 10px → 0, spring bounce .2 / 1000ms |
  | Stagger       | none — each element fires on its own viewport entry     |
  | Hero order    | per-child +100ms, CTA row +200ms                        |
  | Interaction   | 300ms / 400ms, `cubic-bezier(.44,0,.56,1)`, scale 1.02  |
  | Header        | static — no shrink, no scroll-linked ramp               |
  | Smooth scroll | Lenis, 1.0s, `1 − (1−t)^3.2`                            |

  `motion` and `lenis` come from npm rather than a CDN (which the prototype's
  own header prescribes for the Next.js build), and page transitions go
  through the Next router instead of `window.location`.

## Verification

Each page was pixel-diffed against the prototype rendered at the same
viewport. All four match at identical document dimensions; the only differing
pixels are the Next.js dev-mode badge. The leave transition was measured at
0 → 1 over ~410ms on the reference easing curve, and card hover at scale 1.02.

## Notes

- Bilingual EN/AR with full RTL; language, currency toggle and menu overlay
  are client state, as in the prototype.
- Frontend only — the forms set a local "sent" state and post nowhere yet.
- Image slots are still the prototype's placeholder hatching, awaiting real
  screenshots.
