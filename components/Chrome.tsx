"use client";

import { useSite } from "@/components/Site";
import { s, sx } from "@/lib/style";

export type NavLink = { href: string; label: string; active?: boolean };

const NAV =
  "position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:60;display:flex;align-items:center;gap:32px;height:56px;max-width:calc(100vw - 28px);padding:6px 18px 6px 6px;border-radius:30px;background:rgba(243,240,233,.5);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);box-shadow:0 0 0 1px rgba(23,20,15,.06);font-size:13px;font-weight:500;color:#17140F";
const LOGO = "display:flex;align-items:center;gap:10px;flex:none;padding-left:12px";
const LOGO_IMG = "display:block;height:22px;width:auto";
const NAVLINKS =
  "display:none;gap:32px;font-size:13px;font-weight:500;color:rgba(23,20,15,.72)";
const LINK = "transition:color .4s cubic-bezier(.44,0,.56,1)";
const LINK_ACTIVE = "color:#17140F;transition:color .4s cubic-bezier(.44,0,.56,1)";
const NAVRIGHT = "display:flex;align-items:center;gap:8px;flex:none;margin-left:auto";
const LANG =
  "height:44px;min-width:44px;padding:0 13px;border:1px solid rgba(23,20,15,.14);background:transparent;border-radius:999px;font-family:'IBM Plex Sans Arabic','IBM Plex Mono',monospace;font-size:15px;font-weight:500;letter-spacing:.02em;color:#17140F;cursor:pointer;transition:background-color .4s cubic-bezier(.44,0,.56,1),border-color .4s cubic-bezier(.44,0,.56,1)";
const NAVCTA =
  "display:none;align-items:center;height:44px;padding:0 20px;background:#17140F;color:#F3F0E9;border-radius:999px;font-size:13px;font-weight:500;transition:background-color .3s cubic-bezier(.44,0,.56,1)";
const BURGER =
  "width:44px;height:44px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;border:1px solid rgba(23,20,15,.14);background:transparent;border-radius:999px;cursor:pointer";
const BURGER_BAR = "width:15px;height:1.5px;background:#17140F";

export function Header({
  logoHref,
  links,
  cta,
}: {
  logoHref: string;
  links: NavLink[];
  /** Omitted on the Contact page, which has no header CTA. */
  cta?: { href: string; label: string };
}) {
  const { toggleLang, langLabel, openMenu, wide } = useSite();

  return (
    <header id="ebn-nav" style={s(NAV)}>
      <a href={logoHref} id="ebn-logo" aria-label="Ebneely" style={s(LOGO)}>
        {/* The brand logo, at the footprint of the prototype's drawn mark + wordmark. */}
        <img src="/brand/ebneely-ink.png" alt="Ebneely" width={90} height={22} style={s(LOGO_IMG)} />
      </a>

      <nav id="ebn-navlinks" style={sx(NAVLINKS, { display: wide ? "flex" : "none" })}>
        {links.map((l) => (
          <a
            key={l.href + l.label}
            href={l.href}
            className={l.active ? undefined : "hv-ink"}
            style={s(l.active ? LINK_ACTIVE : LINK)}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div style={s(NAVRIGHT)}>
        <button
          onClick={toggleLang}
          aria-label="Toggle language"
          className="hv-lang"
          style={s(LANG)}
        >
          {langLabel}
        </button>
        {cta ? (
          <a
            href={cta.href}
            id="ebn-navcta"
            className="hv-gold"
            style={sx(NAVCTA, { display: wide ? "flex" : "none" })}
          >
            {cta.label}
          </a>
        ) : null}
        <button
          id="ebn-burger"
          onClick={openMenu}
          aria-label="Menu"
          style={sx(BURGER, { display: wide ? "none" : "flex" })}
        >
          <span style={s(BURGER_BAR)} />
          <span style={s(BURGER_BAR)} />
        </button>
      </div>
    </header>
  );
}

/* --------------------------------- overlay -------------------------------- */

// The home page overlay carries its own CSS transition and a -8px offset; the
// inner pages use -10px and leave the motion layer to drive it. Both are kept.
const OVERLAY_HOME =
  "position:fixed;inset:8px;border-radius:32px;z-index:70;background:#14110D;color:#F3F0E9;display:flex;flex-direction:column;padding:22px 24px 40px;opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .46s cubic-bezier(.16,1,.3,1),transform .56s cubic-bezier(.16,1,.3,1),visibility .46s";
const OVERLAY_INNER =
  "position:fixed;inset:8px;border-radius:32px;z-index:70;background:#14110D;color:#F3F0E9;display:flex;flex-direction:column;padding:22px 24px 40px;opacity:0;visibility:hidden;transform:translateY(-10px)";
const CLOSE_ROW = "display:flex;justify-content:flex-end";
const CLOSE =
  "width:44px;height:44px;border:1px solid rgba(243,240,233,.25);background:transparent;border-radius:999px;color:#F3F0E9;font-size:18px;line-height:1;cursor:pointer";
const OVERLAY_NAV =
  "margin-top:auto;margin-bottom:auto;display:flex;flex-direction:column;gap:6px";
const OVERLAY_LINK =
  "font-family:Archivo,sans-serif;font-size:36px;font-weight:600;letter-spacing:-.035em;padding:8px 0";
const OVERLAY_CTA =
  "display:flex;align-items:center;justify-content:center;height:56px;background:#F3F0E9;color:#17140F;border-radius:999px;font-size:15px";

export function Overlay({
  links,
  cta,
  variant = "inner",
}: {
  links: NavLink[];
  cta?: { href: string; label: string };
  variant?: "home" | "inner";
}) {
  const { closeMenu } = useSite();

  return (
    <div id="ebn-overlay" style={s(variant === "home" ? OVERLAY_HOME : OVERLAY_INNER)}>
      <div style={s(CLOSE_ROW)}>
        <button onClick={closeMenu} aria-label="Close" style={s(CLOSE)}>
          ×
        </button>
      </div>
      <nav style={s(OVERLAY_NAV)}>
        {links.map((l) => (
          <a key={l.href + l.label} href={l.href} onClick={closeMenu} style={s(OVERLAY_LINK)}>
            {l.label}
          </a>
        ))}
      </nav>
      {cta ? (
        <a href={cta.href} onClick={closeMenu} style={s(OVERLAY_CTA)}>
          {cta.label}
        </a>
      ) : null}
    </div>
  );
}

/* --------------------------------- footer --------------------------------- */

const FOOTER = "background:#14110D;color:#F3F0E9;padding:40px 20px";
const FOOTER_INNER =
  "max-width:1280px;margin:0 auto;display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(243,240,233,.58)";

export function Footer() {
  return (
    <footer style={s(FOOTER)}>
      <div style={s(FOOTER_INNER)}>
        <span>Ebneely® — Riyadh · Cairo</span>
        <span>© MMXXVI</span>
      </div>
    </footer>
  );
}
