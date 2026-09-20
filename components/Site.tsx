"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { createMotion, type Fx } from "@/lib/motion";

type Lang = "en" | "ar";

type SiteCtx = {
  lang: Lang;
  ar: boolean;
  toggleLang: () => void;
  langLabel: string;
  menu: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  /** The prototype's `layout()`: the >= 900px breakpoint, resolved in JS. */
  wide: boolean;
};

const Ctx = createContext<SiteCtx | null>(null);

export function useSite(): SiteCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSite must be used inside <Site>");
  return c;
}

export function Site({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const [wide, setWide] = useState(false);

  const fxRef = useRef<Fx | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const firstPath = useRef(true);

  const ar = lang === "ar";

  /* ---- document direction, exactly as the prototype's renderVals does ---- */
  useEffect(() => {
    document.documentElement.dir = ar ? "rtl" : "ltr";
    document.documentElement.lang = ar ? "ar" : "en";
  }, [ar]);

  /* ---- layout(): the 900px breakpoint ---- */
  useEffect(() => {
    const layout = () => {
      const w = window.innerWidth >= 900;
      setWide(w);
      if (w) setMenu((m) => (m ? false : m));
    };
    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  /* ---- boot the motion layer once ---- */
  useEffect(() => {
    let fx: Fx | null = null;
    try {
      fx = createMotion();
    } catch (err) {
      console.warn("[ebneely] motion layer unavailable, revealing statically", err);
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      const v = document.getElementById("ebn-veil");
      if (v) {
        v.style.opacity = "0";
        v.style.pointerEvents = "none";
      }
      const r = document.getElementById("ebn-ring");
      if (r && r.parentNode) r.parentNode.removeChild(r);
      return;
    }
    fxRef.current = fx;
    // Tell the inline safety script that the motion layer owns the veil now.
    document.getElementById("ebn-veil")?.setAttribute("data-claimed", "1");
    fx.scan();
    fx.open();
    return () => {
      fx?.destroy();
      fxRef.current = null;
    };
  }, []);

  /* ---- componentDidUpdate(): rescan after every render ---- */
  useEffect(() => {
    fxRef.current?.scan();
  });

  /* ---- menu overlay ---- */
  useEffect(() => {
    fxRef.current?.menu(menu);
  }, [menu]);

  /* ---- page transitions: intercept internal links, veil, then route ---- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const a = t && t.closest ? t.closest<HTMLAnchorElement>("a[href]") : null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      if (a.target === "_blank" || /^(https?:|mailto:|tel:|\/\/)/i.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const fx = fxRef.current;
      if (!fx) {
        router.push(href);
        return;
      }
      setMenu(false);
      fx.leave().then(() => router.push(href));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  /* ---- arriving on a new route ---- */
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    const fx = fxRef.current;
    if (!fx) return;
    fx.resetPage();
    fx.scan();
    fx.arrive();
  }, [pathname]);

  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);
  const openMenu = useCallback(() => setMenu(true), []);
  const closeMenu = useCallback(() => setMenu(false), []);

  return (
    <Ctx.Provider
      value={{
        lang,
        ar,
        toggleLang,
        langLabel: ar ? "EN" : "ع",
        menu,
        openMenu,
        closeMenu,
        wide,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
