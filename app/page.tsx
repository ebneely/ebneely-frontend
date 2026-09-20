"use client";

import { useState } from "react";
import { Header, Overlay } from "@/components/Chrome";
import { useSite } from "@/components/Site";
import { s } from "@/lib/style";
import { EN, AR, SERVICES, STEPS, TIERS, TRUSTED, QUOTES, TEAM } from "@/lib/data/home";

const DARK = "#17140F";
const LIGHT = "#F3F0E9";

export default function Home() {
  const { ar } = useSite();
  const [cur, setCur] = useState<"sar" | "usd">("sar");
  const [sent, setSent] = useState(false);

  const t = ar ? AR : EN;
  const k = ar ? "ar" : "en";

  const tiers = TIERS[k].map((x) => ({
    name: x.name,
    for: x.for,
    items: x.items,
    price: cur === "sar" ? x.sar : x.usd,
    unit: cur === "sar" ? (ar ? "ريال" : "SAR") : "USD",
  }));

  const sarBg = cur === "sar" ? DARK : "transparent";
  const sarFg = cur === "sar" ? LIGHT : "rgba(23,20,15,.66)";
  const usdBg = cur === "usd" ? DARK : "transparent";
  const usdFg = cur === "usd" ? LIGHT : "rgba(23,20,15,.66)";

  const navLinks = [
    { href: "/work", label: t.navWork },
    { href: "#services", label: t.navServices },
    { href: "#process", label: t.navProcess },
    { href: "#pricing", label: t.navPricing },
    { href: "#studio", label: t.navStudio },
  ];

  return (
    <div id="ebn-page" style={s("min-height:100vh;position:relative")}>
      <Header logoHref="#top" links={navLinks} cta={{ href: "/contact", label: t.ctaNav }} />
      <Overlay variant="home" links={navLinks} cta={{ href: "/contact", label: t.ctaNav }} />

      {/* ------------------------------- hero ------------------------------- */}
      <section
        id="top"
        style={s(
          "min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:140px 22px 56px;position:relative",
        )}
      >
        {!ar ? (
          <div data-hero style={s("max-width:1000px")}>
            <p
              data-hero-fade
              style={s(
                "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(23,20,15,.66);margin:0 0 26px",
              )}
            >
              Ebneely — Studio for digital systems
            </p>
            <h1
              data-split-target
              style={s(
                "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(40px,10.2vw,104px);line-height:.94;letter-spacing:-.045em;margin:0",
              )}
            >
              We build the systems
              <br />
              behind luxury brands.
            </h1>
            <p
              data-words-target
              style={s(
                "max-width:540px;margin:28px auto 0;font-size:clamp(15px,4vw,18px);line-height:1.6;color:rgba(23,20,15,.66)",
              )}
            >
              Websites, storefronts and enterprise systems for the Gulf — engineered to the
              standard of the brands they carry, at a fraction of regional agency rates.
            </p>
          </div>
        ) : (
          <div data-hero style={s("max-width:1000px")}>
            <p
              data-hero-fade
              style={s(
                "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(23,20,15,.66);margin:0 0 26px",
              )}
            >
              إبنيلي — استوديو الأنظمة الرقمية
            </p>
            <h1
              data-split-target
              style={s(
                "font-family:'IBM Plex Sans Arabic',sans-serif;font-weight:600;font-size:clamp(34px,8.6vw,88px);line-height:1.12;letter-spacing:0;margin:0",
              )}
            >
              نبني الأنظمة التي تقف
              <br />
              خلف العلامات الفاخرة.
            </h1>
            <p
              data-words-target
              style={s(
                "max-width:560px;margin:28px auto 0;font-size:clamp(15px,4vw,18px);line-height:1.85;color:rgba(23,20,15,.66)",
              )}
            >
              مواقع ومتاجر وأنظمة مؤسسية لمنطقة الخليج — بمعايير هندسية ترقى لمستوى العلامات التي
              تحملها، وبجزء من أسعار وكالات المنطقة.
            </p>
          </div>
        )}

        <div
          data-hero-cta
          style={s("display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:38px")}
        >
          <a
            href="#contact"
            className="hv-gold"
            style={s(
              "display:flex;align-items:center;height:48px;padding:0 24px;background:#17140F;color:#F3F0E9;border-radius:999px;font-size:14px;font-weight:500;transition:background-color .3s cubic-bezier(.44,0,.56,1),color .3s cubic-bezier(.44,0,.56,1)",
            )}
          >
            {t.ctaHero}
          </a>
          <a
            href="#work"
            className="hv-outline"
            style={s(
              "display:flex;align-items:center;height:48px;padding:0 24px;border:1px solid rgba(23,20,15,.2);border-radius:999px;font-size:14px;font-weight:500;transition:border-color .3s cubic-bezier(.44,0,.56,1),background-color .3s cubic-bezier(.44,0,.56,1)",
            )}
          >
            {t.ctaWork}
          </a>
        </div>

        <div
          style={s(
            "position:absolute;bottom:26px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:9px",
          )}
        >
          <span
            style={s(
              "font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(23,20,15,.66)",
            )}
          >
            {t.scroll}
          </span>
          <span
            style={s(
              "width:1px;height:26px;background:linear-gradient(to bottom,rgba(23,20,15,.45),transparent);animation:ebn-cue 2.6s cubic-bezier(.4,0,.2,1) infinite",
            )}
          />
        </div>
      </section>

      {/* ------------------------------- trust ------------------------------ */}
      <section
        style={s("border-top:1px solid rgba(23,20,15,.1);border-bottom:1px solid rgba(23,20,15,.1)")}
      >
        <div style={s("max-width:1280px;margin:0 auto;padding:30px 20px 34px")}>
          <div
            data-reveal
            style={s(
              "display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:10px 24px",
            )}
          >
            <span
              style={s(
                "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(23,20,15,.66)",
              )}
            >
              {t.trustLabel}
            </span>
            <span
              style={s(
                "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(23,20,15,.66)",
              )}
            >
              {t.trustNote}
            </span>
          </div>
          <div
            data-reveal
            style={s(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(50%,150px),1fr));gap:10px;margin-top:22px",
            )}
          >
            {TRUSTED[k].map((c, i) => (
              <div
                key={i}
                style={s(
                  "background:#F3F0E9;border:1px solid rgba(23,20,15,.12);border-radius:22px;height:82px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0 12px",
                )}
              >
                <span
                  style={s(
                    "font-family:Archivo,sans-serif;font-weight:600;font-size:15px;letter-spacing:-.02em;color:rgba(23,20,15,.78);text-align:center",
                  )}
                >
                  {c.name}
                </span>
                <span
                  style={s(
                    "font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(23,20,15,.66)",
                  )}
                >
                  {c.kind}
                </span>
              </div>
            ))}
          </div>
          <div
            data-reveal
            style={s(
              "display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-top:20px",
            )}
          >
            <span
              style={s("width:6px;height:6px;border-radius:999px;background:#7A5F2E;flex:none")}
            />
            <span style={s("font-size:14px;color:rgba(23,20,15,.72)")}>{t.trustLatest}</span>
            <a
              href="/work/minirue"
              className="hv-ink"
              style={s(
                "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#7A5F2E;transition:color .4s cubic-bezier(.44,0,.56,1)",
              )}
            >
              {t.trustCta}
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------- work ------------------------------ */}
      <section id="work" style={s("padding:88px 20px 20px;max-width:1280px;margin:0 auto")}>
        <div
          data-reveal
          style={s(
            "display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:14px;margin-bottom:38px",
          )}
        >
          <h2
            data-mask
            style={s(
              "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(30px,7vw,54px);line-height:1;letter-spacing:-.04em;margin:0",
            )}
          >
            {t.workTitle}
          </h2>
          <a
            href="/work"
            className="hv-ink"
            style={s(
              "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(23,20,15,.66);transition:color .4s cubic-bezier(.44,0,.56,1)",
            )}
          >
            {t.workMeta}
          </a>
        </div>

        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:18px",
          )}
        >
          <a
            href="/work/minirue"
            data-reveal
            data-card
            style={s(
              "display:block;background:#EAE6DC;border-radius:30px;overflow:hidden;transition:box-shadow .3s cubic-bezier(.44,0,.56,1)",
            )}
          >
            <div
              style={s(
                "aspect-ratio:4/3;background-image:repeating-linear-gradient(135deg,rgba(23,20,15,.07) 0 1px,transparent 1px 9px);display:flex;align-items:center;justify-content:center",
              )}
            >
              <span
                style={s(
                  "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(23,20,15,.66);text-align:center;padding:0 18px",
                )}
              >
                MiniRue storefront
                <br />
                screenshot
              </span>
            </div>
            <div style={s("padding:22px 22px 26px")}>
              <div
                style={s("display:flex;align-items:baseline;justify-content:space-between;gap:12px")}
              >
                <h3
                  style={s(
                    "font-family:Archivo,sans-serif;font-weight:600;font-size:22px;letter-spacing:-.025em;margin:0",
                  )}
                >
                  MiniRue
                </h3>
                <span
                  style={s(
                    "font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:rgba(23,20,15,.66)",
                  )}
                >
                  2026
                </span>
              </div>
              <p style={s("margin:9px 0 0;font-size:14.5px;line-height:1.55;color:rgba(23,20,15,.64)")}>
                {t.case1}
              </p>
              <div style={s("display:flex;flex-wrap:wrap;gap:7px;margin-top:16px")}>
                {["E-commerce", "Next.js", "SEO"].map((tag) => (
                  <span
                    key={tag}
                    style={s(
                      "font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:5px 10px;border:1px solid rgba(23,20,15,.16);border-radius:999px;color:rgba(23,20,15,.64)",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>

          <a
            href="/work"
            data-reveal
            data-reveal-delay="90"
            data-card
            style={s(
              "display:block;background:#14110D;color:#F3F0E9;border-radius:30px;overflow:hidden;transition:box-shadow .3s cubic-bezier(.44,0,.56,1)",
            )}
          >
            <div
              style={s(
                "aspect-ratio:4/3;background-image:repeating-linear-gradient(135deg,rgba(243,240,233,.08) 0 1px,transparent 1px 9px);display:flex;align-items:center;justify-content:center",
              )}
            >
              <span
                style={s(
                  "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,240,233,.58);text-align:center;padding:0 18px",
                )}
              >
                5argny booking flow
                <br />
                screenshot
              </span>
            </div>
            <div style={s("padding:22px 22px 26px")}>
              <div
                style={s("display:flex;align-items:baseline;justify-content:space-between;gap:12px")}
              >
                <h3
                  style={s(
                    "font-family:Archivo,sans-serif;font-weight:600;font-size:22px;letter-spacing:-.025em;margin:0",
                  )}
                >
                  5argny
                </h3>
                <span
                  style={s(
                    "font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:rgba(243,240,233,.58)",
                  )}
                >
                  2026
                </span>
              </div>
              <p
                style={s(
                  "margin:9px 0 0;font-size:14.5px;line-height:1.55;color:rgba(243,240,233,.66)",
                )}
              >
                {t.case2}
              </p>
              <div style={s("display:flex;flex-wrap:wrap;gap:7px;margin-top:16px")}>
                {["Booking", "Arabic RTL", "Payments"].map((tag) => (
                  <span
                    key={tag}
                    style={s(
                      "font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:5px 10px;border:1px solid rgba(243,240,233,.2);border-radius:999px;color:rgba(243,240,233,.66)",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </div>
        <p
          data-reveal
          style={s(
            "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:rgba(23,20,15,.66);margin:16px 0 0",
          )}
        >
          {t.workNote}
        </p>
      </section>

      {/* ------------------------------ services ---------------------------- */}
      <section id="services" style={s("padding:96px 20px;max-width:1280px;margin:0 auto")}>
        <h2
          data-mask
          style={s(
            "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(30px,7vw,54px);line-height:1;letter-spacing:-.04em;margin:0 0 8px",
          )}
        >
          {t.servicesTitle}
        </h2>
        <p
          data-reveal
          style={s(
            "max-width:560px;margin:0 0 42px;font-size:16px;line-height:1.65;color:rgba(23,20,15,.62)",
          )}
        >
          {t.servicesLede}
        </p>
        <div style={s("border-top:1px solid rgba(23,20,15,.14)")}>
          {SERVICES[k].map((sv, i) => (
            <div
              key={i}
              data-reveal
              data-row
              style={s(
                "display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 26px;padding:24px 14px;border-bottom:1px solid rgba(23,20,15,.14);border-radius:22px;transition:background-color .4s cubic-bezier(.44,0,.56,1)",
              )}
            >
              <span
                style={s(
                  "font-family:'IBM Plex Mono',monospace;font-size:11px;color:#7A5F2E;width:34px;flex:none",
                )}
              >
                {sv.num}
              </span>
              <h3
                style={s(
                  "font-family:Archivo,sans-serif;font-weight:500;font-size:clamp(20px,5vw,30px);letter-spacing:-.03em;margin:0;flex:1 1 240px;min-width:0",
                )}
              >
                {sv.name}
              </h3>
              <p
                style={s(
                  "margin:0;flex:1 1 300px;min-width:0;font-size:14.5px;line-height:1.6;color:rgba(23,20,15,.62)",
                )}
              >
                {sv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------- process ---------------------------- */}
      <section id="process" style={s("background:#14110D;color:#F3F0E9;padding:96px 20px")}>
        <div style={s("max-width:1280px;margin:0 auto")}>
          <h2
            data-mask
            style={s(
              "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(30px,7vw,54px);line-height:1;letter-spacing:-.04em;margin:0 0 46px",
            )}
          >
            {t.processTitle}
          </h2>
          <div
            style={s(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:12px",
            )}
          >
            {STEPS[k].map((p, i) => (
              <div
                key={i}
                data-reveal
                style={s(
                  "background:#14110D;border:1px solid rgba(243,240,233,.14);border-radius:26px;padding:30px 24px 38px",
                )}
              >
                <span
                  style={s(
                    "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;color:#7A5F2E",
                  )}
                >
                  {p.num}
                </span>
                <h3
                  style={s(
                    "font-family:Archivo,sans-serif;font-weight:500;font-size:23px;letter-spacing:-.028em;margin:18px 0 10px",
                  )}
                >
                  {p.name}
                </h3>
                <p
                  style={s(
                    "margin:0;font-size:14.5px;line-height:1.62;color:rgba(243,240,233,.66)",
                  )}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- pricing ---------------------------- */}
      <section id="pricing" style={s("padding:96px 20px;max-width:1280px;margin:0 auto")}>
        <div
          data-reveal
          style={s(
            "display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;margin-bottom:40px",
          )}
        >
          <h2
            data-mask
            style={s(
              "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(30px,7vw,54px);line-height:1;letter-spacing:-.04em;margin:0",
            )}
          >
            {t.pricingTitle}
          </h2>
          <div
            style={s(
              "display:flex;padding:4px;border:1px solid rgba(23,20,15,.16);border-radius:999px;position:relative",
            )}
          >
            <button
              onClick={() => setCur("sar")}
              style={{
                ...s(
                  "height:40px;padding:0 22px;border:0;border-radius:999px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.08em;cursor:pointer;transition:background-color .3s cubic-bezier(.44,0,.56,1),color .3s cubic-bezier(.44,0,.56,1)",
                ),
                background: sarBg,
                color: sarFg,
              }}
            >
              SAR
            </button>
            <button
              onClick={() => setCur("usd")}
              style={{
                ...s(
                  "height:40px;padding:0 22px;border:0;border-radius:999px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.08em;cursor:pointer;transition:background-color .3s cubic-bezier(.44,0,.56,1),color .3s cubic-bezier(.44,0,.56,1)",
                ),
                background: usdBg,
                color: usdFg,
              }}
            >
              USD
            </button>
          </div>
        </div>
        <div
          id="ebn-tiers"
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:16px",
          )}
        >
          {tiers.map((tier, i) => (
            <div
              key={i}
              data-reveal
              data-tier
              style={s(
                "border:1px solid rgba(23,20,15,.16);border-radius:30px;padding:28px 24px 32px;display:flex;flex-direction:column;gap:18px;background:#F3F0E9;transition:box-shadow .3s cubic-bezier(.44,0,.56,1)",
              )}
            >
              <div>
                <h3
                  style={s(
                    "font-family:Archivo,sans-serif;font-weight:600;font-size:19px;letter-spacing:-.02em;margin:0 0 5px",
                  )}
                >
                  {tier.name}
                </h3>
                <p style={s("margin:0;font-size:13.5px;color:rgba(23,20,15,.62)")}>{tier.for}</p>
              </div>
              <div style={s("display:flex;align-items:baseline;gap:7px")}>
                <span
                  style={s(
                    "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(30px,8vw,40px);letter-spacing:-.04em",
                  )}
                >
                  {tier.price}
                </span>
                <span
                  style={s(
                    "font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:rgba(23,20,15,.66)",
                  )}
                >
                  {tier.unit}
                </span>
              </div>
              <div
                style={s(
                  "display:flex;flex-direction:column;gap:9px;border-top:1px solid rgba(23,20,15,.12);padding-top:18px",
                )}
              >
                {tier.items.map((it, j) => (
                  <div
                    key={j}
                    style={s(
                      "display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.5;color:rgba(23,20,15,.72)",
                    )}
                  >
                    <span
                      style={s(
                        "width:5px;height:5px;border-radius:999px;background:#7A5F2E;flex:none;margin-top:7px",
                      )}
                    />
                    <span>{it}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="hv-invert"
                style={s(
                  "margin-top:auto;display:flex;align-items:center;justify-content:center;height:48px;border:1px solid rgba(23,20,15,.2);border-radius:999px;font-size:14px;font-weight:500;transition:background-color .3s cubic-bezier(.44,0,.56,1),color .3s cubic-bezier(.44,0,.56,1)",
                )}
              >
                {t.tierCta}
              </a>
            </div>
          ))}
        </div>
        <p
          data-reveal
          style={s(
            "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:rgba(23,20,15,.66);margin:16px 0 0",
          )}
        >
          {t.pricingNote}
        </p>
      </section>

      {/* ------------------------------- quotes ----------------------------- */}
      <section style={s("padding:0 20px 96px;max-width:1280px;margin:0 auto")}>
        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:16px",
          )}
        >
          {QUOTES[k].map((q, i) => (
            <figure
              key={i}
              data-reveal
              style={s("margin:0;background:#EAE6DC;border-radius:30px;padding:32px 28px")}
            >
              <blockquote
                style={s(
                  "margin:0;font-family:Archivo,sans-serif;font-weight:400;font-size:clamp(19px,4.6vw,25px);line-height:1.32;letter-spacing:-.025em",
                )}
              >
                {q.text}
              </blockquote>
              <figcaption
                style={s(
                  "margin-top:22px;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(23,20,15,.66)",
                )}
              >
                {q.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ------------------------------- studio ----------------------------- */}
      <section id="studio" style={s("padding:0 20px 96px;max-width:1280px;margin:0 auto")}>
        <h2
          data-mask
          style={s(
            "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(30px,7vw,54px);line-height:1;letter-spacing:-.04em;margin:0 0 8px",
          )}
        >
          {t.studioTitle}
        </h2>
        <p
          data-reveal
          style={s(
            "max-width:600px;margin:0 0 40px;font-size:16px;line-height:1.65;color:rgba(23,20,15,.62)",
          )}
        >
          {t.studioLede}
        </p>
        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:16px",
          )}
        >
          {TEAM[k].map((m, i) => (
            <div key={i} data-reveal>
              <div
                style={s(
                  "aspect-ratio:3/4;border-radius:26px;overflow:hidden;background:#EAE6DC;background-image:repeating-linear-gradient(135deg,rgba(23,20,15,.07) 0 1px,transparent 1px 9px);display:flex;align-items:flex-end;padding:14px",
                )}
              >
                <span
                  style={s(
                    "font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(23,20,15,.66)",
                  )}
                >
                  portrait
                </span>
              </div>
              <p
                style={s(
                  "margin:12px 0 2px;font-family:Archivo,sans-serif;font-weight:500;font-size:16px;letter-spacing:-.02em",
                )}
              >
                {m.name}
              </p>
              <p style={s("margin:0;font-size:13.5px;color:rgba(23,20,15,.62)")}>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------- contact ---------------------------- */}
      <section id="contact" style={s("background:#14110D;color:#F3F0E9;padding:96px 20px 40px")}>
        <div style={s("max-width:1280px;margin:0 auto")}>
          <div
            style={s(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:48px 40px;align-items:start",
            )}
          >
            <div data-reveal>
              <h2
                data-mask
                style={s(
                  "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(32px,8vw,62px);line-height:.98;letter-spacing:-.045em;margin:0",
                )}
              >
                {t.contactTitle}
              </h2>
              <p
                style={s(
                  "max-width:420px;margin:20px 0 0;font-size:16px;line-height:1.65;color:rgba(243,240,233,.66)",
                )}
              >
                {t.contactLede}
              </p>
              <div style={s("display:flex;flex-wrap:wrap;gap:10px;margin-top:30px")}>
                <a
                  href="/contact"
                  className="hv-gold"
                  style={s(
                    "display:flex;align-items:center;height:48px;padding:0 24px;background:#F3F0E9;color:#17140F;border-radius:999px;font-size:14px;font-weight:500;transition:background-color .3s cubic-bezier(.44,0,.56,1),color .3s cubic-bezier(.44,0,.56,1)",
                  )}
                >
                  {t.whatsapp}
                </a>
                <a
                  href="/contact"
                  className="hv-lightborder"
                  style={s(
                    "display:flex;align-items:center;height:48px;padding:0 24px;border:1px solid rgba(243,240,233,.25);border-radius:999px;font-size:14px;font-weight:500;transition:border-color .3s cubic-bezier(.44,0,.56,1)",
                  )}
                >
                  {t.email}
                </a>
              </div>
            </div>

            <form
              data-reveal
              data-reveal-delay="110"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              style={s("display:flex;flex-direction:column;gap:14px")}
            >
              {[
                { label: t.fName, type: "text" },
                { label: t.fEmail, type: "email" },
              ].map((f) => (
                <label key={f.type} style={s("display:flex;flex-direction:column;gap:7px")}>
                  <span
                    style={s(
                      "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,240,233,.58)",
                    )}
                  >
                    {f.label}
                  </span>
                  <input
                    type={f.type}
                    className="ebn-field"
                    style={s(
                      "height:54px;background:rgba(243,240,233,.05);border:1px solid rgba(243,240,233,.2);border-radius:27px;padding:0 20px;color:#F3F0E9;font-family:'Work Sans',sans-serif;font-size:16px;outline:none;transition:border-color .4s cubic-bezier(.44,0,.56,1),background-color .4s cubic-bezier(.44,0,.56,1)",
                    )}
                  />
                </label>
              ))}
              <label style={s("display:flex;flex-direction:column;gap:7px")}>
                <span
                  style={s(
                    "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,240,233,.58)",
                  )}
                >
                  {t.fBrief}
                </span>
                <textarea
                  rows={3}
                  className="ebn-field"
                  style={s(
                    "background:rgba(243,240,233,.05);border:1px solid rgba(243,240,233,.2);border-radius:24px;color:#F3F0E9;font-family:'Work Sans',sans-serif;font-size:16px;outline:none;resize:vertical;padding:16px 20px;transition:border-color .4s cubic-bezier(.44,0,.56,1),background-color .4s cubic-bezier(.44,0,.56,1)",
                  )}
                />
              </label>
              <button
                type="submit"
                className="hv-bright"
                style={s(
                  "margin-top:8px;height:48px;background:#7A5F2E;border:0;border-radius:999px;color:#F3F0E9;font-family:'Work Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:filter .3s cubic-bezier(.44,0,.56,1)",
                )}
              >
                {sent ? t.sent : t.send}
              </button>
            </form>
          </div>

          <footer
            style={s(
              "margin-top:80px;padding-top:26px;border-top:1px solid rgba(243,240,233,.14);display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(243,240,233,.58)",
            )}
          >
            <span>Ebneely® — Riyadh · Cairo</span>
            <span>© MMXXVI</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
