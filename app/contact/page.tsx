"use client";

import { useState } from "react";
import { Header, Overlay, Footer } from "@/components/Chrome";
import { useSite } from "@/components/Site";
import { s } from "@/lib/style";
import { EN, AR, CHANNELS, EXPECT, FAQ } from "@/lib/data/contact";

const FIELD =
  "height:54px;background:rgba(243,240,233,.05);border:1px solid rgba(243,240,233,.2);border-radius:27px;padding:0 20px;color:#F3F0E9;font-family:'Work Sans',sans-serif;font-size:16px;outline:none;transition:border-color .4s cubic-bezier(.44,0,.56,1),background-color .4s cubic-bezier(.44,0,.56,1)";
const FIELD_LABEL =
  "font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,240,233,.58)";

export default function ContactPage() {
  const { ar } = useSite();
  const [sent, setSent] = useState(false);
  const t = ar ? AR : EN;
  const k = ar ? "ar" : "en";

  const navLinks = [
    { href: "/work", label: t.navWork },
    { href: "/#services", label: t.navServices },
    { href: "/#pricing", label: t.navPricing },
    { href: "/contact", label: t.navContact, active: true },
  ];
  const overlayLinks = navLinks.map((l) => ({ ...l, active: false }));

  return (
    <div id="ebn-page" style={s("min-height:100vh")}>
      {/* The Contact page is the one header without a CTA. */}
      <Header logoHref="/" links={navLinks} />
      <Overlay links={overlayLinks} />

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
              "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(38px,9vw,88px);line-height:.96;letter-spacing:-.045em;margin:0;max-width:18ch",
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

      <section style={s("max-width:1280px;margin:0 auto;padding:56px 20px 0")}>
        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:12px",
          )}
        >
          {CHANNELS[k].map((c, i) => (
            <a
              key={i}
              href={c.href}
              data-reveal
              data-card
              className="hv-border"
              style={s(
                "border:1px solid rgba(23,20,15,.14);border-radius:26px;padding:26px 24px 28px;display:flex;flex-direction:column;gap:9px;transition:box-shadow .3s cubic-bezier(.44,0,.56,1),border-color .3s cubic-bezier(.44,0,.56,1)",
              )}
            >
              <span
                style={s(
                  "font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(23,20,15,.66)",
                )}
              >
                {c.k}
              </span>
              <span
                style={s(
                  "font-family:Archivo,sans-serif;font-weight:500;font-size:19px;letter-spacing:-.025em",
                )}
              >
                {c.v}
              </span>
              <span style={s("font-size:14px;line-height:1.55;color:rgba(23,20,15,.64)")}>
                {c.note}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:88px 20px 0")}>
        <div
          style={s(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:48px 40px;align-items:start",
          )}
        >
          <div data-reveal>
            <h2
              style={s(
                "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(26px,6vw,42px);line-height:1;letter-spacing:-.04em;margin:0 0 18px",
              )}
            >
              {t.formTitle}
            </h2>
            <p
              style={s(
                "margin:0 0 26px;max-width:42ch;font-size:15.5px;line-height:1.65;color:rgba(23,20,15,.66)",
              )}
            >
              {t.formLede}
            </p>
            <div style={s("display:flex;flex-direction:column;gap:12px")}>
              {EXPECT[k].map((e, i) => (
                <div
                  key={i}
                  style={s(
                    "display:flex;gap:11px;align-items:flex-start;font-size:14.5px;line-height:1.55;color:rgba(23,20,15,.72)",
                  )}
                >
                  <span
                    style={s(
                      "width:5px;height:5px;border-radius:999px;background:#7A5F2E;flex:none;margin-top:8px",
                    )}
                  />
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            data-reveal
            onSubmit={(ev) => {
              ev.preventDefault();
              setSent(true);
            }}
            style={s(
              "display:flex;flex-direction:column;gap:14px;background:#14110D;color:#F3F0E9;border-radius:30px;padding:32px 28px 34px",
            )}
          >
            {[t.fName, t.fContact, t.fBudget].map((label, i) => (
              <label key={i} style={s("display:flex;flex-direction:column;gap:8px")}>
                <span style={s(FIELD_LABEL)}>{label}</span>
                <input type="text" className="ebn-field" style={s(FIELD)} />
              </label>
            ))}
            <label style={s("display:flex;flex-direction:column;gap:8px")}>
              <span style={s(FIELD_LABEL)}>{t.fBrief}</span>
              <textarea
                rows={4}
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
      </section>

      <section style={s("max-width:1280px;margin:0 auto;padding:88px 20px 96px")}>
        <h2
          data-reveal
          style={s(
            "font-family:Archivo,sans-serif;font-weight:600;font-size:clamp(26px,6vw,42px);line-height:1;letter-spacing:-.04em;margin:0 0 30px",
          )}
        >
          {t.faqTitle}
        </h2>
        <div style={s("border-top:1px solid rgba(23,20,15,.14)")}>
          {FAQ[k].map((q, i) => (
            <div
              key={i}
              data-reveal
              data-row
              style={s(
                "display:flex;flex-wrap:wrap;gap:8px 32px;padding:24px 14px;border-bottom:1px solid rgba(23,20,15,.14);border-radius:22px;transition:background-color .4s cubic-bezier(.44,0,.56,1)",
              )}
            >
              <h3
                style={s(
                  "font-family:Archivo,sans-serif;font-weight:500;font-size:clamp(18px,4.5vw,24px);letter-spacing:-.025em;margin:0;flex:1 1 260px;min-width:0",
                )}
              >
                {q.q}
              </h3>
              <p
                style={s(
                  "margin:0;flex:1 1 320px;min-width:0;font-size:14.5px;line-height:1.65;color:rgba(23,20,15,.64)",
                )}
              >
                {q.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
