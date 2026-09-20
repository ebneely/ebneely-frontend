"use client";

import { Header, Overlay, Footer } from "@/components/Chrome";
import { useSite } from "@/components/Site";
import { s } from "@/lib/style";
import { EN, AR, FACTS, BUILT, METRICS } from "@/lib/data/minirue";

export default function MiniRueCase() {
  const { ar } = useSite();
  const t = ar ? AR : EN;
  const k = ar ? "ar" : "en";
  const shots = [t.shot1, t.shot2, t.shot3];

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
              "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(38px,9vw,92px);line-height:.96;letter-spacing:-.045em;margin:0",
            )}
          >
            MiniRue
          </h1>
          <p
            style={s(
              "max-width:600px;margin:24px 0 0;font-size:clamp(16px,4.2vw,20px);line-height:1.55;color:rgba(23,20,15,.7)",
            )}
          >
            {t.tagline}
          </p>
          <a
            href="https://minirueshop.com"
            target="_blank"
            rel="noopener"
            className="hv-gold"
            style={s(
              "display:flex;align-items:center;justify-content:center;height:48px;width:fit-content;padding:0 24px;margin-top:26px;background:#17140F;color:#F3F0E9;border-radius:999px;font-size:14px;font-weight:500;transition:background-color .3s cubic-bezier(.44,0,.56,1)",
            )}
          >
            {t.visit}
          </a>
        </div>
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:48px 20px 0")}>
        <div
          data-reveal
          style={s(
            "aspect-ratio:16/9;border-radius:30px;overflow:hidden;background:#EAE6DC;background-image:repeating-linear-gradient(135deg,rgba(23,20,15,.07) 0 1px,transparent 1px 9px);display:flex;align-items:center;justify-content:center",
          )}
        >
          <span
            style={s(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:rgba(23,20,15,.66);text-align:center;padding:0 20px",
            )}
          >
            {t.shotHero}
          </span>
        </div>
        <div
          data-reveal
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(50%,170px),1fr));gap:10px;margin-top:10px",
          )}
        >
          {FACTS[k].map((f, i) => (
            <div
              key={i}
              style={s("border:1px solid rgba(23,20,15,.14);border-radius:22px;padding:20px 22px 22px")}
            >
              <p
                style={s(
                  "margin:0 0 7px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(23,20,15,.66)",
                )}
              >
                {f.k}
              </p>
              <p
                style={s(
                  "margin:0;font-family:Archivo,sans-serif;font-weight:500;font-size:17px;letter-spacing:-.02em",
                )}
              >
                {f.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:88px 20px 0")}>
        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:40px",
          )}
        >
          {[
            { title: t.briefTitle, body: t.brief },
            { title: t.approachTitle, body: t.approach },
          ].map((b, i) => (
            <div key={i} data-reveal>
              <h2
                style={s(
                  "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(26px,6vw,40px);line-height:1.02;letter-spacing:-.04em;margin:0 0 18px",
                )}
              >
                {b.title}
              </h2>
              <p style={s("margin:0;font-size:16px;line-height:1.7;color:rgba(23,20,15,.7)")}>
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:88px 20px 0")}>
        <h2
          data-reveal
          style={s(
            "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(28px,6.5vw,48px);line-height:1;letter-spacing:-.04em;margin:0 0 34px",
          )}
        >
          {t.builtTitle}
        </h2>
        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px",
          )}
        >
          {BUILT[k].map((b, i) => (
            <div
              key={i}
              data-reveal
              style={s("border:1px solid rgba(23,20,15,.14);border-radius:26px;padding:26px 24px 30px")}
            >
              <span
                style={s(
                  "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;color:#7A5F2E",
                )}
              >
                {b.num}
              </span>
              <h3
                style={s(
                  "font-family:Archivo,sans-serif;font-weight:500;font-size:20px;letter-spacing:-.025em;margin:14px 0 9px",
                )}
              >
                {b.name}
              </h3>
              <p style={s("margin:0;font-size:14.5px;line-height:1.6;color:rgba(23,20,15,.64)")}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:88px 20px 0")}>
        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:12px",
          )}
        >
          {shots.map((sh, i) => (
            <div
              key={i}
              data-reveal
              style={s(
                "aspect-ratio:4/5;border-radius:30px;overflow:hidden;background:#EAE6DC;background-image:repeating-linear-gradient(135deg,rgba(23,20,15,.07) 0 1px,transparent 1px 9px);display:flex;align-items:flex-end;padding:22px",
              )}
            >
              <span
                style={s(
                  "font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(23,20,15,.66)",
                )}
              >
                {sh}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:88px 20px 96px")}>
        <div
          data-reveal
          style={s("background:#14110D;color:#F3F0E9;border-radius:30px;padding:44px 32px")}
        >
          <h2
            style={s(
              "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(26px,6vw,40px);line-height:1.02;letter-spacing:-.04em;margin:0 0 10px",
            )}
          >
            {t.resultTitle}
          </h2>
          <p
            style={s(
              "margin:0 0 30px;max-width:56ch;font-size:15.5px;line-height:1.65;color:rgba(243,240,233,.64)",
            )}
          >
            {t.resultNote}
          </p>
          <div
            style={s(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(50%,180px),1fr));gap:12px",
            )}
          >
            {METRICS[k].map((mt, i) => (
              <div
                key={i}
                style={s("border:1px solid rgba(243,240,233,.16);border-radius:22px;padding:24px 22px")}
              >
                <p
                  style={s(
                    "margin:0;font-family:Archivo,sans-serif;font-weight:600;font-size:34px;letter-spacing:-.045em",
                  )}
                >
                  {mt.v}
                </p>
                <p
                  style={s("margin:8px 0 0;font-size:13.5px;line-height:1.5;color:rgba(243,240,233,.6)")}
                >
                  {mt.k}
                </p>
              </div>
            ))}
          </div>
          <a
            href="/contact"
            className="hv-gold"
            style={s(
              "display:flex;align-items:center;justify-content:center;height:48px;width:fit-content;padding:0 24px;margin-top:32px;background:#F3F0E9;color:#17140F;border-radius:999px;font-size:14px;font-weight:500;transition:background-color .3s cubic-bezier(.44,0,.56,1)",
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
