"use client";

import { animate, inView } from "motion";
import Lenis from "lenis";

/**
 * Ebneely motion layer - ported from the prototype's ebn-motion.js.
 *
 * Values below are NOT invented - they are the measured physics from the
 * reference audit (a Framer build), applied to Ebneely's own components:
 *
 *   appear        opacity .001 -> 1, y 10px -> 0, spring bounce .2 / 1000ms
 *   no stagger    each element fires on its own viewport entry
 *   hero order    per-child +100ms, CTA row +200ms
 *   interaction   300ms / 400ms, cubic-bezier(.44, 0, .56, 1), scale 1.02
 *   header        static - no shrink, no scroll-linked ramp
 *   no marquee velocity coupling, no parallax, no sibling dimming
 *
 * The only difference from the prototype is packaging: `motion` and `lenis`
 * come from npm instead of a CDN (which the prototype's own header prescribes
 * for the Next.js build), and navigation goes through the Next router instead
 * of window.location.
 */

const APPEAR = { type: "spring", bounce: 0.2, duration: 1.0 } as const;
const EASE = [0.44, 0, 0.56, 1] as const; // reference interaction curve
const T_FAST = 0.3;
const T_SLOW = 0.4;
const Y = 10;

export const reduced = () =>
  typeof matchMedia !== "undefined" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

type El = HTMLElement & { __fired?: boolean; __fire?: () => void };

function makeGate() {
  let release!: () => void;
  const promise = new Promise<void>((res) => {
    release = res;
  });
  return { promise, release };
}

export function createMotion() {
  let raf = 0;
  let unbind: Array<() => void> = [];
  let flushQueued = false;
  // Entrances wait on this so they play as the veil lowers, not behind it.
  let gate = makeGate();
  const gateTimer = setTimeout(() => gate.release(), 4000); // never strand the page

  let lenis: Lenis | null = null;

  if (!reduced()) {
    lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4,
      gestureOrientation: "vertical",
    });
    const loop = (time: number) => {
      lenis!.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    document.addEventListener("click", onAnchor, true);
    unbind.push(() => document.removeEventListener("click", onAnchor, true));
    const h = () => flush();
    lenis.on("scroll", h);
    unbind.push(() => lenis && lenis.off("scroll", h));
  } else {
    const h = () => flush();
    window.addEventListener("scroll", h, { passive: true });
    unbind.push(() => window.removeEventListener("scroll", h));
  }

  /* ---------- guarantee: nothing stays hidden ---------- */

  function flush() {
    if (flushQueued) return;
    flushQueued = true;
    requestAnimationFrame(() => {
      flushQueued = false;
      document.querySelectorAll<El>("[data-fx]").forEach((el) => {
        if (el.__fired || !el.__fire) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.94) el.__fire();
      });
    });
  }

  // The single appear animation, used by every revealing element.
  // An element whose ancestor already animates is skipped: otherwise the
  // same content moves twice, once from the wrapper and once from itself.
  function appear(el: El, delay: number) {
    if (el.getAttribute("data-fx")) return;
    if (el.parentElement && el.parentElement.closest("[data-fx]")) {
      el.style.opacity = "1";
      return;
    }
    el.setAttribute("data-fx", "1");
    if (reduced()) {
      el.style.opacity = "1";
      el.__fired = true;
      return;
    }
    el.style.opacity = "0.001";
    el.style.transform = "translate3d(0," + Y + "px,0)";
    el.style.willChange = "transform, opacity";
    el.__fire = () => {
      if (el.__fired) return;
      el.__fired = true;
      gate.promise.then(() => {
        animate(el, { opacity: [0.001, 1], y: [Y, 0] }, { ...APPEAR, delay: delay || 0 }).then(
          () => {
            el.style.willChange = "auto";
          },
        );
      });
    };
    inView(
      el,
      () => {
        // Fires once: __fired guards re-entry, and no leave handler is returned.
        el.__fire!();
      },
      { margin: "0px 0px -5% 0px" },
    );
    flush();
  }

  function onAnchor(e: MouseEvent) {
    const t = e.target as HTMLElement | null;
    const a = t && t.closest ? t.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target || !lenis) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, {
      offset: -84,
      duration: 1.1,
      easing: (p: number) => 1 - Math.pow(1 - p, 3.2),
    });
  }

  /* ---------- entrances + interactions ---------- */

  function scan() {
    // Hero: children in source order, +100ms each. CTA row at +200ms.
    document.querySelectorAll<HTMLElement>("[data-hero]").forEach((wrap) => {
      Array.from(wrap.children).forEach((el, i) => appear(el as El, i * 0.1));
    });
    document.querySelectorAll<HTMLElement>("[data-hero-cta]").forEach((wrap) => {
      Array.from(wrap.children).forEach((el, i) => appear(el as El, 0.2 + i * 0.1));
    });

    // Everything else: own entry, no stagger.
    document.querySelectorAll<El>("[data-mask],[data-reveal]").forEach((el) => {
      appear(el, parseInt(el.getAttribute("data-reveal-delay") || "0", 10) / 1000);
    });

    // Cards: scale only, no lift, no independent image rate.
    document.querySelectorAll<HTMLElement>("[data-card]:not([data-bound])").forEach((el) => {
      el.setAttribute("data-bound", "1");
      const to = (sc: number) => animate(el, { scale: sc }, { duration: T_FAST, ease: EASE });
      el.addEventListener("pointerenter", () => to(1.02));
      el.addEventListener("pointerleave", () => to(1));
      el.addEventListener("pointerdown", () =>
        animate(el, { scale: 0.99 }, { duration: 0.12, ease: EASE }),
      );
      el.addEventListener("pointerup", () => to(1.02));
      el.addEventListener("pointercancel", () => to(1));
    });

    document.querySelectorAll<HTMLElement>("[data-row]:not([data-bound])").forEach((el) => {
      el.setAttribute("data-bound", "1");
      el.addEventListener("pointerenter", () =>
        animate(el, { backgroundColor: "rgba(23,20,15,.035)" }, { duration: T_SLOW, ease: EASE }),
      );
      el.addEventListener("pointerleave", () =>
        animate(el, { backgroundColor: "rgba(23,20,15,0)" }, { duration: T_SLOW, ease: EASE }),
      );
    });

    // Pricing: same interaction as any card. Siblings are left alone.
    document.querySelectorAll<HTMLElement>("[data-tier]:not([data-bound])").forEach((el) => {
      el.setAttribute("data-bound", "1");
      el.addEventListener("pointerenter", () =>
        animate(
          el,
          { scale: 1.02, borderColor: "rgba(23,20,15,.42)" },
          { duration: T_FAST, ease: EASE },
        ),
      );
      el.addEventListener("pointerleave", () =>
        animate(
          el,
          { scale: 1, borderColor: "rgba(23,20,15,.16)" },
          { duration: T_FAST, ease: EASE },
        ),
      );
    });

    flush();
  }

  /* ---------- menu overlay: hero appear physics ---------- */

  function menu(open: boolean) {
    const o = document.getElementById("ebn-overlay");
    if (!o) return;
    o.style.visibility = "visible";
    animate(
      o,
      { opacity: open ? 1 : 0.001, y: open ? 0 : -Y },
      open ? APPEAR : { duration: 0.3, ease: EASE },
    ).then(() => {
      if (!open) o.style.visibility = "hidden";
    });
    const links = o.querySelectorAll<HTMLElement>("nav a");
    links.forEach((a, i) => {
      animate(
        a,
        { opacity: open ? 1 : 0.001, y: open ? 0 : Y },
        open ? { ...APPEAR, delay: 0.1 + i * 0.05 } : { duration: 0.2, ease: EASE },
      );
    });
    if (lenis) open ? lenis.stop() : lenis.start();
    document.body.style.overflow = open ? "hidden" : "";
  }

  /* ---------- page transitions ---------- *
   * Leaving:  freeze the current page, raise a veil, then navigate.
   * Arriving: hold the veil, lower it while the content appears, then
   *           release interaction. The veil owns pointer events for the
   *           whole sequence, so nothing is clickable mid-transition.
   * ------------------------------------------------------------------ */

  const veil = () => document.getElementById("ebn-veil");
  const ring = () => document.getElementById("ebn-ring");
  const dropRing = () => {
    const r = ring();
    if (r && r.parentNode) r.parentNode.removeChild(r);
  };

  function lower(duration: number, delay: number) {
    gate.release();
    const v = veil();
    if (!v) return;
    if (reduced()) {
      v.style.opacity = "0";
      v.style.pointerEvents = "none";
      dropRing();
      return;
    }
    const r = ring();
    if (r) animate(r, { opacity: [1, 0] }, { duration: 0.4, ease: EASE });
    animate(v, { opacity: [1, 0] }, { duration, ease: EASE, delay }).then(() => {
      v.style.pointerEvents = "none";
      dropRing();
    });
  }

  /** First open: hold the dark screen with the ring, then reveal slowly. */
  function open() {
    Promise.all([
      document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve(),
      new Promise((r) => setTimeout(r, 1100)),
    ]).then(() => lower(0.85, 0.1));
  }

  /** Page-to-page: no loader, quick reveal. */
  function arrive() {
    dropRing();
    lower(0.46, 0.06);
  }

  /** Raise the veil over the outgoing page; resolves when it is fully opaque. */
  function leave(): Promise<void> {
    gate = makeGate(); // the incoming page's entrances wait on a fresh gate
    const v = veil();
    const page = document.getElementById("ebn-page");
    if (!v) return Promise.resolve();
    v.style.pointerEvents = "auto";
    if (lenis) lenis.stop();
    if (reduced()) {
      v.style.opacity = "1";
      return Promise.resolve();
    }
    if (page) animate(page, { scale: 0.99, opacity: 0.55 }, { duration: 0.42, ease: EASE });
    return animate(v, { opacity: [0, 1] }, { duration: 0.4, ease: EASE }).then(() => {});
  }

  /** After the new route has painted: unfreeze and return to the top. */
  function resetPage() {
    const page = document.getElementById("ebn-page");
    if (page) {
      page.style.transform = "none";
      page.style.opacity = "1";
    }
    if (lenis) {
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function destroy() {
    clearTimeout(gateTimer);
    if (raf) cancelAnimationFrame(raf);
    unbind.forEach((f) => f());
    unbind = [];
    if (lenis) lenis.destroy();
  }

  return {
    get lenis() {
      return lenis;
    },
    scan,
    menu,
    open,
    arrive,
    leave,
    resetPage,
    destroy,
  };
}

export type Fx = ReturnType<typeof createMotion>;
