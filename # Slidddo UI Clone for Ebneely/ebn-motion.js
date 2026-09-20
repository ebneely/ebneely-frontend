// Ebneely motion layer.
// Next.js parity: `npm i motion lenis`
//   import { animate, inView } from "motion"
//   import Lenis from "lenis"
//
// Values below are NOT invented — they are the measured physics from the
// reference audit (a Framer build), applied to Ebneely's own components:
//
//   appear        opacity .001 -> 1, y 10px -> 0, spring bounce .2 / 1000ms
//   no stagger    each element fires on its own viewport entry
//   hero order    per-child +100ms, CTA row +200ms
//   interaction   300ms / 400ms, cubic-bezier(.44, 0, .56, 1), scale 1.02
//   header        static — no shrink, no scroll-linked ramp
//   no marquee velocity coupling, no parallax, no sibling dimming
//
// Lenis is the one addition beyond the reference: the reference uses native
// scroll, this build uses smoothed scroll because it was asked for.

const MOTION_URL = "https://cdn.jsdelivr.net/npm/motion@12/+esm";
const LENIS_URL = "https://cdn.jsdelivr.net/npm/lenis@1/+esm";

const APPEAR = { type: "spring", bounce: 0.2, duration: 1.0 };
const EASE = [0.44, 0, 0.56, 1];   // reference interaction curve
const T_FAST = 0.3;
const T_SLOW = 0.4;
const Y = 10;

const reduced = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function createMotion() {
  const api = { m: null, lenis: null, ready: null, scan, menu, destroy };
  let raf = 0;
  let unbind = [];
  let flushQueued = false;
  let releaseGate = () => {};
  // Entrances wait on this so they play as the veil lowers, not behind it.
  const gate = new Promise((res) => { releaseGate = res; });
  setTimeout(() => releaseGate(), 4000); // never strand the page

  api.ready = (async () => {
    const [m, L] = await Promise.all([
      import(MOTION_URL),
      reduced() ? Promise.resolve(null) : import(LENIS_URL).catch(() => null)
    ]);
    api.m = m;

    if (L) {
      const Lenis = L.default || L.Lenis;
      api.lenis = new Lenis({
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 3.2),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.4,
        gestureOrientation: "vertical"
      });
      const loop = (time) => { api.lenis.raf(time); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      document.addEventListener("click", onAnchor, true);
      unbind.push(() => document.removeEventListener("click", onAnchor, true));
      const h = () => flush();
      api.lenis.on("scroll", h);
      unbind.push(() => api.lenis.off("scroll", h));
    } else {
      const h = () => flush();
      window.addEventListener("scroll", h, { passive: true });
      unbind.push(() => window.removeEventListener("scroll", h));
    }

    initTransitions();
  })();

  /* ---------- page transitions ---------- *
   * Leaving:  freeze the current page, raise a veil, then navigate.
   * Arriving: hold the veil, lower it while the content appears, then
   *           release interaction. The veil owns pointer events for the
   *           whole sequence, so nothing is clickable mid-transition.
   * If this module never loads, links behave normally.
   * ------------------------------------------------------------------ */

  function initTransitions() {
    // The veil and ring live in the page markup so they paint on the first
    // frame — this module loads from a CDN and arrives far too late to
    // create them itself without the page flashing bright first.
    const veil = document.getElementById("ebn-veil");
    const ring = document.getElementById("ebn-ring");
    if (!veil || veil.getAttribute("data-claimed")) return;
    veil.setAttribute("data-claimed", "1");

    const page = document.getElementById("ebn-page");
    let leaving = false;
    const arriving = sessionStorage.getItem("ebn-nav") === "1";
    const dropRing = () => { if (ring && ring.parentNode) ring.parentNode.removeChild(ring); };
    const lower = (duration, delay) => {
      releaseGate();
      if (reduced()) {
        veil.style.opacity = "0";
        veil.style.pointerEvents = "none";
        dropRing();
        return;
      }
      if (ring) api.m.animate(ring, { opacity: [1, 0] }, { duration: 0.4, ease: EASE });
      api.m.animate(veil, { opacity: [1, 0] }, { duration, ease: EASE, delay })
        .then(() => { veil.style.pointerEvents = "none"; dropRing(); });
    };

    if (arriving) {
      // Page-to-page: no loader, quick reveal.
      sessionStorage.removeItem("ebn-nav");
      dropRing();
      lower(0.46, 0.06);
    } else {
      // First open: hold the dark screen with the ring, then reveal slowly.
      Promise.all([
        document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve(),
        new Promise((r) => setTimeout(r, 1100))
      ]).then(() => lower(0.85, 0.1));
    }

    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || leaving) return;
      const href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      if (a.target === "_blank" || /^(https?:|mailto:|tel:|\/\/)/i.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      leaving = true;
      veil.style.pointerEvents = "auto";
      if (api.lenis) api.lenis.stop();
      sessionStorage.setItem("ebn-nav", "1");
      const go = () => { window.location.href = href; };
      if (reduced()) { go(); return; }
      if (page) api.m.animate(page, { scale: 0.99, opacity: 0.55 }, { duration: 0.42, ease: EASE });
      api.m.animate(veil, { opacity: [0, 1] }, { duration: 0.4, ease: EASE }).then(go);
    }, true);
  }

  /* ---------- guarantee: nothing stays hidden ---------- */

  function flush() {
    if (flushQueued) return;
    flushQueued = true;
    requestAnimationFrame(() => {
      flushQueued = false;
      document.querySelectorAll("[data-fx]").forEach((el) => {
        if (el.__fired || !el.__fire) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.94) el.__fire();
      });
    });
  }

  // The single appear animation, used by every revealing element.
  // An element whose ancestor already animates is skipped: otherwise the
  // same content moves twice, once from the wrapper and once from itself.
  function appear(el, delay) {
    if (el.getAttribute("data-fx")) return;
    if (el.parentElement && el.parentElement.closest("[data-fx]")) {
      el.style.opacity = "1";
      return;
    }
    el.setAttribute("data-fx", "1");
    if (reduced()) { el.style.opacity = "1"; el.__fired = true; return; }
    el.style.opacity = "0.001";
    el.style.transform = "translate3d(0," + Y + "px,0)";
    el.style.willChange = "transform, opacity";
    el.__fire = () => {
      if (el.__fired) return;
      el.__fired = true;
      gate.then(() => {
        api.m.animate(el, { opacity: [0.001, 1], y: [Y, 0] }, { ...APPEAR, delay: delay || 0 })
          .then(() => { el.style.willChange = "auto"; });
      });
    };
    api.m.inView(el, () => { el.__fire(); return false; }, { margin: "0px 0px -5% 0px" });
    flush();
  }

  function onAnchor(e) {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target || !api.lenis) return;
    e.preventDefault();
    api.lenis.scrollTo(target, { offset: -84, duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3.2) });
  }

  /* ---------- entrances + interactions ---------- */

  function scan() {
    if (!api.m) return;
    const { animate } = api.m;

    // Hero: children in source order, +100ms each. CTA row at +200ms.
    document.querySelectorAll("[data-hero]").forEach((wrap) => {
      Array.from(wrap.children).forEach((el, i) => appear(el, i * 0.1));
    });
    document.querySelectorAll("[data-hero-cta]").forEach((wrap) => {
      Array.from(wrap.children).forEach((el, i) => appear(el, 0.2 + i * 0.1));
    });

    // Everything else: own entry, no stagger.
    document.querySelectorAll("[data-mask],[data-reveal]").forEach((el) => {
      appear(el, parseInt(el.getAttribute("data-reveal-delay") || "0", 10) / 1000);
    });

    // Cards: scale only, no lift, no independent image rate.
    document.querySelectorAll("[data-card]:not([data-bound])").forEach((el) => {
      el.setAttribute("data-bound", "1");
      const to = (s) => animate(el, { scale: s }, { duration: T_FAST, ease: EASE });
      el.addEventListener("pointerenter", () => to(1.02));
      el.addEventListener("pointerleave", () => to(1));
      el.addEventListener("pointerdown", () => animate(el, { scale: 0.99 }, { duration: 0.12, ease: EASE }));
      el.addEventListener("pointerup", () => to(1.02));
      el.addEventListener("pointercancel", () => to(1));
    });

    document.querySelectorAll("[data-row]:not([data-bound])").forEach((el) => {
      el.setAttribute("data-bound", "1");
      el.addEventListener("pointerenter", () =>
        animate(el, { backgroundColor: "rgba(23,20,15,.035)" }, { duration: T_SLOW, ease: EASE }));
      el.addEventListener("pointerleave", () =>
        animate(el, { backgroundColor: "rgba(23,20,15,0)" }, { duration: T_SLOW, ease: EASE }));
    });

    // Pricing: same interaction as any card. Siblings are left alone.
    document.querySelectorAll("[data-tier]:not([data-bound])").forEach((el) => {
      el.setAttribute("data-bound", "1");
      el.addEventListener("pointerenter", () =>
        animate(el, { scale: 1.02, borderColor: "rgba(23,20,15,.42)" }, { duration: T_FAST, ease: EASE }));
      el.addEventListener("pointerleave", () =>
        animate(el, { scale: 1, borderColor: "rgba(23,20,15,.16)" }, { duration: T_FAST, ease: EASE }));
    });

    flush();
  }

  /* ---------- menu overlay: hero appear physics ---------- */

  function menu(open) {
    const o = document.getElementById("ebn-overlay");
    if (!o || !api.m) return;
    const { animate } = api.m;
    o.style.visibility = "visible";
    animate(o, { opacity: open ? 1 : 0.001, y: open ? 0 : -Y },
      open ? APPEAR : { duration: 0.3, ease: EASE })
      .then(() => { if (!open) o.style.visibility = "hidden"; });
    const links = o.querySelectorAll("nav a");
    links.forEach((a, i) => {
      animate(a, { opacity: open ? 1 : 0.001, y: open ? 0 : Y },
        open ? { ...APPEAR, delay: 0.1 + i * 0.05 } : { duration: 0.2, ease: EASE });
    });
    if (api.lenis) open ? api.lenis.stop() : api.lenis.start();
    document.body.style.overflow = open ? "hidden" : "";
  }

  function destroy() {
    if (raf) cancelAnimationFrame(raf);
    unbind.forEach((f) => f());
    unbind = [];
    if (api.lenis) api.lenis.destroy();
  }

  return api;
}
