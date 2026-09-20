import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Site } from "@/components/Site";
import { s } from "@/lib/style";

export const metadata: Metadata = {
  title: "Ebneely — Studio for digital systems",
  description:
    "Websites, storefronts and enterprise systems for the Gulf — engineered to the standard of the brands they carry, at a fraction of regional agency rates.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// The veil and ring live in the server-rendered markup so they paint on the
// first frame — the motion layer arrives far too late to create them itself
// without the page flashing bright first.
const VEIL =
  "position:fixed;inset:0;z-index:95;background:#14110D;opacity:1;pointer-events:auto;will-change:opacity";
const RING =
  "position:fixed;right:22px;bottom:22px;width:26px;height:26px;border-radius:999px;border:1.5px solid rgba(243,240,233,.2);border-top-color:#7A5F2E;z-index:96;pointer-events:none;animation:ebn-spin .9s linear infinite";

// Last-resort uncover, identical to the prototype's: if the motion layer never
// claims the veil, drop it after 3.2s rather than leave a dark screen.
const SAFETY =
  "setTimeout(function(){var v=document.getElementById('ebn-veil'),r=document.getElementById('ebn-ring');if(v&&!v.getAttribute('data-claimed')){v.style.transition='opacity .6s ease';v.style.opacity='0';v.style.pointerEvents='none';if(r)r.parentNode&&r.parentNode.removeChild(r);}},3200);";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Work+Sans:wght@300;400;500&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: SAFETY }} />
      </head>
      <body>
        <div id="ebn-veil" style={s(VEIL)} />
        <div id="ebn-ring" style={s(RING)} />
        <Site>{children}</Site>
      </body>
    </html>
  );
}
