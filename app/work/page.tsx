"use client";

import { Header, Overlay, Footer } from "@/components/Chrome";
import { useSite } from "@/components/Site";
import { s } from "@/lib/style";
import { EN, AR, PROJECTS } from "@/lib/data/work";

export default function WorkPage() {
  const { ar } = useSite();
  const t = ar ? AR : EN;
  const projects = PROJECTS[ar ? "ar" : "en"];

  const navLinks = [
    { href: "/work", label: t.navWork, active: true },
    { href: "/#services", label: t.navServices },
    { href: "/#pricing", label: t.navPricing },
    { href: "/contact", label: t.navContact },
  ];
  const overlayLinks = navLinks.map((l) => ({ ...l, active: false }));

  return (
    <div id="ebn-page" style={s("min-height:100vh")}>
      <Header logoHref="/" links={navLinks} cta={{ href: "/contact", label: t.ctaNav }} />
      <Overlay links={overlayLinks} cta={{ href: "/contact", label: t.ctaNav }} />

      <section style={s("max-width:1280px;margin:0 auto;padding:150px 20px 0")}>
        <div data-hero>
          <p
            style={s(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(23,20,15,.66);margin:0 0 22px",
            )}
          >
            {t.eyebrow}
          </p>
          <h1
            style={s(
              "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(38px,9vw,88px);line-height:.96;letter-spacing:-.045em;margin:0;max-width:16ch",
            )}
          >
            {t.title}
          </h1>
          <p
            style={s(
              "max-width:520px;margin:24px 0 0;font-size:clamp(15px,4vw,18px);line-height:1.6;color:rgba(23,20,15,.66)",
            )}
          >
            {t.lede}
          </p>
        </div>
      </section>

      <section
        style={s(
          "max-width:1280px;margin:0 auto;padding:56px 20px 20px;display:flex;flex-direction:column;gap:18px",
        )}
      >
        {projects.map((pr, i) => (
          <a
            key={i}
            href={pr.href}
            data-reveal
            data-card
            style={{
              ...s(
                "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:0;border-radius:30px;overflow:hidden;transition:box-shadow .3s cubic-bezier(.44,0,.56,1)",
              ),
              background: pr.bg,
              color: pr.fg,
            }}
          >
            <div
              style={{
                ...s("aspect-ratio:16/11;display:flex;align-items:center;justify-content:center"),
                backgroundImage: `repeating-linear-gradient(135deg,${pr.stripe} 0 1px,transparent 1px 9px)`,
              }}
            >
              <img
                src={pr.logo}
                alt={pr.name}
                height={160}
                style={{ ...s("display:block;width:auto"), height: pr.logoSize }}
              />
            </div>
            <div
              style={s(
                "padding:32px 30px 36px;display:flex;flex-direction:column;gap:16px;justify-content:center",
              )}
            >
              <div
                style={s("display:flex;align-items:baseline;justify-content:space-between;gap:12px")}
              >
                <h2
                  style={s(
                    "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(26px,6vw,38px);letter-spacing:-.035em;margin:0",
                  )}
                >
                  {pr.name}
                </h2>
                <span
                  style={{
                    ...s("font-family:'IBM Plex Mono',monospace;font-size:10.5px"),
                    color: pr.muted,
                  }}
                >
                  {pr.year}
                </span>
              </div>
              <p style={{ ...s("margin:0;font-size:15px;line-height:1.6"), color: pr.body }}>
                {pr.desc}
              </p>
              <div style={s("display:flex;flex-wrap:wrap;gap:7px")}>
                {pr.tags.map((tg) => (
                  <span
                    key={tg}
                    style={{
                      ...s(
                        "font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;border-radius:999px",
                      ),
                      border: `1px solid ${pr.chip}`,
                      color: pr.body,
                    }}
                  >
                    {tg}
                  </span>
                ))}
              </div>
              <span
                style={{
                  ...s(
                    "display:flex;align-items:center;justify-content:center;height:48px;width:fit-content;padding:0 24px;border-radius:999px;font-size:14px;font-weight:500;margin-top:4px",
                  ),
                  background: pr.btnBg,
                  color: pr.btnFg,
                }}
              >
                {pr.cta}
              </span>
            </div>
          </a>
        ))}
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:40px 20px 96px")}>
        <div
          data-reveal
          style={s(
            "border:1px solid rgba(23,20,15,.16);border-radius:30px;padding:40px 30px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px",
          )}
        >
          <div>
            <h2
              style={s(
                "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(24px,5.5vw,34px);letter-spacing:-.035em;margin:0 0 8px",
              )}
            >
              {t.nextTitle}
            </h2>
            <p
              style={s(
                "margin:0;max-width:44ch;font-size:15px;line-height:1.6;color:rgba(23,20,15,.64)",
              )}
            >
              {t.nextLede}
            </p>
          </div>
          <a
            href="/contact"
            className="hv-gold"
            style={s(
              "display:flex;align-items:center;justify-content:center;height:48px;padding:0 24px;background:#17140F;color:#F3F0E9;border-radius:999px;font-size:14px;font-weight:500;transition:background-color .3s cubic-bezier(.44,0,.56,1)",
            )}
          >
            {t.ctaNav}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
